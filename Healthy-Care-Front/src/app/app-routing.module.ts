import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './exceptions/page-not-found/page-not-found.component';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { UserHistoryComponent } from './user-history/user-history.component';

const routes: Routes = [
   { path: '', redirectTo: '/Authentication/Login', pathMatch: 'full' },
   {
    path: 'admin',
    loadChildren:()=>import('src/app/admin/admin.module').then(m=>m.AdminModule) ,
    //canActivate: [adminGuard],
    //canLoad: [adminGuard]
  },
  {
    path: 'HomeSite',
    loadChildren:()=>import('src/app/Home/home.module').then(m=>m.HomeModule) ,
    //canActivate: [adminGuard],
    //canLoad: [adminGuard]
  },
  {
    path: 'Authentication',
    loadChildren:()=>import('src/app/Auth/auth.module').then(m=>m.AuthModule) ,
    //canActivate: [adminGuard],
    //canLoad: [adminGuard]
  },
  {path: 'App', component: AppComponent },
  {path: 'UserHistory/:PatientId', component: UserHistoryComponent },
  {path: 'UserHistory', component: UserHistoryComponent },
  {path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
