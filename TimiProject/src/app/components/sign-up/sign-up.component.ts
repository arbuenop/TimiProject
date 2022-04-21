import { animate, animateChild, group, query, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecaptchaVerifier } from 'firebase/auth';
import { bufferToggle } from 'rxjs';
import { authAnimations } from 'src/app/animations/auth-animations';
import { AuthService } from "../../shared/services/auth.service";
import * as auth from 'firebase/auth';

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

  email = new FormControl('', [Validators.required, Validators.email]);
  emailErrorLabelReq = 'El correo electrónico és obligatório!';
  emailErrorLabelFormat = 'Formato de correo electrónico inválido';

  getErrorMessage() {
      if (this.email.hasError('required')) {
        return this.emailErrorLabelReq;
      }else{

        return this.email.hasError('email') ? this.emailErrorLabelFormat : '';
      }
}
  registerAction() {
    if (this.method == 'phone') {

      // Action if register goes by phone (develop)
      alert('you clicked register by phone')

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
  ngOnInit() {



    // var rec = new RecaptchaVerifier('sign-up-button', {
    //   'size': 'invisible',
    // }, auth.getAuth());
    // console.log(rec)
    // rec.verify()
    // rec.render()
    // this.authService.windowRef.recaptchaVerifier = rec;
  }
}
