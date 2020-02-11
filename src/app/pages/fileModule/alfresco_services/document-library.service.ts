import {Injectable, Input} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {Observable} from 'rxjs/internal/Observable';
import {AlfrescoService} from './AlfrescoApi.service';




export class Product {
    ID: string;
    name: string;
    expanded?: boolean;
    parentId?: string;
    icon?: string;
    price?: number;
    isFolder: boolean;
    isFile: boolean;
}

export class BreadCrump {
    constructor(node, name) {
        this.node = node;
        this.name = name;
    }
    node: string;
    name: string;
}

var products: Product[] = [];

@Injectable()
export class Service {


    // private messageSource = new BehaviorSubject('default message');
    // currentMessage = this.messageSource.asObservable();
    public Listescanner:any[]=[];
    public data : any;
    public tabf1 : any []=[] ;
    public  Acquire={

        selectedScannerName:'',
        SetIndicators:'',
        SetHideUI: '',
        fileType:'',
        EnableDuplex:'',
        SetResolutionInt:'',
        SetPixelType:'',
        SetBitDepth:'',
        SetPaperSize:''
    };

    constructor( private http: HttpClient,public alfs : AlfrescoService ) {

    }

    // changeMessage(message: string) {
    //     this.messageSource.next(message)
    // }

    //
    // public requestDataFromMultipleSources(): Observable<any[]> {
    //     console.log(this.data);
    //    let response1 =  this.Scan('Acquire', this.Acquire.selectedScannerName ,this.Acquire.SetIndicators,this.Acquire.SetHideUI,'pdf',this.Acquire.EnableDuplex,this.Acquire.SetResolutionInt ,this.Acquire.SetPixelType,'1','1');
    //
    //
    //
    //     let response2 =this.alfs.toUploadFiles(this.data,null,this.tabf1);
    //    // let response3 = this.http.get(requestUrl3);
    //     // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
    //     return forkJoin([response1, response2]);
    // }

    getProducts(): Product[] {
        return products;
    }

    addItem(item, parentId) {
        products.push(
            {
                ID: item.nodeRef,
                name: item.name,
                expanded : (item.isFile) ? false : true,
                parentId : parentId,
                icon : (item.isFile) ? 'assets/img/pdf_file.svg' : 'assets/img/folder.svg',
                price : null,
                isFolder: item.isFolder,
                isFile: item.isFile
            }
        )
    }

    editItem(id, name) {
        products = [];
        let firstItem = {
            ID: "1",
            name: "Document library",
            expanded: false,
            isFile: false,
            isFolder: true
        };
        products.push(firstItem);
        products[0].expanded = true;
        products[0].ID=  id;
        if(name) products[0].name = name;
    }

    // Scan(functionName, selectedScannerName ): Promise<any> {
    //     return new Promise(
    //         ((resolve, reject) => {
    //
    //             this.http.post('https://127.0.0.1:7777/execute/scan',{'functionName': functionName, 'selectedScannerName': selectedScannerName},
    //                 {observe: 'body'})
    //                 .subscribe((data: any) => {
    //                         console.log(data);
    //                         resolve(data)
    //                     },
    //                     error => {
    //                         reject(error)
    //                     });
    //         })
    //     );
    // }


    Scan(functionName, selectedScannerName ,fileType,EnableDuplex,SetResolutionInt ,SetPixelType,SetPaperSize): Promise<any> {
        // let in =1 ;
        let i = 0 ;

        return new Promise(
            ((resolve, reject) => {
                console.log("helmiscan1")
                this.http.post('https://127.0.0.1:7777/execute/scan',{'functionName': functionName,'fileType':fileType,'EnableDuplex':EnableDuplex,'SetResolutionInt':SetResolutionInt,'SetPixelType':SetPixelType,'SetPaperSize':SetPaperSize, 'selectedScannerName': selectedScannerName},
                    {observe: 'body'})
                    .subscribe((data: any) => {

                            console.log("helmiscan2");
                            console.log(data);


                            //////////////////////////////////////////////////////////

                            // const byteArray = new Uint8Array(atob(data.result.data).split('').map(char => char.charCodeAt(0)));
                            // const f1 = new File([byteArray], Math.random().toString(36), {type: 'application/pdf'});
                            //
                            // console.log(f1);
                            //
                            //
                            //
                            // this.tabf1.push(f1);
                            //this.service.tabf1=this.tabf1;


                            /////////////////////////////////////////////////////////////

                            resolve(data)
                        },
                        error => {
                            reject(error)
                        });
            })
        )
            ;
    }





    GetListScanner(functionName): Promise<any>{
        return new Promise(
            ((resolve,reject)=>{
                    this.http.post('https://127.0.0.1:7777/execute/scan',{'functionName': functionName},
                        {observe: 'body'})
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


}
