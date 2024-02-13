import { BASE_URL, Controller, GlobalService } from 'src/app/admin/Services/global-service.service';
import { MenuItem, MessageService } from 'primeng/api';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CrudModule } from 'src/app/Shared/crud/crud.module';
import { TabMenuModule } from 'primeng/tabmenu';
import { BadgeModule } from 'primeng/badge';
import { HttpClient } from '@angular/common/http';
import { Dept } from 'src/app/Auth/Interfaces/auth';
import { BloodComponent } from '../blood.component';
import { BloodRoutingModule } from './Blood-routing.module';


@NgModule({
  declarations: [BloodComponent],
  imports: [
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        BadgeModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        BloodRoutingModule,
        CrudModule
  ],
  providers:[
    GlobalService, { provide: Controller, useValue: 'Category' },MessageService
  ],
})
export class BloodModule {

}
