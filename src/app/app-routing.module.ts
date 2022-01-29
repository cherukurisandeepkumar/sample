import { AuthGuard } from './services/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { LoginComponent } from './login/login.component';

import { SearchComponent } from './search/search.component';

import { ExportCndnComponent } from './export-cndn/export-cndn.component';
import { UploadCndnComponent } from './upload-cndn/upload-cndn.component';
import { NewRequestComponent } from './new-request/new-request.component';

const routes: Routes = [


  {
    path: '',
    redirectTo: "/login",
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  
 
  // {
  //   path: 'search',
  //   component: SearchComponent,
  //   canActivate: [AuthGuard]
  // },
  {
    path: 'fileupload',
    component: NewRequestComponent,
    canActivate: [AuthGuard]
  },


  // {
  //   path: 'export-cndn',
  //   component: ExportCndnComponent,
  //   canActivate: [AuthGuard]
  // },
 
  // {
  //   path: 'upload-cndn',
  //   component: UploadCndnComponent,
  //   canActivate: [AuthGuard]
  // },
  {
    path: '**',
    component: LoginComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }