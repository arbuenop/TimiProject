import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserSessionService } from 'src/app/shared/services/session/user-session.service';
import { CodeInputComponent } from '../code-input/code-input.component';

@Component({
  selector: 'app-verify-number',
  templateUrl: './verify-number.component.html',
  styleUrls: ['./verify-number.component.scss']
})
export class VerifyNumberComponent implements OnInit {

  verifyNumberTitle = 'Introduce el código de confirmación';
  verifyNumberSubTitle = '6 dígitos';
  nextLabel = 'Reenviar código';
  privacyPolicyLabel = 'Nuestra política de privacidad';


  verify(event:any) {
    this.authService.verifyLoginCode(event);
  }
  resend() {
    this.authService.signInWithPhone(this.authService.NumberOfSs, this.authService.reCaptchaVerifyer);
  }
  constructor(
    public authService: AuthService,
    private _userSessionService: UserSessionService
  ) { }

  ngOnInit(): void {
    this._userSessionService.UserAuthData.phoneNumber = this.authService.NumberOfSs;
    this._userSessionService.setUserData(this._userSessionService.UserAuthData);
    this._userSessionService.pushToLocalStorage('user-auth-data')
  }

}
