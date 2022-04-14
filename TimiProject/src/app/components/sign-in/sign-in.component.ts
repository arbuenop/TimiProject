import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})

export class SignInComponent implements OnInit {

signInTitle = 'Tu cuenta';
hide=true;

// Labels
hidePasswdLabel = 'Ocultar contraseña';
emailLabel = 'Correo Electrónico';
passwdLabel = 'Contraseña';
forgotPasswdLabel='¿Olvidaste tu contraseña?';
loginBtnLabel = 'Iniciar sesión';
GLoginBtnLabel = 'Iniciar Sesión con google';
orLabel = 'O';

// Error Labels
passwdErrorLabelReq = 'La contraseña és obligatória!';
emailErrorLabelReq = 'El correo electrónico és obligatório!';
emailErrorLabelFormat = 'Formato de correo electrónico inválido';

// Form controls
  email = new FormControl('', [Validators.required, Validators.email]);
  passwd = new FormControl('', [Validators.required]);

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
  constructor(
    public authService: AuthService
  ) { }
  ngOnInit() { }
}
