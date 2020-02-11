import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MessagesService} from './messages.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environmentVar} from '../../../../environments/environment';



@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ MessagesService ]
})
export class MessagesComponent implements OnInit {

  InterfaceName:any;
  time:any;
  date2:any[];
  date:any;
  nomprenom:any;
  temps: any;
  contentEditable = false
  public notifications: Array<Object>;
  subjecct: any;
  notif: any;
  public files: Array<Object>;
  public meetings: Array<Object>;
  urlmm8:string=environmentVar.urlBackMailManager


  constructor(private messagesService: MessagesService, private httpClient: HttpClient) {

    // this.httpClient.get('api/notificationsBySendTo', {
    this.httpClient.get( `${this.urlmm8}`+'api/notificationsBySendTo', {headers: new HttpHeaders().set("Authorization", localStorage.getItem("token"))
    }).subscribe((data: Array<Object>) => {
      data.forEach(t => {
        this.notif = t;
        this.date= t["dateCreated"].substring(0, 10);
        this.time=t["dateCreated"].substring(11,16);
        this.date2=this.date.split("-");
        let dd=this.date2[2];
        let mm=this.date2[1];
        let yyyy=this.date2[0];
        let newDate=dd+"/"+mm+" "+this.time;
        t["dateCreated"]=newDate;
     this.InterfaceName=t["user"].split(".");
        this.InterfaceName=this.InterfaceName[0];
        console.log("getnom",t["user"])
      })
      this.notifications = data;
      console.log("get notification by sendtoooo testt2", this.notifications)

    })

  }

  ngOnInit() {

    //   jQuery('#messagesTabs').on('click', '.nav-item a', function(){
    //       setTimeout(() => jQuery(this).closest('.dropdown').addClass('show'));
    // }
    // )
  }

  toggleEditable(event, id) {
    if (event.target.checked) {
      // this.changeStatus(id);
      this.httpClient.post(`${this.urlmm8}`+'api/changeStatus',id,
          { headers: new HttpHeaders().set("Authorization", localStorage.getItem("token"))})
          .subscribe((data: Array<Object>)=>
          {
      this.httpClient.get( `${this.urlmm8}`+'api/notificationsBySendTo', {headers: new HttpHeaders().set("Authorization", localStorage.getItem("token"))
      }).subscribe((data: Array<Object>) => {
        data.forEach(t => {
          this.notif = t;
          t["dateCreated"] = t["dateCreated"].substring(0, 10);
          this.date2=this.date.split("-");
          let dd=this.date2[2];
          let mm=this.date2[1];
          let yyyy=this.date2[0];
          let newDate=dd+"/"+mm+" "+this.time;
          t["dateCreated"]=newDate;
          // let prenom=t["user"].split(".");
          // t["user"]=prenom[0];
        })
        this.notifications = data;
        console.log("getnotifications",this.notifications)
      });
    });
  }};

  //getUser(username){
    //this.httpClient.get('api/user/getUser',{params:new HttpParams().set("username",username) ,
      //headers: new HttpHeaders().set('Authorization', localStorage.getItem("token"))});
  //}
}
