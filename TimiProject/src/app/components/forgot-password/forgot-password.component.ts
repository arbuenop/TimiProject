import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})

export class ForgotPasswordComponent implements OnInit {

  // Labels
  titleReset = 'Restaurar contraseña';
  instructionsLabel = 'Por favor, Introduce tu correo para solicitar un cambio de contraseña';
  resetBtnLabel = 'Reiniciar contraseña';
  emailLabel = 'Correo electrónico'
  // Error labels
  emailErrorLabelReq = 'El correo electrónico és obligatório!';
  emailErrorLabelFormat = 'Formato de correo electrónico inválido';


  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
      if (this.email.hasError('required')) {
        return this.emailErrorLabelReq;
      }else{

        return this.email.hasError('email') ? this.emailErrorLabelFormat : '';
      }
    }


  constructor(
    public authService: AuthService
  ) { }
  ngOnInit() {
  }
}
