import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './Admin.Routing.Module';
import { ProfileComponent } from './Component/profile/profile.component';
import { MessageService } from 'primeng/api';
import { IndexComponent } from './Component/index/index.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LangService } from '../lang/services/lang.service';
import { TranslateLoaderFactory } from '../app.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { GlobalService } from './Services/global-service.service';
import { BloodComponent } from './Component/blood/blood.component';
import { CrudModule } from '../Shared/crud/crud.module';
import { QuestionHistoryComponent } from './Component/QuestionHistory/QuestionHistory.component';
import { CategoryComponent } from './Component/Category/category.component';
import { PatientComponent } from './Component/Patient/Patient.component';
import { AddressComponent } from './Component/Address/Address.component';
import { BloodEquationComponent } from './Component/BloodEquation/BloodEquation.component';
import { Hospital_CategoryComponent } from './Component/Hospital_Category/Hospital_Category.component';
import { DepartmentComponent } from './Component/Department/Department.component';
import { Department_HospitalComponent } from './Component/Department_Hospital/Department_Hospital.component';

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
  declarations: [BloodComponent,QuestionHistoryComponent,BloodEquationComponent,Hospital_CategoryComponent,DepartmentComponent,Department_HospitalComponent,CategoryComponent,PatientComponent,AddressComponent]
})
export class AdminModule { }
