import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DynamicFieldDirective } from './components/dynamic-field/dynamic-field.directive';
import { DynamicFormComponent } from './containers/dynamic-form/dynamic-form.component';
import { FormButtonComponent } from './components/form-button/form-button.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormSelectComponent } from './components/form-select/form-select.component';
import { InputTextModule } from 'primeng/inputtext';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateLoaderFactory } from 'src/app/app.module';
import { LangService } from 'src/app/lang/services/lang.service';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateLoaderFactory,
        deps: [LangService]
      }
    })
  ],
  declarations: [
    DynamicFieldDirective,
    DynamicFormComponent,
    FormButtonComponent,
    FormInputComponent,
    FormSelectComponent
  ],
  exports: [
    DynamicFormComponent
  ]
})
export class DynamicFormModule {}
