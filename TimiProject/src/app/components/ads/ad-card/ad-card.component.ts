import { Component, Input, OnInit } from '@angular/core';
import { AdCard } from 'src/app/models/ads/ad-card';

@Component({
  selector: 'app-ad-card',
  templateUrl: './ad-card.component.html',
  styleUrls: ['./ad-card.component.scss']
})
export class AdCardComponent implements OnInit {

  @Input() timiAd:AdCard = {
    uid: -1,
    userName: 'ExampleUser',
    level: 0,
    rating: 0,
    pro: false,
    status: false,
    image: '../../../../assets/images/image-document.svg'
  };

  imageClass = 'ad-image';

  constructor() { }

  ngOnInit(): void {
    if(this.timiAd.image==='../../../../assets/images/image-document.svg') this.imageClass = 'image-error';
  }
  ratingCounter(i: number) {
    return new Array(i);
  }



}
