import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import {AppSettings} from '../../app.settings';
import {AuthentificationService} from '../service/authentification.service';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {HttpClient} from '@angular/common/http';
export const routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],

    declarations: [LoginComponent]
})

export class LoginModule { }
