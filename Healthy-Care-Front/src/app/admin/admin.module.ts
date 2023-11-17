import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './Admin.Routing.Module';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  
  {
    path: 'Profile',
    component: ProfileComponent
  }
];

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
