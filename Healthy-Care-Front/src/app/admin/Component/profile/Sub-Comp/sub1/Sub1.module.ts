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
import { Sub1Component } from './sub1.component';
import { ProfilesRoutingModule } from '../../Profile-routing.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component:Sub1Component },
]
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        BadgeModule,
        StyleClassModule,
        PanelMenuModule,

       RouterModule.forRoot(routes),
        ButtonModule,
        ProfilesRoutingModule,
        CrudModule,
    ],
    providers:[
      GlobalService, { provide: Controller, useValue: 'User' },MessageService
    ],
    declarations: [Sub1Component],
    bootstrap: [Sub1Component]
})
export class Sub1Module { }
