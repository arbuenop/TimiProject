import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Idle } from 'idlejs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsersService } from 'src/app/shared/services/database/users.service';
import { SidenavService } from 'src/app/shared/services/home/sidenav.service';
import { ProfileService } from 'src/app/shared/services/profile/profile.service';
import { SwalService } from 'src/app/shared/services/swal.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public showSpinner:any;
  opened:any;

  idle = new Idle()
    .whenNotInteractive()
    .within(20)
    .do(() => {
      this.authService.SignOut();
      this.pause();
      this.swal.messageInf('Aviso', 'Se te ha cerrado la sesión por Inactividad.')
    })
    .start();

  constructor(
    public authService: AuthService,
    public sidenav: SidenavService,
    public profileService: ProfileService,
    public router: Router,
    public swal:SwalService,
    public db: UsersService
    ) {
      this.sidenav.isOpened().subscribe((value) => {
        this.opened = value;
      });
      this.sidenav.close();

      document.addEventListener("visibilitychange", function() {
        if (document.hidden) {
          //do whatever you want

          console.log("Hidden");

        }
        else {
          //do whatever you want
          console.log("SHOWN");
        }
      });
    }

  ngOnInit(): void {
    this.authService.isLoading().subscribe((value) => {
      this.showSpinner = value;
    });
    this.profileService.getUserProfile();
    this.play();
  }

  hasRoute(route:string) {
    return this.router.url.includes(route);
  }


  pause(){
    this.idle.stop();
  }

  play(){
    this.idle.restart();
  }

}
