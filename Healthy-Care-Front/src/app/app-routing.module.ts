import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './exceptions/page-not-found/page-not-found.component';
import { AppComponent } from './app.component';

const routes: Routes = [
   { path: '', redirectTo: '/app', pathMatch: 'full' },
   {
    path: 'UserAdmin',
    loadChildren:()=>import('src/app/admin/admin.module').then(m=>m.AdminModule) ,
    //canActivate: [adminGuard],
    //canLoad: [adminGuard]
  },
  {
    path: 'Home',
    loadChildren:()=>import('src/app/Home/home.module').then(m=>m.HomeModule) ,
    //canActivate: [adminGuard],
    //canLoad: [adminGuard]
  },
  {path: 'App', component: AppComponent },
  {path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
