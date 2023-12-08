import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Component/login/login.component';
import { PageNotFoundComponent } from '../exceptions/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/app', pathMatch: 'full' },
  {path:'Login',component:LoginComponent},
  {path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
