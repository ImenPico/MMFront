import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    currentToken: string;

    constructor( private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.currentToken = localStorage.getItem("token");
        console.log(this.currentToken+" auth ga");
        if(this.currentToken == '' || this.currentToken == null) {
            console.log("ussss ")
            this.router.navigate(['']);
        }
        return true;
    }
}
