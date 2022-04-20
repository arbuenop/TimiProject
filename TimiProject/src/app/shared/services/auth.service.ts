import { Injectable, NgZone, OnInit } from '@angular/core';
import { User } from '../services/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth, } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { WindowServiceService } from './window-service.service';
import { runInThisContext } from 'vm';
import { RecaptchaVerifier } from 'firebase/auth';


@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit{
  userData: any; // Save logged in user data
  windowRef: any;

  private loading: BehaviorSubject<boolean>;

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private win: WindowServiceService
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
    this.loading = new BehaviorSubject<boolean>(false);


  }


  ngOnInit() {
  }

  // Sign in with email/password
  async SignIn(email: string, password: string) {

    this.setStateLoading(true)
    return await this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.goDashboard()
      })
      .catch((error) => {
        window.alert(error.message);
      })
      .finally(() => {
        this.setStateLoading(false)
      });
  }

  // Sign up with email / password
  async SignUp(email: string, password: string) {
    this.setStateLoading(true)
    return await this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      })
      .finally(() => {
        this.SendVerificationMail();
      });
  }

  // Send email verfificaiton when new user sign up
  async SendVerificationMail() {
    this.setStateLoading(true);
    return await this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['/auth/verify-email-address']);
      })
      .finally(() => {
        this.setStateLoading(false);
      });
  }

  // Reset Forggot password
  async ForgotPassword(passwordResetEmail: string) {
    this.setStateLoading(true)
    return await this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      })
      .finally(() => {
        this.setStateLoading(false)
      });
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }
  // Sign in with Google
  async GoogleAuth() {
    this.setStateLoading(true);
    return await this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {

    })
    .catch((error) => {
      window.alert(error);
    })
    .finally(() => {
      this.goDashboard();
    });
  }
  // Auth logic to run auth providers
  async AuthLogin(provider: any) {
    this.setStateLoading(true)
    return await this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      })
      .finally(() => {
        this.goDashboard()
      })
      ;
  }
  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  // Sign out
  async SignOut() {
    return await this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/auth/init']);
    });
  }

  isLoading(): Observable<boolean>  {
    return this.loading.asObservable();
  }

  setStateLoading(is:boolean): void {
    this.loading.next(is);
  }

  goDashboard() {

    setTimeout(()=>{
      if (this.isLoggedIn) {
        this.ngZone.run(() => {
          this.router.navigate(['/dashboard']);
        });
      } else {
        alert('Something went wrong. Please try again')
      }
      this.setStateLoading(false);
    }, 0);
  }

  async signInWithPhone(phoneNumber: string,) {





    const appVerifier = this.windowRef.recaptchaVerifier;
      this.afAuth.signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(result => {
          this.windowRef.confirmationResult = result;
        })
        .catch( error => console.log(error) );
    }

    verifyLoginCode(verificationCode:string) {
      return this.windowRef.confirmationResult
          .confirm(verificationCode)
          .then( (res:any) => {
            this.userData = res.user;
      })
        .catch( (err:any) => {
          console.log(err, "Incorrect code entered?")
        });
    }




}
