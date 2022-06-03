import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SidenavService } from 'src/app/shared/services/home/sidenav.service';
import { UserSessionService } from 'src/app/shared/services/session/user-session.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  photoUrl = '';
  userName = '';
  uid = '';
  constructor(
    public userSession: UserSessionService,
    public authService: AuthService,
    public sidenav:SidenavService,
    public router:Router
  ) { }

  ngOnInit(): void {
    this.setUserData();
  }
logout(){
  this.authService.SignOut();
  this.sidenav.toogle();
}
  setUserData(){
    this.userSession.setLoginUserData(JSON.parse(localStorage.getItem('user')!))
    this.photoUrl=this.userSession.LoginUserData.photoURL
    this.userName=this.userSession.LoginUserData.displayName
    this.uid=this.userSession.LoginUserData.uid
  }
  goUserChats(){
    this.router.navigate(['home/chats', this.uid]);
  }

}
