import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SwalService } from 'src/app/shared/services/swal.service';
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
emailLabel = 'Correo Electrónico o Nombre de usuario';
passwdLabel = 'Contraseña';
forgotPasswdLabel='¿Olvidaste tu contraseña?';
loginBtnLabel = 'Iniciar sesión';
GLoginBtnLabel = 'Iniciar Sesión con google';
orLabel = 'O';

// Error Labels
passwdErrorLabelReq = 'La contraseña és obligatória!';
emailErrorLabelReq = 'El correo electrónico o nombre de usuario és obligatório!';
emailErrorLabelFormat = 'Formato de correo electrónico inválido';

// Form controls
  email = new FormControl('', [Validators.required]);
  passwd = new FormControl('', [Validators.required]);

  submit() {
    if (this.email.value.includes('@')) {
      this.authService.SignIn(this.email.value, this.passwd.value)
    } else {

      this.authService.iniciarSessionConUsuario(this.email.value, this.passwd.value);

      setTimeout(() => {
        var user = JSON.parse(localStorage.getItem('user')!);
        if (user != null) this.authService.goDashboard()
        else {
          this.authService.quitLoaderAndSetError();
        }
      }, 1000);
    }

  }

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
    public authService: AuthService,
    public swal: SwalService
  ) { }
  ngOnInit() { }
}
