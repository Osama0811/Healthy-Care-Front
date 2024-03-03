import { IndexModule } from './Component/index/index.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './Component/profile/profile.component';
import { AppLayoutComponent } from './layout/layout/admin.layout.component';
import { BloodComponent } from './Component/blood/blood.component';
import { QuestionHistoryComponent } from './Component/QuestionHistory/QuestionHistory.component';
import { CategoryComponent } from './Component/Category/Category.component';
import { BloodBankComponent } from './Component/BloodBank/BloodBank.component';

const routes: Routes = [

  {
    path: '', component: AppLayoutComponent,

    children: [
        { path: '', loadChildren: () => import('./Component/dashboard/dashboard.module').then(m => m.DashboardModule) },
        { path: 'Profile', loadChildren: () => import('./Component/profile/Profile.module').then(m => m.ProfileModule) },
        { path: 'Index', loadChildren: () => import('./Component/index/index.module').then(m => m.IndexModule) },
        { path: 'Blood', component: BloodComponent },
        { path: 'BloodBank', component: BloodBankComponent },
        { path: 'Category', component: CategoryComponent },
        { path: 'QuestionHistory', component: QuestionHistoryComponent },


    ]
},


];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class AdminRoutingModule { }
