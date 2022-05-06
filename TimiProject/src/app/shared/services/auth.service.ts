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
import { RecaptchaVerifier } from "firebase/auth";
import { UsersService } from './database/users.service';
import { UserAuthModel } from 'src/app/models/user-models/user-auth-model';
import { SwalService } from './swal.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit{
  userData: any;
  userDataMapped: UserAuthModel = {
          uid: '',
          email: '',
          displayName: '',
          photoURL: '',
          emailVerified: false,
          userName: ''
  };
  windowRef: any;

  private loading: BehaviorSubject<boolean>;

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning,
    private _userService: UsersService,
    public swal: SwalService
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      this._userService.pushToLocalStorage(user, 'user');
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
        this._userService.SetUserData(result.user);
        this.goDashboard()
      })
      .catch((error) => {
        this.swal.getErrorMsg(this.swal.messageErr(error.code))
      })
      .finally(() => {
        this.setStateLoading(false)
      });
  }


  mapUser(rawUserData?: any):UserAuthModel {
    var userNameSelector = 'User';
    var displayNameSelector = 'User';

    var userDataMapped:UserAuthModel =  {
      uid: rawUserData.uid,
      email: rawUserData.email,
      displayName: displayNameSelector,
      photoURL: rawUserData.photoURL,
      emailVerified: rawUserData.emailVerified,
      userName: userNameSelector
    }
    return userDataMapped
  }

  // Sign up with email / password
  async SignUp(email: string, password: string) {
    this.setStateLoading(true)
    return await this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this._userService.SetUserData(this.mapUser(result.user));
        this.SendVerificationMail();
      })
      .catch((error) => {
        this.setStateLoading(false)
        this.swal.messageErr(this.swal.getErrorMsg(error.code))
      })
      .finally(() => {
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
        this.swal.messageSucc('Password reset email sent, check your inbox.')
      })
      .catch((error) => {
        this.swal.getErrorMsg(this.swal.messageErr(error.code))
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
      console.log(res)
      this._userService.SetUserData(this.mapUser(res.user));
    })
    .catch((error) => {
      this.swal.messageErr(this.swal.getErrorMsg(error.code))
    })
      .finally(() => {
        this.swal.messageSucc('Has iniciado sesión correctamente')
      this.goDashboard();
    });
  }
  // Auth logic to run auth providers
  async AuthLogin(provider: any) {
    this.setStateLoading(true)
    return await this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        // this.SetUserData(result.user);
      })
      .catch((error) => {
        this.swal.getErrorMsg(this.swal.messageErr(error.code))
      })
      .finally(() => {
        this.goDashboard()
      })
      ;
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
        this.swal.messageErr('Something went wrong. Please try again')
      }
      this.setStateLoading(false);
    }, 0);
  }


// recaptcha
  async reCaptcha() {
    let error = false;
    return await new Promise((resolve, reject) => {
        if (error) {
          reject('error'); // pass values
        } else {
          var rec = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
          }, auth.getAuth());
          console.log(rec)
          rec.verify()
          rec.render()
          resolve(rec); // pass values
        }
    });

  }

  confirmationRes:any;

// sign in/Register with phone
  async signInWithPhone(phoneNumber: string, appVerifier: any) {

    this.setStateLoading(true);
      this.afAuth.signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(result => {
          console.log(result)
          this.confirmationRes = result;
        })
        .catch(error => console.log(error))
        .finally(() => {
          this.router.navigate(['auth/verify-phone-number']);
          this.setStateLoading(false);
        });
  }

  // Verify code number
  verifyLoginCode(verificationCode: string) {

    this.setStateLoading(true);
      return this.confirmationRes
          .confirm(verificationCode)
          .then( (res:any) => {
            this.userData = res.user;
            // this.SetUserData(res.user);
      })
        .catch( (err:any) => {
          console.log(err, "Incorrect code entered?")
        })
        .finally(() => {
          this.router.navigate(['auth/create-user']);
          this.setStateLoading(false);
          this.swal.messageSucc('PHONE VERIFIED')
        });;
  }

}
