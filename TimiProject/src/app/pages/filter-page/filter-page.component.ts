import { Component, OnInit } from '@angular/core';
import { faCoffee, faCrown, faUserGroup } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-filter-page',
  templateUrl: './filter-page.component.html',
  styleUrls: ['./filter-page.component.scss']
})
export class FilterPageComponent implements OnInit {


  faCrown = faCrown;
  faUsers = faUserGroup;
  // LABELS
  recentlySearchLab = 'BUSCADO RECIENTEMENTE';
  platformSelectLab = 'Tipo de plataforma';
  targetLab = 'Objetivo';
  levelLab = 'Nivel';
  ageLab = 'Edad';
  locationLab = 'Ubicación';
  ratingLab = 'Valoración';
  ratingAdvert = '*La valoración no tiene porqué corresponderse con la experiéncia de juego de cada usuario.';
  subscriptionLab = 'Tipo de jugador';
  // END LABELS

  recentSearches=false;


  constructor() { }

  ngOnInit(): void {
  }

}
