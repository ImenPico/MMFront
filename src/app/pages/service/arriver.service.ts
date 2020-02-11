import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environmentVar} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArriverService {

  urlBackMailManager: string = environmentVar.urlBackMailManager;
  _courrierarriverUrl: string = "api/courrier-arrivees";
  courrierArrive: any;
  ajoutercourrier: any;
  currentItem: any;
  activityId: string;
  //Variable courrier integrer
  mailboxurl:string="api/mailbox"
  courrierurl:string='api'
  noderefcurrent:any;
  nomdossier:any;
  selectedData:any;
PathAlfresco:any;
  noderef:any
  modeDocument:any;
  constructor(private httpClient: HttpClient) {
  }


  public MajAcl(iddocument, auteur, lecteur, status): Promise<any> {
    let formdata = new FormData()
    formdata.append("idDocument", iddocument)
    formdata.append("auteur", auteur)
    formdata.append("lecteur", lecteur)
    formdata.append("status", status)
    return new Promise(
        ((resolve, reject) => {
          this.httpClient.post(`${this.urlBackMailManager}` + "api/MaJAcL", formdata,
              {observe: 'body'})
              .subscribe((data: any) => {

                    resolve(data)
                  },
                  error => {
                    reject(error)
                  });
        })
    );
  }

  onAddCourrierArriver(courrier: Object, auteur, lecteurs, statut): Observable<Object> {
    let params = new HttpParams();
    params = params.append("auteurs", auteur);
    params = params.append("lecteurs", lecteurs);
    params = params.append("statut", statut);

    return this.httpClient.post(`${this.urlBackMailManager}` + this._courrierarriverUrl, courrier, {
      params,
      headers: new HttpHeaders().set("Authorization", localStorage.getItem("token"))
    });
  }

  getAllCourrierArrivees(): Observable<Object> {
    return this.httpClient.get(`${this.urlBackMailManager}` + this._courrierarriverUrl, {headers: new HttpHeaders().set("Authorization", localStorage.getItem("token"))});
  }

  getCourrierArriveesById(id) {
    return this.httpClient.get(`${this.urlBackMailManager}` + this._courrierarriverUrl, {
      params: new HttpParams().set("id", id),
      headers: new HttpHeaders().set("Authorization", localStorage.getItem("token"))
    });
  }

  deleteCourrierArriveesById(id) {
    return this.httpClient.delete(`${this.urlBackMailManager}` + this._courrierarriverUrl, {params: new HttpParams().set("id", id)});
  }

  PutCourrierArriver(courrier) {
    return this.httpClient.put(`${this.urlBackMailManager}` + this._courrierarriverUrl, courrier, {headers: new HttpHeaders().set("Authorization", localStorage.getItem("token"))});
  }

  getReference() {
    return this.httpClient.get(`${this.urlBackMailManager}` + "api/references",{headers: new HttpHeaders().set("Authorization", localStorage.getItem("token"))});
  }
  getAllDocument(){
    return this.httpClient.get(`${this.urlBackMailManager}`+"api/documents", {headers: new HttpHeaders().set("Authorization", localStorage.getItem("token"))})

  }
  //recuper le mode (edit ou consult ) input (id document) output (true si mode edit false si mode consulte)
  getAcessCourrierArriver(iddocument){
    return this.httpClient.get(`${this.urlBackMailManager}`+"api/courrier-arrivees-access/"+iddocument, {

      headers: new HttpHeaders().set("Authorization", localStorage.getItem("token"))})


  }


//  WS COURRIER INTEGRER************************************
  getallmailbox()
  {
    return this.httpClient.get(this.urlBackMailManager+this.mailboxurl+"/findallMailbox",{headers: new HttpHeaders().append("Authorization",localStorage.getItem("token"))});

  }

  getmailboxbyid(id)
  {

    return this.httpClient.get(this.urlBackMailManager+this.mailboxurl+"/GetMailboxByID",{params: new HttpParams().set("id", id),headers: new HttpHeaders().append("Authorization",localStorage.getItem("token"))});
  }

  // savecourrier(courrier,autors,reader,status) {
  //   let params = new HttpParams();
  //   params = params.append("auteurs", autors);
  //   params = params.append("lecteurs", reader);
  //   params = params.append("statut", status);
  //   return this.httpClient.post(this.urlBackMailManager +this.courrierurl+ "/courrier-arrivees", courrier,{params,headers: new HttpHeaders().append("Authorization",localStorage.getItem("token"))});
  // }

  getidentifiantCourrierDepart(){
    return this.httpClient.get(`${this.urlBackMailManager}`+"api/courrier-arrivees-repSur", {

      headers: new HttpHeaders().set("Authorization", localStorage.getItem("token"))})


  }
  getAllOrganisme(){
    return this.httpClient.get(`${this.urlBackMailManager}`+"api/organismes", {

      headers: new HttpHeaders().set("Authorization", localStorage.getItem("token"))})
  }

  getContactByOrg(org){
    return this.httpClient.get(`${this.urlBackMailManager}`+"api/contactByOrga/"+org, {

      headers: new HttpHeaders().set("Authorization", localStorage.getItem("token"))})
  }



}



