import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { firestore } from 'firebase/app';
import { map, switchMap } from 'rxjs/operators';
import { Observable, combineLatest, of } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private router: Router,
    private db:AngularFireDatabase
  ) {}

  get(chatId) {
    return this.afs
      .collection<any>('chats')
      .doc(chatId)
      .snapshotChanges()
      .pipe(
        map(doc => {
          return { id: doc.payload.id, ...doc.payload.data()as object};
        })
      );
  }

  async create() {
    const uid = await this.auth.afAuth.auth.currentUser.uid.toString();

    const data = {
      uid,
      createdAt: Date.now(),
      count: 0,
      messages: []
    };

    const docRef = await this.afs.collection('chats').add(data);

    return this.router.navigate(['chats', docRef.id]);
  }

  async sendMessage(chatId, content) {
    const uid = await this.auth.afAuth.auth.currentUser.uid.toString();

    const data = {
      uid,
      content,
      createdAt: Date.now()
    };

    if (uid) {
      const ref = this.afs.collection('chats').doc(chatId);
      return ref.update({
        messages: firestore.FieldValue.arrayUnion(data)
      });
    }
  }

  joinUsers(chat$: Observable<any>) {
    let chat;
    const joinKeys = {};
  
    return chat$.pipe(
      switchMap(c => {
        // Unique User IDs
        chat = c;
        const uids = Array.from(new Set(c.messages.map(v => v.uid)));
  
        // Firestore User Doc Reads
        const userDocs = uids.map(u =>
          this.afs.doc(`users/${u}`).valueChanges()
        );
  
        return userDocs.length ? combineLatest(userDocs) : of([]);
      }),
      map(arr => {
        arr.forEach(v => (joinKeys[(<any>v).uid] = v));
        chat.messages = chat.messages.map(v => {
          return { ...v, user: joinKeys[v.uid] };
        });
  
        return chat;
      })
    );
  }

  //base chat code
chatMessages:AngularFireList<any[]>;
basesendMessage(msg:string):void
  {
    let data={};
    const timestamp=this.getTimeStamp();
    const email=this.auth.afAuth.auth.currentUser.email;
    this.chatMessages=this.getMessages();
    data['message']=msg;
    data['timeSent']=timestamp;
    data['userName']=email;
    data['email']=email;
    this.chatMessages.push(data as any[]);
    //console.log("inside send message");
    
  }
  
getUsers() :any{
  const path = '/users';
  return this.db.list(path).valueChanges();
  }
  
getMessages():AngularFireList<any[]>{
  //console.log('inside getmessages');
   return this.db.list('messages');
  //  return this.firestore.collection('messages', ref => 
  //     ref.orderBy('createdAt').limitToLast(10)).snapshotChanges();
}
feedMessages():any{
  //console.log('inside getmessages');
   return this.db.list('messages').valueChanges();
  //  return this.firestore.collection('messages', ref => 
}
getTimeStamp()
  {
     const now=new Date();
     const date=now.getUTCFullYear()+'/'+
                (now.getUTCMonth()+1)+'/'+
                 now.getUTCDate();
      const time=now.getUTCHours()+':'+
                 now.getMinutes()+':'+
                  now.getUTCSeconds();
      return (date+''+time);                       
  }



}

