import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/shared/chat.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {

  constructor(private chat:ChatService) { }
message:string
  ngOnInit() {
  }

  send(){
    //console.log('your message'+this.message);
    this.chat.basesendMessage(this.message);
    this.message='';
  }

  handleSubmit(event){
    if(event.keyCode===13)
    {
      this.send();
    }
  }
}
