import { Component, OnInit } from '@angular/core';
import { AdCard } from 'src/app/models/ads/ad-card';
import { AdsService } from 'src/app/shared/services/database/ads.service';

@Component({
  selector: 'app-ad-grid',
  templateUrl: './ad-grid.component.html',
  styleUrls: ['./ad-grid.component.scss']
})
export class AdGridComponent implements OnInit {

  timiProAds:AdCard[];
  timiProAdsSliced:AdCard[][];
  timiUserAds:AdCard[];
  noMoreAdsLab = 'No hay anuncios disponibles...';
  constructor(
    private _addb: AdsService
  ) { }

  ngOnInit(): void {
    this._addb.getTimiUserAds().then( data => data.subscribe(data => this.timiUserAds = data))
    this._addb.getTimiProAds().then( data => data.subscribe(data =>{
      this.timiProAds = data
      const chunkSize = 3;
      this.timiProAdsSliced = new Array(3).map(() => new Array());
      var j = 0;
      for (let i = 0; i < this.timiProAds.length; i += chunkSize) {
          var chunk = this.timiProAds.slice(i, i + chunkSize);
          this.timiProAdsSliced[j]=chunk
          console.log(chunk)
          console.log(j)
          j++;
      }

      console.log(this.timiProAdsSliced)

    }))

  }

  onActiveSlideChange(event:any){
    // alert('Pedir datos')
  }

  getUserAds() {

  }

  getProAds() {

  }

}
