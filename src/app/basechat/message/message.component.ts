import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { ChatMessage } from '../models/chat-message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() chatMessage:ChatMessage; //taking the message from feed
  userEmail:string;
  userName:string;
  messageContent:string;
  timeStamp:Date=new Date();
  isOwnMessage: boolean;
  ownEmail: string;
  
  constructor(private authService: AuthService) {
   
  }

  ngOnInit(chatMessage=this.chatMessage) {
    //console.log(chatMessage.userName);
   this.messageContent=chatMessage.message;
   this.timeStamp=chatMessage.timeSent;
   this.userEmail=chatMessage.email;
   this.userName=chatMessage.userName;
   this.isOwnMessage = this.userName === this.authService.afAuth.auth.currentUser.email.toString();
  }

}
