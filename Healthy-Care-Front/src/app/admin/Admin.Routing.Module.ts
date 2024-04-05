import { BloodEquationComponent } from './Component/BloodEquation/BloodEquation.component';
import { IndexModule } from './Component/index/index.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './Component/profile/profile.component';
import { AppLayoutComponent } from './layout/layout/admin.layout.component';
import { BloodComponent } from './Component/blood/blood.component';
import { QuestionHistoryComponent } from './Component/QuestionHistory/QuestionHistory.component';
import { BloodBankComponent } from './Component/BloodBank/BloodBank.component';
import { DoctorComponent } from './Component/Doctor/Doctor.component';
import { ToolsComponent } from './Component/Tools/Tools.component';
import { Tools_DepartmentComponent } from './Component/Tools_Department/Tools_Department.component';
import { Tools_HospitalComponent } from './Component/Tools_Hospital/Tools_Hospital.component';
import { Doctor_DepartmentComponent } from './Component/Doctor_Department/Doctor_Department.component';
import { Doctor_HospitalComponent } from './Component/Doctor_Hospital/Doctor_Hospital.component';
import { PatientComponent } from './Component/Patient/Patient.component';
import { AddressComponent } from './Component/Address/Address.component';
import { Hospital_CategoryComponent } from './Component/Hospital_Category/Hospital_Category.component';
import { DepartmentComponent } from './Component/Department/Department.component';
import { Department_HospitalComponent } from './Component/Department_Hospital/Department_Hospital.component';

import { AppointmentComponent } from './Component/Appointment/Appointment.component';

const routes: Routes = [

  {
    path: '', component: AppLayoutComponent,

    children: [
        { path: '', loadChildren: () => import('./Component/dashboard/dashboard.module').then(m => m.DashboardModule) },
        { path: 'Profile', loadChildren: () => import('./Component/profile/Profile.module').then(m => m.ProfileModule) },
        { path: 'Index', loadChildren: () => import('./Component/index/index.module').then(m => m.IndexModule) },
        { path: 'Blood', component: BloodComponent },
        { path: 'BloodBank', component: BloodBankComponent },
        { path: 'QuestionHistory', component: QuestionHistoryComponent },
        { path: 'Doctor', component: DoctorComponent },
        { path: 'Tools', component: ToolsComponent },
        { path: 'Tools_Department', component: Tools_DepartmentComponent },
        { path: 'Tools_Hospital', component: Tools_HospitalComponent },
        { path: 'Doctor_Department', component: Doctor_DepartmentComponent },
        { path: 'Doctor_Hospital', component: Doctor_HospitalComponent },





        { path: 'Patient', component: PatientComponent },
        { path: 'Address', component: AddressComponent },
        { path: 'BloodEquation', component: BloodEquationComponent },
        { path: 'Hospital_Category', component: Hospital_CategoryComponent },
        { path: 'Department', component: DepartmentComponent },
        { path: 'Department_Hospital', component: Department_HospitalComponent },
        { path: 'Appointment', component: AppointmentComponent },



    ]
},


];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class AdminRoutingModule { }
