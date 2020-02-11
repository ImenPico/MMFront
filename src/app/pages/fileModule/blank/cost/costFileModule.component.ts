import { Component, ViewEncapsulation, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {AlfrescoService} from "../../alfresco_services/AlfrescoApi.service";
import {PieceJointModel} from "../../alfresco_services/model";
import {ServiceFileService} from "../../alfresco_services/service-file.service";
import {interval, of, timer} from "rxjs";
import {delay, delayWhen, startWith} from "rxjs/operators";


import { mergeMap } from 'rxjs/operators';
@Component({
  selector: 'app-cost',
  templateUrl: './costFileModule.component.html',
  encapsulation: ViewEncapsulation.None
})

export class CostFileModuleComponent {
    message:string;
    tableau : any[] = [];
    interFile:File;
    tab=new Array();
    tab1=new Array();
    test5:any=0;
    nameFile:any;

    blob:File

    r:any;
    public settings: any;
    pieceJointModel:PieceJointModel;
  constructor(public activeModal: NgbActiveModal,private alfresco: AlfrescoService,private serviceFile:ServiceFileService) {
      this.pieceJointModel={
          id_piece_joint: "",
          fileName: null,
          fileType: null,
          nodeRef: null,
          size: 0,
          uniteId: null

      }
  }
  
  @Input() data;
  public file:any;

    //Upload File
    onAddFile(filetoUpload) {


        this.alfresco.toUploadFiles(this.data, null, this.tableau[0])

        for (let t of  this.tableau) {
            console.log("t:    ", t);
            console.log(t.name);
            this.nameFile=t.name;
        }
//alert('wating')
        this.alfresco.getNodeChilds(this.data).then((data1) => {


                console.log("unitid0");
                console.log(data1);


                // for (let i = 0; i < data1.list.entries.length; i++) {
                //     if (this.nameFile == data1.list.entries[i].entry.name) {
                //         this.pieceJointModel.fileName = data1.list.entries[i].entry.name;
                //         this.pieceJointModel.size = data1.list.entries[i].entry.content.sizeInBytes;
                //         this.pieceJointModel.fileType = data1.list.entries[i].entry.content.mimeTypeName;
                //         this.pieceJointModel.nodeRef = data1.list.entries[i].entry.parentId;
                //         this.pieceJointModel.uniteId = data1.list.entries[i].entry.id;
                //         console.log("modelPieceJoint", this.pieceJointModel);
                //         this.serviceFile.savePieceJoint(this.pieceJointModel).subscribe(
                //             data => {
                //                 console.log('data save:', data);
                //                 this.clear();
                //             },
                //             error => console.log(error)
                //         );
                //     }
                // }
            this.clear();
            });



    }
    //Change File
    fileChange(input){
        this.tableau=[]=[];
        console.log("filesssss", input.files);
        //this.alfresco.pathAlfersco=[];
        this.readFiles(input.files);

        console.log("this.tableau ", this.tableau);


        for (let t of  input.files) {
            console.log("t:    ", t);

            console.log(this.tableau);

            this.tableau.push(t);

        }

        console.log("tab111111111111");
        console.log(this.tab1);


        this.tableau= input.files;


    }
    readFile(file, reader, callback){
        reader.onload = () => {
            callback(reader.result);
        }
        reader.readAsDataURL(file);

        console.log("tttttttttttttttttttttttttttt");
        console.log(reader);
    }

    readFiles(files, index=0){
        let reader = new FileReader();
        let j=this.tab.length;
        if (index in files){
            this.readFile(files[index], reader, (result) =>{
                console.log(files[index].name);
                this.tab[j]=files[index].name;
               // this.images.push(result);
                this.tab1[j]=files[index];
                this.test5++;
                //  this.tab[index]=result;
                this.readFiles(files, index+1);
            });
        }else{
           // this.changeDetectorRef.detectChanges();

        }

    }


    //Remove File
    removeFile():void{
        this.file = '';
    }

    //Close Modal
    clear() {
      this.activeModal.dismiss('cancel');
    }
}
