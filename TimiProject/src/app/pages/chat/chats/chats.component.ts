import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {


  chatsChecked = 'white-header-button-checked'
  groupsChecked = 'white-header-button '

// LABELS
chatsLab = 'Chats'
groupsLab = 'Grupos'

// END LABELS

  constructor() { }

  ngOnInit(): void {
  }

  toogleBtnClass(groups:boolean){
    if(groups) {
      this.groupsChecked='white-header-button-checked';
      this.chatsChecked='white-header-button '
    } else {
      this.chatsChecked='white-header-button-checked'
      this.groupsChecked = 'white-header-button '
    }
  }

}
