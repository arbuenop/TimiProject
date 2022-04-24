import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CompUsersService {

  emailComp(email:string){
    console.log(email)
    /*In progress*/
    console.log(this.afs.collection)
  }
  constructor(
    public afs: AngularFirestore
  ) { }
}
