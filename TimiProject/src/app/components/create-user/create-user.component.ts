import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { confirmPasswordReset } from 'firebase/auth';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsersService } from 'src/app/shared/services/database/users.service';
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
    private formBuilder: FormBuilder
  ) {


    this.reactiveForm = this.formBuilder.group({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required , Validators.minLength(6)]),
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

  send() {
    this.userService.searchUserByName(this.reactiveForm.get('username')?.value).subscribe(doc => {
      if(doc.length == 0){
        this.authService.SignUp(this.email, this.reactiveForm.get('username')?.value)
      }else{
        this.swal.messageErr("Este nombre de usuario ya está en uso")
      }
    })
  }
  get f (){return this.reactiveForm.controls}

  onSubmit() {
    this.submitted = true;
    if(this.reactiveForm.invalid){
      return ;
    }else{
      this.send()
    }
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(route => {
      if (route) {
        this.email = route['email']
      }
    })
    if (this.email == '') {
      this.router.navigate(['404-not-found'])
    }

  }

}


