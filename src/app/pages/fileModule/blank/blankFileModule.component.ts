import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Service} from "../alfresco_services/document-library.service";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {AlfrescoService} from "../alfresco_services/AlfrescoApi.service";
import {DxDataGridComponent,DxSelectBoxModule} from "devextreme-angular";
import {AddFoldaFileModuleComponent} from "./addFolda/addFoldaFileModule.component";
import {CostFileModuleComponent} from "./cost/costFileModule.component";
import {InfoPanelsFileModuleComponent} from "./info-panels/info-panelsFileModule.component";
import {InfoCardsFileModuleComponent} from "./info-cards/info-cardsFileModule.component";
import {ServiceFileService} from "../alfresco_services/service-file.service";
import {ImportVersionFileModuleComponent} from "./newVersion/importVersionFileModule.component";
import {ModalFileModuleComponent} from "../Modal_Scan/modalFileModule.component";
import {Router} from "@angular/router";
import {ImportVersionScannerComponent} from "./newVersionscanner/importVersionScanner.component";
import * as FileSaver from "file-saver";
import {FileuploadalfrescoComponent} from '../uploadFile/fileuploadalfresco.component';
import {DepartServiceService} from '../../../depart-service.service';
import {AuthentificationService} from "../../service/authentification.service";
import {ArriverService} from "../../service/arriver.service";

@Component({
    selector: 'app-blankFileModule',
    templateUrl: './blankFileModule.component.html',
    styleUrls: ['./blankFileModule.component.scss'],
    providers: [Service],
    encapsulation: ViewEncapsulation.None
})
export class BlankFileModuleComponent implements AfterViewInit {
    tabnameeee:any[]=[] ;
    typefile:any[]=[] ;
    namesplit:any ;

    droitacces=["personel","Application1"];
@ViewChild(FileuploadalfrescoComponent ,{ static: true}) fileuploadalfresco :FileuploadalfrescoComponent ;
    @ViewChild(DxDataGridComponent,{ static: true}) dataGrid: DxDataGridComponent;
    dossiersList: any[] = []; myVar: string;
    dataSource: any;
    parentFixId: any;
    positionName: any;
    positionId: any;public
    tabFileScan:any[]=[];
    blob:File;
    //tableau contenant name + node
    jsonUrl:any[]=[];
    nametab:any[]=[];
    selectedRows: String[];
    pdfSrc:any;
    file:File;
    tableCheck:any=[]=[];
    listeScanner:any[]=[];
    privilegeLec: boolean;
    public modalRef: NgbModalRef;
    private PathAlfresco:string;

    constructor(private alfresco: AlfrescoService, private modalService: NgbModal, private service: Service,private serviceFile:ServiceFileService,private router: Router,private ServiceDepart:DepartServiceService,private servicearriver:ArriverService)
    {
      //  this.myVar= sessionStorage.getItem("node");

        this.myVar= this.servicearriver.noderef
        this.PathAlfresco=this.servicearriver.PathAlfresco;
        console.log("blank ",this.myVar)

        // this.privilege=sessionStorage.getItem("privilege");
        // console.log(this.privilege);

        if (this.serviceFile.privilege=="lecteur") {

            console.log("privvvvv",this.serviceFile.privilege)
            this.privilegeLec=false ;

        }
        else {
            console.log("privvvvv222",this.serviceFile.privilege)
            this.privilegeLec=true;
        }



        //if(this.myVar==)
        //this.alfresco.loginWithUsernameAndPassword("admin","admin")
        if(this.myVar===null)
        this.getNodeChildsByPath();
        else
            this.getNodeChilds()


    }


    AfterViewInit() {
    }

    public getNodeChildsByPath() {
        //console.dir(this.myVar);
        // let path = "2019/12/CA/Dorsaf AYOUBI/CA-0000016";
        // this.myVar=path;
        console.log("eeeeeeeeeeeee", this.PathAlfresco);
        this.alfresco.getNodeChildswithPath('d44d73a3-439c-4ee1-a156-f71f259d0ae7',this.PathAlfresco).then(
            // this.alfresco.getNodeChilds(this.myVar).then(
            data => {
                console.log("testttttttttttttttttttttttttttttttttttt")
                console.dir(data.list.entries);
                this.dataSource = data.list.entries;

                console.log("this.nametab", this.nametab);
                this.parentFixId = this.PathAlfresco;

                //getNode Name
                this.alfresco.getNodeInfo(this.PathAlfresco).then(
                    (data:any) => {
                        console.dir("getNodeInfo",data);
                        this.positionName = data.name;
                        this.positionId = data.id;


                        localStorage.setItem('node',data.id)
                        localStorage.setItem('name',data.name)
                        this.jsonUrl[this.jsonUrl.length]={name:localStorage.getItem('name'),node:localStorage.getItem('node')};


                        console.log('tableaufinal',this.jsonUrl)
                    },
                    error => console.log(error)
                )
                console.log(this.parentFixId);

            },
            error => console.log(error)
        )

    }
    // getNode Child
    public getNodeChilds() {
        //console.dir(this.myVar);

        this.alfresco.getNodeChilds(this.myVar).then(
        // this.alfresco.getNodeChilds(this.myVar).then(
            data => {
                console.log("testttttttttttttttttttttttttttttttttttt")
                console.dir(data.list.entries);
                this.dataSource = data.list.entries;

                console.log("this.nametab", this.nametab);
                this.parentFixId = this.myVar;

                //getNode Name
                this.alfresco.getNodeInfo(this.myVar).then(
                    (data:any) => {
                        console.dir("getNodeInfo",data);
                        this.positionName = data.name;
                        this.positionId = data.id;


                        localStorage.setItem('node',data.id)
                        localStorage.setItem('name',data.name)
                        this.jsonUrl[this.jsonUrl.length]={name:localStorage.getItem('name'),node:localStorage.getItem('node')};


                        console.log('tableaufinal',this.jsonUrl)
                    },
                    error => console.log(error)
                )
                console.log(this.parentFixId);

            },
            error => console.log(error)
        )

    }
    //////////////////////deletefolder////////////////////////////////




//////////////////////////////////////////////////////////////////////////////
    //Show Children
    public children(e){
        console.log("children");
        console.dir(e);

        this.parentFixId = e.entry.id;
        this.positionName = e.entry.name;

        this.positionId = e.entry.id;

        localStorage.setItem('node',e.entry.id)
        localStorage.setItem('name',e.entry.name)


        if (!this.exit(this.jsonUrl,localStorage.getItem('node'))){
            // console.log("aaa")
            this.jsonUrl[this.jsonUrl.length] = {
                name: localStorage.getItem('name'),
                node: localStorage.getItem('node')

            };


        }



        console.log('table1',this.jsonUrl);

        //isFolder
        if(e.entry.isFolder) {
            console.log("isFolder");

        //      if (e.entry.name =="Personnel") {
        //
        //     this.alfresco.getNodeChilds(this.jsonUrl[this.jsonUrl.length].node).then(
        //         (data: any) => {
        //             console.log('listeeeeeeeeeeeee');
        //             console.dir(data.list.entries);
        //             this.dataSource = data.list.entries;
        //         },
        //         error => console.log(error)
        //     )
        // }
        // else {

                 this.alfresco.getNodeChilds(this.parentFixId).then(
                     (data: any) => {
                         console.log('listeeeeeeeeeeeee');
                         console.dir(data.list.entries);
                         this.dataSource = data.list.entries;
                     },
                     error => console.log(error)
                 )


             }


            // }
       // }
        //isFile
        else{
            console.log("isFile========",this.parentFixId.toString());

            this.alfresco.getContentUrl(this.parentFixId).then(
                (data:any) => {
                    console.dir(data);
                    window.open(data);
                },
                error => console.log(error)
            )
        }

    }


    exit(tab,value){
        let res=false;
        for(let i=0;i<tab.length;i++) {
            if (tab[i].node === value) {
                res=true;
            }



            else if ((tab[i].name)==="Personnel"){
                res=false;
            }


        }
        return res;
    }
    //Show details
    public showDetails(e){
        console.dir(e.entry);
        if(e.entry.isFolder){
            const modal= this.modalService.open(InfoPanelsFileModuleComponent, { size: 'lg', backdrop: 'static', keyboard: false });
            modal.componentInstance.data = e.entry;
        }
        // else{
        //     let splite=e.entry.name;
        //     let dox= splite.split(".",1);
        //     console.log(dox);
        //    if(dox[0]=='pdf'){
        //     const modal= this.modalService.open(VisitorsComponent, { size: 'lg', backdrop: 'static', keyboard: false });
        //     modal.componentInstance.data = e.entry;
        //    }
        else
        {
            this.alfresco.getContentUrl(e.entry.id)
                .then(
                    (previewUrl: any) => {
                        console.log(previewUrl);
                        this.pdfSrc = previewUrl;

                        console.dir(this.pdfSrc);
                       window.open(previewUrl);
                        //this.alfresco.downolodeFile(previewUrl);
                    }
                );
        }



    }

    //Open Modal Edit Details
    public editDetails(e){
        console.dir(e.entry);
        const modal= this.modalService.open(InfoCardsFileModuleComponent, { size: 'lg', backdrop: 'static', keyboard: false });
        modal.componentInstance.data = e.entry;
    }

    //Retour en arrière
    public returnBack() {
        console.log("returnBack");

        console.log(this.dataSource);

        if ((this.dataSource.length >= 1)) {
            console.log("length > 1 ");
            console.log("data source=====>",this.dataSource);
            let granParent;
            this.alfresco.getNodeInfo(this.dataSource[0].entry.parentId).then(
                (data:any) => {
                    console.dir(data);
                    granParent = data.parentId;

                    //Name node
                    this.alfresco.getNodeInfo(granParent).then(
                        (data:any) => {
                            console.dir("getNodeInfo data =======>",data);
                            this.positionName = data.name;

                            console.log("positionName recoit=====> ",this.positionName);
                            this.positionId = data.id;
                        },
                        error => console.log(error)
                    )

                    //Traitement
                    this.alfresco.getNodeChilds(granParent).then(
                        (data:any) => {
                            console.dir(data.list.entries);
                            this.dataSource = data.list.entries;
                        },
                        error => console.log(error)
                    )
                },
                error => console.log(error)
            )
        }

        // else if((this.dataSource.length >= 1)&&(this.dataSource[0].entry.id==(this.myVar))){
        //
        //
        //     this.alfresco.getNodeChilds(this.myVar).then((dataa:any)=>{
        //         console.log(dataa)
        //     }
        //
        //
        //     )
        // }



        else {
            console.log("No data");
            let granParent;
            //getNode GrandParent
            this.alfresco.getNodeInfo(this.parentFixId).then(
                (data:any) => {
                    console.dir(data);
                    granParent = data.parentId;

                    //Name node
                    this.alfresco.getNodeInfo(granParent).then(
                        (data:any) => {
                            console.dir(data);
                            this.positionName = data.name;

                            this.positionId = data.id;
                        },
                        error => console.log(error)
                    )

                    //Traitement
                    this.alfresco.getNodeChilds(granParent).then(
                        (data:any) => {
                            console.dir(data.list.entries);
                            this.dataSource = data.list.entries;
                        },
                        error => console.log(error)
                    )
                },
                error => console.log(error)
            )
        }
    }
    addFile(e)
    {
        const modal= this.modalService.open(CostFileModuleComponent, { size: 'lg', backdrop: 'static', keyboard: false });
        modal.componentInstance.data = this.myVar;
    }
    //Open Modal AddFolder
    public createFolder(){
        const modal= this.modalService.open(AddFoldaFileModuleComponent, { size: 'lg', backdrop: 'static', keyboard: false });
        modal.componentInstance.data = this.myVar;
    }

    //Open Modal UploadFile
    public uploadFile2(){
        //const modal2= this.modalService.open(ImportVersionScannerComponent, { size: 'lg', backdrop: 'static', keyboard: false });
        //modal2.componentInstance.data = this.parentFixId;
    }




    // deletef(e){
    //
    //
    //     this.deleteNode(e);
    // }


    //Delete Node
    public deleteNode(e){

        this.dataGrid.instance.getSelectedRowsData().then((rowData) => {

            for (var i = 0; i < rowData.length; i++) {
                console.log("dataRow",rowData[i].entry.id);
                this.alfresco.deleteNode(rowData[i].entry.id);
                // if(rowData[i].entry.isFile){
                //     this.serviceFile.deletePieceJointUniteId(rowData[i].entry.id)
                // }

            }


        });
    }
    // replace(e) {
    //     this.dataGrid.instance.getSelectedRowsData().then((rowData) => {
    //
    //             if (e.entry.isFile) {
    //
    //                 this.serviceFile.deletePieceJointUniteId(e.entry.id)
    //                 this.alfresco.deleteNode(e.entry.id);
    //             }
    //         const modal= this.modalService.open(CostFileModuleComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    //         modal.componentInstance.data = this.parentFixId;
    //
    //
    //
    //
    //     });
    // }
    // replacewithscanner(e){
    //
    //
    //     this.alfresco.deleteNode(e.entry.id);
    //     this.serviceFile.deletePieceJointUniteId(e.entry.id);
    //
    //
    //     this.config(e);
    //
    //
    //
    //
    //
    //
    //
    //
    // }


    //Lock Node
    public lockNode(e){
        console.dir(e.entry);
        this.alfresco.lockNode(e.entry.id,{
            "timeToExpire": 0,
            "type": "ALLOW_OWNER_CHANGES",
            "lifetime": "PERSISTENT"
        })
    }

    //Unlock Node
    public unlockNode(e){
        console.dir(e.entry.id);
        this.alfresco.unlockNode(e.entry.id);
    }

    //Move node
    public moveNode(e){
        console.dir(e.entry);
    }

    //Drag and Drop file


    //File Over
    public fileOver(event){
        console.log(event);
    }

    //File Leave
    public fileLeave(event){
        console.log(event);
    }

    //refresh
    public refreshDataGrid() {
        this.alfresco.getNodeChilds(this.positionId).then(
            data => {
                console.dir(data.list.entries);
                this.dataSource = data.list.entries;
                this.parentFixId = this.positionId;

                //getNode Name
                this.alfresco.getNodeInfo(this.positionId).then(
                    (data:any) => {
                        console.dir(data);
                        this.positionName = data.name;
                        this.positionId = data.id;
                    },
                    error => console.log(error)
                )
                console.log(this.parentFixId);
            },
            error => console.log(error)
        )
    }

    //Scan file
    // public scanFile(){
    //     console.log('nodeRef',this.parentFixId);
    //     console.log("scan");
    //     let file;
    //     //Service scan
    //     this.service.Scan('Acquire','KODAK Scanner: i900').then(res=>{
    //         console.log(res);
    //         const byteArray = new Uint8Array(atob(res.result.data).split('').map(char => char.charCodeAt(0)));
    //         //const f1=  new File([byteArray],Math.random().toString(36), {type: 'application/pdf' });
    //         this.blob = new File([byteArray],Math.random().toString(36), {type: 'application/pdf'});
    //         this.tabFileScan.push(this.blob);
    //         var fileURL = URL.createObjectURL(this.blob );
    //        window.open(fileURL);
    //        console.log('tableScan',this.tabFileScan);
    //         for(let i=0;i<this.tabFileScan.length;i++){
    //             this.alfresco.toUploadFiles(this.parentFixId, null, this.tabFileScan[i]);
    //         }
    //
    //     })
    // }
    onChange(e){

        this.tableCheck=e.entry.id;


        console.log("tableBox",this.tableCheck);


    }


    downloade(e){
        this.dataGrid.instance.getSelectedRowsData().then((rowData) => {
            console.log(rowData[0].entry.content.mimeType);

            for (var i = 0;i < rowData.length; i++) {
                console.log(rowData[i].entry.content.mimeType);

                if (rowData[i].entry.isFile) {
                    // this.alfresco.downlodeFile(rowData[i].entry.id)
                    //   .then(
                    //     (previewUrl: any) => {
                    //         console.log(previewUrl);
                    if (rowData[i].entry.content.mimeType == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {

                        console.log("innnnnnnnnnn");

                        this.alfresco.downlodeFile(rowData[i].entry.id)
                            .then(
                                (previewUrl: any) => {
                                    console.log(previewUrl);
                                    var blob = new Blob([previewUrl], {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
                                    //
                                    FileSaver.saveAs(blob, rowData[i].entry.name);

                                }
                            );
                    } else if (rowData[i].entry.content.mimeType == "application/pdf") {


                        this.alfresco.downlodeFile(rowData[i].entry.id)
                            .then(
                                (previewUrl: any) => {
                                    console.log(previewUrl);


                                    var blobpdf = new Blob([previewUrl], {type:'application/pdf'});

                                    FileSaver.saveAs(blobpdf,rowData[i].entry.name);

                                }
                            );

                    }


                    //   }
                    // );
                }
            }





        });
    }



    getChildrenUrl(e)
    {
        console.dir(e);

        this.parentFixId = e;
        this.positionId = e;

        //isFolder
        if(e){
            console.log("isFolder");
            this.alfresco.getNodeChilds(this.parentFixId).then(
                (data:any) => {
                    console.log('listeeeeeeeeeeeee');
                    console.dir(data.list.entries);
                    this.dataSource = data.list.entries;
                },
                error => console.log(error)
            )
            let index;

            for(let i=0;i<this.jsonUrl.length;i++){
                if(this.jsonUrl[i].node==e){
                    index=i
                    console.log('index',index);
                    this.jsonUrl.splice(index+1);

                }


            }

        }
        //isFile
        else{
            console.log("isFile========",this.parentFixId.toString());

            this.alfresco.getContentUrl(this.parentFixId).then(
                (data:any) => {
                    console.dir(data);
                    window.open(data);
                },
                error => console.log(error)
            )
        }


    }

    getModel(){

        this.alfresco.getmodel();
        console.log('getModel',this.alfresco.getmodel());
    }

    importwithnewversionscanner(e){


        this.scanfile(e);

    }
    downlodeFile(e){
        this.alfresco.getContentUrl(e.entry.id)
            .then(
                (previewUrl: any) => {
                    console.log(previewUrl);
                    this.pdfSrc = previewUrl;
                    console.dir(this.pdfSrc);
                    window.open(previewUrl);
                    //this.alfresco.downolodeFile(previewUrl);
                }
            );
    }



    importwithnewversion(e){

        const modal= this.modalService.open(ImportVersionFileModuleComponent, { size: 'lg', backdrop: 'static', keyboard: false });
        modal.componentInstance.data = e.entry.id;
        modal.componentInstance.type=e.entry.content.mimeType;

    }

    scannerversionning(e){
        let scannerversionning="scannerversionning";
        this.serviceFile.scannerversionning=scannerversionning ;
        this.serviceFile.nodrefcurrent=e.entry.id;
        this.serviceFile.minetype=e.entry.content.mimeType;
        this.fileuploadalfresco.onAcquireImagee(e);
    }

    scanfile(e){
        let edit="edit" ;
        //let scannerversionning="scannerversionning";
        this.serviceFile.edit=edit ;
        //this.serviceFile.scannerversionning=scannerversionning ;

        this.fileuploadalfresco.onAcquireImagee(e);

    }

    // configg(e) {
    //     console.log(e.entry);
    //
    //
    //     this.service.GetListScanner('GetListScanner').then(res => {
    //         console.log("getlistscanner innnnnn");
    //
    //         console.log("res", res);
    //
    //
    //         for (let i = 0; i < res.result.length; i++) {
    //             console.log("in");
    //             this.listeScanner[i] = res.result[i];
    //         }
    //
    //
    //
    //
    //         this.modalRef = this.modalService.open(ModalFileModuleComponent, {size: 'lg'});
    //         this.modalRef.componentInstance.data=this.parentFixId;
    //         console.log(this.modalRef.componentInstance.data);
    //         this.modalRef.componentInstance.dataList=this.listeScanner;
    //     });
    // }



    // config1(e) {
    //     console.log(e.entry);
    //
    //
    //     this.service.GetListScanner('GetListScanner').then(res => {
    //         console.log("getlistscanner innnnnn");
    //
    //         console.log("res", res);
    //
    //
    //         for (let i = 0; i < res.result.length; i++) {
    //             console.log("in");
    //             this.listeScanner[i] = res.result[i];
    //         }
    //
    //
    //
    //
    //         this.modalRef = this.modalService.open(ImportVersionScannerComponent, {size: 'lg'});
    //         this.modalRef.componentInstance.data1=e.entry.id;
    //         console.log(this.modalRef.componentInstance.data);
    //         this.modalRef.componentInstance.dataList=this.listeScanner;
    //         this.modalRef.componentInstance.type=e.entry.content.mimeType;
    //     });
    // }

    importmodel(){
        this.router.navigate(['pages/word'])

    }



    onToolbarPreparing(e) {


        // e.toolbarOptions.visible=false ;
        e.toolbarOptions.items.unshift({
                // location: 'before',
                // widget: 'dxButton',
                // options: {
                //     //icon: 'back',
                //     //onClick: this.returnBack.bind(this)
                // }
            }
            ,
            {
                location: 'before',
                template: 'Nodeposition',
            }
            // ,{
            //     location: 'after',
            //     widget: 'dxButton',
            //     options: {
            //         icon: 'bookmark',
            //         hint: 'import model',
            //         onClick: this.importmodel.bind(this)
            //     }
            // }
            ,
            {

                visible:this.privilegeLec ,
                location: 'after',
                widget: 'dxButton',
                options: {
                    icon: './../../../assets/img/app/imgscanne.jpg',
                    hint: 'Scan file',
                    onClick: this.scanfile.bind(this),

                }
            },{
                visible:this.privilegeLec ,
                location: 'after',
                widget: 'dxButton',
                options: {
                    icon: 'folder',
                    hint: 'Create folder',
                    onClick: this.createFolder.bind(this)
                }
            }
            //   ,
            // {
            //       location: 'after',
            //       widget: 'dxButton',
            //       options: {
            //           icon: 'download',
            //           hint: 'downlode file',
            //           onClick: this.downloade.bind(this)
            //       }
            //   }
            ,
            {
                visible:this.privilegeLec ,
                location: 'after',
                widget: 'dxButton',
                options: {
                    icon: 'trash',
                    hint: 'delete',
                    onClick: this.deleteNode.bind(this)
                }
            },{
                visible:this.privilegeLec ,
                location: 'after',
                widget: 'dxButton',
                options: {
                    icon: 'doc',
                    hint: 'Add file',
                    onClick: this.addFile.bind(this)
                }
            },
            {
                location: 'after',
                widget: 'dxButton',
                options: {
                    icon: 'refresh',
                    onClick: this.refreshDataGrid.bind(this)
                }
            })
    }

    ngAfterViewInit(): void {
    }



}
export class Url {
    name: String;
    node: String;
}




