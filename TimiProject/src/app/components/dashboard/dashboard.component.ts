import { Component, OnInit } from '@angular/core';
import { UserAuthModel } from 'src/app/models/user-models/user-auth-model';
import { UserSessionService } from 'src/app/shared/services/session/user-session.service';
import { User } from 'src/app/shared/services/user';
import { AuthService } from '../../shared/services/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user: User;
  constructor(public authService: AuthService,
    public session: UserSessionService
  ) { }
  ngOnInit(): void {
    this.user = this.session.user
  }

}
