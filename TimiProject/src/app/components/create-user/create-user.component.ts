import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { confirmPasswordReset } from 'firebase/auth';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsersService } from 'src/app/shared/services/database/users.service';
import { UserSessionService } from 'src/app/shared/services/session/user-session.service';
import { SwalService } from 'src/app/shared/services/swal.service';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  hide=true;
  hideR = true;

  createUserTitle = 'Nuevo usuario'
  passwdTitle = 'Contraseña'

  registerBtnLabel = 'Siguiente';
  privacyPolicyLabel = 'Nuestra política de privacidad'

  email='';

  userNameLabel = 'Crea un nombre de usuario'

  passwdLabel = 'Crea una contraseña';
  repeatPasswdLabel = 'Repite tu contraseña'

  reactiveForm:FormGroup;
  submitted:boolean = false;


  constructor(
    public authService: AuthService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public userService: UsersService,
    public swal: SwalService,
    private formBuilder: FormBuilder,
    private _userSessionService: UserSessionService,
    public db: UsersService
  ) {


    this.reactiveForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required , Validators.minLength(6)]),
      passwordConfirm: new FormControl(null, [Validators.required])
    },{
      validators: this.MustMatch('password','passwordConfirm')
    })
  }


  MustMatch(controlName: string, matchingControlName: string){
    return(formGroup:FormGroup)=>{
      const control = formGroup.controls[controlName]
      const matchingControl = formGroup.controls[matchingControlName];
      if(matchingControl.errors && !matchingControl.errors["MustMatch"]){
        return
      }
      if(control.value !== matchingControl.value){
        matchingControl.setErrors({MustMatch:true})
      }else{
        matchingControl.setErrors(null)
      }
    }
  }

  checkUserName(name: string) {


    this.db.searchUserByName(name)
    .subscribe({
      next(data) {
        if (data[0]) {
          if (data[0].userName === name) {

            console.log('Error con la contraseña...')
            // this.swal.messageErr("Este nombre de usuario ya está en uso")
          }
        }
      },
      error(err) {
        console.log(err)
      }
    })

  }

  send() {
    this.userService.searchUserByName(this.reactiveForm.get('username')?.value).subscribe(doc => {
      if (doc.length == 0) {
        if (!sessionStorage.getItem('userNumber') || sessionStorage.getItem('userNumber') == '') {
          this.authService.SignUp(this.email, this.reactiveForm.get('username')?.value)
        } else {
          this._userSessionService.UserAuthData.userName = this.reactiveForm.get('username')?.value;
          this._userSessionService.UserAuthData.passwd = this.reactiveForm.get('password')?.value;
          this._userSessionService.UserAuthData.uid = sessionStorage.getItem('user-key')

          this._userSessionService.setUserData(this._userSessionService.UserAuthData);
          this._userSessionService.pushToLocalStorage('user-auth-data')
          this.authService.pushUserRegisteredByPhoneToBd();
        }
      }

    })
  }

  sendByEmail() {
    this.userService.searchUserByName(this.reactiveForm.get('username')?.value).subscribe(doc => {
    if (doc.length == 0) {
      if (!sessionStorage.getItem('userEmail') || sessionStorage.getItem('userEmail') == '') {
        this.authService.SignUp(this.email, this.reactiveForm.get('username')?.value)
      } else {
        this._userSessionService.UserAuthData.userName = this.reactiveForm.get('username')?.value;
        this._userSessionService.UserAuthData.passwd = this.reactiveForm.get('password')?.value;
        this._userSessionService.UserAuthData.email = sessionStorage.getItem('userEmail')

        this._userSessionService.setUserData(this._userSessionService.UserAuthData);
        this._userSessionService.pushToLocalStorage('user-auth-data')


        this.authService.SignUp(sessionStorage.getItem('userEmail'), this.reactiveForm.get('password')?.value);
        this.authService.pushUserRegisteredByMailToBd();
      }
    }

  })

  }

  get f (){return this.reactiveForm.controls}

  onSubmit() {
    this.submitted = true;
    if(this.reactiveForm.invalid){
      return ;
    } else {
      if (sessionStorage.getItem('userEmail')&&sessionStorage.getItem('userEmail')!='') {
        this.sendByEmail()

      } else if (sessionStorage.getItem('userNumber')&& sessionStorage.getItem('userNumber')!= '') {
        this.send()
      } else {
        this.sendByEmail()
      }
    }
  }

  ngOnInit(): void {

  }

}


