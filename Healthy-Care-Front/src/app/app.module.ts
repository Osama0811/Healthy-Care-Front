import { MessageService } from 'primeng/api';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {  HttpClientModule } from '@angular/common/http';
import { CustomTranslateLoader } from './lang/custom-translate-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';

import { LangService } from './lang/services/lang.service';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicFormModule } from './Shared/dynamic-form/dynamic-form.module';
@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [

    CommonModule,
    AppRoutingModule,
    ButtonModule,
    DynamicFormModule,
    HttpClientModule,
    ToastModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateLoaderFactory,
        deps: [LangService]
      }
    }),
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
  exports:[  ToastModule]
})
export class AppModule { }

export function TranslateLoaderFactory(langService: LangService): CustomTranslateLoader {
  return new CustomTranslateLoader(langService);
}
