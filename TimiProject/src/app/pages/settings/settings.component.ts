import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { fade, moveSectionLeftAnimation, settingsAnimations, showDetailsAnimation } from 'src/app/animations/auth-animations';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  animations: [settingsAnimations, moveSectionLeftAnimation, fade, ]
})
export class SettingsComponent implements OnInit {
mainClass ='show-right'
isLangOpened=false;
languageClass='hidden'
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
  checked = false;
  disabled = false;
  constructor(
    private authService: AuthService,
    public location: Location
  ) { }

  select(item:number){
    if(item==1){
      if(this.checked) this.checked=false;
      else this.checked=true;
    }
  }
  toogleLanguage(){
    if(!this.isLangOpened){
      this.mainClass='hide-left'
      this.languageClass = 'show-up'
      this.isLangOpened=true;
    }else {
      this.mainClass='show-right'
      this.languageClass = 'hide-down hidden'
      this.isLangOpened=false;
    }


  }
  back(){
    if(this.isLangOpened){
      this.toogleLanguage();
    }else {
      this.location.back()
    }
  }
  logout(){
    this.authService.SignOut();
  }

  ngOnInit(): void {
  }

}
