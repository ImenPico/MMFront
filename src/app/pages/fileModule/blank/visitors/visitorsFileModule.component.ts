import { Component, ViewEncapsulation, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {AlfrescoService} from "../../alfresco_services/AlfrescoApi.service";


@Component({
  selector: 'app-visitors',
  templateUrl: './visitorsFileModule.component.html',
  styleUrls: ['./visitorsFileModule.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VisitorsFileModuleComponent  {

  constructor(public activeModal: NgbActiveModal,private alfresco: AlfrescoService) { }
  
    @Input() data;
  
    name:any;id:any;createdAt:any;modifiedAt:any;createdbyUser:any;parentId:any; 
    page:number = 1;pdfSrc:string = '';maxPage: number;zoomPage = 0.6;
  
    ngOnInit() {
      console.dir(this.data);
      //Data modal
      this.name = this.data.name;
      this.id = this.data.id;
      this.createdAt = this.data.createdAt;
      this.modifiedAt = this.data.modifiedAt;
      this.createdbyUser = this.data.createdByUser.displayName;
      this.parentId = this.data.parentId;

      //File URL
        console.log(this.name);
        let splite=this.name;

      this.alfresco.getContentUrl(this.data.id)

      .then(
          (previewUrl: any) => {
              console.log(previewUrl);
              this.pdfSrc = previewUrl;
              console.dir(this.pdfSrc);
              window.open(previewUrl);
          }
      );
    }
  
    //Zoom
    toggleZoom(value) {
        const refDiff = 0.1;
        if (value === 'reduce') {
            if(this.zoomPage > 0.5) this.zoomPage -= refDiff;
            else return;
        }
        if (value === 'add') {
            if(this.zoomPage < 1) this.zoomPage += refDiff;
            else return;
        }
    }

    //Pagination
    togglePage(value) {
        if(value === 'reduce') {
            if(this.page > 1) this.page--;
            else return;
        }
        if(value === 'add') {
            if(this.page < this.maxPage) this.page++;
            else return;
        }
    }

    //CallBack
    callBackFn(e) {
      console.log(e);
      this.maxPage = e._pdfInfo.numPages;
  }

    //Close Modal
    clear() {
      this.activeModal.dismiss('cancel');
    }
  
}
