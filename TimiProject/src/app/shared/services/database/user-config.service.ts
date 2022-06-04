import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigDbService {

  constructor(
    public afs: AngularFirestore,
  ) { }

  searchUserConfigByUid(uid:any):Observable<any>{
    return  this.afs.collection('users-config').doc(uid).valueChanges()
  }

  pushUserConfigToDb(user: any) {
    this.afs.collection("users-config").doc(user.uid).set({
      notifications: true,
      language: 'esp',
      usersLanguage: 'esp',
   })
  }

  updateConfigUserProfile(userConf:any, userId:string):any{
    console.log(userConf.notifications)
    console.log(userId)
    this.afs.collection("users-config").doc(userId).update({
      language: userConf.language,
      notifications: userConf.notifications,
      usersLanguage: userConf.usersLanguage
    })
    return
  }

  updateNotifications(mode:boolean, userId:any){
    this.afs.collection("users-config").doc(userId).update({notifications: mode})
  }


  compAge(userId:any):Observable<any>{
    return  this.afs.collection('users-prof').doc(userId).valueChanges()
  }
}
