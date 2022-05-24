import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { AdCard } from 'src/app/models/ads/ad-card';

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
    const collection = this.afs.collection<AdCard>('ads', ref => ref.where('pro', '==', false))
    const user$ = collection
      .valueChanges()
      .pipe(
        map(users => {
          return users;
        })
      );
    return user$;
  }


}


