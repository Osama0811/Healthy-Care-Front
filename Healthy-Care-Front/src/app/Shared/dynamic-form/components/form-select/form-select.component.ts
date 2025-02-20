import { Component, Type } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'form-select',
  template: `
    <div
    class="dynamic-field  "
      [formGroup]="group">
      <label class="form-label" >{{ config.label==undefined?"":config.label|translate}}</label>
      <select class="form-select"
      filter="true" [formControlName]="config.name" >
        <option value=0>{{ config.placeholder==undefined?"":config.placeholder|translate}}</option>
        <option *ngFor="let option of config.options; let i = index" [value]="config.value[i]" style="font-size:15px;
padding:20px;" >
          {{ option }}
        </option>
      </select>
    </div>
  `
})
export class FormSelectComponent implements Field {
  config!: FieldConfig;
  group!: FormGroup;
}
