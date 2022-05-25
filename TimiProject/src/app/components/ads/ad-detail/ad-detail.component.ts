import { Component, Input, OnInit } from '@angular/core';
import { AdCard } from 'src/app/models/ads/ad-card';

@Component({
  selector: 'app-ad-detail',
  templateUrl: './ad-detail.component.html',
  styleUrls: ['./ad-detail.component.scss']
})
export class AdDetailComponent implements OnInit {

  @Input() selected:AdCard;

  point = new Array(10).fill('')

  contentLoaded=false;

  // LABELS
  levelLab='Nivel';
  ratingLab = 'Valoración';
  locartionLab='Ubicación';
  platformLab = 'Plataforma';
  ageLab = 'Edad';
  targetLab = 'Objetivo';

  // END LABELS

  constructor() { }

  ngOnInit(): void {
    this.setRating();
    setTimeout(()=>{
      this.contentLoaded=true;
    }, 500);
  }

  setRating(){
    var index = 0;
    this.point.forEach(x => {
      if(index<this.selected.rating) this.point[index]='selected'
      index++;
    });
  }

}
