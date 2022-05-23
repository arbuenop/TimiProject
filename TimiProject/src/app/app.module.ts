import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Firebase imports
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
// End Firebase imports

import { AuthService } from "./shared/services/auth.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthComponent } from './pages/auth/auth.component';
import { InitAuthComponent } from './components/init-auth/init-auth.component';
import { MaterialModule } from './imports/material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoadingSpinnerComponent } from './components/ui/loading-spinner/loading-spinner.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { VerifyNumberComponent } from './components/verify-number/verify-number.component';
import { NgxMatIntlTelInputModule } from 'ngx-mat-intl-tel-input';
import { CodeInputComponent } from './components/code-input/code-input.component';
import { HomeComponent } from './pages/home/home.component';
import { TopBarComponent } from './components/shared/top-bar/top-bar.component';
import { SideNavComponent } from './components/shared/side-nav/side-nav.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { FilterPageComponent } from './pages/filter-page/filter-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HomeComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    AuthComponent,
    InitAuthComponent,
    LoadingSpinnerComponent,
    NotFoundComponent,
    CreateUserComponent,
    VerifyNumberComponent,
    CodeInputComponent,
    HomeComponent,
    TopBarComponent,
    SideNavComponent,
    SettingsComponent
    FilterPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    // Firebase Imports
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    // End Firebase Imports
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatIntlTelInputModule,
    FontAwesomeModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
