import { Injectable } from '@angular/core';
import { ConfigDbService } from '../database/user-config.service';
import { ConfigSessionService } from '../session/user-config.service';

@Injectable({
  providedIn: 'root'
})
export class UserConfigService {

  constructor(
    public dbService: ConfigDbService,
    public SessionService: ConfigSessionService,
  ) {}

  getUserConfig(){
    var user = JSON.parse(localStorage.getItem("user"))

    if(user != null){
      this.dbService.searchUserConfigByUid(user.uid).subscribe(doc => {
        if(doc == undefined){
          this.dbService.pushUserConfigToDb(user)
        }else{
          this.SessionService.pushToSessionStorage(doc)
        }

        })
    }
  }
}
