import { Component, OnInit } from '@angular/core';
import { ChildrenOutletContexts, Router, RouterOutlet } from '@angular/router';
import { authAnimations } from 'src/app/animations/auth-animations';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Location } from '@angular/common';
import { SwalService } from 'src/app/shared/services/swal.service';


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
    // deleteUserInfoSwal()
    var sure = false;
    if(window.location.href.includes('create-user')){
      sure = this._swal.deleteUserInfoSwal();
    }
    console.log( window.location.href)

    if(!sure) this.location.back()
  }
  constructor(
    public authService: AuthService,
    private router: Router,
    private contexts: ChildrenOutletContexts,
    private location: Location,
    private _swal: SwalService
  ) { }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
  ngOnInit(): void {

    this.authService.checkReCaptcha();
    this.authService.isLoading().subscribe((value) => {
      this.showSpinner = value;
    });
  }
}
