import { Injectable, NgZone, OnInit } from '@angular/core';
import { User } from '../services/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth, } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { WindowServiceService } from './window-service.service';
import { RecaptchaVerifier } from "firebase/auth";
import { UsersService } from './database/users.service';
import { UserAuthModel } from 'src/app/models/user-models/user-auth-model';
import { SwalService } from './swal.service';
import { UserSessionService } from './session/user-session.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit{
  userData: UserAuthModel = {
          uid: '',
          email: '',
          displayName: '',
          photoURL: '',
          passwd: '',
          emailVerified: false,
          userName: ''
  };
  windowRef: any;

  reCaptchaVerifyer: any;
  private loading: BehaviorSubject<boolean>;

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning,
    private _userService: UsersService,
    private _userSessionService: UserSessionService,
    public swal: SwalService,
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (!user) this._userSessionService.setUserData(user);
      else this._userSessionService.setUserData(this.userData);
      this._userSessionService.pushToLocalStorage('user-auth-data');
    });
    this.loading = new BehaviorSubject<boolean>(false);
  }

  ngOnInit() {
  }

  iniciarSessionConUsuario(name: string, pass: string) {
    this.setStateLoading(true);
    this._userService.searchUserByName(name)
      .subscribe({
        next(data) {
          if (data[0]) {
            if (data[0].passwd === pass) {
              console.log('Iniciando sesión...')
              localStorage.setItem('user', JSON.stringify(data[0]));

            } else {
              console.log('Error con la contraseña...')
            }
          } else {
            console.log('No se ha encontrado ningún usuario...')
          }
        },
        error(err) {
          console.log(err)
        }
      })
  }



  async pushUserRegisteredByMailToBd() {
    this.setStateLoading(true)
    this._userSessionService.userData.uid = sessionStorage.getItem('user-key');
    this._userSessionService.pushToLocalStorage('user-auth-data');
    return await this._userService.pushUserDataToBd(this._userSessionService.UserAuthData)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['/auth/sign-in']);
        });
        if (sessionStorage.getItem('userEmail')||sessionStorage.getItem('userEmail')=='') sessionStorage.removeItem('userEmail')
        if (localStorage.getItem('user-auth-data')) localStorage.removeItem('user-auth-data');
        if (sessionStorage.getItem('user')||sessionStorage.getItem('user-key')=='') sessionStorage.removeItem('user')
      })
      .catch((error) => {
      })
      .finally(() => {
        this.setStateLoading(false)
      });

  }

  async pushUserRegisteredByPhoneToBd() {
    this.setStateLoading(true)
    return await this._userService.pushUserDataToBd(this._userSessionService.UserAuthData)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['/auth/sign-in']);
        });
        if (sessionStorage.getItem('userNumber')||sessionStorage.getItem('userNumber')=='') sessionStorage.removeItem('userNumber')
        if (localStorage.getItem('user-auth-data')) localStorage.removeItem('user-auth-data');
        if (sessionStorage.getItem('user')||sessionStorage.getItem('user-key')=='') sessionStorage.removeItem('user')
      })
      .catch((error) => {
        this.swal.getErrorMsg(this.swal.messageErr(error.code))
      })
      .finally(() => {
        this.setStateLoading(false)
      });

  }
  emailUser: any;
  // Sign in with email/password
  async SignIn(email: string, password: string) {

    this.setStateLoading(true)
    return await this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this._userSessionService.setLoginUserData(result.user)
        this.goDashboard()
      })
      .catch((error) => {
        this.swal.getErrorMsg(this.swal.messageErr(error.code))
      })
      .finally(() => {
        this.setStateLoading(false)
      });
  }


  // mapUser(rawUserData?: any):UserAuthModel {
    // var userNameSelector = 'User';
    // var displayNameSelector = 'User';

    // var userDataMapped:UserAuthModel =  {
    //   uid: rawUserData.uid,
    //   email: rawUserData.email,
    //   displayName: displayNameSelector,
    //   photoURL: rawUserData.photoURL,
    //   emailVerified: rawUserData.emailVerified,
    //   userName: userNameSelector
    // }
    // return userData
  // }

  // Sign up with email / password
  async SignUp(email: string, password: string) {
    this.setStateLoading(true)
    return await this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationMail();
        sessionStorage.setItem('user-key', result.user.uid)
      })
      .catch((error) => {
        this.setStateLoading(false)
      })
      .finally(() => {
        this.pushUserRegisteredByMailToBd();
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
    return user !== null;
  }
  // Sign in with Google













  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      if (res) {
        this.router.navigate(['home']);
      }
    });
  }
  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        });
        this._userSessionService.setLoginUserData(result.user);
        this._userService.pushGoogleUserDataToBd(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }


  // Sign out
  async SignOut() {
    return await this.afAuth.signOut().then(() => {
      localStorage.removeItem('user-auth-data');
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
          this.router.navigate(['/home']);
        });
      } else {
        this.swal.messageErr('Something went wrong. Please try again')
      }
    }, 0);
  }
  quitLoaderAndSetError() {
    this.swal.messageErr('Nombre de usuario o contraseña incorrectos.')
    this.setStateLoading(false);
  }
  get reCaptcha() {
    return this.reCaptchaVerifyer;
  }
// recaptcha
  async checkReCaptcha() {
    let error = false;

    return await new Promise((resolve, reject) => {
        if (error) {
          reject('error'); // pass values
        } else {
          var rec = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
          }, auth.getAuth());
          rec.verify()
          rec.render()
          resolve(rec); // pass values
          this.reCaptchaVerifyer = rec;
        }
    }).catch((err) => {
      console.log('ReCaptcha failed. Put in contact with the admins of the page to solve it.')
    });

  }

  confirmationRes:any;

// sign in/Register with phone
  async signInWithPhone(phoneNumber: string, appVerifier: any) {
    this.setStateLoading(true);
      this.afAuth.signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(result => {
          this.confirmationRes = result;
        })
        .catch(error => {
          console.log(error)
        })
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
          this.swal.messageSucc('PHONE VERIFIED')
            sessionStorage.setItem('user-key',this.userData.uid)
            this.router.navigate(['auth/create-user']);
        })
        .catch( (err:any) => {
            this.swal.messageErr('Codigo de verificación incorrecto. Porfavor inténtalo de nuevo.');
        })
        .finally(() => {
           this.setStateLoading(false);
        });
  }

  // Save number on sessionStorage

  setNumberOnSs(number:string){
    sessionStorage.setItem('userNumber', number);
  }
  get NumberOfSs():any{
    if(sessionStorage.getItem('userNumber'))
    return sessionStorage.getItem('userNumber')? sessionStorage.getItem('userNumber'): '';
  }









}
