import { IndexModule } from './Component/index/index.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './Component/profile/profile.component';
import { AppLayoutComponent } from './layout/layout/admin.layout.component';

const routes: Routes = [

  {
    path: '', component: AppLayoutComponent,
    children: [
        { path: '', loadChildren: () => import('./Component/dashboard/dashboard.module').then(m => m.DashboardModule) },
        { path: 'Profile', loadChildren: () => import('./Component/profile/Profile.module').then(m => m.ProfileModule) },
        { path: 'Index', loadChildren: () => import('./Component/index/index.module').then(m => m.IndexModule) },
        { path: 'Blood', loadChildren: () => import('./Component/blood/blood/Blood.module').then(m => m.BloodModule) },


    ]
},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class AdminRoutingModule { }
