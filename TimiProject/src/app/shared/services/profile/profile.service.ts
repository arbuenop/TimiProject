import { Injectable } from '@angular/core';
import { faDisplay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { ProfileDbService } from '../database/profile.service';
import { UsersService } from '../database/users.service';
import { ProfileSessionService } from '../session/profile.service';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    public dbService: ProfileDbService,
    public SessionService: ProfileSessionService,
    public dbUser: UsersService
  ) {}

  getUserProfile(){
    var user = JSON.parse(localStorage.getItem("user"))

    if(user != null){
      this.dbService.searchUserProfileByName(user.displayName).subscribe(doc => {
        if(doc.length == 0){
          this.dbService.pushUserProfileToDb(user)
        }else{
          this.SessionService.pushToSessionStorage(doc[0])
        }
        })
    }
  }
}
