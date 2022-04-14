import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})

export class SignUpComponent implements OnInit {

signUpTitle = 'Introduce tu telefono o correo electrónico'

  method = 'phone'
  nextStepCompleted = false;
  hide=true;

  methodPhoneLabel = 'Teléfono';
  methodEmailLabel = 'Correo electrónico';

  orLabel = 'O';
  GLoginBtnLabel = 'Registrarse con google';
  loginBtnLabel = 'Siguiente';
  privacyPolicyLabel = 'Nuestra política de privacidad'

  emailLabel = 'Correo Electrónico';
  passwdLabel = 'Contraseña';

  email = new FormControl('', [Validators.required, Validators.email]);
  emailErrorLabelReq = 'El correo electrónico és obligatório!';
  emailErrorLabelFormat = 'Formato de correo electrónico inválido';

  passwd = new FormControl('', [Validators.required]);
  passwdErrorLabelReq = 'La contraseña és obligatória!';

  getErrorMessage(variable:number) {
    if(variable == 0){
      if (this.email.hasError('required')) {
        return this.emailErrorLabelReq;
      }else{

        return this.email.hasError('email') ? this.emailErrorLabelFormat : '';
      }
    }else {
      if (this.passwd.hasError('required')) {
        return this.passwdErrorLabelReq;
      }
      return this.passwd.hasError('passwd') ? this.passwdErrorLabelReq : '';
    }
}
  registerAction() {
    if (this.method == 'phone') {

      // Action if register goes by phone (develop)
      alert('you clicked register by phone')

    } else {
      if (this.nextStepCompleted) {
        this.authService.SignUp(this.email.value, this.passwd.value)
      } else {
        if (this.email.valid) {
          this.nextStepCompleted = true;
        } else {
          this.email.markAsTouched();
        }
      }
    }

  }

  constructor(
    public authService: AuthService
  ) { }
  ngOnInit() { }
}
