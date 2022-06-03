import { Component, OnInit } from '@angular/core';
import { ChildrenOutletContexts, Router, RouterOutlet } from '@angular/router';
import { authAnimations } from 'src/app/animations/auth-animations';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Location } from '@angular/common';
import { SwalService } from 'src/app/shared/services/swal.service';
import { HomeComponent } from '../home/home.component';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [authAnimations]
})




export class AuthComponent implements OnInit {
  backBtnLabel = 'Atrás';
  public showSpinner:any;
  windowRef: any;
  recap: any;

  /**
   * Check if the router url contains the specified route
   *
   * @param {string} route
   * @returns
   * @memberof MyComponent
   */
   hasRoute(route: string) {
    return this.router.url.includes(route);
  }
  prueba = 'hola';
  back(): void {
    if(window.location.href.includes('create-user')){
       this._swal.deleteUserInfoSwal();
    } else {
      this.location.back()
    }

  }
  constructor(
    public authService: AuthService,
    private router: Router,
    private contexts: ChildrenOutletContexts,
    private location: Location,
    private _swal: SwalService,
    private _home:HomeComponent
  ) { }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
  ngOnInit(): void {
    this._home.pause();
    this.authService.checkReCaptcha();
    this.authService.isLoading().subscribe((value) => {
      this.showSpinner = value;
    });
  }
}
