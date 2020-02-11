import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/index";
import data from "devextreme/bundles/dx.all";

import {environmentVar} from '../../../../environments/environment';

const HttpUploadOptions = {headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })
}
@Injectable({
  providedIn: "root"
})


export class ServiceFileService {
    toggle_Visibility_card_userprofile=true;
    listeScanner:any
    // getuserprofile:any
    nodrefcurrent:any;
    minetype : any ;
    scannerversionning:any;
    edit:any;

    selectedData:any;
    dossiersList: any[] = [];
    tableau1 : any[] = [];
    datasource: any[]=[];
    result:any;
    tableauFile:any[]=[];
privilege:any;
    currentItem:any ;
  constructor(private httpClient: HttpClient) {
  }
    urluserprofile:string ="/api/userprofilescanner" ;

//  url:string=environmentVar.url;
  urlback:string=environmentVar.urlBack;
/*  savePieceJoint(pieceJointModel){
    return this.httpClient.post(`${this.url}`+'api/savePieceJoint', pieceJointModel,{});


}
  deletePieceJointUniteId(unitedid) {
        this.httpClient.delete(`${this.url}`+'api/deletePieceJoint',{params: new HttpParams().set("uniteId", unitedid)}).subscribe((data)=>{
            console.log("success");
        });

  }*/

  updatePieceJoint(modelPieceJoint): Promise<any> {
    return new Promise(
      ((resolve, reject) => {
        this.httpClient.post('/api/UpdatePieceJoint', {'pieceJoint': modelPieceJoint},
          {observe: 'body'})
          .subscribe((data: any) => {
              resolve(data)
            },
            error => {
              reject(error)
            });
      })
    );
  }
////////////// save user profile (scanner) ///////////////////

    saveUserProfil(userprofile){
        return this.httpClient.post(this.urluserprofile+ "/saveUserProfile",userprofile);
    }





////////////////////get user profile /////////////////////////


    getuserprofile(id): Promise<any>{
        return new Promise(
            ((resolve,reject)=>{
                    this.httpClient.post(this.urlback+'api/GetUserProfileByID',id,{headers: new HttpHeaders().append("Authorization", localStorage.getItem("token"))}
                    )
                        .subscribe((data: any) => {
                            resolve(data);
                            },
                            error => {
                                reject(error)
                            });
                }
            )
        );
    }


    //webs service pour upload new version in alfresco

    public uploadnewversion(file, nodref, type) {
console.log("innnnnnnnn helmi upload new version")
        const formD= new FormData();
        formD.append('file', file);
        formD.append('nodref', nodref);
        formD.append('type',type);
        return this.httpClient.post(this.urlback+'api/uploadnewversion',formD,{headers: new HttpHeaders().set("Authorization", localStorage.getItem("token"))});

    }



    // public getCompteurCourrier(nomApplication,radioSelected ){
    //     const params= new HttpParams().
    //     set('nom_application','MM').
    //     set('nameVariable',radioSelected)
    //     console.log('selecttttttcompteur',radioSelected);
    //     return this.http.get("http://127.0.0.1:8099/apiConfig/getParamDouble", {params:params, headers: this.authService.getAutorization()});
    // }

    uploadFile(data): any {

        const httpOption={
           responseType: 'blob' as 'json',

        }



        return this.httpClient.post(this.urlback+' /api/WordIntegrator', data,httpOption);
        // let bytes = new Uint8Array( this.result.length);
        //
        // for (let i = 0; i < bytes.length; i++) {
        //     bytes[i] =  this.result.charCodeAt(i);
        // }
        // let blob = new File([bytes],'name.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        // // let file = new Blob([ this.result], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        // var fileURL = URL.createObjectURL(blob);
        // window.open(fileURL);
    }



    Scan(functionName, selectedScannerName ,SetIndicators,SetHideUI,fileType,EnableDuplex,SetResolutionInt ,SetPixelType,SetBitDepth,SetPaperSize): Promise<any> {
        // let in =1 ;
        let i = 0 ;
        return new Promise(
            ((resolve, reject) => {
                console.log("helmiscan1")
                this.httpClient.post('https://127.0.0.1:7777/execute/scan',{'functionName': functionName,'SetIndicators':SetIndicators,'SetHideUI':SetHideUI,'fileType':fileType,'EnableDuplex':EnableDuplex,'SetResolutionInt':SetResolutionInt,'SetPixelType':SetPixelType,'SetBitDepth':SetBitDepth,'SetPaperSize':SetPaperSize, 'selectedScannerName': selectedScannerName},
                    {observe: 'body'})
                    .subscribe((data: any) => {
                            // in ++;

                            // Decode the String
                            // var decodedString = cell (data.result.data);
                            // console.log(decodedString); // Outputs: "Highlight"
//let reader = new fileReader();
//                          window.atob(data.result.data);
                            console.log("helmiscan2");
                            console.log(data);


                            // this.tabf1[i]=this.f1;
                            //   console.log("rrrrrrr",this.tabf1);

                            //return new Blob([byteArray], {type: 'application/pdf'});
                            // var fileURL = URL.createObjectURL(this.f1);
                            // window.open(fileURL);


                            console.log("helmiscan3");


                            resolve(data)
                        },
                        error => {
                            reject(error)
                        });
            })
        )
            ;
    }

}


