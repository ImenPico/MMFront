import {Component, OnInit, ViewChild} from '@angular/core';
import {DxTreeViewComponent} from 'devextreme-angular';
import {CheckBoxSelectionService, MultiSelectComponent} from '@syncfusion/ej2-angular-dropdowns';
import {CheckBoxComponent} from '@syncfusion/ej2-angular-buttons';
import {IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts} from 'angular-2-dropdown-multiselect';
import {AuthentificationService} from '../service/authentification.service';
import CustomStore from 'devextreme/data/custom_store';
import {ArriverService} from "../service/arriver.service";

@Component({
  selector: 'app-courriers-internes',
  templateUrl: './courriers-internes.component.html',
  styleUrls: ['./courriers-internes.component.scss','./material.css'],
  providers: [CheckBoxSelectionService]
})
export class CourriersInternesComponent implements OnInit {

  //******************************declaration variables**********************************************

  nature=['Lettre', 'Mail', 'Fax']
  unites1User:any=[];
  unites2Direction:any=[];


  ////////////////////////////TREEEEEEEEEEEEEEE////////////////////
  @ViewChild(DxTreeViewComponent, {static: true}) treeView1: DxTreeViewComponent;
  @ViewChild('treeView2ID', {static: true}) treeView2: DxTreeViewComponent;

  @ViewChild('checkbox', {static: false})
  public mulObj: MultiSelectComponent;

  @ViewChild('selectall', {static: false})
  public checkboxObj: CheckBoxComponent;

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
  testTree:any=false;
  testtree9:any=false;
  privilege:any;
  x: any;





  MYJSONACL = {
    auteurDocument: [],
    listeDiffusion: [],
  };
  MYJSONACLAuth = {
    auteurDocument: [],
    listeDiffusion: [],
  };
  test1:any=false;
  public mode: string;
  public filterPlaceholder: string;
  public checkFields: Object = {text: 'name', value: 'id'};
  public selectAllText: string
  ////////////////////////////FIN TREEEEEEEEEEEEEEE////////////////////
  //**********************************Attribut Couurier Arrivee********************************
  courrier = {
    activity: null,
    nodeRef:null,
    taskId: this.id,
    objet: null,
    nature: null,
    category: 'Catégorie',
    refExtern: null,
    repSur: 'Réponse sur',
    // options: 'Options',
    dateArriver: null,
    dateCourrier: null,
    organisme: null,
    contact: null,
    email: null,
    fax: null,
    address1: null,
    address2: null,
    responsable: null,
    enCopie: null,
    importance: 'Options',
    corps: null,
    nodeId: null,
    path: null,
    comment: null,
    end: null,
    statut: null,
    brouillon: false,
    iden:null
  };
  manager:any;
  chronoTime:any;
  responsable:any;
  //varaible time

  startTime :any= 0
  start :any=0
  end :any= 0
  diff :any= 0
  timerID:any = 0


  constructor(private auth:AuthentificationService, private servicearriver:ArriverService) {
    this.mode = 'CheckBox';
    this.radioSelected1 = '';
    this.radioSelected2 = '';
    this.radioSelected3 = 'Par Direction';
    this.radioSelected4 = '';
    this.selected = '';
    this.multiselected = '';

//this.auth.getparamalfresco();
    this.responsable=localStorage.getItem("profileUser");;






//********************************************get USERS form PM******************************************
    this.auth.getUser().subscribe((data : any)=>{
      console.log("list user===============>",data)
      this.unites1User=[];
      for (let t of data.hits.hits) {
        this.unites1User.push(t._source['displayname']);

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
      const functionTree2 = () => {
        return new CustomStore({
          loadMode: 'raw',
          key: 'ID',
          load: () => this.unites2
        })
      };
      console.log(this.Users);



      //********************************************get departement form PM******************************************
      this.auth.getDepartement().subscribe((data : any)=>{
        console.log("departement",data);
        this.id1 = 1;
        for (let t of data.hits.hits) {
          this.unites2Direction.push(t._source['distinguishedname']);

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
            console.log("treeDataSource2===============>",this.treeDataSource2)
          }
        }












        console.log("Direction et service ====================>",this.unites2Direction)
      })
    })


//recuper managerof connect//
//     this.auth.getManager(localStorage.getItem("usernamepoint")).subscribe(data => {
//       this.manager=data;
//       console.log("admin manager================>",data)
//     })



  }



  ngOnInit() {
    setInterval(()=>{

      try{
        if(sessionStorage.getItem("skin")!=null)
        {
          for(var i=1;i<7;i++){
            let element=document.getElementById("cardheader"+i);
            element.className="card-header transparent border-0 text-muted "+sessionStorage.getItem("skin");
            //let elmentchevron=document.getElementById("chevron"+i);
            // elmentchevron.className="fa fa-chevron-down "+sessionStorage.getItem("skin");
          }
          let elementbutton=document.getElementById("buttonid");
          elementbutton.className= "btn btn-primary btn-rounded w-200p mb-1 mr-1 butttons-style "+sessionStorage.getItem("skin");
        }
        else
        {
          for(var i=1;i<7;i++){
            let element=document.getElementById("cardheader"+i);
            element.className="card-header transparent border-0 text-muted "
            // let elmentchevron=document.getElementById("chevron"+i);
            //elmentchevron.className="fa fa-chevron-down"

          }
        }

      }
      catch(e){

      }
    },100)



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
    if(this.testtree9===false){
      this.testtree9=true;
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
    console.log("tree data source",this.treeDataSource2)
    console.log("tree selected value",this.treeBoxValue2)
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


  //Cono

  chrono(){

    this.end = new Date()
    this.diff = this.end - this.start
    this.diff = new Date(this.diff)
    var msec = this.diff.getMilliseconds()
    var sec = this.diff.getSeconds()
    var min = this.diff.getMinutes()
    var hr = this.diff.getHours()-1
    if (min < 10){
      min = "0" + min
    }
    if (sec < 10){
      sec = "0" + sec
    }
    if(msec < 10){
      msec = "00" +msec
    }
    else if(msec < 100){
      msec = "0" +msec
    }

    this.chronoTime=msec;
    console.log("chrono====>",this.chronoTime);
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
  //**************************************************Sauvgarder courrier arrivee*****************************
  sauvgarder(dataform){
    this.courrier=dataform.value;

    //this.servicearriver.onAddCourrierArriver(this.courrier).subscribe(data=>{
    //   console.log("date=============>",data);
    // })


  }

}

