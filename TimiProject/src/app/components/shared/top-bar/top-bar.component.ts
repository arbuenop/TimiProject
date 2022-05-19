import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { SidenavService } from 'src/app/shared/services/home/sidenav.service';


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  searchBarLabel = 'Buscar...';

  constructor(
    private location: Location,
    public sidenav: SidenavService
    ) { }
  back(): void {
    if(window.location.href.includes('create-user')){
    } else {
      this.location.back()
    }

  }
  ngOnInit(): void {
  }

}
