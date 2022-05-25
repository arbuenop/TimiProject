import { Time } from '@angular/common';
import { identifierName } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { AdCard } from 'src/app/models/ads/ad-card';
import { AdDetails } from 'src/app/models/ads/ad-details';
import { AdsService } from 'src/app/shared/services/database/ads.service';

@Component({
  selector: 'app-ad-detail',
  templateUrl: './ad-detail.component.html',
  styleUrls: ['./ad-detail.component.scss']
})
export class AdDetailComponent implements OnInit {

  @Input() selected:AdCard;

  description='';

  // ICON LISTS
  iconList = {"pc":"../../../../assets/icons/mouse-icon.svg",
          "xbox":"../../../../assets/icons/xbox-icon.svg",
          "ps":"../../../../assets/icons/playstation-icon.svg",
          "other":"../../../../assets/icons/other-icon.svg"};


  // END ICON LISTS


  target =this.iconList["other"];
  icon=this.iconList["other"];

  details:AdDetails= {
    uid: '-1',
    userRef:'',
    description: '',
    competitive: undefined,
    platform: 'other',
    country: '???',
    city: '???',
    age: Timestamp.now()
  };

  descriptionCollapsed = false;

  point = new Array(10).fill('')

  contentLoaded=false;

  userAge = '??'
  hasDescription = false;



  gameImg1 = 'https://i.blogs.es/5f2c41/1/840_560.jpg'
  gameImg2 = 'https://cdn2.unrealengine.com/14br-consoles-1920x1080-wlogo-1920x1080-432974386.jpg'
  gameImg3 = 'https://media.vandal.net/i/1080x1080/10-2020/202010416234149_1.jpg'

  // LABELS
  levelLab='Nivel';
  ratingLab = 'Valoración';
  locartionLab='Ubicación';
  platformLab = 'Plataforma';
  ageLab = 'Edad';
  targetLab = 'Objetivo';
  descriptionLab = 'Descripción...';
  mostPlayedLab = 'Títulos más jugados'
  // END LABELS

  arrow = 'expand_more';
  arrowD = 'expand_less';
  arrowC = 'expand_more'

  constructor(
    private _db: AdsService,
  ) { }

  ngOnInit(): void {
    this.setRating();

    this._db.getDetails(this.selected.uid)
    .then( data =>
      data.subscribe(data => {
        if(data) {
          this.details=data;
          this.userAge= this.getAge(data.age)
          this.icon=this.getPlatformSrc(data.platform)
          if(data.competitive) this.target='../../../../assets/icons/competitive-icon.svg'
          else this.target='../../../../assets/icons/friendly-icon.svg'
          if(data.description){
            this.hasDescription=true;
            this.description = data.description
          }
        }
        this.contentLoaded=true;
      })
    );
    this.arrow=this.arrowC

  }

  toogleArrow(collapsed:boolean){
    if(!collapsed) this.arrow=this.arrowC;
    else this.arrow = this.arrowD;
  }

  getPlatformSrc(p:string){
    switch(p){
      case 'pc': return this.iconList["pc"]
      case 'xbox': return this.iconList["xbox"]
      case 'ps': return this.iconList["ps"]
      default: return this.iconList["other"]
    }
  }

  getAge(birth:Timestamp){
    var today = new Date();
    var birthDate = birth.toDate();
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age.toString()

  }

  setRating(){
    var index = 0;
    this.point.forEach(x => {
      if(index<this.selected.rating) this.point[index]='selected'
      index++;
    });
  }

}
