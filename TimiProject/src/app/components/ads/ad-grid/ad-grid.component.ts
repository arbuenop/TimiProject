import { Component, OnInit } from '@angular/core';
import { AdCard } from 'src/app/models/ads/ad-card';
import { AdsService } from 'src/app/shared/services/database/ads.service';

@Component({
  selector: 'app-ad-grid',
  templateUrl: './ad-grid.component.html',
  styleUrls: ['./ad-grid.component.scss']
})
export class AdGridComponent implements OnInit {


  timiUserAds:AdCard[];

  constructor(
    private _addb: AdsService
  ) { }

  ngOnInit(): void {
    this._addb.getTimiUserAds().then( data => data.subscribe(data => this.timiUserAds = data))


  }

  onActiveSlideChange(event:any){
    // alert('Pedir datos')
  }

  getUserAds() {

  }

  getProAds() {

  }

}
