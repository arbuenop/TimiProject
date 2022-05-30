import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileDbService {

  constructor(
    public afs: AngularFirestore,
  ) { }

  searchUserProfileByName(name:any):Observable<any>{
    return  this.afs.collection('users-prof', ref => ref.where('userName', '==' , name)).valueChanges()
  }

  pushUserProfileToDb(user: any) {

    this.afs.collection("users-prof").doc(user.uid).set({
      age: '?',
      location: '?',
      userName: user.displayName ? user.displayName : 'TimiUser',
      photoURL: user.photoURL ? user.photoURL : 'https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Clip-Art-Transparent-PNG.png',
      biography: 'Do you want to play?',
      rating: 0,

   }).then( result => {

    this.afs.collection(`/users-prof/${user.uid}/ads`).doc("first-ad").set({
      testing: "Correct"
    })

    this.afs.collection(`/users-prof/${user.uid}/ratings`).doc("first-rating").set({
      testing: "Correct"
    })
   })

  }

  updateAgeUserProfile(age:string, userId:any){
    this.compAge(userId).subscribe(doc => {
      if(doc.age == '?'){
        this.afs.collection("users-prof").doc(userId).update({age: age})
      }
    })
  }

  updateBioUserProfile(bio:string, userId:any){
    this.afs.collection("users-prof").doc(userId).update({biography: bio})
  }


  compAge(userId:any):Observable<any>{
    return  this.afs.collection('users-prof').doc(userId).valueChanges()
  }
}
