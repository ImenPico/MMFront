import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs/internal/Observable";
import {map} from "rxjs/operators";
import {ServiceFileService} from "../alfresco_services/service-file.service";
import {AlfrescoService} from "../alfresco_services/AlfrescoApi.service";
import {saveAs} from "file-saver";
import * as FileSaver from "file-saver";
import {FileUploader} from 'ng2-file-upload';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-uploadFileModule.component.html',
  styleUrls: ['./file-uploadFileModule.component.css']
})

export class FileUploadFileModuleComponent implements OnInit {
    mysite='0b7c529c-b09a-4651-b7cd-16a1b96b30d0';
    myvar: string ='6646cb31-9403-4c8e-8d8d-1b0023caf1b8';
    tableau : any[] = [];
    tab1=new Array();
    tab=new Array();

    test5:any=0;
    nameFile:any;
  filee:any;
    file:File;
  modelbookmarktab:any[]=[];
   result:any=false;
  uploadForm: FormGroup;
    toppings = new FormControl();
tableUrl:any[]=[];
    dataSource: any;

  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });


  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    public form: FormGroup;
    public Objet: AbstractControl;
    public Reference: AbstractControl;
    public Date: AbstractControl;
    public Organisation: AbstractControl;
    public Adresse : AbstractControl;
    public Expediteur : AbstractControl;
    public Corp : AbstractControl;
    public Model : AbstractControl;


  constructor(private fb: FormBuilder, private http: HttpClient,private servicefile:ServiceFileService,private alfresco:AlfrescoService) {
      this.getNodeChilds()

      this.form = fb.group({
          'Objet': ['', Validators.compose([Validators.required])],
          'Reference': ['', Validators.compose([Validators.required])],
          'Date': ['', Validators.compose([Validators.required])],
          'Organisation': ['', Validators.compose([Validators.required])],
          'Adresse': ['', Validators.compose([Validators.required])],
          'Expediteur': ['', Validators.compose([Validators.required])],
          'Corp': ['', Validators.compose([Validators.required])],
          'Model': ['', Validators.compose([Validators.required])]


      })
      this.Objet = this.form.controls['Objet'];
      this.Reference = this.form.controls['Reference'];
      this.Date = this.form.controls['Date'];
      this.Organisation = this.form.controls['Organisation'];
      this.Adresse=this.form.controls['Adresse'];
      this.Expediteur = this.form.controls['Expediteur'];
      this.Corp = this.form.controls['Corp'];
      this.Model=this.form.controls['Model']
      }

  ///////////////////////GetFile///////////////////////////
    public getNodeChilds() {
        //console.dir(this.myVar);
        this.alfresco.getNodeChilds(this.myvar).then(
            data => {
                console.dir(data.list.entries);
                this.dataSource = data.list.entries;
                console.log('tableau de model',this.dataSource)

            },
            error => console.log(error)
        )

    }

//
// //   uploadSubmit(obj,ref,adr,org,date,corp,exp) {
// //
// //       let JsonFile =
// //         {
// //         "Objet":obj,
// //         "Reference":ref,
// //         "Date":date,
// //         "Organisation":org,
// //         "Adresse":adr,
// //         "Expediteur":exp,
// //         "Corp":corp
// //         }
// //       console.log(JsonFile)
// //       let t= JSON.stringify(JsonFile);
// //       console.log ("json stringfy ", t );
// //       for (let i = 0; i < this.uploader.queue.length; i++) {
// //           const fileItem = this.uploader.queue[i]._file;
// //       }
// //
// //       for (let j = 0; j < this.uploader.queue.length; j++) {
// //           const data = new FormData();
// //           const fileItem = this.uploader.queue[j]._file;
// //
// //           data.append('doc', fileItem);
// //           data.append('data', t);
// //
// //           this.servicefile.uploadFile(data).subscribe((data:any) => {
// //
// //     console.log("file with templette ",data);
// //     this.blob = new File([data],'name.docx', {type: "application/msword"});
// //
// //
// //
// //     window.open(window.URL.createObjectURL(this.blob));
// //                   //this.alfresco.toUploadFiles(this.mysite, null, this.blob);
// //
// //
// // },
// //
// // error => console.log(error)
// // );
// //
// //
// // console.log("uploeded");
//
//
// // });
//
//
//       }
//       this.uploader.clearQueue();
//
//   }
//

    chargerdansalfresco(input){





    //  let file1= new FileReader()
    //     this.alfresco.toUploadFiles(data.entry.id, null, value);
    //
    //     console.log("uploeded");
    //     this.alfresco.getNodeChilds(data.entry.id).then((data1) => {
    //         console.log("unitid0");
    //         console.log(data1);
    //         this.unitid = data1.list.entries[0].entry.id;
    //         console.log("unitid");
    //         console.log(this.unitid);
    //     });





    }


  public remplirjson (obj,ref,adr,org,date,corp,exp,noderef) {

let n = noderef.indexOf("/");
     let nodref=  noderef.substring(0,n)
      console.log("nodref"+nodref);
     let name = noderef.substring(n+1,noderef.length) ;
     console.log("nameeeeeeeeeee"+name);





      let JsonFile =
          {
              "Objet": obj,
              "Reference": ref,
              "Date": date,
              "Organisation": org,
              "Adresse": adr,
              "Expediteur": exp,
              "Corp": corp
          }

      console.log(JsonFile)
      let t= JSON.stringify(JsonFile);
      console.log ("json stringfy ", t );


          const data = new FormData();

          data.append('data', t);
      data.append('node', nodref);
      data.append('name', name);
          this.servicefile.uploadFile(data).subscribe((data:any) => {

                  console.log("file with templette ",data);

console.log(data.valueOf()
) ;



                 // var newBlob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"});


console.log("thisssssssss"+this.file);

let filename="name.docx"
var blob =new Blob([data],{type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});

              console.log(this.file);

              FileSaver.saveAs(blob,name);



              },

              error => console.log(error)
          );


          console.log("uploeded");


// });



  }
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }


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
console.log('this tab',this.tableau);
         let file1= new FileReader()
            this.alfresco.toUploadFiles(this.mysite, null, this.tableau[0]);


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
  ngOnInit() {

    this.modelbookmarktab=this.servicefile.datasource;
    console.log("dff",this.modelbookmarktab);

    this.uploadForm = this.fb.group({
      document: [null, null],
      type: [null, Validators.compose([Validators.required])]
    });

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  }



























    telecharger(val) {
  console.log( val)
        console.log('id file',val)

        this.alfresco.getContentUrl(val)
            .then(
                (previewUrl: any) => {
                    console.log("previewUrl",previewUrl);
                    //window.open(previewUrl);
                }
            );

    }

}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



