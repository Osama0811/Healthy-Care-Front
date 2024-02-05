import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { AppMenuComponent } from './app.menu.component';
import { AppMenuitemComponent } from './app.menuitem.component';
import { RouterModule } from '@angular/router';
import { AppTopBarComponent } from './app.topbar.component';
import { AppFooterComponent } from './app.footer.component';
import { AppConfigModule } from './config/config.module';
import { AppSidebarComponent } from "./app.sidebar.component";
import { AppLayoutComponent } from "./admin.layout.component";

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AppModule, TranslateLoaderFactory } from 'src/app/app.module';
import { LangService } from 'src/app/lang/services/lang.service';
import { CommonModule } from '@angular/common';
import { AdminModule } from '../../admin.module';
import { BrowserModule } from '@angular/platform-browser';
import { GlobalService } from '../../Services/global-service.service';
@NgModule({
    declarations: [
        AppMenuitemComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppMenuComponent,
        AppSidebarComponent,
        AppLayoutComponent,
    ],
    imports: [
      BrowserModule,
      FormsModule,
      HttpClientModule,
      BrowserAnimationsModule,
      InputTextModule,
      SidebarModule,
      BadgeModule,
      RadioButtonModule,
      InputSwitchModule,
      RippleModule,
      RouterModule,
      AppConfigModule,

        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: TranslateLoaderFactory,
            deps: [LangService]
          }
        })
    ],
    exports: [AppLayoutComponent],
    providers:[GlobalService]
})
export class AppLayoutModule { }
