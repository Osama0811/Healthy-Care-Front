import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './Pages/index/index.component';
import { PageNotFoundComponent } from '../exceptions/page-not-found/page-not-found.component';


const routes: Routes = [

  { path: '', redirectTo: '/Home/Index', pathMatch: 'full' },
  {
    path: 'Index',
    component: IndexComponent
  },
  {path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
