import { Component, OnInit } from '@angular/core';
import { fade, showDetailsAnimation,  } from 'src/app/animations/auth-animations';
import { AdCard } from 'src/app/models/ads/ad-card';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AdsService } from 'src/app/shared/services/database/ads.service';

@Component({
  selector: 'app-ad-grid',
  templateUrl: './ad-grid.component.html',
  styleUrls: ['./ad-grid.component.scss'],
  animations:[showDetailsAnimation, fade, ]
})
export class AdGridComponent implements OnInit {

  detailsToogled = true;
  usersLoaded:boolean;
  proLoaded:boolean;
  skeletonUserCount = new Array(6).fill(0);
  skeletonProCount= new Array(3).fill(0);

  detail:AdCard = {
    uid: '0',
    userName: 'ExampleUser',
    level: 0,
    rating: 0,
    pro: true,
    status: false,
    // image: '../../../../assets/images/image-document.svg'
    image: 'https://opgg-static.akamaized.net/meta/images/lol/1204/champion/tiles/MasterYi_0.jpg'
  }

  timiProAds:AdCard[];
  timiProAdsSliced:AdCard[][];
  timiUserAds:AdCard[];
  noMoreAdsLab = 'No hay anuncios disponibles...';
  constructor(
    private _addb: AdsService,
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
    this._auth.setStateLoading(false);

  this.usersLoaded=false;
  this.proLoaded = false;
    this._addb.getTimiUserAds().then( data => data.subscribe(data => {this.timiUserAds = data; this.usersLoaded=true}))

    this._addb.getTimiProAds().then( data => data.subscribe(data =>{
      this.timiProAds = data
      const chunkSize = 3;
      this.timiProAdsSliced = new Array(3).map(() => new Array());
      var j = 0;
      for (let i = 0; i < this.timiProAds.length; i += chunkSize) {
          var chunk = this.timiProAds.slice(i, i + chunkSize);
          this.timiProAdsSliced[j]=chunk
          j++;
      }this.proLoaded=true
    }))
  }

  onActiveSlideChange(event:any){
    // alert('Pedir datos')
  }

  getUserAds() {

  }

  getProAds() {

  }
  onClickAd(selected:AdCard){
    this.detail=selected;
    this.detailsToogled=true
  }

}
