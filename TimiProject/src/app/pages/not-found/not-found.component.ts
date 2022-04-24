import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  pageNotFoundLabel = 'Página no encontrada!';
  backBtnLabel = 'ATRÁS';
  homeLabel = 'IR AL INICIO';

  constructor() { }

  ngOnInit(): void {
  }

}
