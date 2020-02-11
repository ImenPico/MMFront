import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { AgmCoreModule } from '@agm/core';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ToastrModule } from 'ngx-toastr';
import { PipesModule } from './theme/pipes/pipes.module';
import { routing } from './app.routing';
import { AppSettings } from './app.settings';
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { HeaderComponent } from './theme/components/header/header.component';
import { FooterComponent } from './theme/components/footer/footer.component';
import { SidebarComponent } from './theme/components/sidebar/sidebar.component';
import { VerticalMenuComponent } from './theme/components/menu/vertical-menu/vertical-menu.component';
import { HorizontalMenuComponent } from './theme/components/menu/horizontal-menu/horizontal-menu.component';
import { BreadcrumbComponent } from './theme/components/breadcrumb/breadcrumb.component';
import { BackTopComponent } from './theme/components/back-top/back-top.component';
import { FullScreenComponent } from './theme/components/fullscreen/fullscreen.component';
import { ApplicationsComponent } from './theme/components/applications/applications.component';
import { MessagesComponent } from './theme/components/messages/messages.component';
import { UserMenuComponent } from './theme/components/user-menu/user-menu.component';
import { FlagsMenuComponent } from './theme/components/flags-menu/flags-menu.component';
import { SideChatComponent } from './theme/components/side-chat/side-chat.component';
import { FavoritesComponent } from './theme/components/favorites/favorites.component';
import { BlankComponent } from './pages/blank/blank.component';
import { SearchComponent } from './pages/search/search.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import {
    DxDataGridModule,
    DxSelectBoxModule,
    DxCheckBoxModule,
    DxListModule,
    DxDropDownBoxModule,
    DxTreeViewModule,
    DxTagBoxModule,
    DxTemplateModule,
    DxDropDownButtonModule,
    DxToolbarModule,
    DxButtonModule,
    DxSpeedDialActionModule, DxDateBoxModule
} from 'devextreme-angular';
import {PageCentraleComponent} from './pages/page-centrale/page-centrale.component';
import {CourriersArrivesComponent} from './pages/courriers-arrives/courriers-arrives.component';
import { CourriersDepartsComponent } from './pages/courriers-departs/courriers-departs.component';
import { CourriersInternesComponent } from './pages/courriers-internes/courriers-internes.component';
import { CourriersComponent } from './pages/courriers/courriers.component';
import { RechercheAvanceeComponent } from './pages/recherche-avancee/recherche-avancee.component';
import { RechercheComponent } from './pages/recherche/recherche.component';
import {AuthentificationService} from './pages/service/authentification.service';
import {CheckBoxSelectionService, MultiSelectModule} from '@syncfusion/ej2-angular-dropdowns';
import {FileuploadalfrescoComponent} from './pages/fileModule/uploadFile/fileuploadalfresco.component';
import {BlankFileModuleComponent} from './pages/fileModule/blank/blankFileModule.component';
import {FileUploadFileModuleComponent} from './pages/fileModule/file-upload/file-uploadFileModule.component';
import {ModalFileModuleComponent} from './pages/fileModule/Modal_Scan/modalFileModule.component';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import { AdministartionComponent } from './pages/administartion/administartion.component';
import {DashboardModule} from './pages/dashboard/dashboard.module';
import { SearchInterfaceComponent } from './pages/search-interface/search-interface.component';
import {CKEditorModule} from 'ngx-ckeditor';

import {StopWatchComponent} from './pages/stop-watch/stop-watch.component';
import { WorkflowComponent } from './pages/workflow/workflow.component';
import {AlfrescoService} from './pages/fileModule/alfresco_services/AlfrescoApi.service';

import {ServiceFileService} from './pages/fileModule/alfresco_services/service-file.service';
import {AddFoldaFileModuleComponent} from './pages/fileModule/blank/addFolda/addFoldaFileModule.component';
import {CostFileModuleComponent} from './pages/fileModule/blank/cost/costFileModule.component';
import {InfoPanelsFileModuleComponent} from './pages/fileModule/blank/info-panels/info-panelsFileModule.component';
import {VisitorsFileModuleComponent} from './pages/fileModule/blank/visitors/visitorsFileModule.component';
import {InfoCardsFileModuleComponent} from './pages/fileModule/blank/info-cards/info-cardsFileModule.component';
import {ImportVersionFileModuleComponent} from './pages/fileModule/blank/newVersion/importVersionFileModule.component';
import {ImportVersionScannerComponent} from './pages/fileModule/blank/newVersionscanner/importVersionScanner.component';
import { AnnotationComponent } from './pages/annotation/annotation.component';
import { TraitementComponent } from './pages/traitement/traitement.component';
import { DispatchComponent } from './pages/dispatch/dispatch.component';
import { GridcourierarriverComponent } from './pages/gridcourierarriver/gridcourierarriver.component';
import { GridcourrierInternesComponent } from './pages/gridcourrier-internes/gridcourrier-internes.component';
import { GridTousCourrierComponent } from './pages/grid-tous-courrier/grid-tous-courrier.component';
import { CourrierIntegrerComponent } from './pages/courrier-integrer/courrier-integrer.component';
import {TodoFileModuleComponent} from './pages/fileModule/blank/todo/todoFileModule.component';
import { TraitementParSousCouvertComponent } from './pages/traitement-par-sous-couvert/traitement-par-sous-couvert.component';
import { TraitementParBOCComponent } from './pages/traitement-par-boc/traitement-par-boc.component';
import { EtudeParCoauteurComponent } from './pages/etude-par-coauteur/etude-par-coauteur.component';
import { TacheComponent } from './pages/tache/tache.component';
import {Service} from "./pages/fileModule/alfresco_services/document-library.service";
import { ConsultParReferenceComponent } from './pages/ConsulterPar/consult-par-reference/consult-par-reference.component';
import { ConsultParExpediteurComponent } from './pages/ConsulterPar/consult-par-expediteur/consult-par-expediteur.component';
import {ConsultParDateComponent} from "./pages/ConsulterPar/consult-par-date/consult-par-date.component";



@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        PerfectScrollbarModule,
        NgbModule,
        MultiselectDropdownModule,
        MultiSelectModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAAYi6itRZ0rPgI76O3I83BhhzZHIgMwPg'
        }),
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        }),
        ToastrModule.forRoot(),
        PipesModule,
        routing,
        DxDataGridModule,
        DxSelectBoxModule,
        DxCheckBoxModule,
        DxListModule,
        DxDropDownBoxModule,
        DxTreeViewModule,
        DxTagBoxModule,
        DxTemplateModule,
        DxDropDownButtonModule,
        DxToolbarModule,
        DxButtonModule,
        PdfViewerModule,
        ReactiveFormsModule,
        DxSpeedDialActionModule,
        DxDateBoxModule,
        CKEditorModule


    ],
  declarations: [
      TodoFileModuleComponent,
      SearchComponent,
      AppComponent,
    PagesComponent,
    PageCentraleComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    VerticalMenuComponent,
    HorizontalMenuComponent,
    BreadcrumbComponent,
    BackTopComponent,
    FullScreenComponent,
    ApplicationsComponent,
    MessagesComponent,
    UserMenuComponent,
    FlagsMenuComponent,
    SideChatComponent,
    FavoritesComponent,
    BlankComponent,
    NotFoundComponent,
    CourriersArrivesComponent,
    CourriersDepartsComponent,
    CourriersInternesComponent,
    CourriersComponent,
    RechercheAvanceeComponent,
    RechercheComponent,
    FileuploadalfrescoComponent,
    BlankFileModuleComponent,
    FileUploadFileModuleComponent,
    ModalFileModuleComponent,
    AdministartionComponent,
    SearchInterfaceComponent,
      AddFoldaFileModuleComponent,
      StopWatchComponent,
      CostFileModuleComponent,
      InfoPanelsFileModuleComponent,
      VisitorsFileModuleComponent,
      InfoCardsFileModuleComponent,
      ImportVersionFileModuleComponent,ModalFileModuleComponent,
      ImportVersionScannerComponent,
      WorkflowComponent,
      AnnotationComponent,
      TraitementComponent,
      DispatchComponent,
      GridcourierarriverComponent,
      GridcourrierInternesComponent,
      GridTousCourrierComponent,
      CourrierIntegrerComponent,

      TraitementParSousCouvertComponent,
      TraitementParBOCComponent,
      EtudeParCoauteurComponent,
      TacheComponent,
      ConsultParReferenceComponent,
      ConsultParExpediteurComponent,
      ConsultParDateComponent,

  ],
    providers: [

        AppSettings, CheckBoxSelectionService,
        AlfrescoService,
        ServiceFileService,
        Service,
        {provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG}
    ],
    entryComponents: [AddFoldaFileModuleComponent,CostFileModuleComponent,InfoPanelsFileModuleComponent,VisitorsFileModuleComponent,InfoCardsFileModuleComponent,ImportVersionFileModuleComponent,ModalFileModuleComponent,ImportVersionScannerComponent],

    exports: [
        ModalFileModuleComponent,
        FileuploadalfrescoComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
