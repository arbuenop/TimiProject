import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

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

  userName = new FormControl('', [Validators.required]);
  passwd = new FormControl('', [Validators.required]);
  passwdErrorLabelReq = 'La contraseña és obligatória!';

  send() {
    this.authService.SignUp(this.email, this.passwd.value)
  }

  constructor(
    public authService: AuthService,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe(route => {
    //   if (route) {
    //     this.email = route['email']
    //   }
    // })
    // if (this.email == '') {
    //   this.router.navigate(['404-not-found'])
    // }

  }

}
