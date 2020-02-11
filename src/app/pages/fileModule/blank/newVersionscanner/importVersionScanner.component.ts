import { Component, ViewEncapsulation, Input } from '@angular/core';

import {NgbActiveModal, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {AlfrescoService} from "../../alfresco_services/AlfrescoApi.service";
import {PieceJointModel} from "../../alfresco_services/model";
import {ServiceFileService} from "../../alfresco_services/service-file.service";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Service} from "../../alfresco_services/document-library.service";
@Component({
  selector: 'app-cost',
  templateUrl: './importVersionScannerFileModule.component.html',
  encapsulation: ViewEncapsulation.None
})

export class ImportVersionScannerComponent {
    @Input() data1;
    @Input() dataList;
    @Input() type;
    pieceJointModel: PieceJointModel;
    resultt: string;
    result = '';
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    charactersLength: number = this.characters.length;

    Resolution = ["100", "150", "200", "240", "250", "300", "400", "600", "1200"];
    tabf1: any [] = [];

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
        public activeModal: NgbActiveModal, public modalService: NgbModal, public service: Service, private alfresco: AlfrescoService, private serviceFile: ServiceFileService, fb: FormBuilder
    ) {

        this.pieceJointModel = {
            id_piece_joint: "",
            fileName: null,
            fileType: null,
            nodeRef: null,
            size: 0,
            uniteId: null

        }


        this.form = fb.group({
            'namescanner': ['', Validators.compose([Validators.required])],
            'Typedudocument': ['', Validators.compose([Validators.required])],
            'resolution': ['', Validators.compose([Validators.required])],
            'tailledufichier': ['', Validators.compose([Validators.required])],
            'Nomfichier':['', Validators.compose([Validators.required])]


        });
        this.namescanner = this.form.controls['namescanner'];
        this.Typedudocument = this.form.controls['Typedudocument'];
        this.resolution = this.form.controls['resolution'];
        this.tailledufichier = this.form.controls['tailledufichier'];
        this.Nomfichier=this.form.controls['Nomfichier']

        this.service.data = this.data1;

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


    onAcquire(selectedScannerName, fileType, SetResolutionInt, SetPaperSize,fileName) {


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
                this.Acquire.SetPixelType = input.value;
        }

        console.log(this.Acquire.SetPixelType);


        this.Acquire.selectedScannerName = selectedScannerName;
        this.Acquire.fileType = fileType;
        var ele1 = document.getElementsByName('radio1');
        for (let i = 0; i < ele1.length; i++) {
            var input = ele1 [i] as HTMLInputElement;
            if (input.checked) {
                this.Acquire.EnableDuplex = '1';
            } else {
                this.Acquire.EnableDuplex = '0';
            }
        }

        if (this.theCheckbox == true) {
            this.Acquire.SetHideUI = '0';
        } else {
            this.Acquire.SetHideUI = '1';
        }

        this.Acquire.SetResolutionInt = SetResolutionInt;
        this.Acquire.SetPaperSize = SetPaperSize;
        console.log("nameeeeeee" + this.Acquire.selectedScannerName);
        console.log("fileTypeeeeeeeee" + this.Acquire.fileType);
        console.log("pixeltypeeeeeeeee" + this.Acquire.SetPixelType);
        console.log("enableduplexxxxxx" + this.Acquire.EnableDuplex);
        console.log(this.Acquire.SetResolutionInt);
        console.log(this.Acquire.SetPaperSize);
        if (this.theCheckbox2) {
            this.Acquire.SetIndicators = 'true';
        } else {
            this.Acquire.SetIndicators = 'false';
        }


        this.service.Scan('Acquire', this.Acquire.selectedScannerName, this.Acquire.fileType, this.Acquire.EnableDuplex, this.Acquire.SetResolutionInt, this.Acquire.SetPixelType, this.Acquire.SetPaperSize).then(res => {

            console.log("res", res);
            console.log("scan scan ")
            console.log(this.Acquire.EnableDuplex);
            console.log(this.Acquire.SetPixelType);
            const byteArray = new Uint8Array(atob(res.result.data).split('').map(char => char.charCodeAt(0)));
            const f1 = new File([byteArray], fileName+'.pdf', {type: 'application/pdf'});



            console.log("helmi file f1",f1);

//Math.random().toString(36)

            this.tabf1.push(f1);
            this.service.tabf1 = this.tabf1;
            console.log("helmi tabf1 ",this.tabf1);
            this.variableb = true;


                this.serviceFile.uploadnewversion(this.tabf1[0],"workspace://SpacesStore/"+this.data1,this.type).subscribe((data: any) => {
                    console.log("response uploadnew version ", data);
                });


            this.clear();





        })


    }

}
