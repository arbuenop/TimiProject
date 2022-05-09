import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/database/users.service';

@Injectable({
  providedIn: 'root'
})
export class VerifyIdentityGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router,
    public db: UsersService
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.NumberOfSs == ''|| !this.authService.NumberOfSs) {
      this.router.navigate(['/auth/register-user'])
    }
    // if (this.db.serchUserByPhone(sessionStorage.getItem('userNumber'))) {
    //   this.router.navigate(['/auth/create-user'])
    // }
    return true;
  }

}
