import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CreateUserGuardGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router
  ){ }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!sessionStorage.getItem('user-key')) {
      if(sessionStorage.getItem('userNumber')){
        this.router.navigate(['/auth/verify-phone-number'])
      } else if (sessionStorage.getItem('userEmail')) {
        return true;
      } else {
        this.router.navigate(['/auth/register-user'])
      }
    }
    return true;
  }

}
