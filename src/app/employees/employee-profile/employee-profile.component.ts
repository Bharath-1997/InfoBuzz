import { Component, OnInit, Inject } from '@angular/core';
import { EmployeeListsComponent } from "../employee-lists/employee-lists.component";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { inject } from '@angular/core/testing';
import {MatCardModule} from '@angular/material/card';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {
 recievedRow;
 imgsrc:string;
 dataSource =new MatTableDataSource();
 displayedColumns: string[] =['name', 'empCode', 'position', 'mobile','email'];
  constructor(public dialogRef:MatDialogRef<EmployeeListsComponent>,
    @Inject(MAT_DIALOG_DATA)public data:any) { 
      this.recievedRow=data;
      this.imgsrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxbNpnfOB2P-cWuGoTIJrSTnbyugR0faFv03_bE0rX_i7RDz3I7g&s";
      if(data.imageUrl!=null)
      {
        this.imgsrc=this.recievedRow.imageUrl;
      }
    }

  ngOnInit() {
    var users1=[];    
      users1.push({"name" : this.recievedRow.name,"empCode":this.recievedRow.empCode,"position":this.recievedRow.position,"mobile":this.recievedRow.mobile,"email":this.recievedRow.email});

    this.dataSource = new MatTableDataSource(users1);
  
  }



  members: {title: string, subtitle: string, content: string, url: string}[] = [
    {title: 'Title', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
    
  ];



}
