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
import { ProfileComponent } from './profile.component';
import { ProfilesRoutingModule } from './Profile-routing.module';
import { Sub1Component } from './Sub-Comp/sub1/sub1.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { BadgeModule } from 'primeng/badge';
import { HttpClient } from '@angular/common/http';
import { Dept } from 'src/app/Auth/Interfaces/auth';
import { LangService } from 'src/app/lang/services/lang.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { CustomTranslateLoader } from 'src/app/lang/custom-translate-loader';

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
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: TranslateLoaderFactory,
            deps: [LangService]
          }
        }),
    ],
    providers:[
      GlobalService, { provide: Controller, useValue: 'User' },MessageService
    ],
    declarations: [ProfileComponent,Sub1Component],
})
export class ProfileModule { }
export function TranslateLoaderFactory(langService: LangService): CustomTranslateLoader {
  return new CustomTranslateLoader(langService);
}
