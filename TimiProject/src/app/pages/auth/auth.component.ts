import { Component, OnInit } from '@angular/core';
import { ChildrenOutletContexts, Router, RouterOutlet } from '@angular/router';
import { authAnimations } from 'src/app/animations/auth-animations';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [authAnimations],
})




export class AuthComponent implements OnInit {
  backBtnLabel = 'Atrás';
  public showSpinner:any;

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

  back(): void {
    this.location.back()
  }
  constructor(
    public authService: AuthService,
    private router: Router,
    private contexts: ChildrenOutletContexts,
    private location: Location
  ) { }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
  ngOnInit(): void {
    this.authService.isLoading().subscribe((value) => {
      this.showSpinner = value;
    });
  }

}
