import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import {AuthentificationService} from '../service/authentification.service';
import {AlfrescoService} from '../fileModule/alfresco_services/AlfrescoApi.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  public router: Router;
  public form:FormGroup;
    public username:AbstractControl;
    public password:AbstractControl;
    public application:AbstractControl;
    public currentToken: string;

  constructor(router:Router, fb:FormBuilder,private auth:AuthentificationService,private alfrescoService:AlfrescoService) {
      this.router = router;
      this.form = fb.group({
          'username': ['' ],
          'password': ['' ],
          'application': ['mm8' ]

      });
      //Validators.compose([Validators.required, CustomValidators.email])
      // Validators.compose([Validators.required, Validators.minLength(6)])
      this.username = this.form.controls['username'];
      this.password = this.form.controls['password'];
      this.application = this.form.controls['application'];
      if (auth.isLoggedIn()) {

          this.router.navigate(['/dashboard']);
      }
  }

    // public onSubmit(values:Object):void {
    //     console.log(values["username"])
    //     console.log(values)
    //     this.auth.getToken(values).subscribe(
    //         response =>{console.log("ddd "+JSON.stringify( response.headers.get("authorization")))
    //             let token= response.headers.get("authorization");
    //
    //             console.log(token)
    //             if (token!="" && token!=null && token!=undefined) {
    //
    //
    //                 this.currentToken=token;
    //                 localStorage.setItem("username",values["username"]);
    //                localStorage.setItem("token",token);
    //                 sessionStorage.setItem("datalogin",values["username"])
    //                 this.router.navigate(['/dashboard'])
    //
    //             }
    //             else
    //             {
    //                 this.currentToken="error";
    //             }
    //         },
    //         err => {
    //
    //             console.log(err)
    //             if(err.status==401){
    //                 this.router.navigate([''])
    //                 this.currentToken="error";}
    //         }
    //     );
    //
    // }

    ngAfterViewInit(){
      document.getElementById('preloader').classList.add('hide');                 
  }
    // public onSubmit(values:Object):void {
    //     console.log(values["username"])
    //     console.log(values)
    //     this.auth.getToken(values)
    //         .subscribe(
    //             response =>{
    //                 console.log("tokenAAAAAAAA",response.body)
    //                 console.log("ddd "+JSON.stringify( response.headers.get("authorization")))
    //                 let token=response.body;
    //
    //                 console.log(token)
    //                 if (token!="" && token!=null && token!=undefined) {
    //
    //
    //                     this.currentToken=token;
    //
    //                     localStorage.setItem("username",values["username"]);
    //                     localStorage.setItem("token",token);
    //                     sessionStorage.setItem("datalogin",values["username"])
    //                     this.auth.getRoleByToken().subscribe(data=>{
    //
    //                         console.log('Profile user', data['profiles']);
    //
    //                         localStorage.setItem('roles', data['roles']);
    //                         localStorage.setItem("profiles",data['profiles'])
    //                         //sessionStorage.setItem('profiles1', data['profiles']);
    //                         this.router.navigate(['/dashboard'])
    //                     })
    //
    //
    //                 }
    //                 else
    //                 {
    //                     this.currentToken="error";
    //                 }
    //             },
    //             err => {
    //
    //                 console.log("error",err)
    //                 if(err.status==401){
    //                     this.router.navigate([''])
    //                     this.currentToken="error";}
    //             }
    //         )
    //
    // }
    public onSubmit(values:Object):void {
        console.log(values["username"])
        console.log(values)
        this.auth.getToken(values)
            .subscribe(
                response =>{
                    console.log("tokenAAAAAAAA",response.body)
                    console.log("ddd "+JSON.stringify( response.headers.get("authorization")))
                    let token=response.body;
                    this.alfrescoService.loginWithUsernameAndPassword('admin', 'admin')
                        .then( data => {
                            console.log(data);
                        })
                        .catch(
                            error => {
                                console.log('error with authentification alfresco', error);
                            }
                        );
                    console.log(token)
                    if (token!="" && token!=null && token!=undefined) {


                        this.currentToken=token;

                        localStorage.setItem("username",values["username"]);
                        localStorage.setItem("token",token);
                        // this.auth.clearToken();
                        sessionStorage.setItem("datalogin",values["username"])
                        this.auth.getRoleUser().subscribe(data=>{
                        console.log("resultRole",data);
                            console.log('Profile user', data['profiles']);

                            localStorage.setItem('roles', data['roles']);
                            localStorage.setItem("profiles",data['profiles'])

                            this.auth.getMy().subscribe(data => {
                               // this.userProfile= data.data.displayname;
                                console.log("userProfileMailManager", data)
                                localStorage.setItem("profileUser",data.data.displayname);
                                this.username = data.data.displayname;

                            });

                            this.router.navigate(['/dashboard'])
                        })



                    }
                    else
                    {
                        this.currentToken="error";
                    }
                },
                err => {

                    console.log("error",err)
                    if(err.status==401){
                        this.router.navigate([''])
                        this.currentToken="error";}
                }
            )

    }
}
