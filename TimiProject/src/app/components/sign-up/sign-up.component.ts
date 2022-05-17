import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component,  Input,  OnInit,   } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicationVerifier } from 'firebase/auth';
import { UsersService } from 'src/app/shared/services/database/users.service';
import { SwalService } from 'src/app/shared/services/swal.service';
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

  @Input() verifyer: any;

  isOpen = true;
  toggle() {
    this.isOpen = !this.isOpen;
  }

  phoneComp = false;

  reCaptcha: any;


  signUpTitle = 'Introduce tu telefono o correo electrónico'

  method = 'phone'
  nextStepCompleted = false;
  hide=true;

  methodPhoneLabel = 'Teléfono';
  methodEmailLabel = 'E-mail';

  orLabel = 'O';
  GLoginBtnLabel = 'Registrarse con google';
  loginBtnLabel = 'Siguiente';
  privacyPolicyLabel = 'Nuestra política de privacidad'

  emailLabel = 'Correo Electrónico';

  email = new FormControl(sessionStorage.getItem('userEmail'), [Validators.required,
                              Validators.email]);
  emailErrorLabelReq = 'El correo electrónico és obligatório!';
  emailErrorLabelFormat = 'Formato de correo electrónico inválido';

  phoneErrorLabelReq = 'El número de teléfono és obligatório';
  phoneErrorLabelFormat = 'El número de teléfono debe tener 9 dígitos';

  phoneValidation = false;

  phoneform = new FormControl('', [Validators.required]);
  getPhoneErrorMessage(){
    if (this.phoneform.hasError('required')) {
      return 'El número de teléfono és obligatório!'
    }
    else if(this.phoneform.value != 9) {
      return 'Formato del número incorrecto'
    }
    else {
      return '';
    }
  }
  getErrorMessage() {
      if (this.email.hasError('required')) {
        return this.emailErrorLabelReq;
      }else{

        return this.email.hasError('email') ? this.emailErrorLabelFormat : '';
      }
  }


  registerAction() {
    if (this.method == 'phone') {
      if (this.phoneform.valid){
        this.userService.searchUserByPhone(this.phoneform.value).subscribe(doc => {
          if(doc.length == 0){
            this.phoneComp = true;
            this.authService.setNumberOnSs(this.phoneform.value);
            this.authService.signInWithPhone(this.phoneform.value, this.reCaptcha);
          }else{
            if(this.phoneComp == false){
              this.swal.messageErr("Este telefono ya está en uso")
            }
          }
        })
      } else {
        this.swal.messageErr("El teléfono introducido és incorrecto!")
      }
    } else {
      if (this.email.valid) {
        this.userService.searchUserByMail(this.email.value).subscribe(doc => {
          if (doc.length == 0) {
            sessionStorage.setItem('userEmail', this.email.value);
            this.router.navigate(['auth/create-user/'])
          }else{
            this.swal.messageErr("Este email ya está en uso")
          }
        })
        } else {
          this.email.markAsTouched();
       }
    }

  }

  constructor(
    public authService: AuthService,
    public router: Router,
    public userService: UsersService,
    public swal: SwalService
  ) { }
   rec: any;
  ngOnInit() {
    this.phoneform.patchValue(this.authService.NumberOfSs);
    this.reCaptcha = this.authService.reCaptcha;
    console.log(this.authService.reCaptcha)
  }
}
