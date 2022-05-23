import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { SidenavService } from 'src/app/shared/services/home/sidenav.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  searchBarLabel = 'Buscar...';
  @Input() search = false;
  timiTitleClass='';
  headerClass = 'default-header';

  constructor(
    private location: Location,
    public sidenav: SidenavService,
    public router: Router
    ) { }
  back(): void {
    if(window.location.href.includes('create-user')){
    } else {
      this.location.back()
    }

  }
  hasRoute(route: string) {
    return this.router.url.includes(route);
  }
  ngOnInit(): void {
    if (this.search) {
      this.timiTitleClass = 'timiTitleSearch'
      this.headerClass = 'search-header'
    }else{
      this.timiTitleClass = ''
      this.headerClass = 'default-header'
    }
  }

}
