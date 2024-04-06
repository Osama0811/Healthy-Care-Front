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
  declarations: [BloodComponent,QuestionHistoryComponent,BloodEquationComponent,Hospital_CategoryComponent,DepartmentComponent,Department_HospitalComponent,CategoryComponent,PatientComponent,AddressComponent,BloodBankComponent,CategoryComponent,DoctorComponent,ToolsComponent,Tools_DepartmentComponent,Tools_HospitalComponent,Doctor_DepartmentComponent,Doctor_HospitalComponent,UserComponent]
})
export class AdminModule { }
export function TranslateLoaderFactory(langService: LangService): CustomTranslateLoader {
  return new CustomTranslateLoader(langService);
}
