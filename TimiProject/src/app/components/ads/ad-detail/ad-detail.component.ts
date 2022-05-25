import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ad-detail',
  templateUrl: './ad-detail.component.html',
  styleUrls: ['./ad-detail.component.scss']
})
export class AdDetailComponent implements OnInit {
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

    setTimeout(()=>{
      this.contentLoaded=true;
    }, 500);
  }

}
