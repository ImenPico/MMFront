import {Component, OnInit, ViewChild} from '@angular/core';
import {DxDataGridComponent} from 'devextreme-angular';
import {Router} from '@angular/router';
import {ArriverService} from '../service/arriver.service';

@Component({
  selector: 'app-courrier-integrer',
  templateUrl: './courrier-integrer.component.html',
  styleUrls: ['./courrier-integrer.component.scss']
})
export class CourrierIntegrerComponent implements OnInit {
  @ViewChild(DxDataGridComponent, {static: true}) dataGrid: DxDataGridComponent;
  selectedRowIndex = -1;
  dossiersList:any
  mailboxlist:any;
  selectedData: any;
  public countries: any[];
  constructor(private arriverService:ArriverService,private router: Router ) {
    this.getallmailbox();

  }


  ngOnInit(){
    // setTimeout(() => this.countries = countries);
    // this.countries = countries;
  }
  selectedChanged(e,data) {
    // console.log('aaaaaaaaaaaa', this.dataGrid.instance.getSelectedRowsData()[0]);
    //this.selectedRowIndex = e.component.getRowIndexByKey(e.selectedRowKeys[0]);
    console.log('aaaaaaaaaaaa1= ', data);


  }


  add(e){}







  getallmailbox() {
    this.arriverService.getallmailbox().subscribe((data:any)=>
    {
      console.log("mailbox====>",data);


      this.mailboxlist=data;

    })
  }

  onEdit(data){
    console.log("editttt dossier===>",data.dossier);
    this.selectedData=data;
    this.arriverService.selectedData=data;
    console.log("selected data===>",this.selectedData);
    this.arriverService.nomdossier=data.dossier;
    this.router.navigate(['/interfacedispatch',{  id:data.idm,doss:data.dossier}, {  skipLocationChange: true}]);

  }


// { skipLocationChange: true }

}

