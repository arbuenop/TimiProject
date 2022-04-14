import { Component, OnInit } from '@angular/core';
import { ChildrenOutletContexts, Router, RouterOutlet } from '@angular/router';
import { authAnimations } from 'src/app/animations/auth-animations';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [authAnimations],
})




export class AuthComponent implements OnInit {
  backBtnLabel = 'Atrás';

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

  constructor(
    private router: Router,
    private contexts: ChildrenOutletContexts
  ) { }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
  ngOnInit(): void {
  }

}
