import { Component, OnInit } from '@angular/core';
import {ServiceFileService} from '../../fileModule/alfresco_services/service-file.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Service} from '../../fileModule/alfresco_services/document-library.service';
import {UserProfile} from '../../fileModule/Modal_Scan/userprofile';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  public projects = [
    // { image: 'assets/img/projects/1.jpg', name: 'Project Name 1', desc: "Some quick example text to build on the card title and make up the bulk of the card's content.", followers: 10 },
    // { image: 'assets/img/projects/2.jpg', name: 'Project Name 2', desc: "Some quick example text to build on the card title and make up the bulk of the card's content.", followers: 28 },
    // { image: 'assets/img/projects/3.jpg', name: 'Project Name 3', desc: "Some quick example text to build on the card title and make up the bulk of the card's content.", followers: 15 },
    // { image: 'assets/img/projects/4.jpg', name: 'Project Name 4', desc: "Some quick example text to build on the card title and make up the bulk of the card's content.", followers: 43 }
  ]


  /* declaration class UserProfile*/
  userprofile : UserProfile;
  /*****************************/
  rectoverso:any='';
  Resolution = ["100", "150", "200", "240", "250", "300", "400", "600", "1200"];
  /* declaration variable controle de saisie champs obligatoire*/
  public form: FormGroup;
  public namescanner: AbstractControl;
  public Typedudocument: AbstractControl;
  public resolution: AbstractControl;
  public tailledufichier: AbstractControl;
  public Nomfichier : AbstractControl;
  variableUserprofil: any;
listParamscanner:any;
  constructor( public service: Service, private serviceFile: ServiceFileService,fb: FormBuilder) {
    this.variableUserprofil=serviceFile.toggle_Visibility_card_userprofile;
    console.log("userprofilevarr====> ",this.variableUserprofil);
    this.listParamscanner=serviceFile.listeScanner;
    /*****controle de saisie champs obligatoire *****/
    this.form = fb.group({
      'namescanner': ['', Validators.compose([Validators.required])],
      'Typedudocument': ['', Validators.compose([Validators.required])],
      'resolution': ['', Validators.compose([Validators.required])],
      'tailledufichier': ['', Validators.compose([Validators.required])],});
    this.namescanner = this.form.controls['namescanner'];
    this.Typedudocument = this.form.controls['Typedudocument'];
    this.resolution = this.form.controls['resolution'];
    this.tailledufichier = this.form.controls['tailledufichier'];
    /*****************************************************/

  }

  ngOnInit() {
  }

  save_user_profile(selectedScannerName, fileType, SetResolutionInt, SetPaperSize) {
    this.userprofile.nomscanner=selectedScannerName;
    this.userprofile.login=sessionStorage.getItem("datalogin");
    this.userprofile.tailledufichier=SetPaperSize;
    this.userprofile.typedudocument=fileType;
    this.userprofile.resolution=SetResolutionInt;
    /******** recuperation des valeurs des champs du modal *****/
    var ele = document.getElementsByName('radio');
    for (let i = 0; i < ele.length; i++) {
      let input = ele [i] as HTMLInputElement;
      console.log("ele[i]+++++++");
      console.dir(ele[i]);
      if (input.checked)
        this.userprofile.mode = input.value;
    }
    var ele1 = document.getElementsByName('radio1');
    for (let i = 0; i < ele1.length; i++) {
      var input = ele1 [i] as HTMLInputElement;
      if (input.checked) {
        this.rectoverso='1';

      } else {
        this.rectoverso='0';

      }
    }
    this.userprofile.rectoverso=this.rectoverso;

    /***********save in db userprofile*********/
    // this.serviceFile.saveUserProfil(this.userprofile).subscribe(
    //     data => {
    //         console.log('data save:', data);
    //         /***togle visibility user profile ****/
    //         this.serviceFile.toggle_Visibility_card_userprofile=!this.serviceFile.toggle_Visibility_card_userprofile;
    //
    //     },
    //     error => console.log(error)
    // );

  }


}
