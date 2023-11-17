import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './exceptions/page-not-found/page-not-found.component';

const routes: Routes = [
   { path: '', redirectTo: 'Login', pathMatch: 'full' },
   {
    path: 'UserAdmin',
    loadChildren:()=>import('src/app/admin/Admin.module').then(m=>m.AdminModule) ,
    //canActivate: [adminGuard],
    //canLoad: [adminGuard]
  },
   {path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
