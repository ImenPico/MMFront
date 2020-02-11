import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {DxDataGridComponent} from "devextreme-angular";
import {FlowableService} from "../../../flowable.service";
import {Router} from "@angular/router";
import {ArriverService} from "../../service/arriver.service";
import {AuthentificationService} from "../../service/authentification.service";
import {AlfrescoService} from "../../fileModule/alfresco_services/AlfrescoApi.service";
import {DepartServiceService} from "../../../depart-service.service";
import {filesAlfreco} from "../../gridcourierarriver/gridcourierarriver.component";

@Component({
  selector: 'app-consult-par-date',
  templateUrl: './consult-par-date.component.html',
  styleUrls: ['./consult-par-date.component.scss']
})
export class ConsultParDateComponent implements OnInit {

  @ViewChild('piecejoite', {static: true}) piecejoite: TemplateRef<any>;
  modalReference: NgbModalRef;
  decisionTab: any[] = [];
  gridContainer: any;
  courrierArriverList: any;
  selectedItemKeys: any[] = [];
  selectedRowIndex = -1;
  currentRow:any;
  modedocument:boolean;
  pathalfresco:any
  @ViewChild(DxDataGridComponent, {static: true}) dataGrid: DxDataGridComponent;
  constructor(private alfrescoApi: AlfrescoService,private serviceDepart:DepartServiceService, private modal: NgbModal,private flowable: FlowableService,private router :Router,private servicearriver:ArriverService,private auth :AuthentificationService) {



  }

  ngOnInit() {
    this.servicearriver.getAllCourrierArrivees().subscribe(data=>{
      console.log("liste de courrier Arriver",data);
      this.courrierArriverList=data;
      console.log("table of List courrier",this.courrierArriverList);
      if (this.selectedRowIndex !== -1) {
        console.log('element semect l================>', this.dataGrid.instance.getSelectedRowsData()[0]);
      }

      this.dataGrid.groupPanel.emptyPanelText="";


      // for(let listArriver of this.courrierArriverList )
      // {
      //   this.getAllFilsFromalfresco(listArriver['nodeRef']);
      //
      // }
      // this.Filealfresco={fileName: "14749 (1).docx",
      //                  typeFile: "Microsoft Word 2007",
      //                   nodeRefParent: "85483173-e1c4-4b95-91e2-189fe05af4a0",
      //                   uniteId: "4f3ccfb7-6f74-4efc-9b70-07b99ba8ffc6"
      // }
    })

  }
  ngAfterViewInit() {


  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'plus',
        onClick: this.addRow.bind(this)
      }
    });
  }

  //startProcess
  addRow() {
    // cover authenticator
    this.servicearriver.ajoutercourrier="newcourrierArriver";
    this.servicearriver.modeDocument=true
    let initiator=localStorage.getItem('profileUser');
    let processname ="process_courrier_arrivee"
    //call the start process instance method

    // this.workflow.StartProcessInstance(initiator,processname);
    this.StartProcessInstance(initiator,"process_courrier_arrivee");
  }

  selectionChanged(data: any) {
    this.selectedItemKeys = data.selectedRowKeys;
  }

  editRow() {
    this.gridContainer.instance.deselectAll();
  }


  //////////////////////////////////////////////SHow courrier Arriver  en mode edit//////////////////////////////////////////////////////////////
  onEdit(data) {
    console.log('dataaaaaaa', data);
    this.servicearriver.ajoutercourrier="editcourierArriver";
    this.servicearriver.courrierArrive=data;
    this.servicearriver.modeDocument=this.modedocument
    console.log("noderef :",data.nodeRef);
    this.servicearriver.noderef=data.nodeRef;
    this.servicearriver.PathAlfresco=this.pathalfresco;
    console.log("eeeeeeeeeeeee",  this.servicearriver.PathAlfresco);
    let NomActivite=data.activityName;
    this.servicearriver.activityId=data.activityid;
    this.router.navigate(["/"+NomActivite])
  }
  onShowDetails(data) {

    this.servicearriver.courrierArrive=data;
    this.servicearriver.ajoutercourrier="editcourierArriver";
    console.log('dataaaaaaa', data);
    this.servicearriver.modeDocument=this.modedocument
    console.log('mode de document', this.servicearriver.modeDocument);
    this.servicearriver.courrierArrive=data;
    this.servicearriver.noderef=data.nodeRef;
    this.servicearriver.PathAlfresco=this.pathalfresco;
    console.log("eeeeeeeeeeeee",  this.servicearriver.PathAlfresco);
    let NomActivite=data.activityName;
    this.servicearriver.activityId=data.activityid;
    this.router.navigate(["/"+NomActivite])
  }





  // deleteRow() {
  //     this.gridContainer.instance.deleteRow(this.selectedRowIndex);
  //     this.gridContainer.instance.deselectAll();
  // }

//  workflow functions
  StartProcessInstance(name,process) {

    console.log('Trying Start Process ', process, ' ...');
    console.log('Initiator : ', localStorage.getItem('profileUser'));

    this.flowable.startProcessInstance(name,process)
        .subscribe((result: {}) => {

          console.log('Generated TaskID : ', result);
          localStorage.setItem("taskId",result[0])
          localStorage.setItem("processInstanceId",result[1])
          localStorage.setItem("ActivityName",result[2])
          let  params=this.ArrayToString(result[3])
          localStorage.setItem("params",params)

          this.router.navigate(['/'+result[2]]);


          console.log('Process Started Successfuly');


        });

  }

  ArrayToString(List) {
    let str = '';
    for (let t of List) {
      str = str + t + ',';
    }
    return str.slice(0, str.length - 1);
  }
  selectedChanged(e: any, data: any) {

    console.log('aaaaaaaaaaaa', this.dataGrid.instance.getSelectedRowsData()[0]);
    this.selectedRowIndex = e.component.getRowIndexByKey(e.selectedRowKeys[0]);
    console.log('aaaaaaaaaaaa1=      ', data);
    console.log('data.id====>>>', data.id);
    this.servicearriver.getAcessCourrierArriver(data.id).subscribe(resultacces=>{
      if(resultacces===true){
        this.modedocument=true;

      }
      else {
        this.modedocument=false;


      }
    });
    console.log(data.datecourrier);
    let yearofpath= data.datecourrier.substring(0,data.datecourrier.indexOf('-'));
    console.log(yearofpath);
    let monthofpath=data.datecourrier.substring(data.datecourrier.indexOf('-')+1, data.datecourrier.indexOf('-')+3);

    console.log(monthofpath);
    this.pathalfresco=yearofpath + "/"+ monthofpath+"/"+ "CA"+"/"+ data.destination+ "/";
    this.alfrescoApi.createFolder(data.identifiant, this.pathalfresco,"d44d73a3-439c-4ee1-a156-f71f259d0ae7");
    this.pathalfresco+=data.identifiant;

  }



  onCellPrepared(e) {
    if(e.rowType === 'data') {
      // if(e.data.activityid ==='Annotation') {
      //   e.cellElement.style.color = '#dd5138';
      // }
      if (e.data.activityName === 'Annotation') {
        if (e.column.dataField === 'activityName') {
          e.cellElement.style.color = 'rgb(255, 0, 0)';


        }


      }
      // if (e.data.refreponse === 'Annotation') {
      //   // if(e.column.dataField === 'SaleAmount') {
      //   //   e.cellElement.style.backgroundColor = '#FFBB00';
      //   //   e.cellElement.style.color = '#000000';
      //   // }
      // }
    }

    // if(e.rowType === 'group') {
    //   if(e.row.groupIndex === 0) {
    //     e.cellElement.style.backgroundColor = '#BEDFE6';
    //   }
    //   if(e.row.groupIndex === 1) {
    //     e.cellElement.style.backgroundColor = '#C9ECD7';
    //   }
    //   e.cellElement.style.color = '#000';
    //   if(e.cellElement.firstChild && e.cellElement.firstChild.style) e.cellElement.firstChild.style.color = '#000';
    // }
    //
    // if(e.rowType === 'groupFooter' && e.column.dataField === 'SaleAmount') {
    //   e.cellElement.style.fontStyle = 'italic';
    // }
  }
  openmodalPj(data)
  {
    //this.serviceFile.privilege = 'lecteur';
    console.log('dataaaaaaa', data);
    //this.currentRow = data.nodeId;
    // this.currentItem = data.nodeId;
    console.log('nodeid11', this.currentRow);
    this.servicearriver.noderef=data.nodeRef;
    //this.serviceFile.currentItem = this.currentRow;
    this.modalReference = this.modal.open(this.piecejoite, {  size: 'xl' as 'lg',});
  }
  //    get all fils in folder x
  // getAllFilsFromalfresco(nodeRef):any{
  //   let fileAlfresco = new filesAlfreco()
  //   this.alfrescoApi.getNodeChilds(nodeRef).then((data1) => {
  //
  //
  //     console.log("unitid0");
  //     console.log(data1);
  //
  //
  //     for (let i = 0; i < data1.list.entries.length; i++) {
  //       if (data1.list.entries[i].entry.name) {
  //         fileAlfresco.fileName = data1.list.entries[i].entry.name;
  //         // fileAlfresco.size = data1.list.entries[i].entry.content.sizeInBytes;
  //         fileAlfresco.typeFile = data1.list.entries[i].entry.content.mimeTypeName;
  //         fileAlfresco.nodeRefParent = data1.list.entries[i].entry.parentId;
  //         fileAlfresco.uniteId = data1.list.entries[i].entry.id;
  //
  //         console.log("PieceJoint", fileAlfresco);
  //
  //         // this.serviceFile.savePieceJoint(this.pieceJointModel).subscribe(
  //         //     data => {
  //         //         console.log('data save:', data);
  //         //
  //         //     },
  //         //     error => console.log(error)
  //         // );
  //
  //       }
  //
  //     }
  //
  //     // this.Filealfresco=fileAlfresco;
  //     // console.log("filealfresco===============>", this.Filealfresco);
  //
  //   });
  // }


}
