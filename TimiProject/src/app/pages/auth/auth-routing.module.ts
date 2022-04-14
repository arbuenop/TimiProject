import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from 'src/app/components/forgot-password/forgot-password.component';
import { InitAuthComponent } from 'src/app/components/init-auth/init-auth.component';
import { SignInComponent } from 'src/app/components/sign-in/sign-in.component';
import { SignUpComponent } from 'src/app/components/sign-up/sign-up.component';
import { VerifyEmailComponent } from 'src/app/components/verify-email/verify-email.component';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  { path: '', component: AuthComponent, children:[
    { path: 'init', component: InitAuthComponent, data: { animation: 'init' }},
    { path: 'sign-in', component: SignInComponent, data: { animation: 'login' }},
    { path: 'register-user', component: SignUpComponent, data: { animation: 'register' }},
    { path: 'forgot-password', component: ForgotPasswordComponent , data: { animation: 'forgotPasswd' }},
    { path: 'verify-email-address', component: VerifyEmailComponent, data: { animation: 'verifyEmail' }},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
