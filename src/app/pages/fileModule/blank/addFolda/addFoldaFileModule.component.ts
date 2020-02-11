import { Component, ViewEncapsulation, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {AlfrescoService} from "../../alfresco_services/AlfrescoApi.service";

@Component({
  selector: 'app-addFolda',
  templateUrl: './addFoldaFileModule.component.html',
  encapsulation: ViewEncapsulation.None
})

export class AddFoldaFileModuleComponent {

  @Input() data;
  constructor(public activeModal: NgbActiveModal,private alfresco: AlfrescoService) {}
  
    //Create Folder
    onAddFolder(nom) {
      this.alfresco.createFolder(nom,null ,this.data).then(
        (data:any) => {
          console.dir(data);
          this.clear();
        },
        error => console.log(error)
      )
    }

    //Close Modal
    clear() {
      this.activeModal.dismiss('cancel');
    }

}
