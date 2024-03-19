import { BloodEquationComponent } from './Component/BloodEquation/BloodEquation.component';
import { IndexModule } from './Component/index/index.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './Component/profile/profile.component';
import { AppLayoutComponent } from './layout/layout/admin.layout.component';
import { BloodComponent } from './Component/blood/blood.component';
import { QuestionHistoryComponent } from './Component/QuestionHistory/QuestionHistory.component';
import { CategoryComponent } from './Component/Category/category.component';
import { PatientComponent } from './Component/Patient/Patient.component';
import { AddressComponent } from './Component/Address/Address.component';
import { Hospital_CategoryComponent } from './Component/Hospital_Category/Hospital_Category.component';
import { DepartmentComponent } from './Component/Department/Department.component';
import { Department_HospitalComponent } from './Component/Department_Hospital/Department_Hospital.component';

const routes: Routes = [

  {
    path: '', component: AppLayoutComponent,

    children: [
        { path: '', loadChildren: () => import('./Component/dashboard/dashboard.module').then(m => m.DashboardModule) },
        { path: 'Profile', loadChildren: () => import('./Component/profile/Profile.module').then(m => m.ProfileModule) },
        { path: 'Index', loadChildren: () => import('./Component/index/index.module').then(m => m.IndexModule) },
        { path: 'Blood', component: BloodComponent },
        { path: 'QuestionHistory', component: QuestionHistoryComponent },
        { path: 'Category', component: CategoryComponent },
        { path: 'Patient', component: PatientComponent },
        { path: 'Address', component: AddressComponent },
        { path: 'BloodEquation', component: BloodEquationComponent },
        { path: 'Hospital_Category', component: Hospital_CategoryComponent },
        { path: 'Department', component: DepartmentComponent },
        { path: 'Department_Hospital', component: Department_HospitalComponent },


    ]
},


];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class AdminRoutingModule { }
