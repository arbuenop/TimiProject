import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

// route guard
import { AuthGuard } from './shared/guard/auth.guard';
import { AuthComponent } from './pages/auth/auth.component';
import { loadavg } from 'os';
import { AuthRoutingModule } from './pages/auth/auth-routing.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { SettingsComponent } from './pages/settings/settings.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo:'home'},
  { path: 'not-found', component: NotFoundComponent },
  { path: 'auth', loadChildren: () => import('./pages/auth/auth-routing.module').then(m=>m.AuthRoutingModule)},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: '404-not-found', component: NotFoundComponent },
  { path: '**', redirectTo:'404-not-found', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
