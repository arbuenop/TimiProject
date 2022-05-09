import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CodeInputComponent } from '../code-input/code-input.component';

@Component({
  selector: 'app-verify-number',
  templateUrl: './verify-number.component.html',
  styleUrls: ['./verify-number.component.scss']
})
export class VerifyNumberComponent implements OnInit {

  verifyNumberTitle = 'Introduce el código de confirmación';
  verifyNumberSubTitle = '6 dígitos';
  nextLabel = 'Siguiente';
  privacyPolicyLabel = 'Nuestra política de privacidad';


  verify(event:any) {
    this.authService.verifyLoginCode(event);
  }

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
