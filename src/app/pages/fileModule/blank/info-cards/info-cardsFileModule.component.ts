import { Component, ViewEncapsulation, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NodeBody } from 'alfresco-js-api';
import {AlfrescoService} from "../../alfresco_services/AlfrescoApi.service";

@Component({
  selector: 'app-info-cards',
  templateUrl: './info-cardsFileModule.component.html',
  encapsulation: ViewEncapsulation.None
})
export class InfoCardsFileModuleComponent  {
  
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

    //Edit properties
    updateFolderOrFile(){
      console.dir(this.data);
      this.data.name = this.name
      this.alfresco.editNode(this.data.id, this.data.name, this.data.name, null);
    }
  
    //Close Modal
    clear() {
      this.activeModal.dismiss('cancel');
    }

}
