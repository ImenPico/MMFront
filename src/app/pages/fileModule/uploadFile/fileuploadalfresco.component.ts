import {
    Component,
    ViewEncapsulation,
    ChangeDetectorRef,
    ViewChild,
    TemplateRef,
    Output,
    EventEmitter,
    Input,
    ElementRef
} from '@angular/core';
import {NgbActiveModal, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {AbstractControl, FormControl, FormGroup} from "@angular/forms";
import {ServiceFileService} from '../alfresco_services/service-file.service';


import {AlfrescoService} from '../alfresco_services/AlfrescoApi.service';
import {AuthentificationService} from '../../service/authentification.service';

@Component({
    selector: 'app-fileuploadalfresco',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './fileuploadalfresco.component.html',
    styleUrls: ['./fileuploadalfresco.component.scss'],

})

export class FileuploadalfrescoComponent{
    @ViewChild('namefileModel' ,{static :false} ) namefileModel: TemplateRef<any>;
@Input () parametreedit
@Input () scannerversionning;
@Input () nodrefcurrent ;

    @Input () minetype ;
    @Input() paramscanner: any;
    // @Input() nameeeee: any;
    datauserprofile:any;


    menu1:any;
    modalReference: NgbModalRef;
    name1:any;
    public images: string[] = [];
    tab2 :any[]=[];
    arraybuffer:any;
    events: Array <string> = [];
    namefilescan:any='';
    tableau :any []=[] ;
    tabb:any []=[];
    tableauname :any[]=[];
    tableaufile : any[]=[] ;
    tabaux:any []=[];
    alfres: any;
    nameF:any;
    typef : any ;
    color: any;
    nodeRef:any
    word:boolean =false;
    test:boolean =true;
    selectedRows: String[];
    note:string;
    nb:any ;
    interFile:File;
    varo:any;
    var1:any;
    var2:any;
    aux:any;
    tab=new Array();
    tab1=new Array();
    pieceJoinNom: any = ["cin","passport","autre"];
    fileReader:any;
    public modalRef: NgbModalRef;
    //  PiceJoint:PieceJointModel;
    test5:any=0;
    JsonPieceJointe: any ;
    public date:AbstractControl;
    public numero:AbstractControl;
    public lieu:AbstractControl;
    public number:AbstractControl;
    hiddenNameFile:boolean=false;
    form= new FormControl();
    testtab:any=[];
    index:any;
    pdfsrc:any ;
    public testscann:boolean=false;
    public  testclosemodal:boolean=false;
    pieceJoinNom1: any;
    constructor( private changeDetectorRef: ChangeDetectorRef, private modal: NgbModal,public modalService: NgbModal,private serviceFile:ServiceFileService,private  authservice : AuthentificationService,private alfrescofilemodule : AlfrescoService ){
    this.images = [];
    this.tab = [];
    this.note = "";
    console.log("inter ", this.interFile)
    this.serviceFile.tableauFile = this.tableaufile
    console.log("table", this.pieceJoinNom);
    console.log("1");

    this.pieceJoinNom1=[
    {
            NomFile:[]
     },
        ]

console.log("tableeDataGrid",this.pieceJoinNom1);
    }

    ngOnInit() {}

    base64ToArrayBuffer(base64) {
        var binary_string =  window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array( len );
        for (var i = 0; i < len; i++)        {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }




    click(index){
        console.log("index",index)
        //this.index=index
        console.log("indexOf",this.pieceJoinNom1.indexOf(index));
        this.index=this.pieceJoinNom1.indexOf(index)

        console.log("this.index clik",this.index);
        //this.pieceJoinNom1[this.index].NomFile=this.tab2;
    }



    fileChange(input){

        this.tableau=[];
        this.hiddenNameFile=false;
        console.log("filesssss", input.files);

        this.readFiles(input.files);
        let tab=[]

        for (let t of  input.files) {
            tab[tab.length]=t.name
            console.log("t:    ", t);
            this.tableau[this.tableau.length]=t;
            }
        console.log("aaaa",tab)

       // this.tab2.push(tab);

        //this.tab2.push(this.namefilescan);
        this.pieceJoinNom1[this.index].NomFile=tab;

        //this.tableau= input.files;
        // let long=tab.length;
        //
        // console.log("tableauuu",this.tableau);
        // if(tab.length>1) {
        //     for (let j = 0; j < tab.length; j++) {
        //
        //
        //         tab = `${long}fichiers`;
        //
        //
        //     }
        // }

       // console.log("tabbbbb2222",tab);

        this.tableaufile[this.index]=this.tableau ;
        this.testtab[this.index]=tab;
        console.log("2");



        ///this.pieceJoinNom1.NomFile=this.testtab
        console.log("tableauuuu dataGrid",this.testtab);

        console.log("tableauuuu dataGrid",this.pieceJoinNom1);



    }



    readFiles(files, index=0){
        let reader = new FileReader();
        if (index in files){

            //this.testscan=false;
            this.readFile(files[index], reader, (result) =>{


                this.readFiles(files, index+1);
            });

        }else{
            this.changeDetectorRef.detectChanges();
            }
    }
    scan(name){
console.log("nodrefcurrent",this.serviceFile.nodrefcurrent);
                    this.serviceFile.Scan('Acquire', this.datauserprofile.nomscanner, 'false', '1', this.datauserprofile.typedudocument, this.datauserprofile.rectoverso, this.datauserprofile.resolution, this.datauserprofile.mode, '1', this.datauserprofile.tailledufichier).then(res => {
                         console.log("res", res);
                        this.testscann=true;
                        // this.name1 = name.substring(0, name.lastIndexOf('.'));
                        this.namefilescan=name+'.pdf'
                         const byteArray = new Uint8Array(atob(res.result.data).split('').map(char => char.charCodeAt(0)));
                         const f1 = new File([byteArray],   this.namefilescan, {type: 'application/pdf'});
                         console.log(f1);


                       this.arraybuffer=this.base64ToArrayBuffer(res.result.data);
if(this.paramscanner=="fileuploadalfresco") {
    console.log("fileuploadalfresco");
    this.tab2.push(this.namefilescan);
    this.tableaufile[this.index] = f1;
    this.pieceJoinNom1[this.index].NomFile = this.namefilescan;
}
             if(this.serviceFile.edit=="edit"){
                 console.log("inn upload en mode edit in cuurent node");
                 this.alfrescofilemodule.toUploadFiles(this.serviceFile.currentItem,null,f1);


             }

                        if(this.serviceFile.scannerversionning=="scannerversionning"){
                    console.log("inn upload en mode edit in cuurent node scannerversionning ");
                    this.serviceFile.uploadnewversion(f1,"workspace://SpacesStore/"+this.serviceFile.nodrefcurrent,"application/pdf").subscribe((data: any) => {
                        console.log("response uploadnew version ", data);
                    });

                }






                         })}


    pdfviewerr(){
        this.pdfsrc=this.arraybuffer;
        }
    removeImage(tab,index):void{
        this.index=this.pieceJoinNom1.indexOf(index);
        //this.tab2[this.index]="";
        this.pieceJoinNom1[this.index].NomFile=""
        console.log("taableau file",this.tableau)
        console.log("taableau name",this.testtab)
        this.var1=index ;
        this.hiddenNameFile=true;
        console.log("tabeauxxxxx",tab,index);
       // console.log("tableau inital",this.tab);
       //  for(let i of this.testtab){
       //      if(i===tab)
       //  }

        for(let i=0;i<this.testtab.length;i++){
            console.log("indexx",this.testtab[i]===tab)
            if(this.testtab[i]===tab){

               this.testtab[index]=[];
            }
            console.log("deletet element table testtab",this.testtab);
        }
        // for(let j=0;j<this.tableau[j].length;j++){
        //
        // }

        this.tableaufile[index]=[];
        console.log("deletet element table tableaufile",this.tableaufile);

      //  this.click(index);

    }

    readFile(file, reader, callback){
        reader.onload = () => {
            callback(reader.result);
        }
        reader.readAsDataURL(file);


        console.log(reader);
    }

//     showDetail(e,pdfContent){
// console.log(this.tableaufile[this.index])
//       //  this.pdfsrc=this.tableaufile[this.index]
//         this.modalReference = this.modal.open(pdfContent, {container: '.app'})
//         let reader = new FileReader();
//         reader.onload = function (e) {
//             document.getElementById('blah').setAttribute('src', reader.result);
//
//         }
//
//         reader.readAsDataURL(this.tableaufile[this.index]);
//     }
//

    onAcquireImagee(e){

        this.serviceFile.getuserprofile( localStorage.getItem("username")).then(
            data => {

              console.log(data);

/// le if du null ici
// test if profile exist
                if (data==null){


    document.getElementById("tt").click();

                }
                else {
// else open modal file name

                    this.click(e);
                    this.datauserprofile=data;
                    this.testclosemodal=true;
                    this.modalReference = this.modal.open(this.namefileModel, {size: 'lg'})
                    // this.modalReference.componentInstance.parametreedit=this.serviceFile.edit;
                    // this.modalReference.componentInstance.scannerversionning=this.serviceFile.scannerversionning;
                    // this.modalReference.componentInstance.nodrefcurrent=e.entry.id;
                    // this.modalReference.componentInstance.minetype= e.entry.content.mimeType
if (
document.getElementById("modalscan").isConnected
                ){
                        this.pdfsrc="";
                        this.testscann=false;
                    }
                }


            },
            error => console.log(error)
        )
    }
    addrow(){
        this.menu1=[];
        this.pieceJoinNom1.forEach(item=> {
            let menu = {
                nomfile: item.NomFile
            }
            console.log("menuuuuuuuu",menu) ;
            this.menu1.push(menu);
            // var d = new Date();
            //     this.pieceJoinNom1.push({
            //                 id: d.getTime(),
            //                 name: "",
            //                 NomFile: []
            //             });
        })
        console.log("menu1",this.menu1);
                let i =0 ;
                let test=false;
                do{
                    test=true
                    if((this.menu1[i].nomfile.length===0)) {

                        console.log("block g")
                        test=false;
                    }
                    i++;
                }while((test===true) && (i<this.menu1.length));
                if(test===true){
                    var d = new Date();
                    this.pieceJoinNom1.push({
                        id: d.getTime(),
                        NomFile: []
                    });
                }
    }

    onToolbarPreparing(e) {
        e.toolbarOptions.items.unshift({
            location: 'before',
            widget: 'dxButton',
            options: {
                icon: 'add',
                onClick: this.addrow.bind(this)

            }
        })
            this.addrow.bind(this);
    }
}
