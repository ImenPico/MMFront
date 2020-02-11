import {Component, OnInit, ViewChild} from '@angular/core';
import {IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts} from 'angular-2-dropdown-multiselect';
import {DxTreeViewComponent} from 'devextreme-angular';
import {CheckBoxSelectionService, MultiSelectComponent} from '@syncfusion/ej2-angular-dropdowns';
import {AuthentificationService} from '../service/authentification.service';
import CustomStore from 'devextreme/data/custom_store';
import {CheckBoxComponent} from '@syncfusion/ej2-angular-buttons';
import * as moment from 'moment';

@Component({
  selector: 'app-search-interface',
  templateUrl: './search-interface.component.html',
  styleUrls: ['./search-interface.component.scss','./material.css'],
  providers: [CheckBoxSelectionService]

})
export class SearchInterfaceComponent implements OnInit {

formatedDate2:any
  formatedDate1:any

  year1:any
  year2:any
  month1:any
  month2:any
  day1:any
  day2:any
  typeCourrier:string;


  subject: string;
  dateArrivee1: any;
  dateArrivee2: any;
  entiteemettrice: string;
  destination: any [];
  refexterne: string;

  public show: boolean = false;
  public buttonName: any = 'Show';
  nature = ['Lettre', 'Mail', 'Fax']
  unites1User: any = [];
  unites2Direction: any = [];

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
  tab: any[] = [];
  name: any;
  info: any;
  Users: IMultiSelectOption[] = [];
  Users2: IMultiSelectOption[] = [];
  Users3: IMultiSelectOption[] = [];
  Choisirunevaleur: any;
  lecteur: string;
  testtree9: any = false;
  x: any;
  public mode: string;
  public checkFields: Object = {text: 'name', value: 'id'};


  constructor(private auth: AuthentificationService) {
    this.mode = 'CheckBox';
    this.radioSelected1 = '';
    this.radioSelected2 = '';
    this.radioSelected3 = 'Par Direction';
    this.radioSelected4 = '';
    this.selected = '';
    this.multiselected = '';

//this.auth.getparamalfresco();
//********************************************get USERS form PM******************************************
    this.auth.getUser().subscribe((data: any) => {
      console.log("list user===============>", data)
      this.unites1User = [];
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
      this.auth.getDepartement().subscribe((data: any) => {
        console.log("departement", data);
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
            console.log("treeDataSource2===============>", this.treeDataSource2)
          }
        }

        console.log("Direction et service ====================>", this.unites2Direction)
      })
    })
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

  toggle() {
    this.show = !this.show;
    if (this.show)
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }

  searchWithLazyLoading() {
    this.destination = [];
    if(this.mulObj["angularValue"]) {
      for (let u of this.mulObj["angularValue"]) {

        this.destination[this.destination.length] = this.Users3[u].name;
      }
    }
    if(this.treeBoxValue2) {
      for (let s of this.treeBoxValue2) {
        for (let g of this.treeDataSource2.__rawData) {
          if (g.ID === s) {
            this.destination[this.destination.length] = g.name;
          }
        }
      }
    }

        if (this.dateArrivee1){
        this.year1= this.dateArrivee1["year"];
        this.month1= this.dateArrivee1["month"];
        this.day1= this.dateArrivee1["day"]
          this.formatedDate1=this.year1+"-"+this.month1+"-"+this.day1;

        }
        if (this.dateArrivee2){
          this.year2= this.dateArrivee2["year"];
          this.month2= this.dateArrivee2["month"];
          this.day2= this.dateArrivee2["day"];
          this.formatedDate2=this.year2+"-"+this.month2+"-"+this.day2;
        }
        if ((this.dateArrivee1 && this.dateArrivee2) ==  undefined){
          console.log("heloooo Mariem");
        }
        this.auth.getAllCourrierWithLazy(this.subject, this.formatedDate1,this.formatedDate2,this.entiteemettrice,this.destination,this.refexterne).then(data => {
   console.log("afiicher all courrier ", data) });


  }
}
