import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tache',
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.scss']
})
export class TacheComponent implements OnInit {

  constructor() { }
  tache = {
    id: null,
    subject: null,
    instruction: null,
    initiateur: null,
    responsable: null,
    delai: null,
    approbateur: null,
    reponse: null,


  };
  datasourceAffectationAnnotation: any;

  ngOnInit() {
  }

    onEnregistere() {

    }


  OuvrirParent() {

  }

  OuvrirDossier() {

  }

  onToolbarPreparing($event: any) {

  }
  ouvrirdossier(){

  }
}
