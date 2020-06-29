import { Injectable, Query } from '@angular/core';
import { Employee } from './employee.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireList } from '@angular/fire/database';
import { query } from '@angular/animations';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  formData:Employee;

  constructor(private firestore:AngularFirestore,private afauth:AngularFireAuth) { }
  getEmployees()
  {
    return this.firestore.collection('employees').snapshotChanges();
  }
  getmessages()
  {
    //return this.firestore.collection('messages').snapshotChanges();
    return this.firestore.collection('messages', ref => 
      ref.orderBy('createdAt').limitToLast(10)).snapshotChanges();
        
  }
  getEmployeesbyid()
  {
    return this.firestore.collection('employees').doc('3OU7Hd92dwd9zBCS7Lanl82645k2').snapshotChanges();
  }
  getemployeebyid()
 {
   return this.firestore.collection('employees').doc(this.afauth.auth.currentUser.uid).ref.get()
   .then(function(doc) {
     return doc.data() as Employee;   
   });;
 }
  populateform(emp)
  {
    this.formData.email=emp.email;
    this.formData.empCode=emp.empCode;
    this.formData.fullName=emp.fullName;
    this.formData.mobile=emp.mobile;
    this.formData.id=emp.id;
    this.formData.position=emp.position;
  }
  
  getstatus():any
  {
    // const data$ = this.firestore.collection('employees',
    //                ref => ref.where('status', '==', 'online')).valueChanges();

     const data$ = this.firestore.collection('employees').valueChanges();
                   
               
// Subscribing to collection observable to log out the data
//data$.subscribe(data => console.log('onlinedata'+data))
return data$;
  }

  updatestatus(status:string)
  {
    //let status=this.afauth.auth.currentUser.uid.toString()==null?'offline':'online';
    //console.log('authstatus'+this.afauth.auth.currentUser.uid.toString())
    console.log('inupdatestatus'+status);
    this.firestore.collection("employees").doc(this.afauth.auth.currentUser.uid).update({
    "status": status}
  )
  }

  }
