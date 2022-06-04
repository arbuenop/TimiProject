import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { moveSectionLeftAnimation, settingsAnimations } from 'src/app/animations/auth-animations';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Location } from '@angular/common';
import { ConfigSessionService } from 'src/app/shared/services/session/user-config.service';
import { ElementRef, ViewChild } from '@angular/core'
import { ConfigDbService } from 'src/app/shared/services/database/user-config.service';
import { UsersService } from 'src/app/shared/services/database/users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  animations: [settingsAnimations, moveSectionLeftAnimation]
})
export class SettingsComponent implements OnInit {
  mainClass =''
  isLangOpened=false;
  //Idioma de la cuenta
  languageClass='hidden'
  languageDespClass='langs-hidded'
  //Idioma de los jugadores
  languagePlayersClass='hidden'
  languagePlayersDespClass='langs-hidded'
  // LABELS
  settingsLab = 'Configuración';
  backBtnLabel = 'Atrás';
  notificationsLab = 'Notificaciones';
  languageLab = 'Idioma';
  privacyPolicyLab = 'Política de privacidad';
  closeSessionLab = 'Cerrar sesión';
  removeAccountLab = 'Eliminar cuenta';
  yesLab = 'Sí';
  noLab = 'No';
  accountLangLab = 'Idioma de la cuenta';
  playerLangLab = 'Idioma de los jugadores'
  // END LABELS
  color: ThemePalette = 'accent';
  checked = true;
  disabled = false;

  //User config info
  config = {
    notifications:false,
    language:"",
    usersLanguage:""
  }

  //User Selection
  langSelected = ""
  notificationsSelected = false
  langPlayerSelected = ""
  //Update
  update = false
  constructor(
    private authService: AuthService,
    public location: Location,
    public sessionService: ConfigSessionService,
    public dbService: ConfigDbService,
    public userService: UsersService,
    public router: Router
  ) { }



  select(){
    if(this.notificationsSelected){
      this.notificationsSelected = false
    }
    else{
      this.notificationsSelected = true
    }

  this.toogleSaveBtn()
}

  toogleLanguage(){
    if(!this.isLangOpened){
      this.mainClass='hide-left'
      this.languageClass = 'show-up'
      this.isLangOpened=true;
    }else {
      this.mainClass='show-right'
      if(this.languageClass == 'show-mid'){
        this.languageClass = 'hide-down hidden-back'
        this.isLangOpened=false;
      }else{
        this.languageClass = 'hide-down hidden'
        this.isLangOpened=false;
      }

    }
  }

  toogleLangs(div:number){
    if(div == 1){
      if(this.languageDespClass == 'langs-hidded'){
        this.languageDespClass = 'langs'
        this.languageClass = 'show-mid'
      }else{
        this.languageDespClass = 'langs-hidded'
      }
    }else{
      if(this.languagePlayersDespClass == 'langs-hidded'){
        this.languagePlayersDespClass = 'langs'
        this.languageClass = 'show-mid'
      }else{
        this.languagePlayersDespClass = 'langs-hidded'
      }
    }
  }

  back(){
    if(this.isLangOpened){
      this.languageDespClass = "langs-hidded"
      this.languagePlayersDespClass = "langs-hidded"
      this.toogleLanguage();

    }else {
      this.location.back()
    }
  }

  logout(){
    this.authService.SignOut();
  }

  languageSelected(lang:string){
    if(document.getElementsByClassName("selected-country").length > 0){
      document.getElementsByClassName("selected-country")[0].className = "pais"
    }
    document.getElementById(lang).className = "selected-country"
    this.langSelected = lang
    this.toogleSaveBtn()
  }

  languagePlayersSelected(lang:string){
    if(document.getElementsByClassName("selected-player-country").length > 0){
      document.getElementsByClassName("selected-player-country")[0].className = "pais"
    }

    document.getElementById(lang).className = "selected-player-country"
    this.langPlayerSelected = lang.substring(0,lang.length-2)
    this.toogleSaveBtn()
  }

  //SAVE
  save(){
    if(this.update){
      this.config.notifications = this.notificationsSelected
      this.config.language = this.langSelected
      this.config.usersLanguage = this.langPlayerSelected
      this.dbService.updateConfigUserProfile(this.config,JSON.parse(localStorage.getItem("user")).uid)
    }
    this.toogleSaveBtn()
  }

  toogleSaveBtn(){

    if(this.config.notifications != this.notificationsSelected || this.config.language != this.langSelected || this.config.usersLanguage != this.langPlayerSelected){
      document.getElementById("save").className = "save"
      this.update = true
    }else{
      document.getElementById("save").className = "save-hidded"
      this.update = false
    }
  }

  deleteaAccount(){
    this.userService.deleteUserById(JSON.parse(localStorage.getItem("user")).uid)
    this.router.navigate(['/auth/init']);
  }

  ngOnInit(): void {
    this.config = this.sessionService.getConfig()
    this.notificationsSelected = this.config.notifications
    this.langSelected = this.config.language
    this.langPlayerSelected = this.config.usersLanguage
    console.log(this.config.language)
    console.log(this.config.usersLanguage)
    document.getElementById(this.config.language).className = "selected-country"
    document.getElementById(this.config.usersLanguage+"-p").className = "selected-player-country"
  }

}
