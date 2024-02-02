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

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateLoaderFactory,
        deps: [LangService]
      }
    }),
  ],
  providers: [MessageService]
})
export class AdminModule { }
