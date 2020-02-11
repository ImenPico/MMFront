import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environmentVar} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ErrorHandlerService} from '../../error-handler.service';
// import {ErrorHandlerService} from '../../error-handler.service';


let federalHolidays: Date[] = [
    new Date(2017, 0, 1),
    new Date(2017, 0, 2),
    new Date(2017, 0, 16),
    new Date(2017, 1, 20),
    new Date(2017, 4, 29),
    new Date(2017, 6, 4),
    new Date(2017, 8, 4),
    new Date(2017, 9, 9),
    new Date(2017, 10, 11),
    new Date(2017, 10, 23),
    new Date(2017, 11, 25)
];
@Injectable({
    providedIn: 'root'
})
export class AuthentificationService {
    urlback:string=environmentVar.urlBack;
    private url: string;
    urlPM:string=environmentVar.urlProfileM;
    private isItLoggedIn: boolean;
    private currentToken: string;
    urlmm8:string=environmentVar.urlBackMailManager
    handleError:any;
    // noderef:any
    // modeDocument:any;


    constructor(private httpClient : HttpClient,private errorHandlerService: ErrorHandlerService ) {
      this.url = 'http://localhost:4204/';
  }

    getFederalHolidays() : Date[] {
        return federalHolidays;
    }
  // getToken(user:any)
  //   {
  //       console.log(user["username"]);
  //       let formdata=new FormData()
  //       formdata.append("application","mm8")
  //       formdata.append("username",user["username"])
  //       formdata.append("password",user["password"])
  //       console.log(formdata.get("username"));ff
  //       return this.httpClient.post(`${this.urlPM}`+'/login',formdata,{observe: 'response'})
  //
  //   }

    getToken
    (user:any):Observable<any> {
        console.log(user["username"]);
        let headers = new HttpHeaders();
        //headers.append("Authorization", "Basic " + btoa(Username + ":" + Password));
        headers.append('Content-Type', "application/json");
        return this.httpClient.post(`${this.urlmm8}` + 'api/login', user, {
            observe: "response",
            responseType: 'text' as 'json',
            headers
        }).pipe(catchError(this.errorHandlerService.handleError));
    }
        /* .map(
            (response: Response) => {
            return response;
        }).catch(this.handleError);*/

    isLoggedIn() {
        if (this.loadToken() !== '' && this.loadToken() !== null) {
            this.isItLoggedIn = true;
        }
        return this.isItLoggedIn;

    }

    loadToken(): string {
        this.currentToken = localStorage.getItem("token");
        return this.currentToken;
    }
    getRoleByToken(){
      return this.httpClient.get(`${this.urlPM}` + '/api/getEffectMyUserNameList/' + 'mm8', {headers: new HttpHeaders().append("Authorization",localStorage.getItem("token"))});
  }
    getMy(): Observable<any> {
        return this.httpClient.get(`${this.urlmm8}`+'api/getMy',{headers: new HttpHeaders().append("Authorization",localStorage.getItem("token"))});

    }

    getRoleUser(){
        return this.httpClient.get(`${this.urlmm8}`+'api/getEffectMyUserNameList',{headers: new HttpHeaders().set("Authorization", localStorage.getItem("token"))})
    }

    getUser(){
        return this.httpClient.get(`${this.urlmm8}`+'api/Users',{headers: new HttpHeaders().set("Authorization", localStorage.getItem("token"))})
    }
    getDepartement(){
        return this.httpClient.get( `${this.urlmm8}`+'api/departement', {headers: new HttpHeaders().set("Authorization", localStorage.getItem("token"))})

    }


    getparamalfresco(): Promise<any>{
        return new Promise(
            ((resolve, reject) => {
                this.httpClient.get(`${this.urlPM}`+'/VariableById/='+'&Name=AlfrescoSetting'+'&alias=mm8',{headers: new HttpHeaders().set("Authorization", localStorage.getItem("token"))}).subscribe((data: any) => {
                        console.log("innnnnnnnnnnnnnnnnnnnnnn getparamalfresco");
                        console.log(data);

                        resolve(data)
                    },
                    error => {
                        reject(error)
                    });
            })
        );
    }


    // getMy(): Observable<any> {
    //     return this.httpClient.get(`${this.urlPM}`+'/api/getMy',{headers: new HttpHeaders().append("Authorization",localStorage.getItem("token"))});
    //
    // }
    getAllCourrierWithLazy(subject,dateArrivee1,dateArrivee2,entiteemettrice,destination,refexterne) {
        const params= new HttpParams().set('subject','subject').set('dateArrivee1',dateArrivee1).set('dateArrivee2',dateArrivee2).
        set('entiteemettrice',entiteemettrice).
        set('destination',destination).
        set('refexterne',refexterne)

        let header=new HttpHeaders().append("Authorization",localStorage.getItem("token"))
        return new Promise(
            (resolve, reject) => {
                this.httpClient.get(this.urlback+ 'api/getAllCourriersWithLazy',{params:params,headers: header})
                    .subscribe(data => {
                        console.log("dataaaa",data);
                            resolve(data)
                        },
                        error1 => reject(error1))
            }
        );


    }
    // getAllCourrier() {
    //
    //     return new Promise(
    //         (resolve, reject) => {
    //             this.httpClient.get('http://localhost:8080/api/courrier-arrivees',{headers: new HttpHeaders().append("Authorization",localStorage.getItem("token"))})
    //                 .subscribe(data => {
    //                         console.log("dataaaa",data);
    //                         resolve(data)
    //                     },
    //                     error1 => reject(error1))
    //         }
    //     );
    //
    //
    // }


    // clearToken() {
    //     setTimeout(() => {
    //         localStorage.clear()
    //     },100)
    // }


    // getDecodedAccessToken(): any {
    //     let token = this.loadToken();
    //     try {
    //         return jwt_decode(token);
    //     } catch (Error) {
    //         return null;
    //     }
    // }

}

