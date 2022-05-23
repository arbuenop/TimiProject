import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SidenavService } from 'src/app/shared/services/home/sidenav.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public showSpinner:any;
  opened:any;

  constructor(
    public authService: AuthService,
    public sidenav: SidenavService
    ) {
      this.sidenav.isOpened().subscribe((value) => {
        this.opened = value;
      });
      this.sidenav.close();
    }

  ngOnInit(): void {
    this.authService.isLoading().subscribe((value) => {
      this.showSpinner = value;
    });
  }

}
