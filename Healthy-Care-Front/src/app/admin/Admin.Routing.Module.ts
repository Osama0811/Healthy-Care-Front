import { Booking_X_RayComponent } from './Component/Booking_X_Ray/Booking_X_Ray.component';
import { X_Ray_HospitalComponent } from './Component/X_Ray_Hospital/X_Ray_Hospital.component';
import { Book_AmbulancesComponent } from './Component/Book_Ambulances/Book_Ambulances.component';
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

import { UserComponent } from './Component/User/User.component';
import { AppointmentComponent } from './Component/Appointment/Appointment.component';
import { HistoryComponent } from './Component/History/History.component';
import { HospitalComponent } from './Component/Hospital/Hospital.component';
import { CategoryComponent } from './Component/Category/Category.component';
import { AmbulancesComponent } from './Component/Ambulances/Ambulances.component';
import { authGuard } from '../Auth/Guards/auth-guard.guard';
import { X_RayComponent } from './Component/X_Ray/X_Ray.component';
import { X_Ray_DepartmentComponent } from './Component/X_Ray_Department/X_Ray_Department.component';

const routes: Routes = [

  {
    path: '', component: AppLayoutComponent,

    children: [
        { path: '', loadChildren: () => import('./Component/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [authGuard] },
        { path: 'Profile', loadChildren: () => import('./Component/profile/Profile.module').then(m => m.ProfileModule), canActivate: [authGuard] },
        { path: 'Index', loadChildren: () => import('./Component/index/index.module').then(m => m.IndexModule), canActivate: [authGuard] },
        { path: 'Blood', component: BloodComponent , canActivate: [authGuard]},
        { path: 'User', component: UserComponent , canActivate: [authGuard]},
        { path: 'BloodBank', component: BloodBankComponent , canActivate: [authGuard]},
        { path: 'QuestionHistory', component: QuestionHistoryComponent, canActivate: [authGuard] },
        { path: 'Doctor', component: DoctorComponent , canActivate: [authGuard]},
        { path: 'Tools', component: ToolsComponent , canActivate: [authGuard]},
        { path: 'Tools_Department', component: Tools_DepartmentComponent , canActivate: [authGuard]},
        { path: 'Tools_Hospital', component: Tools_HospitalComponent, canActivate: [authGuard] },
        { path: 'Doctor_Department', component: Doctor_DepartmentComponent , canActivate: [authGuard]},
        { path: 'Doctor_Hospital', component: Doctor_HospitalComponent , canActivate: [authGuard]},
        { path: 'Book_Ambulances', component: Book_AmbulancesComponent , canActivate: [authGuard]},
        { path: 'X_Ray', component: X_RayComponent },
        { path: 'X_Ray_Department', component: X_Ray_DepartmentComponent },
        { path: 'X_Ray_Hospital', component: X_Ray_HospitalComponent },





        { path: 'Patient', component: PatientComponent , canActivate: [authGuard]},
        { path: 'Category', component: CategoryComponent, canActivate: [authGuard] },
        { path: 'Address', component: AddressComponent , canActivate: [authGuard]},
        { path: 'BloodEquation', component: BloodEquationComponent , canActivate: [authGuard]},
        { path: 'Hospital_Category', component: Hospital_CategoryComponent, canActivate: [authGuard] },
        { path: 'Department', component: DepartmentComponent , canActivate: [authGuard]},
        { path: 'Department_Hospital', component: Department_HospitalComponent , canActivate: [authGuard]},
        { path: 'Appointment', component: AppointmentComponent, canActivate: [authGuard] },
        { path: 'History', component: HistoryComponent , canActivate: [authGuard]},
        { path: 'Hospital', component: HospitalComponent, canActivate: [authGuard] },
        { path: 'Booking_X_Ray', component: Booking_X_RayComponent, canActivate: [authGuard] },
        { path: 'Book_Ambulances', component: Book_AmbulancesComponent, canActivate: [authGuard] },


        { path: 'Ambulances', component: AmbulancesComponent , canActivate: [authGuard]},





    ]
},


];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class AdminRoutingModule { }
