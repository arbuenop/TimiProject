import { Injectable } from '@angular/core';
import { UserAuthModel } from 'src/app/models/user-models/user-auth-model';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
  userData: UserAuthModel;
  constructor() {
    this.clearUserData();
  }

  clearUserData() {

    this.userData = {
      uid: '',
      email: '',
      displayName: '',
      photoURL: '',
      passwd: '',
      emailVerified: false,
      userName: '',
      phoneNumber: '',
  };
  }



  setUserData(user: any) {
    this.userData = {
      uid: user.uid ? user.uid : '',
      email: user.email ? user.email : '',
      displayName: user.userName ? user.userName : 'TimiUser',
      photoURL: user.photoURL ? user.photoURL : 'https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Clip-Art-Transparent-PNG.png',
      emailVerified: user.emailVerified ? user.emailVerified : false,
      userName: user.userName ? user.userName : '',
      passwd: user.passwd ? user.passwd : '',
      phoneNumber: user.phoneNumber ? user.phoneNumber : ''
    }
  }

  get UserAuthData() {
    return this.userData;
  }

  pushToLocalStorage(key: string) {
      localStorage.setItem(key, JSON.stringify(this.userData));
      JSON.parse(localStorage.getItem(key)!);
  }

}
