import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-gridcourrier-internes',
  templateUrl: './gridcourrier-internes.component.html',
  styleUrls: ['./gridcourrier-internes.component.scss']
})
export class GridcourrierInternesComponent implements OnInit {
  Touscourrierinternes: any;
    selectedRowIndex = -1;
  constructor( private route:Router) { }

  ngOnInit() {
  }
  onAdd($event: any) {

  }

  addRow() {
    this.route.navigate(['/courriers-internes'])


  }

  onEdit(selectedRowsDatum: any) {

  }

  onShowDetails(selectedRowsDatum: any) {

  }


  selectedChanged($event: any, selectedRowsDatum: any) {
    
  }
}
