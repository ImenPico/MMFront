import { Component, Input, OnInit } from '@angular/core';

import {NgbModal, NgbActiveModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

import {PieceJointModel} from "../alfresco_services/model";
import {AlfrescoService} from "../alfresco_services/AlfrescoApi.service";
import {ServiceFileService} from "../alfresco_services/service-file.service";
import {Service} from "../alfresco_services/document-library.service";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserProfile} from './userprofile';
import {AuthentificationService} from '../../service/authentification.service';

// import * as FileSaver from "file-saver";
// import * as base64 from "base64topdf";

@Component({
    selector: 'app-modal',
    templateUrl: './modalFileModule.component.html',
    styleUrls: ['./modalFileModule.component.scss']
})
export class ModalFileModuleComponent implements OnInit {
    userprofile : UserProfile;
    @Input() data;
    @Input() dataList;
    @Input() type;
    pieceJointModel: PieceJointModel;
    resultt: string;
    result = '';
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    charactersLength: number = this.characters.length;

    Resolution = ["100", "150", "200", "240", "250", "300", "400", "600", "1200"];
    tabf1: any [] = [];
    rectoverso:any='';

    public responseData1: any;
    public responseData2: any;
    public modalRef: NgbModalRef;
    variableb = false;
    name1: any;
    var: any;
    f1: File;
    test: boolean;
    nomscanner: string;
    Listscanner: any[] = [];
    message: string;
    marked = false;
    // test:boolean=false;
    theCheckbox2 = false;
    theCheckbox = false;
    selectedScannerName: any;
    SetIndicators: any;
    SetHideUI: any;
    fileType: any;
    EnableDuplex: any;
    SetResolutionInt: any;
    SetPixelType: any;
    SetBitDepth: any;
    SetPaperSize: any;
dataaaa:any ;
    public form: FormGroup;
    public namescanner: AbstractControl;
    public Typedudocument: AbstractControl;
    public resolution: AbstractControl;
    public tailledufichier: AbstractControl;
    public Nomfichier : AbstractControl;

    Acquire = {

        selectedScannerName: '',
        SetIndicators: '',
        SetHideUI: '',
        fileType: '',
        EnableDuplex: '',
        SetResolutionInt: '',
        SetPixelType: '',
        SetBitDepth: '',
        SetPaperSize: '',
        fileName:''
    };


    constructor(
        public activeModal: NgbActiveModal,private authservice :AuthentificationService, public modalService: NgbModal, public service: Service, private alfresco: AlfrescoService, private serviceFile: ServiceFileService, fb: FormBuilder
    ) {

        this.pieceJointModel = {
            id_piece_joint: "",
            fileName: null,
            fileType: null,
            nodeRef: null,
            size: 0,
            uniteId: null

        }

        this.userprofile= {
            login: "",
            nomscanner: "",
            mode: "",
            rectoverso: "",
            resolution: "",
            typedudocument:"",
            tailledufichier:""
        }



        this.form = fb.group({
            'namescanner': ['', Validators.compose([Validators.required])],
            'Typedudocument': ['', Validators.compose([Validators.required])],
            'resolution': ['', Validators.compose([Validators.required])],
            'tailledufichier': ['', Validators.compose([Validators.required])],



        });
        this.namescanner = this.form.controls['namescanner'];
        this.Typedudocument = this.form.controls['Typedudocument'];
        this.resolution = this.form.controls['resolution'];
        this.tailledufichier = this.form.controls['tailledufichier'];

        this.service.data = this.data;

    }

    ngOnInit() {


        this.Listscanner = this.dataList;
        console.log("ListScannerfinal", this.Listscanner);


    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

////////////////////reuperation valeur boolean case a cocher Assistant/////////////
    toggleVisibility(e) {
        this.marked = e.target.checked;
        console.log(this.theCheckbox);
        console.log(this.theCheckbox2);


    }


    onAcquire(selectedScannerName, fileType, SetResolutionInt, SetPaperSize) {

        this.userprofile.nomscanner=selectedScannerName;
        this.userprofile.login= sessionStorage.getItem("datalogin")
        this.userprofile.tailledufichier=SetPaperSize;
        this.userprofile.typedudocument=fileType;
        this.userprofile.resolution=SetResolutionInt;
////////////////recuperation des valeurs des champs du modal //////////////////////////////


        var ele = document.getElementsByName('radio');
        console.log("ele+++++++")
        console.dir(ele);
        console.log("ele length+++++++")
        console.log(ele.length);
        //  const input =ele [0] as HTMLInputElement;
        for (let i = 0; i < ele.length; i++) {
            let input = ele [i] as HTMLInputElement;
            console.log("ele[i]+++++++");
            console.dir(ele[i]);
            if (input.checked)

            this.userprofile.mode = input.value;
        }






        var ele1 = document.getElementsByName('radio1');
        for (let i = 0; i < ele1.length; i++) {
            var input = ele1 [i] as HTMLInputElement;
            if (input.checked) {
                this.rectoverso='1';

            } else {
                this.rectoverso='0';

            }
        }
        this.userprofile.rectoverso=this.rectoverso;



        if (this.theCheckbox == true) {

        } else {

        }









//         this.service.Scan('Acquire', this.Acquire.selectedScannerName, this.Acquire.fileType, this.Acquire.EnableDuplex, this.Acquire.SetResolutionInt, this.Acquire.SetPixelType, this.Acquire.SetPaperSize).then(res => {
//             //let j =
//             console.log("helmi resss scanner base 64 ", res);
//             console.log("scan scan ")
//             console.log(this.Acquire.EnableDuplex);
//             console.log(this.Acquire.SetPixelType);
//
//
//
//
//           // let decodedBase64 = base64.base64Decode('base64Str', 'PdfFileNameToWrite');
//
//
//             const byteArray = new Uint8Array(atob(res.result.data).split('').map(char => char.charCodeAt(0)));
//             const f1 = new File([byteArray], fileName+'.pdf', {type: 'application/pdf'});
//
//             console.log(f1);
//
// //Math.random().toString(36)
//
//
//             this.tabf1.push(f1);
//             console.log("helmi tab scanner",this.tabf1);
//             this.service.tabf1 = this.tabf1;
//
//             this.variableb = true;
//
//                 this.alfresco.toUploadFiles(this.data, null, f1);
//
//
//
//
//             ////save to database///////////////
//             alert("waiting")
//             this.alfresco.getNodeChilds(this.data).then((data1) => {
//
//                 console.log("2");
//                 console.log("unitid0");
//                 console.log(data1);
//
//
//                 for (let i = 0; i < data1.list.entries.length; i++) {
//
//                     if (f1.name == data1.list.entries[i].entry.name) {
//                         this.pieceJointModel.fileName = data1.list.entries[i].entry.name;
//                         this.pieceJointModel.size = data1.list.entries[i].entry.content.sizeInBytes;
//                         this.pieceJointModel.fileType = data1.list.entries[i].entry.content.mimeTypeName;
//                         this.pieceJointModel.nodeRef = data1.list.entries[i].entry.parentId;
//                         this.pieceJointModel.uniteId = data1.list.entries[i].entry.id;
//                         console.log("modelPieceJoint", this.pieceJointModel);
//                         this.serviceFile.savePieceJoint(this.pieceJointModel).subscribe(
//                             data => {
//                                 console.log('data save:', data);
//                                 this.clear();
//                             },
//                             error => console.log(error)
//                         );
//                     }
//                 }
//
//             });
//
//
//         })


        this.serviceFile.saveUserProfil(this.userprofile).subscribe(
            data => {
                console.log('data save:', data);
                this.clear();

            },
            error => console.log(error)
        );



    }

}
