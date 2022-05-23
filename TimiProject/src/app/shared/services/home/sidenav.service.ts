import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  private opened: BehaviorSubject<boolean>;

  constructor() {
    this.opened = new BehaviorSubject<boolean>(false);
  }

  isOpened(){
    return this.opened;
  }

  close(){
    this.opened.next(false)
  }

  toogle(){
    if(this.isOpened){
      this.opened.next(true);
    }else{
      this.opened.next(false);
    }

  }
}
