import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from '../service/authentification.service';
import {ArriverService} from '../service/arriver.service';

@Component({
  selector: 'app-grid-tous-courrier',
  templateUrl: './grid-tous-courrier.component.html',
  styleUrls: ['./grid-tous-courrier.component.scss']
})
export class GridTousCourrierComponent implements OnInit {
    TouscourrierList: any;
  selectedRowIndex: number;

  constructor(private servicecourrier:ArriverService) { }

  ngOnInit() {
    this.servicecourrier.getAllDocument().subscribe(data=>{
      this.TouscourrierList=data;
    })
  }

  onAdd($event: any) {
    
  }

  addRow() {
    
  }

  onEdit(selectedRowsDatum: any) {
    
  }

  onShowDetails(selectedRowsDatum: any) {
    
  }
}
