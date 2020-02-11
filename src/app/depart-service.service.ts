import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environmentVar} from '../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepartServiceService {
    activityId: string;
    currentItem:any;
    ajoutercourrier:any;
    filedocumentAlfresco:any

    courrierDepart:any;
    urlBackMailManager: string = environmentVar.urlBackMailManager;
    _courrierarriverUrl: string = "api/courrier-departs";

    constructor(private httpClient: HttpClient) {

    }

    private extractData(res: Response) {
        let body = res;
        return body || {};
    }

    getAllCourrierDepart(): Observable<Object> {
        return this.httpClient.get(`${this.urlBackMailManager}` + this._courrierarriverUrl, {headers: new HttpHeaders().append("Authorization", localStorage.getItem("token"))}).pipe(map(this.extractData));
    }


    saveCourrierDepart(CourrierDepart): Observable<any> {
        const params = new HttpParams().set('auteurs', "").set('lecteurs', "").set('statut', '0');


        return this.httpClient.post(`${this.urlBackMailManager}` + this._courrierarriverUrl + "/", CourrierDepart, {
            params: params,
            headers: new HttpHeaders().append("Authorization", localStorage.getItem("token"))
        }).pipe(map(this.extractData));
    }

    getReference() {
        return this.httpClient.get(`${this.urlBackMailManager}` + "api/references", {headers: new HttpHeaders().append("Authorization", localStorage.getItem("token"))}).pipe(map(this.extractData));
    }



    getCreatedDate(id) {


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

    //recuper le mode (edit or consuler document courrier depart ) true edit false consulte
    getAcessCourrierDepart(iddocument){
        return this.httpClient.get(`${this.urlBackMailManager}`+"api/courrier-departs-access/"+iddocument, {

            headers: new HttpHeaders().set("Authorization", localStorage.getItem("token"))})


    }

}
