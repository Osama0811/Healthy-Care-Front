import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './Pages/index/index.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';


const routes: Routes = [
  
  {
    path: 'Index',
    component: IndexComponent
  },
  {
    path: 'Nav',
    component: NavBarComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
