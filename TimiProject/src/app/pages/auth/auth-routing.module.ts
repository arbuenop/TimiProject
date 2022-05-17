import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from 'src/app/components/create-user/create-user.component';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from 'src/app/components/forgot-password/forgot-password.component';
import { InitAuthComponent } from 'src/app/components/init-auth/init-auth.component';
import { SignInComponent } from 'src/app/components/sign-in/sign-in.component';
import { SignUpComponent } from 'src/app/components/sign-up/sign-up.component';
import { VerifyEmailComponent } from 'src/app/components/verify-email/verify-email.component';
import { VerifyNumberComponent } from 'src/app/components/verify-number/verify-number.component';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';
import { CreateUserGuardGuard } from 'src/app/shared/guard/create-user-guard.guard';
import { VerifyIdentityGuard } from 'src/app/shared/guard/verify-identity.guard';
import { NotFoundComponent } from '../not-found/not-found.component';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  { path: '', component: AuthComponent, redirectTo:'init' },
  {
    path: '', component: AuthComponent, children: [
      { path: 'init', component: InitAuthComponent, data: { animation: 'init' } },
      { path: 'sign-in', component: SignInComponent, data: { animation: 'login' } },
      { path: 'register-user', component: SignUpComponent, data: { animation: 'register' } },
      { path: 'forgot-password', component: ForgotPasswordComponent, data: { animation: 'forgotPasswd' } },
      { path: 'verify-email-address', component: VerifyEmailComponent, data: { animation: 'verifyEmail' } },
      { path: 'verify-phone-number', component: VerifyNumberComponent, data: { animation: 'verifyNumber' }, canActivate: [VerifyIdentityGuard]  },
      { path: 'create-user', component: CreateUserComponent, data: { animation: 'createUser' } , canActivate: [CreateUserGuardGuard] },
      { path: 'create-user/**', component: CreateUserComponent, data: { animation: 'createUser' }, canActivate: [CreateUserGuardGuard] },
    ],
  },
    { path: '404-not-found', component: NotFoundComponent },
    { path: '/**', component: NotFoundComponent, pathMatch: 'full', redirectTo:'init'},
    { path: '**', component: NotFoundComponent, pathMatch: 'full', redirectTo:'init' },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
