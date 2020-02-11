import {Component, OnInit, ViewEncapsulation, HostListener, ViewChild} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {AppSettings} from '../../../app.settings';
import {Settings} from '../../../app.settings.model';
import {MenuService} from '../menu/menu.service';
import {environmentVar} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthentificationService} from '../../../pages/service/authentification.service';
import {DxTreeViewComponent} from 'devextreme-angular';
import {SearchInterfaceComponent} from '../../../pages/search-interface/search-interface.component';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [MenuService],
    animations: [
        trigger('showInfo', [
            state('1', style({transform: 'rotate(180deg)'})),
            state('0', style({transform: 'rotate(0deg)'})),
            transition('1 => 0', animate('400ms')),
            transition('0 => 1', animate('400ms'))
        ])
    ]
})
export class HeaderComponent implements OnInit {
    public show: boolean = false;
    public buttonName: any = 'Show';
    userProfile:any;
    urlPM: string = environmentVar.urlProfileM;
    username: string;
    public profile;
    public profiles;
    public roles;
    public thumbnailphoto;
    public showHorizontalMenu: boolean = true;
    public showInfoContent: boolean = false;
    public settings: Settings;
    public menuItems: Array<any>;

    constructor(public appSettings: AppSettings, public menuService: MenuService, private auth: AuthentificationService, private httpClient: HttpClient) {
        this.settings = this.appSettings.settings;
        this.menuItems = this.menuService.getHorizontalMenuItems();
        // this.auth.getMy().subscribe(data => {
        //     this.userProfile= data.data.displayname;
        //     localStorage.setItem("profileUser",data.data.displayname);
        //     this.username = data.data.displayname;
        //     this.httpClient.get(this.urlPM + '/api/getEffectMyUserNameList/' + 'PM', {headers: new HttpHeaders().append('Authorization', localStorage.getItem("token"))}).subscribe(
        //         data => {
        //             this.username += '(' + data['userName'] + ')';
        //
        //             console.log('username  ', this.username);
        //             this.profile = data['profiles'];
        //             this.roles = data['roles'];
        //         }, error => {
        //             (error.message, 'error', 3600);
        //         });
        // }, error => {
        //     (error.message, 'error', 3600);
        // });

       // this.getRoleByToken();
    }

    ngOnInit() {
        if (window.innerWidth <= 768) {
            this.showHorizontalMenu = false;
        }
    }
    toggle() {
        this.show = !this.show;
        if (this.show)
            this.buttonName = "Hide";
        else
            this.buttonName = "Show";
    }

    public closeSubMenus() {
        let menu = document.querySelector('#menu0');
        if (menu) {
            for (let i = 0; i < menu.children.length; i++) {
                let child = menu.children[i].children[1];
                if (child) {
                    if (child.classList.contains('show')) {
                        child.classList.remove('show');
                        menu.children[i].children[0].classList.add('collapsed');
                    }
                }
            }
        }
    }

    @HostListener('window:resize')
    public onWindowResize(): void {
        if (window.innerWidth <= 768) {
            this.showHorizontalMenu = false;
        } else {
            this.showHorizontalMenu = true;
        }
    }

    // getRoleByToken() {
    //     this.httpClient.get(`${this.urlPM}` + '/api/getEffectMyUserNameList/mm8', {headers: new HttpHeaders().append('Authorization', localStorage.getItem('token'))}).subscribe(
    //         data => {
    //             this.profiles = data['profiles'];
    //             console.log('Profile user', data['profiles']);
    //             sessionStorage.setItem('roles', data['roles']);
    //             sessionStorage.setItem('profiles', data['profiles']);
    //         }, error => {
    //             (error.message, 'error', 3600);
    //         });
    // }

    clearSession() {
        sessionStorage.clear();
    }

    signOut() {
        localStorage.clear();
        sessionStorage.clear();
        // clearMenu();
        // window.location.replace('');
    }
}
