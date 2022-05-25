import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { AdCard } from 'src/app/models/ads/ad-card';
import { AdDetails } from 'src/app/models/ads/ad-details';

@Injectable({
  providedIn: 'root'
})
export class AdsService {

  timiTestAd:AdCard;


  constructor(
    public afs: AngularFirestore,
    ) { }

  async getTimiUserAds() {
    const collection = this.afs.collection<AdCard>('ads', ref => ref.where('pro', '==', false))
    const user$ = collection
      .valueChanges()
      .pipe(
        map(users => {
          return users as AdCard[];
        })
      );
    return user$;
  }

  async getTimiProAds() {
    const collection = this.afs.collection<AdCard>('ads', ref => ref.where('pro', '==', true))
    const user$ = collection
      .valueChanges()
      .pipe(
        map(users => {
          return users;
        })
      );
    return user$;
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

  createAd(adData:AdCard){
    this.afs
    .collection("ads")
    .doc().set(adData)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  }



  async getDetails(uid:string){


    const collection = this.afs.collection('ads', ref => ref.where('uid', '==', uid))
    const ad = this.afs.collection('ads').doc(uid).collection<AdDetails>('ad-details')
    const ad$ = ad
      .valueChanges()
      .pipe(
        map(details => {
          return details[0];
        })
      );
    return ad$;
  }
}


