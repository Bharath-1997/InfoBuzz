import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: any[];

  constructor(private chat: EmployeeService) {
    chat.getstatus().subscribe(users => {
      this.users = users;
      //console.log('the users'+users);
    });
  }
  ngOnInit()
  {
    
  }
}


