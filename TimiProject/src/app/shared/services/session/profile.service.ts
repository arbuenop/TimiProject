import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileSessionService {

  constructor(
  ) { }
  pushToSessionStorage(userProfile:any){
    sessionStorage.setItem("user-profile", JSON.stringify(userProfile))
  }
}
