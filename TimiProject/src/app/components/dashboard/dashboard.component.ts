import { Component, OnInit } from '@angular/core';
import { UserAuthModel } from 'src/app/models/user-models/user-auth-model';
import { UserSessionService } from 'src/app/shared/services/session/user-session.service';
import { AuthService } from '../../shared/services/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user: UserAuthModel;
  constructor(public authService: AuthService,
    public session: UserSessionService
  ) { }
  ngOnInit(): void {
    this.session.setUserData(JSON.parse(localStorage.getItem('user')!))
    this.user = this.session.userData
    console.log(localStorage.getItem('user'))
  }

}
