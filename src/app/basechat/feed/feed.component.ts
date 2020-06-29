import { Component, OnInit, OnChanges } from '@angular/core';
import { AngularFireList } from '@angular/fire/database';
import { ChatService } from 'src/app/shared/chat.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit,OnChanges {
  feed:AngularFireList<any[]>;
  constructor(private chat:ChatService) { }

  ngOnInit() {
    this.feed=this.chat.feedMessages();
    //console.log("feed"+this.feed);
  } 
ngOnChanges()
{
  this.feed=this.chat.feedMessages();
}
}