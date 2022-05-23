import { Injectable } from '@angular/core';
import { UserAuthModel } from 'src/app/models/user-models/user-auth-model';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
  userData: UserAuthModel;

  user:User;

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
  clearLoginUserData() {

    this.user = {
      uid: '',
      email: '',
      displayName: '',
      photoURL: '',
      emailVerified: false,
  };
  }



  setUserData(user: any) {
    this.userData = {
      uid: user.uid ? user.uid : '',
      email: user.email ? user.email : '',
      displayName: user.userName ? user.userName : 'TimiUser',
      photoURL: user.photoURL ? user.photoURL : '../../../assets/images/auth-images/default-profile-img.png',
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


  setLoginUserData(user:any){
    this.user = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    localStorage.setItem('user',JSON.stringify(this.user));
    JSON.parse(localStorage.getItem('user'))
  }


  get LoginUserData(){
    return this.user;
  }

}
