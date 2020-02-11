import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import DevExpress from 'devextreme/bundles/dx.all';
import CustomStore from 'devextreme/data/custom_store';
import {AuthentificationService} from '../service/authentification.service';
import {DxTreeViewComponent} from 'devextreme-angular';
import {CheckBoxSelectionService, MultiSelectComponent} from '@syncfusion/ej2-angular-dropdowns';
import {CheckBoxComponent} from '@syncfusion/ej2-angular-buttons';
import {IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts} from 'angular-2-dropdown-multiselect';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {FlowableService} from '../../flowable.service';
import list from 'devextreme/ui/list';
import {Router} from '@angular/router';
import {AlfrescoService} from '../fileModule/alfresco_services/AlfrescoApi.service';
import {ServiceFileService} from '../fileModule/alfresco_services/service-file.service';
import {WorkflowComponent} from '../workflow/workflow.component';
import {ArriverService} from '../service/arriver.service';
import * as moment from "moment";
import {Observable} from "rxjs";
import {debounceTime, distinctUntilChanged, map} from "rxjs/operators";
import {DepartServiceService} from "../../depart-service.service";

export class filesAlfreco {
    fileName : String;
    typeFile: String;
    nodeRefParent: String;
    uniteId:String;

}
export class dateFormat {
    year: Number;
    month: Number;
    day: Number;

}

export class BaseContact {
    ID: number;
    Organisme: string;
    Contact: string;

}

//
//
// const identifantCD = ['CD-00001', 'CD-00002', 'CD-00003', 'CD-00004', 'CD-00005', 'CD-00006', 'CD-00007',
//     'CD-00008', 'CD-00009', 'CD-00010', 'CD-000011', 'CD-000013'];




@Component({
    selector: 'app-courriers-arrives',
    templateUrl: './courriers-arrives.component.html',
    styleUrls: ['./courriers-arrives.component.scss', './material.css'],
    providers: [CheckBoxSelectionService]
})
export class CourriersArrivesComponent implements OnInit {

    identifantCD:any;



    //******************************declaration variables**********************************************

    baseContact: any;





    dateNow: any;
    modedocument: boolean = true;

    nature = ['Lettre', 'Mail', 'Fax'];
    unites1User: any = [];
    unites2Direction: any = [];
    //*****************Workflow attributs
    historicTasks: any[] = [];
    listDecisions: any[] = [];
    taskid: any;
    handle1;

    authentifer: any = localStorage.getItem('profileUser');
    processInstanceId: any = localStorage.getItem('processInstanceId');
    @ViewChild(WorkflowComponent, {static: true}) workflow: WorkflowComponent;
    //////////////////////////TREEEEEEEEEEEEEEE////////////////////
    @ViewChild(DxTreeViewComponent, {static: true}) treeView1: DxTreeViewComponent;
    @ViewChild('treeView2ID', {static: true}) treeView2: DxTreeViewComponent;
    @ViewChild('filesorganisme', {static: true}) filesorganisme: TemplateRef<any>;

    @ViewChild('checkbox', {static: false})
    public mulObj: MultiSelectComponent;

    @ViewChild('selectall', {static: false})
    public checkboxObj: CheckBoxComponent;
    params: any;
    listparams: any;
    unites1: any = [];
    id2: number;
    selected: string;
    id1: number;
    id;
    Units: string[];
    unites2: any = [];
    anc: any;
    virgule: number;
    chaine: any;
    ou: any;
    treeDataSource1: any;
    treeBoxValue1: Number[];
    treeDataSource2: any;
    treeBoxValue2: Number[];
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
    testTree: any = false;
    testtree9: any = false;
    privilege: any;
    x: any;


    MYJSONDespCopie = {
        auteurDocument: [],
        listeDiffusion: [],
    };
    MYJSONACLAuth = {
        auteurDocument: [],
        listeDiffusion: [],
    };
    test1: any = false;
    public mode: string;
    public filterPlaceholder: string;
    public checkFields: Object = {text: 'name', value: 'id'};
    public selectAllText: string;
    modalReference: NgbModalRef;
    parentNodeRef = 'd44d73a3-439c-4ee1-a156-f71f259d0ae7';
    setDateFormat(dateA) {
        let dateN = new dateFormat();
        dateN.day = Number.parseInt((dateA.split('-')[2]));
        dateN.year = Number.parseInt((dateA.split('-')[0]));
        dateN.month = Number.parseInt((dateA.split('-')[1]));
        return dateN;
    }

    nodeRef: any;

    Identificationobligatoire: any = true;

    ////////////////////////////FIN TREEEEEEEEEEEEEEE////////////////////
    //**********************************Attribut Couurier Arrivee********************************

    courrierArrive = {
        id: null,
        entiteemettrice: null,
        emetteurorganisme: null,
        emetteurcontact: null,
        emetteurfax: null,
        emetteuremail: null,
        subject: null,
        importance: null,
        body: null,
        nodeRef: null,
        pathAlfresco: null,
        datearrivee: null,
        datecourrier:null,
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
        identifiant: null,
        processinstid: null,
        instructionannotation: null,
        instructionresponsable: null,
        affecter: null,
        acteur: null,
        paramsWorkflow: null,

    };


    //tableau alfresco
    tableFileToAlfresco: any[] = [];
    ReferenceList = [];
    identifcourrier: any;
    testIdentification: any = false;
    ajout: any;

    constructor(private auth: AuthentificationService,private servicedepart:DepartServiceService, private servicearriver: ArriverService, private modal: NgbModal, private flowable: FlowableService, private route: Router, private alfrescoApi: AlfrescoService, private serviceFile: ServiceFileService) {


        let dateNow = moment().format('YYYY-MM-DD');
        this.ajout = this.servicearriver.ajoutercourrier;
        this.modedocument = this.servicearriver.modeDocument;
        this.mode = 'CheckBox';
        this.radioSelected1 = '';
        this.radioSelected2 = '';
        this.radioSelected3 = 'Par Direction';
        this.radioSelected4 = '';
        this.selected = '';
        this.multiselected = '';

        if (this.servicearriver.ajoutercourrier == 'newcourrierArriver') {
            this.taskid = localStorage.getItem('taskId');
            this.params = localStorage.getItem('params');
        } else {
            localStorage.setItem('taskId', this.servicearriver.activityId);
            this.taskid = localStorage.getItem('taskId');
            this.params = this.courrierArrive.paramsWorkflow;
            console.log("paramsworkflow", this.params);
            this.Identificationobligatoire = false;
        }


        // this.taskid = localStorage.getItem('taskId');


//********************************************get USERS form PM******************************************
        this.auth.getUser().subscribe((data: any) => {
            console.log('list user===============>', data);
            this.unites1User = [];
            for (let t of data['data']) {
                this.unites1User.push(t['displayname']);

            }
            console.log('tableaux user', this.unites1User);
            //multiple
            let i = 0;
            this.unites1User.forEach(d => {
                let element = {'id': i, 'name': d};
                this.Users.push(element);
                i = i + 1;

            });
            //single
            this.Users3 = this.Users;
            this.Users.forEach(r =>
                this.tab.push(r.name));
            const functionTree1 = () => {
                return new CustomStore({
                    loadMode: 'raw',
                    key: 'ID',
                    load: () => this.unites1
                });

            };
            const functionTree2 = () => {
                return new CustomStore({
                    loadMode: 'raw',
                    key: 'ID',
                    load: () => this.unites2
                });
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

                console.log( "Table unites1"  ,this.unites1)
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
                        console.log('treeDataSource2===============>', this.treeDataSource2);
                    }
                }


                console.log('Direction et service ====================>', this.unites2Direction);


                //getDocument
                if (this.servicearriver.ajoutercourrier == 'newcourrierArriver') {

                }
                else {
                    this.courrierArrive = this.servicearriver.courrierArrive;
                    this.courrierArrive.datearrivee = this.setDateFormat(this.courrierArrive.datearrivee);
                    this.courrierArrive.datecourrier = this.setDateFormat(this.courrierArrive.datecourrier);
                    console.log(this.courrierArrive.datearrivee);
                    this.taskid = this.courrierArrive.activityid;
                    this.treeBoxValue2 = [];
                    this.treeBoxValue1 = [];
                    this.test1 = true;
                    let tab = [];
                    this.courrierArrive = this.servicearriver.courrierArrive;
                    console.log('treeDataSource2======', this.unites2);

                    let listencopier = this.courrierArrive.encopiep.split(',');
                    console.log('listencopier======', listencopier);

                    let destination = this.courrierArrive.destination;
                    console.log('listdestination======', destination);
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
                                console.log('mulobj--------', destination, '--------------', s.name);
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
                        if (g.name === destination) {
                            this.radioSelected1 = 'Par Direction';
                            this.treeBoxValue1 = g.ID;
                        }
                    }
                    for (let s of this.tab) {
                        if (s === destination) {
                            this.radioSelected1 = 'Par Personne';
                            this.MYJSONDespCopie.auteurDocument = s;
                        }
                    }

                }
            });

        });




    //    getIdentifantCourrier depart

        this.servicearriver.getidentifiantCourrierDepart().subscribe(data=>{
            console.log("dataaaa identifant CD",data)
            this.identifantCD=data
        })

    //getOrganisme
        this.servicearriver.getAllOrganisme().subscribe(data=>{
            console.log("dataaaa identifant CD",data)

        })
//getContactBy
//         this.servicearriver.getContactByOrg(org:any).subscribe(data=>{
//             console.log("dataaaa identifant CD",data)
//             this.identifantCD=data
//         })


    }

    ngOnInit() {
        this.dateNow = moment().format('YYYY-MM-DD');

    }


    onItemClick(item) {
        console.log(this.radioSelected1);
        console.log(item);
        this.radioSelected1 = item;

    }

    onItemClick1(item) {
        console.log('item select===========>');
        console.log('select', this.radioSelected2);
        console.log('item', item);
        this.radioSelected2 = item;
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
        this.testTree = true;
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
        console.log('tree data source', this.treeDataSource2);
        console.log('tree selected value', this.treeBoxValue2);
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

    openmodaleOrga() {

        this.modalReference = this.modal.open(this.filesorganisme, {size: 'lg'});
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

    //**********methode save without routage**********************

    save(dataform) {
        //********************************************element select of destination and en copie***************************
        if (this.radioSelected1 === 'Par Personne') {
            let aux = this.MYJSONDespCopie.auteurDocument;
            console.log('lecteur', aux);
            this.MYJSONDespCopie.auteurDocument = [];
            this.MYJSONDespCopie.auteurDocument[0] = aux;

        } else if (this.radioSelected1 === 'Par Direction') {
            this.MYJSONDespCopie.auteurDocument = [];
            console.log('this.MYJSONDespCopie.auteurDocument', this.MYJSONDespCopie.auteurDocument);
            console.log('treeBoxValue1', this.treeBoxValue1);
            console.log('treeDataSource1', this.treeDataSource1);

            if ((!this.testTree)) {
                for (let g of this.treeDataSource1.__rawData) {

                    if (g.ID === this.treeBoxValue1) {

                        this.MYJSONDespCopie.auteurDocument[this.MYJSONDespCopie.auteurDocument.length] = g.name;
                    }
                }
            } else {
                for (let s of this.treeBoxValue1) {
                    for (let g of this.treeDataSource1.__rawData) {

                        if (g.ID === s) {

                            this.MYJSONDespCopie.auteurDocument[this.MYJSONDespCopie.auteurDocument.length] = g.name;
                        }
                    }
                }
            }

        } else {
            console.log('l\'auteur ne doit pas etre vide');
        }

        // en copie

        if (this.radioSelected2 === 'Par Personne') {
            this.MYJSONDespCopie.listeDiffusion = [];

            for (let u of this.mulObj['angularValue']) {
                this.MYJSONDespCopie.listeDiffusion[this.MYJSONDespCopie.listeDiffusion.length] = this.Users3[u].name;
            }

        } else if (this.radioSelected2 === 'Par Direction') {
            this.MYJSONDespCopie.listeDiffusion = [];
            for (let s of this.treeBoxValue2) {
                for (let g of this.treeDataSource2.__rawData) {
                    if (g.ID === s) {
                        this.MYJSONDespCopie.listeDiffusion[this.MYJSONDespCopie.listeDiffusion.length] = g.name;
                    }
                }
            }

        } else {
            console.log('diffiseur ne doit pas etre vide');
        }
        let MYJSONADestiCopie = {
            'auteurDocument': this.MYJSONDespCopie.auteurDocument,
            'listeDiffusion': this.MYJSONDespCopie.listeDiffusion,
        };
        let listencopier = this.ArrayToString(MYJSONADestiCopie.listeDiffusion);
        console.log('list en copie', listencopier);

        console.log('List destination ****:', MYJSONADestiCopie.auteurDocument, 'List en copier*****', MYJSONADestiCopie.listeDiffusion);
        console.log('data======================>', dataform.value, 'dateArrive', 'dateCouurier');


        //***********formulaire
        this.courrierArrive = dataform.value;
        dataform.value.auteurDocument = listencopier;
        console.log('dateArriver from UA', dataform.value.datearrivee);
        console.log('dateCourrier from UA', dataform.value.datecourrier);

        let datearrivee = dataform.value.datearrivee;
        this.courrierArrive.datearrivee = new Date(datearrivee.year + '-' + datearrivee.month + '-' + datearrivee.day);

        let datecourrier = dataform.value.datecourrier;
        this.courrierArrive.datecourrier = new Date(datecourrier.year + '-' + datecourrier.month + '-' + datecourrier.day);

        this.courrierArrive.initiateurName = localStorage.getItem('profileUser');
        this.courrierArrive.responsable = localStorage.getItem('profileUser');
        this.courrierArrive.pathAlfresco = 'path';
        this.courrierArrive.activityName = localStorage.getItem('ActivityName');
        this.courrierArrive.activityid = localStorage.getItem('taskId');
        this.courrierArrive.processinstid = localStorage.getItem('processInstanceId');
        console.log('this.courrierArrive.processinstid', this.courrierArrive.processinstid);
        this.courrierArrive.destination = this.ArrayToString(MYJSONADestiCopie.auteurDocument);
        this.courrierArrive.encopiep = listencopier;
        console.log(' dossier ======================> ', this.nodeRef)
        this.courrierArrive.nodeRef = this.nodeRef;
        this.courrierArrive.identifiant = this.identifcourrier;
        this.courrierArrive.authors = localStorage.getItem('profileUser');
        this.courrierArrive.paramsWorkflow = localStorage.getItem("params");
        console.log("importance!!!!!!!!!!!!!",dataform.value.importance)
        if(dataform.value.importance===true){
            this.courrierArrive.importance="important"
        }

        console.log('courier Arrives temporellemnt save1', this.courrierArrive);
        return this.courrierArrive;
    }

    updateDocument(dataForm) {


        //********************************************element select of destination and en copie***************************
        if (this.radioSelected1 === 'Par Personne') {
            let aux = this.MYJSONDespCopie.auteurDocument;
            this.MYJSONDespCopie.auteurDocument = [];
            this.MYJSONDespCopie.auteurDocument[0] = aux;

        } else if (this.radioSelected1 === 'Par Direction') {
            this.MYJSONDespCopie.auteurDocument = [];
            console.log('this.MYJSONDespCopie.auteurDocument', this.MYJSONDespCopie.auteurDocument);
            console.log('treeBoxValue1', this.treeBoxValue1);
            console.log('treeDataSource1', this.treeDataSource1);

            if ((!this.testTree)) {
                for (let g of this.treeDataSource1.__rawData) {

                    if (g.ID === this.treeBoxValue1) {

                        this.MYJSONDespCopie.auteurDocument[this.MYJSONDespCopie.auteurDocument.length] = g.name;
                    }
                }
            } else {
                for (let s of this.treeBoxValue1) {
                    for (let g of this.treeDataSource1.__rawData) {

                        if (g.ID === s) {

                            this.MYJSONDespCopie.auteurDocument[this.MYJSONDespCopie.auteurDocument.length] = g.name;
                        }
                    }
                }
            }

        } else {
            console.log('l\'auteur ne doit pas etre vide');
        }

        // en copie

        if (this.radioSelected2 === 'Par Personne') {
            this.MYJSONDespCopie.listeDiffusion = [];

            for (let u of this.mulObj['angularValue']) {
                this.MYJSONDespCopie.listeDiffusion[this.MYJSONDespCopie.listeDiffusion.length] = this.Users3[u].name;
            }

        } else if (this.radioSelected2 === 'Par Direction') {
            this.MYJSONDespCopie.listeDiffusion = [];
            for (let s of this.treeBoxValue2) {
                for (let g of this.treeDataSource2.__rawData) {
                    if (g.ID === s) {
                        this.MYJSONDespCopie.listeDiffusion[this.MYJSONDespCopie.listeDiffusion.length] = g.name;
                    }
                }
            }

        } else {
            console.log('diffiseur ne doit pas etre vide');
        }
        let MYJSONADestiCopie = {
            'auteurDocument': this.MYJSONDespCopie.auteurDocument,
            'listeDiffusion': this.MYJSONDespCopie.listeDiffusion,
        };
        let listencopier = this.ArrayToString(MYJSONADestiCopie.listeDiffusion);

        console.log('list en copie', listencopier);


        this.courrierArrive = this.servicearriver.courrierArrive;
        this.courrierArrive.subject = dataForm.value.subject;
        this.courrierArrive.nature = dataForm.value.nature;
        this.courrierArrive.categorie = dataForm.value.categorie;
        this.courrierArrive.refexterne = dataForm.value.refexterne;
        this.courrierArrive.refreponse = dataForm.value.refreponse;
        this.courrierArrive.emetteurorganisme = dataForm.value.emetteurorganisme;
        this.courrierArrive.emetteurcontact = dataForm.value.emetteurcontact;
        this.courrierArrive.emetteuremail = dataForm.value.emetteuremail;
        this.courrierArrive.body = dataForm.value.body;
        this.courrierArrive.comment = dataForm.value.comment;
        let datearrivee = dataForm.value.datearrivee;
        this.courrierArrive.datearrivee = new Date(datearrivee.year + '-' + datearrivee.month + '-' + datearrivee.day);

        let datecourrier = dataForm.value.datecourrier;
        this.courrierArrive.datecourrier = new Date(datecourrier.year + '-' + datecourrier.month + '-' + datecourrier.day);

        this.courrierArrive.destination = this.ArrayToString(MYJSONADestiCopie.auteurDocument);
        this.courrierArrive.encopiep = listencopier;

        console.log("document temporelle update", this.courrierArrive)
        return this.courrierArrive;
    }

    //**********methode convert ArrayString to string***********
    ArrayToString(List) {
        let str = '';
        for (let t of List) {
            str = str + t + ',';
        }
        return str.slice(0, str.length - 1);
    }

    ArrayToStringWithSpace(List) {
        let str = '';
        for (let t of List) {
            str = str + t + ',';
        }
        return str;
    }

    //**************************************************Sauvgarder courrier arrivee*****************************
    sauvgarder(dataform) {


        //*************************Save document and create folder in alfresco***************************

        if (this.servicearriver.ajoutercourrier == 'newcourrierArriver') {
            let document = this.save(dataform);
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
                        console.log(' dossier alfresco ', dataa);
                        console.log(' dossier courrier crÃ©er ', dataa.entry.id);
                        document.nodeRef = dataa.entry.id;

                        console.log('object courrier arriver', document);
                        this.servicearriver.onAddCourrierArriver(document, [], [], 0).subscribe(
                            data => {
                                console.log('create courrier', data);
                                this.route.navigate(['/gridcourriers']);

                            },
                            error => this.handle1 = error.message
                        );
                    },
                    error => this.handle1 = error.message
                );
         this.getAllFilsFromalfresco(document.nodeRef);

        }
        //*********************************update document and add file in  in alfresco
        else {

            let document = this.updateDocument(dataform);

            this.servicearriver.onAddCourrierArriver(document, [], [], 0).subscribe(
                data => {
                    console.log('update courrier', data);
                    this.route.navigate(['/gridcourriers']);
                },
                error => console.log(error)
            );


        }



    }

    //*************************result WS nextTask and save or updat document courrier Arriver db ********************************************************************


//methode save routage dans tout les etaps des workflow**********************************
    saveroutage(document, resultNextTask) {
        console.log("documentaaaaaaaaaaa", document)
        let ListAuteurs = [];
        let ListLecteurs = [];

        if (resultNextTask[0] === 'EndEvent') {
            // let document = this.updateDocument(dataform);
            document.responsable = document.destination;
            document.activityid = "null"
            document.authors = "";
            document.readers = document.destination.concat(",").concat(document.encopiep);
            console.log("list destination et list encopier");
            console.log("readers in end event", document.readers);
            this.servicearriver.onAddCourrierArriver(document, [], [document.readers], 1).subscribe(data => {
                    console.log('save', data);

                    this.route.navigate(['/gridcourriers']);

                },
                error => this.handle1 = error.message
            );

        } else {


            localStorage.setItem('taskId', resultNextTask[0]);
            console.log('result next task********', resultNextTask);
            document.activityid = resultNextTask[0];
            document.activityName = resultNextTask[3];
            console.log('auteur', document.destination);
            console.log('en copier', document.encopiep);
            let i = 0;
            for (let k of resultNextTask[1]) {
                if (k.indexOf('#') !== -1) {
                    if (document[k.slice(1, k.length)]) {
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
                    if (document[k.slice(1, k.length)]) {
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

            this.servicearriver.onAddCourrierArriver(document, ListAuteurs, ListLecteurs, 1).subscribe(data => {
                console.log('save', data);

                //this.servicearriver.courrierArrive = data;

                this.workflow.setCondidates(document.activityid, ListAuteurs, ListLecteurs);
                this.route.navigate(['/gridcourriers']);
            });
        }
    }

    //*******router document and create folder save document in DB*********************
    returnroutage($event) {

        let resultNextTask = $event;

        if (this.servicearriver.ajoutercourrier == 'newcourrierArriver') {
            console.log("document===========<", this.courrierArrive);
            this.tableFileToAlfresco = this.serviceFile.tableauFile;
            this.alfrescoApi.createFolder(this.courrierArrive.identifiant, null, this.parentNodeRef)
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
                        this.courrierArrive.nodeRef = dataa.entry.id;


                        this.saveroutage(this.courrierArrive, resultNextTask);
                    },
                    error => this.handle1 = error.message
                );


        } else {
            this.saveroutage(this.courrierArrive, resultNextTask);
        }
    }


//getReference
    reference() {
        this.servicearriver.getReference().subscribe((dataa: any) => {
            let result;
            console.log('return  WS', dataa);
            this.identifcourrier = dataa[0]['nomenclature'] + '' + dataa[0]['compteur'];
            console.log('identifant', this.identifcourrier);
            this.testIdentification = true;


        });
    }

    message: string;


    resultNexting($event, f) {
        this.message = $event;
        console.log('formulaire', f.value);
        console.log('mesaggggggg', $event);
    }


    onEnregistere() {

    }

    onCancel() {
        this.route.navigate(["/gridcourriers"])
    }

//    ListParm pour workflow************************
    formatParams(params, dataform) {
        console.log("dataform ", dataform)
        if (this.servicearriver.ajoutercourrier == 'newcourrierArriver') {
            this.courrierArrive = this.save(dataform);
        }else {
            this.courrierArrive = this.updateDocument(dataform);
        }
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


    formatter = (result: string) => result.toUpperCase();

    search = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map(term => term === '' ? []
                : this.identifantCD.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
        )


    getAllFilsFromalfresco(nodeRef):any{
        let fileAlfresco = new filesAlfreco()
        this.alfrescoApi.getNodeChilds(nodeRef).then((data1) => {


            console.log("unitid0");
            console.log(data1);


            for (let i = 0; i < data1.list.entries.length; i++) {
                if (data1.list.entries[i].entry.name) {
                    fileAlfresco.fileName = data1.list.entries[i].entry.name;
                    // fileAlfresco.size = data1.list.entries[i].entry.content.sizeInBytes;
                    fileAlfresco.typeFile = data1.list.entries[i].entry.content.mimeTypeName;
                    fileAlfresco.nodeRefParent = data1.list.entries[i].entry.parentId;
                    fileAlfresco.uniteId = data1.list.entries[i].entry.id;

                    console.log("PieceJoint", fileAlfresco);

                    // this.serviceFile.savePieceJoint(this.pieceJointModel).subscribe(
                    //     data => {
                    //         console.log('data save:', data);
                    //
                    //     },
                    //     error => console.log(error)
                    // );
                    this.servicedepart.filedocumentAlfresco.push(fileAlfresco)

                }

            }


            // this.Filealfresco=fileAlfresco;
            // console.log("filealfresco===============>", this.Filealfresco);

        });
    }

}
