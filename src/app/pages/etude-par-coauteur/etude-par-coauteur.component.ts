import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MultiSelectComponent} from "@syncfusion/ej2-angular-dropdowns";
import {DxTreeViewComponent} from "devextreme-angular";
import {WorkflowComponent} from "../workflow/workflow.component";
import {IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts} from "angular-2-dropdown-multiselect";
import {dateFormat} from "../courriers-arrives/courriers-arrives.component";
import {AuthentificationService} from "../service/authentification.service";
import {AlfrescoService} from "../fileModule/alfresco_services/AlfrescoApi.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FlowableService} from "../../flowable.service";
import {DepartServiceService} from "../../depart-service.service";
import {Router} from "@angular/router";
import {ServiceFileService} from "../fileModule/alfresco_services/service-file.service";
import CustomStore from 'devextreme/data/custom_store';


@Component({
  selector: 'app-etude-par-coauteur',
  templateUrl: './etude-par-coauteur.component.html',
  styleUrls: ['./etude-par-coauteur.component.scss']
})
export class EtudeParCoauteurComponent implements OnInit {

  test1: any = false;
  @ViewChild('CoAuteur', {static: false}) public mulObjCoAuteur: MultiSelectComponent;
  @ViewChild('EnCopie', {static: false}) public mulObjEnCopie: MultiSelectComponent;
  public mail;
  @ViewChild(DxTreeViewComponent, {static: true}) treeView1: DxTreeViewComponent;
  @ViewChild('treeView2ID', {static: true}) treeView2: DxTreeViewComponent;
  @ViewChild('checkbox', {static: false})
  @ViewChild('selectall', {static: false})
  @ViewChild('filesorganisme', {static: true}) filesorganisme: TemplateRef<any>;
  @ViewChild(WorkflowComponent, {static: true}) workflow: WorkflowComponent;
  params: any;
  listparams:any;
  testIdentificationCD: any = false;

  tableFileToAlfresco: any[] = [];
  parentNodeRef = 'd45eeb0a-9717-4bd2-a44b-d88a38aa52de';
  dateSystem: any;
  public config: any;
  compteur: string;
  ReferenceList: any[] = [];
  profileUser: any;
  roleUser: any = [];
  tab2: any = [1];
  nature = ['Lettre1', 'Mail', 'Fax']
  unites1User: any = [];
  unites2Direction: any = [];
  modalReference: any;
  hidden: any;
  unites1: any = [];
  id2: number;
  selected: string;
  id1: number;
  id;
  unites2: any = [];
  anc: any;
  virgule: number;
  chaine: any;
  ou: any;
  treeDataSource1: any;
  treeBoxValue1: Number[];
  treeDataSource2: any;
  treeBoxValue2: Number[];
  multiselected: string;
  radioSelected1: string;
  radioSelected2: string;
  radioSelected3: string;
  radioSelected4: string;
  modview: any;
  tab: any[] = [];
  name: any;
  info: any;
  Users: IMultiSelectOption[] = [];
  Users2: IMultiSelectOption[] = [];
  Users3: IMultiSelectOption[] = [];
  Choisirunevaleur: any;
  lecteur: string;
  nature1 = ['Par Personne', 'Par Direction'];
  testtree9: any = false;
  x: any;
  public mode: string;
  public checkFields: Object = {text: 'name', value: 'id'};
  identifcourrier: any

  courrierDepart = {
    id: null,
    adressedestination: null,
    readers: null,
    authors: null,
    subject: null,
    datecourrier: null,
    natureCD: null,
    modeleMail: null,
    categorieCD: null,
    refreponse: null,
    responsable: null,
    activityName: null,
    activityid: null,
    destinationorganisme: null,
    destinationcontact: null,
    destinationemail: null,
    destinationfax: null,
    structureemettrice: null,
    signataire: null,
    emailemettrice: null,
    emailCC: null,
    faxemettrice: null,
    adresseemettrice: null,
    identifiant: null,
    nodeRef: null,
    coauteur: null,
    encopiep: null,
    comment: null,
    body: null,
    processinstid: null,
    paramsWorkflow:null,
  };
  MYJSONDespCopie = {
    auteurDocument: [],
    listeDiffusion: [],
  };
  decisionTab: any[] = [];
  historicTasks: any[] = [];
  taskid: any;
  authentifer: any = localStorage.getItem('profileUser');
  processInstanceId: any = localStorage.getItem('processInstanceId');
  naturedepart = [{"id": 1, 'nature': "Lettre"},
    {"id": 2, "nature": "Mail"},
    {"id": 3, "nature": "Fax"}];

  ajout: any;
  Identificationobligatoire: any = true;

  setDateFormat(dateA) {
    let dateN = new dateFormat();
    dateN.day = Number.parseInt((dateA.split('-')[2]));
    dateN.year = Number.parseInt((dateA.split('-')[0]));
    dateN.month = Number.parseInt((dateA.split('-')[1]));
    return dateN;
  }

  /////////////////////////// constructeur
  constructor(private auth: AuthentificationService, private alfrescoApi: AlfrescoService, private modal: NgbModal, private flowable: FlowableService, private departService: DepartServiceService, private router: Router, private serviceFile: ServiceFileService) {
    this.ajout = this.departService.ajoutercourrier;
    if (this.departService.ajoutercourrier == 'newcourrierArriver') {
      console.log("1")
      this.taskid = localStorage.getItem('taskId');
      console.log("taskid courrier depart", this.taskid)
      this.params = localStorage.getItem('params');
    } else {

      localStorage.setItem('taskId', this.departService.activityId);
      this.taskid = localStorage.getItem('taskId');
      this.params=this.courrierDepart.paramsWorkflow;
      console.log("paramsworkflow",this.params);
      console.log("gettaskid", this.taskid)
      this.Identificationobligatoire = false;
    }

    this.mode = 'CheckBox';
    this.radioSelected1 = '';
    this.radioSelected2 = '';
    this.radioSelected3 = '';
    this.radioSelected4 = '';
    this.selected = '';
    this.multiselected = '';
    // this.showHideFieldSet();
    this.config = {
      toolbar: [['Source', 'NewPage', 'Preview', '-', 'Templates'],
        ['Cut', 'Copy', 'Paste', 'PasteText', 'Undo', 'Redo']],
      uiColor: '#F0F3F4',
      height: '80',
      extraPlugins: 'divarea'
    };

//get date system
    this.dateSystem = new Date();
    console.log("gett date by Mariem1 ", this.dateSystem);
    let dd = String(this.dateSystem.getDate()).padStart(2, '0');
    let mm = String(this.dateSystem.getMonth() + 1).padStart(2, '0');
    let yyyy = this.dateSystem.getFullYear();
    let min = this.dateSystem.getMinutes();
    let sec = this.dateSystem.getSeconds();
    // let time=this.dateSystem.getTime();
    console.log("get minutes", min)
    console.log("get seconds", sec)
    this.dateSystem = yyyy + '-' + mm + '-' + dd;
    console.log("gett date by Mariem2 ", this.dateSystem);

    //********************** workflow instruction ************************
    //recuperation du taskid
    this.taskid = localStorage.getItem("taskId");

    //recuperation du process instance id
    this.processInstanceId = localStorage.getItem("processInstanceId");

    // get actibite name
    this.courrierDepart.activityName = localStorage.getItem("activityName");
    console.log("get activité", this.courrierDepart.activityName);

    // appel du web service get decision
    // this.getDecisions(this.taskid);

    // appel du web service get activity historics
    // this.getHistorics(this.taskid);

    //***********************************************************************

    this.auth.getMy().subscribe((data: any) => {
      console.log("get user", data["data"]["displayname"]);
      this.profileUser = data["data"]["displayname"];
    })

    // getUserrr

    this.auth.getUser().subscribe((data: any) => {
      console.log("list user===============>", data)
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
      this.Users3 = this.Users;
      this.Users.forEach(r =>
          this.tab.push(r.name));

      const functionTree1 = () => {
        return new CustomStore({
          loadMode: 'raw',
          key: 'ID',
          load: () => this.unites1
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
        console.log("departement", data);
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
        this.unites2Direction = ['a', 'b'];
        this.treeDataSource1 = functionTree1();
        this.treeBoxValue1;
        for (const t in this.unites1) {
          if (this.unites1[t].ID == this.treeBoxValue1) {
            this.selected = this.unites1[t].name;

          }
        }
        this.treeDataSource2 = functionTree2();
        this.treeBoxValue2 = [];
        for (const e in this.unites2) {
          for (const ee in this.treeBoxValue2) {
            if (this.unites2[e].ID == this.treeBoxValue2[ee]) {
              this.multiselected += this.unites2[e].name + ', ';

            }
            console.log("treeDataSource2===============>", this.treeDataSource2)
          }
        }


        console.log("Direction et service ====================>", this.unites2Direction)
        this.auth.getRoleByToken().subscribe((data: any) => {
          console.log("new get role by token", data);
          for (let u in data["orgaPrivillege"]) {
            console.log("get orgapprivillège ", data["orgaPrivillege"][u])
            this.roleUser[this.roleUser.length] = data["orgaPrivillege"][u];
            console.log("get role user", this.roleUser)
          }
        });

        //get document
        if (this.departService.ajoutercourrier == 'newcourrierArriver') {

        } else
        {
          this.courrierDepart = this.departService.courrierDepart;
          this.courrierDepart.datecourrier = this.setDateFormat(this.courrierDepart.datecourrier);
          console.log("getdate",this.courrierDepart.datecourrier);
          this.taskid = this.courrierDepart.activityid;

          //co-auteurs
          this.treeBoxValue2 = [];
          //encopie
          this.treeBoxValue1 = [];
          this.test1 = true;
          let tab = [];
          this.courrierDepart = this.departService.courrierDepart;
          console.log('treeDataSource2======', this.unites2);

          let listencopier = this.courrierDepart.encopiep.split(',');
          console.log('listencopier======', listencopier);

          let coauteur = this.courrierDepart.coauteur.split(',');

          console.log('listcoauteur======', coauteur)
          for (let t of listencopier) {
            for (let g of this.unites2) {
              if (g.name === t) {
                console.log('treeDataSource2======', '--------', this.courrierDepart.encopiep, '--------------', g.name);
                this.radioSelected3 = 'Par Direction';
                this.treeBoxValue1[this.treeBoxValue1.length] = g.ID;
                console.log('tab des lecteurs par direction====>', this.treeBoxValue1);
              }
            }
          }
          console.log(' list All  Person', this.Users3);
          for (let t of listencopier) {
            for (let s of this.Users3) {
              if (s.name === t) {
                console.log('mulobj--------', coauteur, '--------------', s.name);
                this.radioSelected3 = 'Par Personne';
                tab[tab.length] = s.id;
                this.mulObjEnCopie.value = tab;
                console.log('tab des lecteurs par personne====>', tab);
              }

            }
          }
          console.log(' list Selected Lect Person', this.checkFields);
          for (let t of coauteur) {
            for (let g of this.unites2) {
              if (g.name === t) {
                console.log('treeDataSource2======', '--------', this.courrierDepart.coauteur, '--------------', g.name);
                this.radioSelected2 = 'Par Direction';
                this.treeBoxValue2[this.treeBoxValue2.length] = g.ID;
                console.log('tab des lecteurs par direction====>', this.treeBoxValue2);
              }
            }
          }
          console.log(' list All  Person', this.Users3);
          for (let t of coauteur) {
            for (let s of this.Users3) {
              if (s.name === t) {
                console.log('mulobj--------', coauteur, '--------------', s.name);
                this.radioSelected2 = 'Par Personne';
                tab[tab.length] = s.id;
                this.mulObjCoAuteur.value = tab;
                console.log('tab des lecteurs par personne====>', tab);
              }

            }
          }
          console.log('treeDataSource1--------', this.unites1);

        }
      })
    })
  }

  check(e) {
    console.log(e)
    console.log(e.target.checked)
    console.log(e.target.value)
  }

  onSearchChange(searchValue: string): void {
    console.log(searchValue);
  }

  ngOnInit() {
    setInterval(() => {
      try {
        if (sessionStorage.getItem("skin") != null) {
          for (var i = 1; i < 7; i++) {
            let element = document.getElementById("cardheader" + i);
            element.className = "card-header transparent border-0 text-muted " + sessionStorage.getItem("skin");
            //let elmentchevron=document.getElementById("chevron"+i);
            // elmentchevron.className="fa fa-chevron-down "+sessionStorage.getItem("skin");
          }
          let elementbutton = document.getElementById("buttonid");
          elementbutton.className = "btn btn-primary btn-rounded w-200p mb-1 mr-1 butttons-style " + sessionStorage.getItem("skin");
        } else {
          for (var i = 1; i < 7; i++) {
            let element = document.getElementById("cardheader" + i);
            element.className = "card-header transparent border-0 text-muted "
            // let elmentchevron=document.getElementById("chevron"+i);
            //elmentchevron.className="fa fa-chevron-down"
          }
        }
      } catch (e) {
      }
    }, 100)


  }


  //    ListParm pour workflow************************
  formatParams(params, dataform) {
    console.log("dataform ", dataform)
    this.listparams=[];
    if(this.departService.ajoutercourrier == 'newcourrierArriver')
    {
      let courrierdepartsave=this.save(dataform);

      for (let param of courrierdepartsave.paramsWorkflow.split(',')) {
        if (this.courrierDepart[param]) {
          var StringObject = '{"' + param + '":"' + this.courrierDepart[param] + '"}';
          console.log(StringObject);
          this.listparams.push(StringObject);
        }
        console.log("listeParam",this.listparams);
      }
    } else {
      let courrierdepartupdate = this.updateDocument(dataform);
      console.log("courrierdepartupdate ",courrierdepartupdate )
      console.log("paramsWorkflow",courrierdepartupdate.paramsWorkflow)
      for (let param of courrierdepartupdate.paramsWorkflow.split(',')) {
        if (this.courrierDepart[param]) {
          var StringObject = '{"' + param + '":"' + this.courrierDepart[param] + '"}';
          console.log(StringObject);
          this.listparams.push(StringObject);
        }
        console.log("listeParam", this.listparams);
      }
    }

    // // let listParams = []
    //  this.courrierDepart.natureCD = "";
    //  let ListUIAuthReaders = this.getUIAuthReaders();
    //  this.courrierDepart.activityid = this.taskid;
    //  this.courrierDepart.activityName = localStorage.getItem('activityName');
    //  this.courrierDepart.processinstid = localStorage.getItem('processInstanceId');
    //  this.courrierDepart.coauteur = this.ArrayToString(ListUIAuthReaders["Authors"]);
    //  this.courrierDepart.encopiep = this.ArrayToString(ListUIAuthReaders["Readers"]);
    //  this.courrierDepart.responsable = localStorage.getItem("profileUser");
    //  this.courrierDepart.identifiant = this.identifcourrier;
    //  if (this.courrierDepart.body !== null) {
    //    this.courrierDepart.body = this.courrierDepart.body.textContent || this.courrierDepart.body.innerText || "";
    //  }
    //  for (let n of this.naturedepart) {
    //    if (dataform.value[n['nature']] === true) {
    //      this.courrierDepart.natureCD = this.courrierDepart.natureCD + n['nature'] + ',';
    //      console.log("this.courrierDepart.natureCD", this.courrierDepart.natureCD);
    //    }
    //  }
    //  this.courrierDepart.natureCD = this.courrierDepart.natureCD.slice(0, this.courrierDepart.natureCD.length - 1);
    //  console.log("courrier modele ", this.courrierDepart)


    return this.listparams
  }

  //return ws NextTask and save or update document courrier Depart in DB
  returnroutage($event, dataform) {
    let statut;
    //*******router document and create folder save document in DB*********************
    let resultNextTask = $event;
    let document;
    if (this.departService.ajoutercourrier == 'newcourrierArriver') {
      document = this.save(dataform);
      console.log("document===========<", document);
      this.tableFileToAlfresco = this.serviceFile.tableauFile;
      this.alfrescoApi.createFolder(this.identifcourrier, null, this.parentNodeRef)
          .then((dataa: any) => {
                if (this.tableFileToAlfresco.length > 0) {
                  for (let t = 0; t < this.tableFileToAlfresco.length; t++) {
                    if ((typeof (this.tableFileToAlfresco[t])) != 'undefined') {
                      console.log(typeof (this.tableFileToAlfresco[t]));
                      this.alfrescoApi.toUploadFiles(dataa.entry.id, null, this.tableFileToAlfresco[t]);
                      console.log('innnnnnnnnnnnn1111');
                    }
                  }

                }
                console.log(' dossier courrier crÃ©er ', dataa.entry.id);
                document.nodeRef = dataa.entry.id;

              },
          );
      statut = 0;
    } else {
      document = this.updateDocument(dataform);
      statut = 1;
    }

    //***************************router and update document in db******************************************
    let ListAuteurs = [];
    let ListLecteurs = [];

    if (resultNextTask[0] === 'EndEvent') {
      // let document = this.updateDocument(dataform);
      document.activityid = "null"
      document.authors = "";
      document.readers = document.coauteur.concat(",").concat(document.encopiep);
      console.log("list destination et list encopier");
      console.log("readers in end event", document.readers);
      this.departService.onAddCourrierArriver(document, [], [document.readers], 1).subscribe(data => {
            console.log('save', data);
            this.router.navigate(['/courriers']);

          },
      );

    } else {
      localStorage.setItem('taskId', resultNextTask[0]);
      console.log('result next task********', resultNextTask);
      document.activityid = resultNextTask[0];
      document.activityName = resultNextTask[3];


      let i = 0;
      for (let k of resultNextTask[1]) {
        if (k.indexOf('#') !== -1) {
          if(document[k.slice(1, k.length)]) {
            resultNextTask[1][i] = document[k.slice(1, k.length)];
          }
        }
        ListAuteurs.push(resultNextTask[1][i]);
        i++;
      }
      let listEncopie = [];
      let j = 0;
      for (let k of resultNextTask[2]) {
        if (k.indexOf('#') !== -1) {
          if(document[k.slice(1, k.length)]) {
            console.log("variable ", k)
            listEncopie = document[k.slice(1, k.length)].split(',');

            for (let t of listEncopie) {
              ListLecteurs.push(t);
              console.log('entrer dans la boucle ');
            }
          }

        } else {
          ListLecteurs.push(resultNextTask[2][j]);
        }

        j++;
      }
      document.responsable = this.ArrayToString(ListAuteurs);

      console.log('Responsable', document.responsable);
      document.authors = this.ArrayToString(ListAuteurs);
      document.readers = this.ArrayToString(ListLecteurs);

      this.departService.onAddCourrierArriver(document, ListAuteurs, ListLecteurs, 1).subscribe(data => {
        console.log('save', data);

        //this.servicearriver.courrierArrive = data;

        this.workflow.setCondidates(document.activityid, ListAuteurs, ListLecteurs);
        this.router.navigate(['/courriers']);
      });


    }

  }

  onItemClick(item) {
    console.log(this.radioSelected1);
    console.log(item);
    this.radioSelected1 = item;

  }

  onItemClick1(item) {

    this.radioSelected2 = item;
    if (this.testtree9 === false) {
      this.testtree9 = true;
    }

  }

  onItemClick2(item) {

    console.log('item', item);
    this.radioSelected3 = item;

    if (this.testtree9 === false) {
      this.testtree9 = true;
    }

  }

  syncTreeViewSelection1(e) {

    if (!this.treeView1) {
      return;
    }

    if (!this.treeBoxValue1) {
      this.treeView1.instance.unselectAll();
    } else {
      this.treeView1.instance.selectItem(this.treeBoxValue1);
      for (const t in this.unites1) {
        if (this.unites1[t].ID == this.treeBoxValue1) {
          this.selected = this.unites1[t].name;
        }
      }
    }
  }

  treeView_itemSelectionChanged1(e) {
    var a = e.component.getSelectedNodesKeys();
    this.treeBoxValue1 = a;

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
    console.log("tree data source", this.treeDataSource2)
    console.log("tree selected value", this.treeBoxValue2)
    var component = (e && e.component) || (this.treeView2 && this.treeView2.instance);

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

  openmodaleOrga() {

    this.modalReference = this.modal.open(this.filesorganisme, {size: 'lg'});
  }

  showHideCcMailLine() {
    let showhide = document.getElementById('content');
    this.hidden = false;
    if ((showhide.style.display == "none") && (this.hidden == false)) {
      showhide.style.display = "contents";
      this.hidden = true;
    } else {
      showhide.style.display = "none";
    }
  }

  showHideMailManger(nature) {
    let showhide1 = document.getElementById('td' + nature);
    let showhide2 = document.getElementById('td' + nature + '2');
    this.hidden = false;
    if ((showhide1.style.visibility == "hidden") && (showhide2.style.visibility == "hidden") && (this.hidden == false)) {
      showhide1.style.visibility = "visible";
      showhide2.style.visibility = "visible";
      this.hidden = true;
    } else {
      showhide1.style.visibility = "hidden";
      showhide2.style.visibility = "hidden";
    }
  }

  showHideMailFax() {

    let showhide1 = document.getElementById('faxManger1');
    let showhide2 = document.getElementById('faxManger2');

    this.hidden = false;

    if ((showhide1.style.visibility == "hidden") && (showhide2.style.visibility == "hidden") && (this.hidden == false)) {
      console.log("show visibilty is true")

      showhide1.style.visibility = "visible";
      showhide2.style.visibility = "visible";

      this.hidden = true;
    } else {
      showhide1.style.visibility = "hidden";
      showhide2.style.visibility = "hidden";

    }
  }

  sauvegarder(dataform) {
    console.log("getformbymariem", dataform.value)
    if (this.departService.ajoutercourrier == 'newcourrierArriver') {
      let courrierdepart = this.save(dataform);
      console.log('courrierdepartMariem', courrierdepart)
      this.tableFileToAlfresco = this.serviceFile.tableauFile;
      this.alfrescoApi.createFolder(this.identifcourrier, null, this.parentNodeRef).then((dataa: any) => {
        console.log("testt1")
        if (this.tableFileToAlfresco.length > 0) {
          for (let t = 0; t < this.tableFileToAlfresco.length; t++) {
            if ((typeof (this.tableFileToAlfresco[t])) != 'undefined') {
              this.alfrescoApi.toUploadFiles(dataa.entry.id, null, this.tableFileToAlfresco[t]);
            }
          }
        }
        courrierdepart.nodeRef = dataa.entry.id;
        this.departService.onAddCourrierArriver(courrierdepart, [], [], 0).subscribe(data => {
          this.router.navigate(['/courriers']);
        })
      })
    } else {
      let courrierdepart = this.updateDocument(dataform);
      this.departService.onAddCourrierArriver(courrierdepart, [], [], 0).subscribe(data => {
        this.router.navigate(['/courriers']);

      });
    }
  }

  // routage(Decision) {
  //   let ListUIAuthReaders = this.getUIAuthReaders();
  //   this.flowable.nextTask(this.taskid, Decision, this.ArrayToString(ListUIAuthReaders['Authors']), this.ArrayToString(ListUIAuthReaders['Readers']), this.courrierDepart.comment, this.courrierDepart.natureCD, localStorage.getItem("profileUser")).subscribe(
  //       data => {
  //         console.log(data);
  //         // this.courrierDepart.activityid=this.taskid;
  //         localStorage.setItem("taskId", this.taskid)
  //         this.departService.saveCourrierDepart(this.courrierDepart).subscribe(data => {
  //           console.log(data);
  //           this.router.navigate(['/courriers'])
  //         });
  //
  //       });
  // }


  getNature(mail, lettre, fax) {
    this.courrierDepart.natureCD = ""
    if (mail.checked)
      this.courrierDepart.natureCD += "," + mail.value

    if (lettre.checked)
      this.courrierDepart.natureCD += "," + lettre.value

    if (fax.checked)
      this.courrierDepart.natureCD += "," + fax.value
    return this.courrierDepart.natureCD;
    console.log("Selected nature", this.courrierDepart.natureCD)
  }


//---------------------------------- WF Fonctionalities --------------------------------

  // get All Decisions
  getDecisions(taskid) {
    this.decisionTab = []
    this.historicTasks = []
    this.flowable.getGatewayDecision(taskid).subscribe(
        (listDecision) => {
          console.log("List des decisions", listDecision)
          this.decisionTab = listDecision;

        }, error => {
          console.log(error);
        });
  }

  //get Activity Historics
  getHistorics(taskid) {
    this.historicTasks = []
    this.flowable.historicTask(taskid)
        .subscribe(
            (data: any[]) => {
              console.log("historictask======>", data)
              data.forEach(d => {
                const histTab = d.split(' * ');

                if (histTab[1] === null)
                  histTab[1] = '---------';

                const obj = {
                  taskName: histTab[0],
                  decision: histTab[1],
                  assignee: histTab[2],
                  startTime: histTab[3],
                  endTime: histTab[4],
                  duree: histTab[5],
                  description: histTab[6]
                };
                this.historicTasks.push(obj);
              });
            }
        )
    console.log(this.historicTasks)

  }

  //get UI Authors and Readers
  getUIAuthReaders() {
    let ListUIAuthReaders = []
    let listUIAuthors = [];
    let listUIReaders = [];
    if (this.radioSelected2 === 'Par Personne') {
      for (let u of this.mulObjCoAuteur["angularValue"]) {
        listUIAuthors[listUIAuthors.length] = this.Users3[u].name;
      }
    } else if (this.radioSelected2 === 'Par Direction') {
      for (let s of this.treeBoxValue2) {
        for (let g of this.treeDataSource2.__rawData) {
          if (g.ID === s) {
            listUIAuthors[listUIAuthors.length] = g.name;
          }
        }
      }
    } else {
      console.log("l'auteur ne doit pas etre vide");
    }
    if (this.radioSelected3 === 'Par Personne') {
      for (let u of this.mulObjEnCopie["angularValue"]) {
        listUIReaders[listUIReaders.length] = this.Users3[u].name;
      }
    } else if (this.radioSelected3 === 'Par Direction') {
      for (let s of this.treeBoxValue1) {
        for (let g of this.treeDataSource1.__rawData) {
          if (g.ID === s) {
            listUIReaders[listUIReaders.length] = g.name;
          }
        }
      }
    } else {
      console.log("diffiseur ne doit pas etre vide")
    }
    ListUIAuthReaders['Authors'] = listUIAuthors;
    ListUIAuthReaders['Readers'] = listUIReaders;
    return ListUIAuthReaders;
  }

  ArrayToString(List) {
    let str = '';
    for (let t of List) {
      str = str + t + ',';
    }
    return str.slice(0, str.length - 1);
  }

  showHideFieldSet() {
//find all fieldsets marked as "toggleAble"
//   $('fieldset.toggleAble').each(function() {
//     var $fieldSet = $(this);
//     this.filedSet = document.getElementsByClassName('toggleAble');
//     console.log("get element by class", this.filedSet);
//     //find the "legend"... if it does not exist then add it
//     // let theLegend = this.filedSet.
//     // console.log("get the legend",theLegend);
//     var i;
//     for (i = 0; i < this.filedSet.length; i++) {
//       this.filedSet[i].addEventListener("click", function () {
//         this.classList.toggle("active");
//         var panel = this.nextElementSibling;
//         if (panel.style.maxHeight) {
//           panel.style.maxHeight = null;
//         } else {
//           panel.style.maxHeight = panel.scrollHeight + "px";
//         }
//       });
//     }
  }

  // showHideCorps() {
  //   let showhide = document.getElementById('corps');
  //   this.hidden = false;
  //   if ((showhide.style.display == "none") && (this.hidden == false)) {
  //     showhide.style.display = "contents";
  //     this.hidden = true;
  //   } else {
  //     showhide.style.display = "none";
  //   }
  //
  // }


  // if (this.filedSet.length === 0) {
  //   console.log("say hi")
  // this.filedSet = this.filedSet

  // }
  //add a legend if it does not exists and return reference to it
  // }

//     $theLegend.click(function () {
//       //when the legend gets clicked, add an "expanded" class to the parent container fieldset... css will take care of the rest in terms of displaying
//       $(this).parent().toggleClass('expanded');
//     });
//
//     if ($theLegend.find('> span').length == 0) {
//       //there is no span... so take contents of legend and wrap it with a span... the CSS needs this
//       $theLegend.html('<span>' + $theLegend.html() + '</span>');
//     }
//   });
// }

  onEnregistere() {


  }

  onCancel() {
    this.router.navigate(["/courrier"])
  }


  reference() {
    this.departService.getReference().subscribe((dataa: any) => {

      console.log('return  WS', dataa);
      this.identifcourrier = dataa[1]['nomenclature'] + '' + dataa[1]['compteur'];
      this.testIdentificationCD = true;

      console.log('identifant', this.identifcourrier);

    });
  }

  save(dataform) {
    console.log("dataformmariem ", dataform)
    this.courrierDepart.natureCD = "";
    let ListUIAuthReaders = this.getUIAuthReaders();
    this.courrierDepart.activityid = this.taskid;
    this.courrierDepart.activityName = localStorage.getItem('activityName');
    this.courrierDepart.processinstid = localStorage.getItem('processInstanceId');
    this.courrierDepart.coauteur = this.ArrayToString(ListUIAuthReaders["Authors"]);
    this.courrierDepart.encopiep = this.ArrayToString(ListUIAuthReaders["Readers"]);
    this.courrierDepart.responsable = localStorage.getItem("profileUser");
    this.courrierDepart.identifiant = this.identifcourrier;
    let datecourrier = dataform.value.datecourrier;
    console.log("show date when save", datecourrier)
    this.courrierDepart.datecourrier = new Date(datecourrier.year + '-' + datecourrier.month + '-' + datecourrier.day);
    console.log("dateparseeeee", this.courrierDepart.datecourrier);
    for (let n of this.naturedepart) {
      if (dataform.value[n['nature']] === true) {
        this.courrierDepart.natureCD = this.courrierDepart.natureCD + n['nature'] + ',';
        console.log("this.courrierDepart.natureCD", this.courrierDepart.natureCD);
      }
    }
    this.courrierDepart.natureCD = this.courrierDepart.natureCD.slice(0, this.courrierDepart.natureCD.length - 1);
    this.courrierDepart.authors = localStorage.getItem("profileUser");
    this.courrierDepart.paramsWorkflow=localStorage.getItem("params");
    return this.courrierDepart;
  }

  updateDocument(dataForm) {
    let ListUIAuthReaders = this.getUIAuthReaders();
    console.log("gettlistauteur", ListUIAuthReaders)
    this.courrierDepart = this.departService.courrierDepart;
    this.courrierDepart.natureCD =""
    this.courrierDepart.subject = dataForm.value.subject;
    this.courrierDepart.categorieCD = dataForm.value.categorieCD;
    this.courrierDepart.refreponse = dataForm.value.refreponse;
    this.courrierDepart.destinationorganisme = dataForm.value.destinationorganisme;
    this.courrierDepart.destinationcontact = dataForm.value.destinationcontact;
    this.courrierDepart.destinationemail = dataForm.value.destinationemail;
    this.courrierDepart.destinationfax = dataForm.value.destinationfax;
    this.courrierDepart.adressedestination = dataForm.value.adressedestination;
    this.courrierDepart.structureemettrice = dataForm.value.structureemettrice;
    this.courrierDepart.signataire = dataForm.value.signataire;
    this.courrierDepart.emailemettrice = dataForm.value.emailemettrice;
    this.courrierDepart.emailCC = dataForm.value.emailCC;
    console.log("gettdate", this.courrierDepart.emailCC);
    this.courrierDepart.faxemettrice = dataForm.value.faxemettrice;
    this.courrierDepart.adresseemettrice = dataForm.value.adresseemettrice;
    this.courrierDepart.body = dataForm.value.body;
    this.courrierDepart.comment = dataForm.value.comment;
    let datecourrier = dataForm.value.datecourrier;
    console.log("gettdate", datecourrier)
    this.courrierDepart.datecourrier = new Date(datecourrier.year + '-' + datecourrier.month + '-' + datecourrier.day);
    for (let n of this.naturedepart) {
      if (dataForm.value[n['nature']] === true) {
        this.courrierDepart.natureCD = this.courrierDepart.natureCD + n['nature'] + ',';
        console.log("this.courrierDepart.natureCD", this.courrierDepart.natureCD);
      }
    }
    this.courrierDepart.natureCD = this.courrierDepart.natureCD.slice(0, this.courrierDepart.natureCD.length - 1);
    this.courrierDepart.coauteur = this.ArrayToString(ListUIAuthReaders["Authors"]);
    this.courrierDepart.encopiep =this.ArrayToString(ListUIAuthReaders["Readers"]);
    console.log("gettlistauteur", this.courrierDepart.coauteur)
    console.log("gettlisteencopie", this.courrierDepart.encopiep)

    return this.courrierDepart;
  }
}
