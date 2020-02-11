import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import data from 'devextreme/bundles/dx.all';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environmentVar} from '../../../../environments/environment';
import notify from 'devextreme/ui/notify';
import {AuthentificationService} from '../../../pages/service/authentification.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserMenuComponent implements OnInit {

  urlPM: string = environmentVar.urlProfileM;
  public thumbnailphoto;
  username: string;
  profiles: string;
  public profile;
  public roles;

  constructor(private httpClient: HttpClient, private auth: AuthentificationService) {
    // this.auth.getMy().subscribe(data => {
    //   this.username = data.data.displayname;
    //   this.thumbnailphoto = data.data.thumbnailphoto;
    //   this.httpClient.get(this.urlPM + '/api/getEffectMyUserNameList/' + 'lm8', {headers: new HttpHeaders().append('Authorization', localStorage.getItem('token'))}).subscribe(
    //       data => {
    //         // this.username += '(' + data['userName'] + ')';
    //         this.profile = data['profiles'];
    //         this.roles = data['roles'];
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

  getRoleByToken() {

    this.httpClient.get(`${this.urlPM}` + '/api/getEffectMyUserNameList/lm8', {headers: new HttpHeaders().append('Authorization', localStorage.getItem('token'))}).subscribe(
        data => {
          this.profiles = data['profiles'];
          console.log('Profile user', data['profiles']);
          sessionStorage.setItem('roles', data['roles']);
          sessionStorage.setItem('profiles', data['profiles']);
        }, error => {
          (error.message, 'error', 3600);
        });

  }
}
