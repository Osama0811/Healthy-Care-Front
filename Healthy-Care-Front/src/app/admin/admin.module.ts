import { Booking_X_RayComponent } from './Component/Booking_X_Ray/Booking_X_Ray.component';
import { Book_AmbulancesComponent } from './Component/Book_Ambulances/Book_Ambulances.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './Admin.Routing.Module';
import { ProfileComponent } from './Component/profile/profile.component';
import { MessageService } from 'primeng/api';
import { IndexComponent } from './Component/index/index.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LangService } from '../lang/services/lang.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { GlobalService } from './Services/global-service.service';
import { BloodComponent } from './Component/blood/blood.component';
import { CrudModule } from '../Shared/crud/crud.module';
import { QuestionHistoryComponent } from './Component/QuestionHistory/QuestionHistory.component';
import { CustomTranslateLoader } from '../lang/custom-translate-loader';
import { BloodBankComponent } from './Component/BloodBank/BloodBank.component';
import { DoctorComponent } from './Component/Doctor/Doctor.component';
import { ToolsComponent } from './Component/Tools/Tools.component';
import { Tools_DepartmentComponent } from './Component/Tools_Department/Tools_Department.component';
import { Tools_HospitalComponent } from './Component/Tools_Hospital/Tools_Hospital.component';
import { Doctor_DepartmentComponent } from './Component/Doctor_Department/Doctor_Department.component';
import { Doctor_HospitalComponent } from './Component/Doctor_Hospital/Doctor_Hospital.component';
import { PatientComponent } from './Component/Patient/Patient.component';
import { AddressComponent } from './Component/Address/Address.component';
import { BloodEquationComponent } from './Component/BloodEquation/BloodEquation.component';
import { Hospital_CategoryComponent } from './Component/Hospital_Category/Hospital_Category.component';
import { DepartmentComponent } from './Component/Department/Department.component';
import { Department_HospitalComponent } from './Component/Department_Hospital/Department_Hospital.component';
import { CategoryComponent } from './Component/Category/Category.component';
import { UserComponent } from './Component/User/User.component';
import { AppointmentComponent } from './Component/Appointment/Appointment.component';
import { HistoryComponent } from './Component/History/History.component';
import { HospitalComponent } from './Component/Hospital/Hospital.component';
import { CountryComponent } from './Component/country/country.component';
import { AmbulancesComponent } from './Component/Ambulances/Ambulances.component';
import { X_RayComponent } from './Component/X_Ray/X_Ray.component';
import { X_Ray_DepartmentComponent } from './Component/X_Ray_Department/X_Ray_Department.component';
import { X_Ray_HospitalComponent } from './Component/X_Ray_Hospital/X_Ray_Hospital.component';
import { Admin_HospitalComponent } from './Component/Admin_Hospital/Admin_Hospital.component';

@NgModule({

  imports: [

    CommonModule,
    AdminRoutingModule,
    FormsModule,
    CrudModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateLoaderFactory,
        deps: [LangService]
      }
    }),
  ],
  providers: [MessageService,GlobalService],
  declarations: [BloodComponent,QuestionHistoryComponent,BloodEquationComponent,
    Hospital_CategoryComponent,DepartmentComponent,
    Department_HospitalComponent,PatientComponent,
    AddressComponent,BloodBankComponent,DoctorComponent,
    ToolsComponent,Tools_DepartmentComponent,Tools_HospitalComponent,
    Doctor_DepartmentComponent,Doctor_HospitalComponent,AppointmentComponent,
    HistoryComponent,HospitalComponent,UserComponent,
    CategoryComponent,
    AmbulancesComponent,
    Book_AmbulancesComponent,
    X_RayComponent,
    X_Ray_DepartmentComponent,
    X_Ray_HospitalComponent,
    Booking_X_RayComponent,
    Admin_HospitalComponent]

})
export class AdminModule { }
export function TranslateLoaderFactory(langService: LangService): CustomTranslateLoader {
  return new CustomTranslateLoader(langService);
}
