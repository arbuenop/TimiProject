import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SidenavService } from 'src/app/shared/services/home/sidenav.service';
import { ProfileService } from 'src/app/shared/services/profile/profile.service';
import { UserConfigService } from 'src/app/shared/services/config/user-config.service';
import { setTimeout } from 'timers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public showSpinner:any;
  opened:any;

  constructor(
    public authService: AuthService,
    public sidenav: SidenavService,
    public profileService: ProfileService,
    public router: Router,
    public userConfig: UserConfigService
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
    this.profileService.getUserProfile()
    this.userConfig.getUserConfig()
  }

  hasRoute(route:string) {
    return this.router.url.includes(route);
  }

}
