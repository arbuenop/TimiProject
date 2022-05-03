import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component,  OnInit,   } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicationVerifier } from 'firebase/auth';
import { AuthService } from "../../shared/services/auth.service";

//ESTO ES UN PRUEBA

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('mail', style({
        opacity: 1,
      })),
      state('phone', style({
        opacity: 1,
      })),
      transition('mail => phone', [
        style({
          opacity: 0,
        }),
        animate('.2s')
      ]),
      transition('phone => mail', [
        style({
          opacity: 0,
        }),
        animate('0.2s')
      ]),
  ])],
})
export class SignUpComponent implements OnInit {
  isOpen = true;
  toggle() {
    this.isOpen = !this.isOpen;
  }

  reCaptcha: any;


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

  email = new FormControl('', [Validators.required,
                              Validators.email]);
  emailErrorLabelReq = 'El correo electrónico és obligatório!';
  emailErrorLabelFormat = 'Formato de correo electrónico inválido';

  phoneErrorLabelReq = 'El número de teléfono és obligatório';
  phoneErrorLabelFormat = 'El número de teléfono debe tener 9 dígitos';


  phoneform = new FormControl('', [Validators.required]
                                  );

  getErrorMessage() {
      if (this.email.hasError('required')) {
        return this.emailErrorLabelReq;
      }else{

        return this.email.hasError('email') ? this.emailErrorLabelFormat : '';
      }
  }


  registerAction() {
    if (this.method == 'phone') {
      this.authService.signInWithPhone(this.phoneform.value, this.rec);
    } else {
      if (this.email.valid) {
        this.router.navigate(['auth/create-user/'+this.email.value])
        } else {
          this.email.markAsTouched();
       }
    }

  }

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }
   rec: any;
  ngOnInit() {

    this.rec = this.authService.reCaptcha().then((x) => {
       this.rec=x
     })
  }
}
