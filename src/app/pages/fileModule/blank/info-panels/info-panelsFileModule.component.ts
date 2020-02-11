import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {AlfrescoService} from "../../alfresco_services/AlfrescoApi.service";

@Component({
  selector: 'app-info-panels',
  templateUrl: './info-panelsFileModule.component.html',
  encapsulation: ViewEncapsulation.None
})
export class InfoPanelsFileModuleComponent implements OnInit {
  
  constructor(public activeModal: NgbActiveModal,private alfresco: AlfrescoService) { }

  @Input() data;

  name:any;id:any;createdAt:any;modifiedAt:any;createdbyUser:any;parentId:any;

  ngOnInit() {
    console.dir(this.data);
    //Data modal
    this.name = this.data.name;
    this.id = this.data.id;
    this.createdAt = this.data.createdAt;
    this.modifiedAt = this.data.modifiedAt;
    this.createdbyUser = this.data.createdByUser.displayName;
    this.parentId = this.data.parentId;
  }

  //Close Modal
  clear() {
    this.activeModal.dismiss('cancel');
  }
  
}
