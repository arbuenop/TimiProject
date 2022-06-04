import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection ,AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { UserSessionService } from '../session/user-session.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { deleteUser } from 'firebase/auth';

export interface test{
  country: string;
  state: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(
    public afs: AngularFirestore,
    public auth: AngularFireAuth,
    public sessionUser: UserSessionService
  ) { }

  userData: any; // Save logged in user data
  testmode?: test;

  getUserData() {
    return this.userData;
  }

  async getTestCollection() {
    var data:test;
    this.afs.collection('tests').doc("hello").ref.get()
      .then(function (doc) {
        if (doc.exists) {

          const temp = doc.data() as test
          data = temp
          console.log(data.name)

        } else {
          console.log("There is no document!");
        }
    }).catch(function (error) {
      console.log("There was an error getting your document:", error);
    });


  }
//SEARCH USERS BY MAIL
// --------------------------------------

searchUserByMail(email:any):Observable<any>{
  this.afs.collection('auth-data').doc('1').delete()
  return  this.afs.collection('auth-data', ref => ref.where('email', '==' , email)).valueChanges()
}

//SEARCH USERS BY PHONE
// --------------------------------------

searchUserByPhone(phone:any):Observable<any>{
  return  this.afs.collection('auth-data', ref => ref.where('phoneNumber', '==' , phone)).valueChanges()
}

//SEARCH USERS BY NAME
// --------------------------------------

searchUserByName(name:any):Observable<any>{
  return  this.afs.collection('auth-data', ref => ref.where('userName', '==' , name)).valueChanges()
}



// PULL USERS FROM BD
// --------------------------------------

  pullDbUserData() {}

// PUSH USERS TO BD
// --------------------------------------
  pushUserDataToBd(user: any) {

    return this.afs.collection("auth-data").doc(user.uid).set({
      uid: user.uid ? user.uid : '',
      email: user.email ? user.email : '',
      displayName: user.userName ? user.userName : 'TimiUser',
      photoURL: user.photoURL ? user.photoURL : 'https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Clip-Art-Transparent-PNG.png',
      emailVerified: user.emailVerified ? user.emailVerified : false,
      userName: user.userName ? user.userName : '',
      passwd: user.passwd ? user.passwd : '',
      phoneNumber: user.phoneNumber ? user.phoneNumber : ''
   })


    this.afs
      .collection("auth-data")
      .doc('user-auth-data').set(user)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  pushGoogleUserDataToBd(user: any) {

    return this.afs.collection("auth-data").doc(user.uid).set({
      uid: user.uid ? user.uid : '',
      email: user.email ? user.email : '',
      displayName: user.displayName ? user.displayName : 'TimiUser',
      photoURL: user.photoURL ? user.photoURL : 'https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Clip-Art-Transparent-PNG.png',
      emailVerified: user.emailVerified ? user.emailVerified : false,
      userName: user.displayName ? user.displayName : '',
      passwd: user.passwd ? user.passwd : '',
      phoneNumber: user.phoneNumber ? user.phoneNumber : ''
   })
  }

// DELETE USER
// --------------------------------------

async deleteUserById(id:string){



    if (sessionStorage.getItem('userNumber'))sessionStorage.removeItem('userNumber');
    if (sessionStorage.getItem('user-profile'))sessionStorage.removeItem('user-profile');
    if (sessionStorage.getItem('user-config'))sessionStorage.removeItem('user-config');
    if (sessionStorage.getItem('user-key'))sessionStorage.removeItem('user-key');
    if (sessionStorage.getItem('userEmail'))sessionStorage.removeItem('userEmail');
    if (localStorage.getItem('user'))localStorage.removeItem('user');
    this.afs.collection('user-profile').doc(id).delete().then( res => {
      this.afs.collection('user-config').doc(id).delete().then( res => {
        this.afs.collection('auth-data').doc(id).delete().then(async res => {
          (await this.auth.currentUser).delete()

        })
      })

    })




}


// SET LOCALSTORAGE USER DATA
// --------------------------------------

  // pushToLocalStorage(element:any, key:string) {
  //   if (element) {
  //     this.userData = element;
  //     localStorage.setItem(key, JSON.stringify(this.userData));
  //     JSON.parse(localStorage.getItem(key)!);
  //   } else {
  //     localStorage.setItem(key, 'null');
  //     JSON.parse(localStorage.getItem(key)!);
  //   }
  // }

// VALIDATE USERS PASSWORDS FROM REGISTER USER
// ---------------------------------------------

  validatePasswords(val:FormGroup ){

  }








}
