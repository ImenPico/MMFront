import {Component, OnInit, ViewChild} from '@angular/core';
import {FlowableService} from '../../flowable.service';
import {Router} from '@angular/router';
import {DepartServiceService} from '../../depart-service.service';
// import CustomStore = DevExpress.data.CustomStore;
import {HttpClient, HttpHeaders} from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import {DxDataGridComponent} from 'devextreme-angular';
import {AuthentificationService} from "../service/authentification.service";
import {ArriverService} from "../service/arriver.service";


@Component({
  selector: 'app-courriers',
  templateUrl: './courriers.component.html',
  styleUrls: ['./courriers.component.scss']
})
export class CourriersComponent implements OnInit {
  selectedItemKeys: any[] = [];
  selectedRowIndex = -1;
  gridContainer: any;
  modedocumentCD:boolean;
  @ViewChild(DxDataGridComponent, {static: true}) dataGrid: DxDataGridComponent;
  decisionTab: any[] = [];
  courrier = {
    activity: null,
    nodeRef: null,
    taskId: null,
    objet: null,
    nature: null,
    category: 'Catégorie',
    refExtern: null,
    repSur: 'Réponse sur',
    // options: 'Options',
    dateArriver: null,
    dateCourrier: null,
    organisme: null,
    contact: null,
    email: null,
    fax: null,
    address1: null,
    address2: null,
    responsable: null,
    enCopie: null,
    importance: 'Options',
    corps: null,
    nodeId: null,
    path: null,
    comment: null,
    end: null,
    statut: null,
    brouillon: false,
    iden: null
  };
  courrierDepartList: any;
  // courrierDeparts:any[];

  constructor(private flowable: FlowableService,private router :Router,private servicedepart:DepartServiceService, private httpClient: HttpClient,private servicearriver:ArriverService) {

  }

  ngOnInit() {
    this.servicedepart.getAllCourrierDepart().subscribe(resultcourrier=>{
      console.log("liste de courrier Arriver",resultcourrier);
      this.courrierDepartList=resultcourrier;
      console.log("table of List courrier",this.courrierDepartList);
    })
    if (this.selectedRowIndex !== -1) {
      console.log('element semect l================>', this.dataGrid.instance.getSelectedRowsData()[0]);
    }
    this.getAllCourrierDepart();
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

  selectionChanged(data: any) {
    this.selectedItemKeys = data.selectedRowKeys;
  }
  editRow() {
    this.gridContainer.instance.deselectAll();
  }

  onEdit(data) {
    console.log('dataaaaaaaByMariem', data);
    this.servicedepart.ajoutercourrier="editcourierArriver";
    this.servicedepart.courrierDepart=data;
    this.servicearriver.noderef=data.nodeRef
   // this.servicedepart.currentItem=;
    console.log("noderef :",data.nodeRef)
    this.servicedepart.activityId=data.activityid;
    let NomActivite=data.activityName;
    //this.servicearriver.activityId=data.activityid;
    this.router.navigate(["/"+NomActivite])
  }
  addRow() {
    this.servicedepart.ajoutercourrier="newcourrierArriver";
    let initiator=localStorage.getItem('profileUser');
    console.log("get initiator",initiator)
    //call the start process instance method
    this.StartProcessInstance(initiator,"process_courrier_depart");
  }
  onShowDetails(data) {

    //this.servicearriver.courrierArrive=data;
    console.log('dataaaaaaa', data);
    //this.servicearriver.courrierArrive=data;
    console.log("noderef :",data.nodeRef)
    this.servicearriver.noderef=data.nodeRef
    let NomActivite=data.activityName;
    //this.servicearriver.activityId=data.activityid;
    this.router.navigate(["/"+NomActivite])
  }
  // selectedChanged(e, data) {
  // }

  getAllCourrierDepart(){


//   this.servicedepart.getAllCourrierDepart().subscribe(data=>{
//     this.courrierDepartList=data;
//   console.log(data);
// });
}

//  workflow functions
  StartProcessInstance(name,process) {
    this.flowable.startProcessInstance(name,process)
        .subscribe((result: {}) => {
          console.log('Generated TaskID : ', result);
          localStorage.setItem("taskId",result[0])
          localStorage.setItem("processInstanceId",result[1])
          localStorage.setItem("activityName",result[2]);
          let  params=this.ArrayToString(result[3])
          localStorage.setItem("params",params)
          this.router.navigate(['/'+result[2]]);
        });
  }
  selectedChanged(e: any, data: any) {
    console.log('aaaaaaaaaaaa', this.dataGrid.instance.getSelectedRowsData()[0]);
    this.selectedRowIndex = e.component.getRowIndexByKey(e.selectedRowKeys[0]);
    console.log('aaaaaaaaaaaa1=      ', data);
    console.log('data.id====>>>', data.id);
    this.servicedepart.getAcessCourrierDepart(data.id).subscribe(resultacces=>{
      if(resultacces===true){
        this.modedocumentCD=true;
      }
      else {
        this.modedocumentCD=false;
      }
    })


  }
  ArrayToString(List) {
    let str = '';
    for (let t of List) {
      str = str + t + ',';
    }
    return str.slice(0, str.length - 1);
  }

}
