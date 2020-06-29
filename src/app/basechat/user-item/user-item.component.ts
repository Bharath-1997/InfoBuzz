import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
  @Input() user: User;

  constructor(private service:AuthService) { }

  ngOnInit() {
    let currentuser=this.service.afAuth.auth.currentUser.email;
    this.user.fullName=(this.user.fullName)?(this.user.fullName):(this.user.email.substring(0,this.user.email.indexOf('@')));
    this.user.currentuser=currentuser;
  }

}