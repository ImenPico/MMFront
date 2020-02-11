import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AuthentificationService} from '../service/authentification.service';
import {DxDataGridComponent} from 'devextreme-angular';

@Component({
    selector: 'app-page-centrale',
    templateUrl: './page-centrale.component.html',
    styleUrls: ['./page-centrale.component.scss'],

})
export class PageCentraleComponent implements OnInit {
    @ViewChild(DxDataGridComponent, {static: true}) dataGrid: DxDataGridComponent;
    dossiersList:any
    profileUser:any[]=[];
    usernameauthtif:any

    constructor(private auth:AuthentificationService){
        console.log("je suis ici=============>")
        this.usernameauthtif=localStorage.getItem("profileUser");
        // this.auth.getRoleByToken().subscribe(
        //     data => {
        //         console.log("Profile user", data);
        //        this.profileUser.push(data);
        //
        //         sessionStorage.setItem('roless', data["roles"]);
        //
        //         console.log("ProfileUser=================>",this.profileUser)
        //
        //
        //     }, error => {
        //         (error.message, "error", 3600)
        //     });


    }

    ngOnInit() {

        console.log("ProfileUser=================>ngInit",this.profileUser)


    }
    selectedChanged(e) {}
    add(e){}
}
export class ProfileUser {
    UserName: string;
    groupe: []=[];
    roles: [] = [];
    profiles:string;
    nomApplication:string
}
