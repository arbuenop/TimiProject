import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  constructor(
    private location: Location) { }
  back(): void {
    if(window.location.href.includes('create-user')){
    } else {
      this.location.back()
    }

  }
  ngOnInit(): void {
  }

}
