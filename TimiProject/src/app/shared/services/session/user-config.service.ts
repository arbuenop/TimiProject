import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigSessionService {

  constructor() { }

  pushToSessionStorage(userConfig:any){
    sessionStorage.setItem("user-config", JSON.stringify(userConfig))
  }

  getConfig():any{
    return JSON.parse(sessionStorage.getItem("user-config"))
  }
}
