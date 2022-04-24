import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UsersService } from 'src/app/shared/services/database/users.service';

@Component({
  selector: 'app-init-auth',
  templateUrl: './init-auth.component.html',
  styleUrls: ['./init-auth.component.scss'],
})
export class InitAuthComponent implements OnInit {

  constructor(public usersService: UsersService) { }
  ngOnInit(): void {
  }

}
