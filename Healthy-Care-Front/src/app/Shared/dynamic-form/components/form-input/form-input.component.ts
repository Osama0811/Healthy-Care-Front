import { Component, ViewContainerRef, Type } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'form-input',
  template: `
    <div *ngIf="!config.NonVisible"
      class="dynamic-field form-input"
      [formGroup]="group">
      <label>{{ config.label }}</label>
      <input
      pInputText
        [type]="config.textType"
        [attr.placeholder]="config.placeholder"
        [formControlName]="config.name"
        >
    </div>
  `
})
export class FormInputComponent implements Field {
  config!: FieldConfig;
  group!: FormGroup;
}
