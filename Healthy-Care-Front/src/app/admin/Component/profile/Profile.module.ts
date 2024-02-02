import { MenuItem } from 'primeng/api';
import { CrudComponent } from '../../../Shared/crud/crud.component';
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
import { ProfileComponent } from './profile.component';
import { ProfilesRoutingModule } from './Profile-routing.module';
import { Sub1Component } from './Sub-Comp/sub1/sub1.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { BadgeModule } from 'primeng/badge';
@NgModule({
    imports: [
      TabMenuModule,
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        BadgeModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        ProfilesRoutingModule,
        CrudModule,
    ],
    declarations: [ProfileComponent, Sub1Component]
})
export class ProfileModule { }
