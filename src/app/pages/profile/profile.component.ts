import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environmentVar} from '../../../environments/environment';
import {AuthentificationService} from '../service/authentification.service';
import {ServiceFileService} from "../fileModule/alfresco_services/service-file.service";
import {Service} from "../fileModule/alfresco_services/document-library.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
    listeScanner: any[] = [];
 // urlPM: string = environmentVar.urlProfileM;
  public thumbnailphoto;
  username: string;
  profiles: string;
  public profile;
  public roles;

  constructor(private httpClient: HttpClient, private auth: AuthentificationService,private serviceFile: ServiceFileService,public service: Service) {
    // this.auth.getMy().subscribe(data => {
    //   this.username = data.data.displayname;
    //   this.thumbnailphoto = data.data.thumbnailphoto;
    //   this.httpClient.get(this.urlPM + '/api/getEffectMyUserNameList/' + 'lm8', {headers: new HttpHeaders().append('Authorization', sessionStorage.getItem('AuthToken'))}).subscribe(
    //       data => {
    //         this.username += '(' + data['userName'] + ')';
    //         localStorage.setItem("usernameProfile",data['userName']);
    //         console.log('username  ', this.username);
    //         this.profile = data['profiles'];
    //         console.log('profile  ', this.profile);
    //         this.roles = data['roles'];
    //         console.log('roles  ', this.roles);
    //       }, error => {
    //         (error.message, 'error', 3600);
    //       });
    // }, error => {
    //   (error.message, 'error', 3600);
    // });
    //
    // this.getRoleByToken();
  }

  ngOnInit() {
  }

  // getRoleByToken() {
  //
  //   this.httpClient.get(`${this.urlPM}` + '/api/getEffectMyUserNameList/lm8', {headers: new HttpHeaders().append('Authorization', localStorage.getItem('token'))}).subscribe(
  //       data => {
  //         this.profiles = data['profiles'];
  //         console.log('Profile user', data['profiles']);
  //         sessionStorage.setItem('roles', data['roles']);
  //         sessionStorage.setItem('profiles', data['profiles']);
  //       }, error => {
  //         (error.message, 'error', 3600);
  //       });
  //
  // }
  getRoleUser(){
      this.auth.getRoleUser().subscribe(data=>{
          this.profiles = data['profiles'];
          console.log('Profile user', data['profiles']);
          sessionStorage.setItem('roles', data['roles']);
          sessionStorage.setItem('profiles', data['profiles']);
      }, error => {
          (error.message, 'error', 3600);
      })

  }


    affichermodal(){
        this.serviceFile.toggle_Visibility_card_userprofile=!this.serviceFile.toggle_Visibility_card_userprofile
        /*******appel ws GetlistScanner si le composant n'est ^pas cachĂ©****/
        if(this.serviceFile.toggle_Visibility_card_userprofile==false){
            /*****************appel ws GetlistScanner ********************/
            this.service.GetListScanner('GetListScanner').then(res => {
                for (let i = 0; i < res.result.length; i++) {
                    console.log("in");
                    this.listeScanner[i] = res.result[i];
                }

                this.serviceFile.listeScanner=this.listeScanner

            })}

    }



}
