import {Component, ViewChild, ViewEncapsulation,HostListener} from '@angular/core';
import {DxDataGridComponent} from 'devextreme-angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent  {
  dossiersList: any;
  gridContainer: any;
  @ViewChild(DxDataGridComponent, {static: true}) dataGrid: DxDataGridComponent;
  constructor() {


  }
  selectedChanged(e) {}
  add(e){}




  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    localStorage.clear()
  }
}
