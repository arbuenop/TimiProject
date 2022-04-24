import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { doc, getDoc } from "firebase/firestore";
import { UserAuthModel } from 'src/app/models/user-models/user-auth-model';
import { User } from '../user';


export interface test{
  country: string;
  state: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userData: any; // Save logged in user data

  testmode?: test;
  constructor(
    public afs: AngularFirestore,
  ) { }

  getUserData() {
    return this.userData;
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    console.log()
    const userData: UserAuthModel = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      userName: user.userName
    };

    console.log(userData)
    this.userData = userData;
    console.log(this.userData)
    return userRef.set(userData, {
      merge: true,
    });
  }



  setTestCollection() {

    this.afs
      .collection("auth-data")
      .doc('user-auth-data').set({
        name: "Los Angeles",
        state: "CA",
        country: "USA"
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
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

// PULL USERS FROM BD
// --------------------------------------

  pullDbUserData() {

  }






// PUSH USERS TO BD
// --------------------------------------
  pushUserDataToBd(user: any) {


  //   this.afs.collection("auth-data").doc(user.uid).set({
  //     uid: user.uid,
  //     email: user.email,
  //     displayName: user.displayName,
  //     photoURL: user.photoURL,
  //     emailVerified: user.emailVerified,
  //  })


    // this.afs
    //   .collection("auth-data")
    //   .doc('user-auth-data').set(user)
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
  }







// SET LOCALSTORAGE USER DATA
// --------------------------------------

  pushToLocalStorage(element:any, key:string) {
    if (element) {
      this.userData = element;
      localStorage.setItem(key, JSON.stringify(this.userData));
      JSON.parse(localStorage.getItem(key)!);
    } else {
      localStorage.setItem(key, 'null');
      JSON.parse(localStorage.getItem(key)!);
    }
  }










}
