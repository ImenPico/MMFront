import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PagesComponent } from './pages/pages.component';
import { BlankComponent } from './pages/blank/blank.component';
import { SearchComponent } from './pages/search/search.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import {PageCentraleComponent} from './pages/page-centrale/page-centrale.component';
import {CourriersArrivesComponent} from './pages/courriers-arrives/courriers-arrives.component';
import {CourriersDepartsComponent} from './pages/courriers-departs/courriers-departs.component';
import {CourriersInternesComponent} from './pages/courriers-internes/courriers-internes.component';
import {CourriersComponent} from './pages/courriers/courriers.component';
import {AuthGuardService} from './pages/service/AuthGuardService.service';
import {AdministartionComponent} from './pages/administartion/administartion.component';
import {SearchInterfaceComponent} from './pages/search-interface/search-interface.component';

import {StopWatchComponent} from './pages/stop-watch/stop-watch.component';
import {AnnotationComponent} from './pages/annotation/annotation.component';
import {TraitementComponent} from './pages/traitement/traitement.component';
import {GridcourierarriverComponent} from './pages/gridcourierarriver/gridcourierarriver.component';
import {GridcourrierInternesComponent} from './pages/gridcourrier-internes/gridcourrier-internes.component';
import {GridTousCourrierComponent} from './pages/grid-tous-courrier/grid-tous-courrier.component';
import {CourrierIntegrerComponent} from './pages/courrier-integrer/courrier-integrer.component';
import {TacheComponent} from "./pages/tache/tache.component";
import {ConsultParReferenceComponent} from "./pages/ConsulterPar/consult-par-reference/consult-par-reference.component";
import {ConsultParExpediteurComponent} from "./pages/ConsulterPar/consult-par-expediteur/consult-par-expediteur.component";
import {ConsultParDateComponent} from "./pages/ConsulterPar/consult-par-date/consult-par-date.component";


export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: PagesComponent,
    children:[
     // { path: 'page-centrale', component: PageCentraleComponent, data: { breadcrumb: 'Page centrale'},canActivate: [AuthGuardService]},
      { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardModule', data: { breadcrumb: 'Dashboard' },canActivate: [AuthGuardService] },
      { path: 'membership', loadChildren: './pages/membership/membership.module#MembershipModule', data: { breadcrumb: 'Membership' } ,canActivate: [AuthGuardService]},
      { path: 'ui', loadChildren: './pages/ui/ui.module#UiModule', data: { breadcrumb: 'UI' } },
      { path: 'form-elements', loadChildren: './pages/form-elements/form-elements.module#FormElementsModule', data: { breadcrumb: 'Form Elements' } ,canActivate: [AuthGuardService]},
      { path: 'tables', loadChildren: './pages/tables/tables.module#TablesModule', data: { breadcrumb: 'Tables' } ,canActivate: [AuthGuardService]},
      { path: 'tools', loadChildren: './pages/tools/tools.module#ToolsModule', data: { breadcrumb: 'Tools' } ,canActivate: [AuthGuardService]},
      { path: 'calendar', loadChildren: './pages/calendar/app-calendar.module#AppCalendarModule', data: { breadcrumb: 'Calendar' } ,canActivate: [AuthGuardService]},
      { path: 'mailbox', loadChildren: './pages/mailbox/mailbox.module#MailboxModule', data: { breadcrumb: 'Mailbox' } ,canActivate: [AuthGuardService]},
      { path: 'maps', loadChildren: './pages/maps/maps.module#MapsModule', data: { breadcrumb: 'Maps' },canActivate: [AuthGuardService] },
      { path: 'charts', loadChildren: './pages/charts/charts.module#ChartsModule', data: { breadcrumb: 'Charts' },canActivate: [AuthGuardService] },
      { path: 'dynamic-menu', loadChildren: './pages/dynamic-menu/dynamic-menu.module#DynamicMenuModule', data: { breadcrumb: 'Dynamic Menu' } ,canActivate: [AuthGuardService] },
      { path: 'profile', loadChildren: './pages/profile/profile.module#ProfileModule', data: { breadcrumb: 'Profile' }  ,canActivate: [AuthGuardService]},
      { path: 'blank', component: BlankComponent, data: { breadcrumb: 'Blank page' } ,canActivate: [AuthGuardService]},
      { path: 'search', component: SearchComponent, data: { breadcrumb: 'Search' } ,canActivate: [AuthGuardService]},
      { path: 'page-centrale', component: PageCentraleComponent, data: { breadcrumb: 'Page centrale'},canActivate: [AuthGuardService]},
      { path: 'gridcourriers', component: GridcourierarriverComponent, data: { breadcrumb: 'Courriers arrivés'},canActivate: [AuthGuardService]},
      { path: 'gridcourriersinternes', component: GridcourrierInternesComponent, data: { breadcrumb: 'gridcourriersinternes'},canActivate: [AuthGuardService]},
      { path: 'gridtouscourrier', component: GridTousCourrierComponent, data: { breadcrumb: 'tous courrier'},canActivate: [AuthGuardService]},
      { path: 'Rédaction du courrier', component: CourriersDepartsComponent, data: { breadcrumb: 'Courriers départs'},canActivate: [AuthGuardService]},
      { path: 'courriers-internes', component: CourriersInternesComponent, data: { breadcrumb: 'Courriers internes'},canActivate: [AuthGuardService]},
      { path: 'courriers', component: CourriersComponent, data: { breadcrumb: 'Tous les courriers'},canActivate: [AuthGuardService]},
      { path: 'administration', component: AdministartionComponent, data: { breadcrumb: 'Administation'},canActivate: [AuthGuardService]},
      { path: 'search-interface', component: SearchInterfaceComponent, data: { breadcrumb: 'search-interface'},canActivate: [AuthGuardService]},
      { path: 'stop-watch', component: StopWatchComponent, data: { breadcrumb: 'stop-watch'},canActivate: [AuthGuardService]},
      { path: 'Enregistrement', component: CourriersArrivesComponent, data: { breadcrumb: 'Enregistrement'},canActivate: [AuthGuardService]},
      { path: 'Annotation', component: AnnotationComponent, data: { breadcrumb: 'Annotation'},canActivate: [AuthGuardService]},
      { path: 'Traitement', component: TraitementComponent, data: { breadcrumb: 'Traitement'},canActivate: [AuthGuardService]},
      { path: 'courrierintegrer', component: CourrierIntegrerComponent, data: { breadcrumb: 'courriers integrer'},canActivate: [AuthGuardService]},
      { path: 'tache', component: TacheComponent, data: { breadcrumb: 'tache'},canActivate: [AuthGuardService]},
      {path:'par date',component:ConsultParDateComponent,data:{breadcrumb: 'date'},canActivate:[AuthGuardService]},
      {path:'par refernce',component:ConsultParReferenceComponent,data:{breadcrumb: 'refernce'},canActivate:[AuthGuardService]},
      {path:'par Expediteur',component:ConsultParExpediteurComponent,data:{breadcrumb: 'Expediteur'},canActivate:[AuthGuardService]},
    ]
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterModule' },
  { path: '**', component: NotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  // preloadingStrategy: PreloadAllModules,  // <- uncomment this line for disable lazy load
  // useHash: true
});
