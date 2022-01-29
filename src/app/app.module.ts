import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'
import { GrowlModule } from'primeng/growl';

import { DataService} from '../app/services/data.service';
import { AuthGuard} from '../app/services/auth.guard';
import { BnNgIdleService } from 'bn-ng-idle';

import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CalendarModule, CheckboxModule, ConfirmationService } from 'primeng/primeng';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { NgxLoadingModule } from 'ngx-loading';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TabViewModule } from 'primeng/tabview';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './_shared/header/header.component';
import { FooterComponent } from './_shared/footer/footer.component';
import { MainMenuComponent } from './_shared/main-menu/main-menu.component';
import { MasterComponent } from './_shared/master/master.component';


import {FileUploadModule} from 'primeng/fileupload';
import {ToastModule} from 'primeng/toast';
import {TooltipModule} from 'primeng/tooltip';
import { AccordionModule } from 'primeng/accordion';
import {InputSwitchModule} from 'primeng/inputswitch';

import { AutoCompleteModule } from 'primeng/autocomplete';

import {APP_BASE_HREF, HashLocationStrategy, LocationStrategy , PathLocationStrategy} from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import {InputTextModule} from 'primeng/inputtext';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputTextareaModule} from 'primeng/inputtextarea';

import { ExportCndnComponent } from './export-cndn/export-cndn.component';
import { UploadCndnComponent } from './upload-cndn/upload-cndn.component';
import { NewRequestComponent } from './new-request/new-request.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainMenuComponent,
    MasterComponent,
    LoginComponent,
    SearchComponent,
    
    ExportCndnComponent,
    UploadCndnComponent,
    NewRequestComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DropdownModule,
    TableModule,
    ButtonModule,
    CalendarModule,
    MessagesModule,
    MessageModule,
    FormsModule,
    NgxLoadingModule,
    AppRoutingModule,
    DialogModule,
    CheckboxModule,
    ConfirmDialogModule,
    TabViewModule,
    HttpModule,
    HttpClientModule,
    TooltipModule,
    FileUploadModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    AccordionModule,
    GrowlModule,
    DialogModule,
    InputSwitchModule,
    AutoCompleteModule,
    InputTextModule,
    RadioButtonModule,
    InputTextareaModule
  ],
  providers: [
    DataService,
    AuthGuard,
    ConfirmationService,
    BnNgIdleService,
    // {
    //   provide: APP_BASE_HREF,
    //   useValue: '/'
    // }
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
