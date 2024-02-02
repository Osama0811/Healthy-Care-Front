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
import { IndexsRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';

@NgModule({
    imports: [

        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        IndexsRoutingModule,
        CrudModule
    ],
    declarations: [IndexComponent]
})
export class IndexModule { }
