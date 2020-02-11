import {Component, OnInit, ViewChild} from '@angular/core';
import DevExpress from 'devextreme/bundles/dx.all';
import CustomStore from 'devextreme/data/custom_store';
import {IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts} from 'angular-2-dropdown-multiselect';
import {Router} from '@angular/router';
import {AuthentificationService} from '../service/authentification.service';
import {ArriverService} from '../service/arriver.service';
import {FlowableService} from '../../flowable.service';
import {WorkflowComponent} from '../workflow/workflow.component';
import {DxTreeViewComponent} from 'devextreme-angular';
import {MultiSelectComponent} from '@syncfusion/ej2-angular-dropdowns';
import {CheckBoxComponent} from '@syncfusion/ej2-angular-buttons';
import * as  moment from 'moment';

@Component({
  selector: 'app-annotation',
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.scss', './material.css']
})
export class AnnotationComponent implements OnInit {
  listparams: any;
  butDisabled: boolean = true;
  nature=['Lettre', 'Mail', 'Fax']
  unites1User:any=[];
  unites2Direction:any=[];





  ////////////////////////////TREEEEEEEEEEEEEEE////////////////////
  @ViewChild(DxTreeViewComponent, {static: true}) treeView1: DxTreeViewComponent;
  @ViewChild('treeView2ID', {static: true}) treeView2: DxTreeViewComponent;
  @ViewChild('treeView1ID', {static: true}) treeView1affect: DxTreeViewComponent;
  @ViewChild('treeViewActeur', {static: true}) treeViewActeur: DxTreeViewComponent;
  @ViewChild(WorkflowComponent, {static: true}) workflow: WorkflowComponent;

  @ViewChild('checkbox', {static: false})
  public mulObj: MultiSelectComponent;
  @ViewChild('checkbox1', {static: false})
  @ViewChild('checkboxAffect', {static: false})
  public mulAffect: MultiSelectComponent;

  @ViewChild('selectall', {static: false})
  public checkboxObj: CheckBoxComponent;
  public editorValue: string = '...';



  modedocument:boolean=true;


  authentifer: any = localStorage.getItem('profileUser');
  processInstanceId: any = localStorage.getItem('processInstanceId');



  selectedinstruction = [3];
  instructionn = [
    { id: 1, name: 'A faire' },
    { id: 2, name: 'Pour application'},

  ];




  unites1: any = [];
  id2: number;
  id3: number;
  selected: string;
  id1: number;
  id;
  Units: string[];
  unites2: any = [];
  unites3: any = [];

  anc: any;
  virgule: number;
  chaine: any;
  ou: any;
  treeDataSource1: any;
  treeDataSource3:any
  treeBoxValue1: Number[];
  treeBoxValueActeur:Number[];
  treeDataSource2: any;
  treeBoxValue2: Number[];
  treeBoxValueencpoier:Number[];
  testtreeBoxValue2: Number[];
  multiselected: string;
  radioSelected: string;
  radioSelected1: string;
  radioSelected2: string;
  radioSelected3: string;
  radioSelected4: string;
  radioSelectedString: string;
  radioSelected1String: string;
  modview: any;
  tab: any[] = [];
  name: any;
  info: any;
  info2: any;
  Users: IMultiSelectOption[] = [];
  Users2: IMultiSelectOption[] = [];
  Users3: IMultiSelectOption[] = [];

  appartenance: string;
  appartenance2: string;
  Choisirunevaleur: any;
  // userInfo: User = new User();
  lecteur: string;
  organisme1 = new Array();
  showval: any = false;
  textareaValue: any;
  nature1 = ['Par Personne', 'Par Direction'];
  radioSel: any;
  radioSel1: any;
  testTree:any=false;
  testtree9:any=false;
  privilege:any;
  x: any;


  MYJSONACL = {
    auteurDocument: [],
    listeDiffusion: [],
  };
  MYJSONinstruction = {
    instruction: [],

  };
  MYJSONActeur = {
    auteurDocument: [],
    listeDiffusion: [],
    listAffecter:[],
    listActeur:[],

  };

  public mode: string;
  public mode1: string;
  public filterPlaceholder: string;
  public checkFields: Object = {text: 'name', value: 'id'};
  public selectAllText: string
// *********************************Attribut Couurier Arrivee********************************
  courrierArrive = {

    entiteemettrice: null,
    emetteurorganisme: null,
    emetteurcontact: null,
    emetteurfax: null,
    emetteuremail: null,
    subject: null,
    importance: true,
    body: null,
    nodeRef: null,
    pathAlfresco: null,
    datearrivee: null,
    datecourrier: null,
    destination: null,
    encopiep: null,
    responsable: null,
    encopief: null,
    refexterne: null,
    refreponse: null,
    publique: null,
    activityid: null,
    activityName: null,
    readers: null,
    authors: null,
    dateCreated: null,
    dateUpdate: null,
    archiveDate: null,
    initiateurName: null,
    isCreatedByServer: false,
    isTest: false,
    comment: null,
    isActive: false,
    categorie: null,
    nature: null,
    identifiant:null,
    processinstid: null,
    instructionannotation: null,
    instructionresponsable: null,
    affecter: null,
    acteur: null,
    paramsWorkflow:null,

  }

  /////////////////////////////////////Affecter en copie///////////////////
  radioSelectedAffecter1: string;
  radioSelectedAffecter2: string;
  radioSelectedAffecter3: string;
  radioSelectedAffecter4: string;

  /////////////////////copie///////////////////

  radioSelectedcopie1: string;
  radioSelectedcopie2: string;
  radioSelectedcopie3: string;
  radioSelectedcopie4: string;
ajout:any;


  ///////////////////////////GRID Ajouter Annotation/////////////////////
  datasourceAnnotation: any[]=[];
  resultAnnotation={
    instruction:null,
    acteur:null,
  };
  elementcheck:boolean=false;
  elementcheckannotation:boolean=false;
  responsable:any;
  constructor(private route:Router,private auth:AuthentificationService,private servicearriver:ArriverService,private flowable: FlowableService) {
      this.ajout= this.servicearriver.ajoutercourrier;
      this.params=this.courrierArrive.paramsWorkflow;
    this.modedocument=this.servicearriver.modeDocument;
    this.courrierArrive=this.servicearriver.courrierArrive;
    console.log("courrierArriverNewting****************",this.servicearriver)
    localStorage.setItem("taskId",this.courrierArrive.activityid)
    this.taskid=localStorage.getItem("taskId");

    console.log("data page enrigestrer:",this.servicearriver.courrierArrive)

    this.mode = 'CheckBox';
    this.mode1 = 'CheckBox1';
    this.radioSelected1 = '';
    this.radioSelected2 = '';
    this.radioSelectedAffecter1='';
    this.radioSelectedAffecter2='';
    this.radioSelectedcopie1='';
    this.radioSelectedcopie2='';


    this.radioSelected3 = 'Par Direction';
    this.radioSelected4 = '';
    this.radioSelectedAffecter3='Par Direction';
    this.radioSelectedAffecter4='';
    this.radioSelectedcopie3='Par Direction';
    this.radioSelectedcopie4='';
    this.selected = '';
    this.multiselected = '';

//this.auth.getparamalfresco();







//********************************************get USERS form PM******************************************
    this.auth.getUser().subscribe((data: any) => {
      console.log('list user===============>', data);
      this.unites1User = [];
      for (let t of data['data']) {
        this.unites1User.push(t['displayname']);

      }
      let i = 0;
      this.unites1User.forEach(d => {
        let element = {'id': i, 'name': d};
        this.Users.push(element);
        i = i + 1;

      });
      this.Users2 = this.Users;
      // console.log("Users2=============================>",this.Users2)
      this.Users3 = this.Users;
      // console.log("Users3=============================>",this.Users3)
      this.Users.forEach(r =>
          this.tab.push(r.name));
      const functionTree1 = () => {
        return new CustomStore({
          loadMode: 'raw',
          key: 'ID',
          load: () => this.unites1
        })

      };
      const functionTree3 = () => {
        return new CustomStore({
          loadMode: 'raw',
          key: 'ID',
          load: () => this.unites3
        })
      };
      const functionTree2 = () => {
        return new CustomStore({
          loadMode: 'raw',
          key: 'ID',
          load: () => this.unites2
        })
      };
      console.log(this.Users);


      //********************************************get departement form PM******************************************
      this.auth.getDepartement().subscribe((data: any) => {
        console.log('departement', data);
        this.id1 = 1;
        for (let t of data['data']) {
          this.unites2Direction.push(t['distinguishedname']);

        }


        for (const prop in this.unites2Direction) {
          if (prop == '0') {
            this.unites1.push({ID: 1, headId: '0', name: this.Nom(this.unites2Direction[prop])},);

          } else {

            this.id1 += 1;
            this.unites1.push({ID: this.id1, headId: '0', name: this.Nom(this.unites2Direction[prop])},);

          }
        }

        for (const item in this.unites2Direction) {
          this.unites1[item].headId = this.ancetre_de(this.unites2Direction[item]);

        }


        for (const x in this.unites2Direction) {
          this.unites1[x].headId = this.getId1(this.unites1[x].headId);
          if (typeof this.unites1[x].headId === 'undefined') {
            this.unites1[x].headId = 0;
          }
        }


        this.id2 = 1;


        for (const prop in this.unites2Direction) {
          if (prop == '0') {
            this.unites2.push({ID: 1, headId: '0', name: this.Nom(this.unites2Direction[prop])},);

          } else {

            this.id2 += 1;
            this.unites2.push({ID: this.id2, headId: '0', name: this.Nom(this.unites2Direction[prop])},);

          }
        }


        for (const item in this.unites2Direction) {
          this.unites2[item].headId = this.ancetre_de(this.unites2Direction[item]);

        }

        for (const x in this.unites2Direction) {
          this.unites2[x].headId = this.getId2(this.unites2[x].headId);
          if (typeof this.unites2[x].headId === 'undefined') {
            this.unites2[x].headId = 0;
          }
        }

        this.id3 = 1;
        for (const prop in this.unites2Direction) {
          if (prop == '0') {
            this.unites3.push({ID: 1, headId: '0', name: this.Nom(this.unites2Direction[prop])},);

          } else {

            this.id3 += 1;
            this.unites3.push({ID: this.id3, headId: '0', name: this.Nom(this.unites2Direction[prop])},);

          }
        }

        for (const item in this.unites2Direction) {
          this.unites3[item].headId = this.ancetre_de(this.unites2Direction[item]);

        }


        for (const x in this.unites2Direction) {
          this.unites3[x].headId = this.getId3(this.unites3[x].headId);
          if (typeof this.unites3[x].headId === 'undefined') {
            this.unites3[x].headId = 0;
          }
        }

        this.unites2Direction = ['a', 'b'];
        this.treeDataSource1 = functionTree1();
        this.treeDataSource3 = functionTree3();

        this.treeBoxValue1;
        this.treeBoxValueActeur;

        this.treeDataSource2 = functionTree2();
        this.treeBoxValue1 = [];
        this.treeBoxValue2 = [];
        this.treeBoxValueActeur = [];

        console.log("Direction et service ====================>", this.unites2Direction)


        this.courrierArrive = this.servicearriver.courrierArrive;

        this.courrierArrive.datearrivee = this.courrierArrive.datearrivee;
        this.courrierArrive.datecourrier = this.courrierArrive.datecourrier;
        console.log(this.courrierArrive.datearrivee);
        this.taskid = this.courrierArrive.activityid;
       /* this.treeBoxValue2 = [];
        this.treeBoxValue1 = [];
        //  this.test1 = true;
        let tab = [];
        this.courrierArrive = this.servicearriver.courrierArrive;
        console.log('treeDataSource2======', this.unites2);

        let listencopier = this.courrierArrive.encopiep.split(',');
        console.log('listencopier======', listencopier);

        let affecter = this.courrierArrive.affecter;
        console.log('listaffecter======', affecter);
        for (let t of listencopier) {
          for (let g of this.unites2) {
            if (g.name === t) {
              console.log('treeDataSource2======', '--------', this.courrierArrive.readers, '--------------', g.name);
              this.radioSelected2 = 'Par Direction';
              this.treeBoxValue2[this.treeBoxValue2.length] = g.ID;
              console.log('tab des lecteurs par direction====>', this.treeBoxValue2);
            }

          }
        }
        console.log(' list All  Person', this.Users3);
        for (let t of listencopier) {
          for (let s of this.Users3) {
            if (s.name === t) {
              //  console.log('mulobj--------'--------------', s.name);
              this.radioSelected2 = 'Par Personne';
              tab[tab.length] = s.id;
              this.mulObj.value = tab;
              console.log('tab des lecteurs par personne====>', tab);
            }

          }
        }
        console.log(' list Selected Lect Person', this.checkFields);

        console.log('treeDataSource1--------', this.unites1);
        for (let g of this.unites1) {
          if (g.name === affecter) {
            this.radioSelected1 = 'Par Direction';
            this.treeBoxValue1 = g.ID;
          }
        }
        for (let s of this.tab) {
          if (s === affecter) {
            this.radioSelected1 = 'Par Personne';
            this.MYJSONActeur.listAffecter = s;
          }
        }
*/

      })
    });









  }

  ngOnInit() {
    this.dateNow = moment().format('YYYY-MM-DD');

    //*************************call  decisions**********************

  }



  onItemClick1(item) {
    console.log('item select===========>');
    console.log('select', this.radioSelected2);
    console.log('item', item);
    this.radioSelected2 = item;
    if (this.testtree9 === false) {
      this.testtree9 = true;
    }
  }


  //////////////////affecter/////////

  onItemClickaffecter(item) {
    console.log(this.radioSelectedAffecter1);
    console.log(item);
    this. radioSelectedAffecter1 = item;

  }
  onItemClickaffecter1(item)
  {
    console.log('item select===========>');
    console.log('select', this.radioSelectedAffecter2);
    console.log('item', item);
    this.radioSelectedAffecter2 = item;
    console.log("radioSelectedAffecter2",this.radioSelectedAffecter2)
    if (this.testtree9 === false) {
      this.testtree9 = true;
    }
  }




  ////////////////////copier/////////////////


  syncTreeViewSelectionActeur(e)
  {

    if (!this.treeViewActeur) {
      return;
    }

    if (!this.treeBoxValueActeur) {
      this.treeViewActeur.instance.unselectAll();
    } else {
      this.treeViewActeur.instance.selectItem(this.treeBoxValueActeur);
      for (const t in this.unites1) {
        if (this.unites1[t].ID == this.treeBoxValueActeur) {
          this.selected = this.unites1[t].name;
        }
      }
    }

  }



  treeView_itemSelectionChangedActeur(e) {
    var a = e.component.getSelectedNodesKeys();
    this.treeBoxValueActeur = a;

  }
  getSelectedItemsKeys(items) {
    var result = [],
        that = this;

    items.forEach(function (item) {
      if (item.selected) {
        result.push(item.key);
      }
      if (item.items.length) {
        result = result.concat(that.getSelectedItemsKeys(item.items));
      }
    });
    return result;
  }
  syncTreeViewSelection2(e) {
    console.log("tree data source",this.treeDataSource2)
    console.log("tree selected value",this.treeBoxValue2)
    var component = (e && e.component) || (this.treeView1affect && this.treeView1affect.instance);

    if (!component) {
      return;
    }

    if (!this.treeBoxValue2) {
      component.unselectAll();
    }

    if (this.treeBoxValue2) {
      this.treeBoxValue2.forEach((function (value) {
        component.selectItem(value);
      }).bind(this));
      for (const e in this.unites2) {
        for (const ee in this.treeBoxValue2) {
          if (this.unites2[e].ID == this.treeBoxValue2[ee]) {
            if (this.multiselected.indexOf(this.unites2[e].name) == -1) {

              this.multiselected += this.unites2[e].name + ', ';
            }

          }
        }
      }

    }


  }
  treeView_itemSelectionChanged2(e) {
    const nodes = e.component.getNodes();
    this.treeBoxValue2 = this.getSelectedItemsKeys(nodes);
  }



  //en-copier tree



  syncTreeViewSelectioncopier(e) {
    console.log("tree data source",this.treeDataSource1)
    console.log("tree selected value",this.treeBoxValue1)
    var component = (e && e.component) || (this.treeView2 && this.treeView2.instance);

    if (!component) {
      return;
    }

    if (!this.treeBoxValue1) {
      component.unselectAll();
    }

    if (this.treeBoxValue1) {
      this.treeBoxValue1.forEach((function (value) {
        component.selectItem(value);
      }).bind(this));
      for (const e in this.unites2) {
        for (const ee in this.treeBoxValue1) {
          if (this.unites2[e].ID == this.treeBoxValue1[ee]) {
            if (this.multiselected.indexOf(this.unites2[e].name) == -1) {

              this.multiselected += this.unites2[e].name + ', ';
            }

          }
        }
      }

    }


  }
  treeView_itemSelectionChangedcopier(e) {
    const nodes = e.component.getNodes();
    this.treeBoxValue1 = this.getSelectedItemsKeys(nodes);
  }















  //ajouter Annotaion
  ajouterAnnotation(e){
    if (this.radioSelectedAffecter1 === 'Par Personne') {
      let aux = this.MYJSONActeur.auteurDocument
      console.log("myjsonacteur ",aux)
      this.MYJSONActeur.auteurDocument = [];
      this.MYJSONActeur.auteurDocument[0] = aux;

    } else if (this.radioSelectedAffecter1 === 'Par Direction') {
      this.MYJSONACL.auteurDocument = [];
      console.log("this.MYJSONACteur.auteurDocument", this.MYJSONActeur.auteurDocument)
      console.log("treeBoxValue1", this.treeBoxValue1)
      console.log("treeDataSource1", this.treeDataSource1)


      for (let s of this.treeBoxValueActeur) {
        for (let g of this.treeDataSource3.__rawData) {

          if (g.ID === s) {

            this.MYJSONActeur.auteurDocument[0] = g.name;
          }
        }
      }

    }
    this.resultAnnotation.instruction=this.MYJSONinstruction.instruction;
    this.resultAnnotation.acteur=this.MYJSONActeur.auteurDocument;
    console.log("acteur et instruction=================>", this.resultAnnotation);
    console.log("instruction================>",this.MYJSONinstruction.instruction+"Acteur=================>", this.MYJSONActeur.auteurDocument[0]);


    console.log("instruction",e);
    console.log("instruction",e.value.datedelaiAnnotation);
    console.log("liste des instruction et liste de acteur",this.resultAnnotation )


    this.datasourceAnnotation[this.datasourceAnnotation.length]={
      instruction: this.resultAnnotation.instruction+"",
      responsable: this.resultAnnotation.acteur+"",
      iniateur:localStorage.getItem('profileUser')+"",
      delai:e.value.datedelaiAnnotation+"",

    };

    console.log("datasource===============",this.datasourceAnnotation)

  }
  deleteAnnotation(data){
    console.log("datagrid=============>"+data)
    let index=this.datasourceAnnotation.indexOf(data);
    console.log("list index",index)
    this.datasourceAnnotation.splice(index,1);
    console.log("deletet element f from annotation",this.datasourceAnnotation);

  }

  changecked(e){
    console.log("event checked",e.target.checked);
    if (e.target.checked===true)
    {
      this.elementcheck=true;
    }
    else {
      this.elementcheck=false;
    }

  }

  //**************************deali Annotation*************************
  changeckeddelaiAnnotation(e){
    console.log("event checked",e.target.checked);
    if (e.target.checked===true)
    {
      this.elementcheckannotation=true;
    }
    else {
      this.elementcheckannotation=false;
    }

  }










  // ********************************Creation Arborescence LDAP **********************************************************

  Nom(unite) {
    this.virgule = unite.indexOf(',');
    this.ou = unite.substring(3, this.virgule);
    return this.ou;
  }

  ancetre_de(unite) {
    this.chaine = unite;
    this.virgule = this.chaine.indexOf(',');
    this.chaine = this.chaine.substring(this.virgule + 1);

    if (this.chaine.substring(0, 2) == 'OU') {
      this.anc = this.chaine.substring(3, this.chaine.indexOf(','));

      return this.anc;

    } else {
      return '';
    }
  }

  getId1(unite) {
    for (const ref in this.unites1) {

      if (this.unites1[ref].name == unite) {
        // console.log(this.unites1[ref].ID);
        return this.unites1[ref].ID;
      }
    }
  }

  getId2(unite) {
    for (const ref in this.unites2) {

      if (this.unites2[ref].name == unite) {

        return this.unites2[ref].ID;
      }
    }
  }
  getId3(unite) {
    for (const ref in this.unites3) {

      if (this.unites3[ref].name == unite) {

        return this.unites3[ref].ID;
      }
    }
  }
  public thirdControlSettings2: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: 'checkboxes',
    buttonClasses: 'btn btn-light dropdown-toggle d-block',
    dynamicTitleMaxItems: 4,
    displayAllSelectedText: true
  };
  public thirdControlTexts2: IMultiSelectTexts = {
    checkAll: 'Select all',
    uncheckAll: 'Unselect all',
    checked: 'item selected',
    checkedPlural: 'items selected',
    searchPlaceholder: 'Find...',
    defaultTitle: 'Choisir une valeur',
    allSelected: 'All selected',


  };
  //*****************Workflow attributs
  historicTasks: any[] = [];
  decisionTab: any[] = [];
  taskid: any;
  params: any;
  dateNow: any;

  onToolbarPreparing(e,f) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        elementAttr:{
          id:'ToolbarAddNewButton'
        },
        hint:'Ajouter annotation',
        text:'Ajouter annotation' ,
        onClick: this.ajouterAnnotation.bind(this,f)
      }
    });
  }





  //*************************Function workflow
  getdecisions(taskId) {
    this.flowable.getGatewayDecision(taskId).subscribe(result => {
      console.log('result WS GET Decision', result);
      this.decisionTab = result;
    });
  }

  getHistorics(taskid) {
    this.historicTasks=[]
    this.flowable.historicTask(taskid)
        .subscribe(
            (data: any[]) => {
              console.log("historictask======>",data)
              data.forEach(d => {
                const histTab = d.split(' * ');

                if (histTab[1] === null)
                  histTab[1] = '---------';

                const obj = {taskName: histTab[0],decision: histTab[1], assignee: histTab[2], startTime: histTab[3], endTime: histTab[4], duree: histTab[5], description: histTab[6]};
                this.historicTasks.push(obj);
              });
            }

        )
    console.log(this.historicTasks)

  }

  save(dataform){
    //********************************************element select of destination and en copie***************************
    if (this.radioSelected1 === 'Par Personne') {
      let aux = this.MYJSONActeur.auteurDocument;
      console.log('lecteur', aux);
      this.MYJSONActeur.auteurDocument = [];
      this.MYJSONActeur.auteurDocument[0] = aux;

    } else if (this.radioSelected1 === 'Par Direction') {
      this.MYJSONActeur.auteurDocument = [];
      console.log('this.MYJSONDespCopie.auteurDocument', this.MYJSONActeur.auteurDocument);
      console.log('treeBoxValue1', this.treeBoxValue1);
      console.log('treeDataSource1', this.treeDataSource1);


      for (let s of this.treeBoxValue1) {
        for (let g of this.treeDataSource1.__rawData) {

          if (g.ID === s) {

            this.MYJSONActeur.auteurDocument[this.MYJSONActeur.auteurDocument.length] = g.name;
          }
        }
      }

    } else {
      console.log('l\'auteur ne doit pas etre vide');
    }

    // en copie

    if (this.radioSelected2 === 'Par Personne') {
      this.MYJSONActeur.listeDiffusion = [];

      for (let u of this.mulObj['angularValue']) {
        this.MYJSONActeur.listeDiffusion[this.MYJSONActeur.listeDiffusion.length] = this.Users3[u].name;
      }

    } else if (this.radioSelected2 === 'Par Direction') {
      this.MYJSONActeur.listeDiffusion = [];
      for (let s of this.treeBoxValue2) {
        for (let g of this.treeDataSource2.__rawData) {
          if (g.ID === s) {
            this.MYJSONActeur.listeDiffusion[this.MYJSONActeur.listeDiffusion.length] = g.name;
          }
        }
      }

    } else {
      console.log('diffiseur ne doit pas etre vide');
    }
    let MYJSONADestiCopie = {
      'auteurDocument': this.MYJSONActeur.auteurDocument,
      'listeDiffusion': this.MYJSONActeur.listeDiffusion,
    };
    let  listencopier= this.ArrayToString(MYJSONADestiCopie.listeDiffusion);

    console.log('list en copie', listencopier);

    console.log('List destination ****:', MYJSONADestiCopie.auteurDocument, 'List en copier*****', MYJSONADestiCopie.listeDiffusion);
    console.log('data======================>', dataform.value, 'dateArrive', 'dateCouurier');


    //***********formulaire
    this.courrierArrive = dataform.value;
    dataform.value.auteurDocument = listencopier;
    this.courrierArrive.datearrivee = 2019 - 2 - 1;
    this.courrierArrive.datecourrier = 2019 - 1 - 1;
    this.courrierArrive.initiateurName = localStorage.getItem('profileUser');
    this.courrierArrive.pathAlfresco = 'path';
    this.courrierArrive.activityName = localStorage.getItem("ActivityName");
    this.courrierArrive.publique = true;
    this.courrierArrive.dateCreated = 2019 - 2 - 3;
    this.courrierArrive.dateUpdate = 2019 - 2 - 4;
    this.courrierArrive.archiveDate = 2019 - 4 - 1;
    this.courrierArrive.isCreatedByServer = false;
    this.courrierArrive.isTest = false;
    this.courrierArrive.isActive = true;
    this.courrierArrive.activityid = localStorage.getItem('taskId');

    // this.courrierArrive.readers = listencopier;
    // this.courrierArrive.authors =  MYJSONADestiCopie.auteurDocument[0]
    this.courrierArrive.destination = MYJSONADestiCopie.auteurDocument[0];
    this.courrierArrive.encopiep = dataform.value.auteurDocument;
    console.log('courier Arrives', this.courrierArrive);
  }

  //**************************************************mise a jour courrier arrivee*****************************
  sauvgarder(dataform) {
    let document = this.updateDocument(dataform);

    this.servicearriver.onAddCourrierArriver(document, [], [], 1).subscribe(
        data => {
          console.log('update courrier', data);

        },
        error => console.log(error)
    );
    this.route.navigate(['/gridcourriers']);



  }

  updateAnnotation(document, resultNextTask) {
    let ListAuteurs = [];
    let ListLecteurs = [];

    if (resultNextTask[0] === 'EndEvent') {
      console.log('auteur', document.affecter);
      console.log('en copier', document.encopiep);
      console.log('en acteur', document.acteur);
      document.activityid = "null"
      document.responsable = document.affecter;
      console.log("liste en acteur", document.acteur, "liste en copier", document.encopiep)
      document.readers += this.servicearriver.courrierArrive.authors + this.servicearriver.courrierArrive.readers + document.affecter, document.encopiep + document.acteur;
      console.log("readers=============>", document.readers)
      document.authors = "";
      let encopieActeur = document.encopiep.concat(document.acteur);
      console.log("listeencopier and Acteur", encopieActeur)
      this.servicearriver.onAddCourrierArriver(document, [document.affecter], [encopieActeur], 1).subscribe(data => {
            console.log('save', data);

            this.route.navigate(['/gridcourriers']);

          },
          //  error => this.handle1 = error.message
      );

    } else {
      localStorage.setItem('taskId', resultNextTask[0]);
      console.log('result next task********', resultNextTask);
      document.activityid = resultNextTask[0];
      document.activityName = resultNextTask[3];
      console.log("documents", document)
      console.log('auteur', document.affecter);
      console.log('en copier', document.encopiep);
      console.log('en acteur', document.acteur);
      let i = 0;
      for (let k of resultNextTask[1]) {
        if (k.indexOf('#') !== -1) {
          resultNextTask[1][i] = document[k.slice(1, k.length)];
        }
        ListAuteurs.push(resultNextTask[1][i]);
        i++;
      }
      let listEncopie = [];
      let j = 0;
      for (let k of resultNextTask[2]) {
        if (k.indexOf('#') !== -1) {

          listEncopie = document[k.slice(1, k.length)].split(',');
          for (let t of listEncopie) {
            ListLecteurs.push(t);


          }

        } else {
          ListLecteurs.push(resultNextTask[2][j]);
        }

        j++;
      }

      document.responsable = this.ArrayToString(resultNextTask[1]);

      console.log('Responsable', document.responsable);
      document.authors = this.ArrayToString(ListAuteurs);
      document.readers = this.ArrayToString(ListLecteurs);

      this.servicearriver.onAddCourrierArriver(document, ListAuteurs, ListLecteurs, 1).subscribe(data => {
        console.log('save', data);

        //this.servicearriver.courrierArrive = data;

        this.workflow.setCondidates(document.activityid, ListAuteurs, ListLecteurs);
        this.route.navigate(['/gridcourriers']);
      });


    }
  }

//*******router document and mis a jour in db *********************
  routerdocument($event) {



    let resultNextTask = $event;
this.updateAnnotation(this.courrierArrive,resultNextTask);





    }



  updateDocument(dataForm) {


    //********************************************element select of destination and en copie***************************

    for(let t of this.datasourceAnnotation){
      console.log("dataSourceAnnotation",t['responsable'])
      this.MYJSONActeur.listActeur[this.MYJSONActeur.listActeur.length]=t['responsable'];

    }
    console.log("liste des responsables des taches",this.MYJSONActeur.listActeur)

    // en copie

    if (this.radioSelected2 === 'Par Personne') {
      this.MYJSONActeur.listeDiffusion = [];

      for (let u of this.mulObj['angularValue']) {
        this.MYJSONActeur.listeDiffusion[this.MYJSONActeur.listeDiffusion.length] = this.Users3[u].name;
      }

    } else if (this.radioSelected2 === 'Par Direction') {
      this.MYJSONActeur.listeDiffusion = [];
      for (let s of this.treeBoxValue2) {
        for (let g of this.treeDataSource2.__rawData) {
          if (g.ID === s) {
            this.MYJSONActeur.listeDiffusion[this.MYJSONActeur.listeDiffusion.length] = g.name;
          }
        }
      }

    }else {
      console.log('diffiseur ne doit pas etre vide');
    }


    //effecter single
    if (this.radioSelectedAffecter2 === 'Par Personne') {
      let aux=this.MYJSONActeur.listAffecter;
      console.log("affecter",aux);
      this.MYJSONActeur.listAffecter = [];
      this.MYJSONActeur.listAffecter[0]=aux;

      // for (let u of this.mulAffect['angularValue']) {
      //   this.MYJSONActeur.listAffecter[this.MYJSONActeur.listAffecter.length] = this.Users3[u].name;
      // }

    } else if (this.radioSelectedAffecter2 === 'Par Direction') {
      this.MYJSONActeur.listAffecter = [];
      if ((!this.testTree)) {
        for (let g of this.treeDataSource2.__rawData) {

          if (g.ID === this.treeBoxValue1) {

            this.MYJSONActeur.listAffecter[this.MYJSONActeur.listAffecter.length] = g.name;
          }
        }
      }
      else {
        for (let s of this.treeBoxValue1) {
          for (let g of this.treeDataSource2.__rawData) {

            if (g.ID === s) {

              this.MYJSONActeur.listAffecter[this.MYJSONActeur.listAffecter.length] = g.name;
            }
          }
        }
      }

    } else {
      console.log('affecter ne doit pas etre vide');
    }


    this.MYJSONActeur = {
      'auteurDocument': this.MYJSONActeur.auteurDocument,
      'listeDiffusion': this.MYJSONActeur.listeDiffusion,
      'listAffecter':this.MYJSONActeur.listAffecter,
      'listActeur':this.MYJSONActeur.listActeur,
    };
    let  listencopier= this.ArrayToString(this.MYJSONActeur.listeDiffusion);
    let listeAffecter=this.ArrayToString(this.MYJSONActeur.listAffecter)
    let listeActeur=this.ArrayToString(this.MYJSONActeur.listActeur)

    console.log('list en copie', listencopier,'liste affecter=auteur',listeAffecter+'listeActeur',listeActeur);

    console.log('List auteur=affecter ****:', this.MYJSONActeur.listAffecter, 'List en copier*****', this.MYJSONActeur.listeDiffusion,"liste de Acteur",+ this.MYJSONActeur.listActeur);
    console.log('data======================>', dataForm.value);

    this.courrierArrive = this.servicearriver.courrierArrive;
    this.courrierArrive.encopiep=listencopier;
    this.courrierArrive.affecter=listeAffecter;
    this.courrierArrive.acteur=listeActeur;
    this.courrierArrive.responsable=listeAffecter;
    this.courrierArrive.instructionresponsable=dataForm.value.instructionresponsable;
    this.courrierArrive.instructionannotation=dataForm.value.instructionannotation;
    this.courrierArrive.body = dataForm.value.body;
    return this.courrierArrive;
  }



  //**********methode convert ArrayString to string***********
  ArrayToString(List) {
    let str = '';
    for (let t of List) {
      str = str + t + ',';
    }
    return str.slice(0,str.length-1);
  }
  ArrayToStringWithSpace(List){
    let str="";
    for (let t of List){
      str=str+t+","
    }
    return str;
  }

    onEnregistere() {

    }

  onCancel() {
    this.route.navigate(['/gridcourriers'])
  }


  //calculer tout le parametre
  formatParams(params, dataform) {
    console.log("dataform ", dataform)
    this.courrierArrive = this.updateDocument(dataform);

  this.listparams = [];
  //let listParams=[]
  if (params == !"") {
    for (let param of this.courrierArrive.paramsWorkflow.split(',')) {
  var StringObject = '{"' + param + '":"' + this.courrierArrive[param] + '"}';
  console.log(StringObject);

  this.listparams.push(StringObject);
}
console.log(this.listparams);
}
return this.listparams;
}



}



