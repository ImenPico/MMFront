import { Component, ViewEncapsulation, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {AlfrescoService} from "../../alfresco_services/AlfrescoApi.service";
import {PieceJointModel} from "../../alfresco_services/model";
import {ServiceFileService} from "../../alfresco_services/service-file.service";
@Component({
  selector: 'app-cost',
  templateUrl: './importVersionFileModule.component.html',
  encapsulation: ViewEncapsulation.None
})

export class ImportVersionFileModuleComponent {
    tableau : any[] = [];
    interFile:File;
    tab=new Array();
    tab1=new Array();
    test5:any=0;

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
  @Input() type;
  public file:any;

    //Upload File
    onAddFile(filetoUpload) {
        console.log("this.type helmi ",this.type);
console.log("this.data helmi ",this.data);
console.log("this.tableau [0] helmi ",this.tableau[0]);
    this.serviceFile.uploadnewversion(this.tableau[0],"workspace://SpacesStore/"+this.data,this.type).subscribe((data:any) => {
        console.log("response uploadnew version ", data);
    });
this.clear();
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
