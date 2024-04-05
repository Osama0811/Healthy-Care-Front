import { filter } from 'rxjs/operators';
import { CrudComponent } from './../../../crud/crud.component';
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
        [type]="config.textType === 'file' ? 'file' : config.textType"
  (change)="onFileSelected($event)" >
    </div>
  `
})
export class FormInputComponent implements Field {
  config!: FieldConfig;
  group!: FormGroup;
  selectedFile: File | null = null;


  onFileSelected(event: any): void {
    if(this.config.textType === 'file' ){

    this.selectedFile = event.target.files[0];
    this.uploadImage();
    }
  }

  uploadImage(): void {
    debugger
    if (this.selectedFile) {

      const reader = new FileReader();
      reader.onload = () => {
        const dataUri: string = reader.result as string;

        let base64String: string = dataUri.split(',')[1];
        console.log(base64String);
        const control = this.group.get("imageBase64");
        console.log(control);
        if (control) {
            control.patchValue(base64String);
            debugger
        }

          };
      reader.readAsDataURL(this.selectedFile);

    }
  }
}
//   export function convertBlobToBinary(blobUrl: string): Promise<Uint8Array> {
//     return new Promise<Uint8Array>((resolve, reject) => {
//       const xhr = new XMLHttpRequest();
//       xhr.open('GET', blobUrl);
//       xhr.responseType = 'arraybuffer';
//       xhr.onload = () => {
//         if (xhr.status === 200) {
//           const binaryData = new Uint8Array(xhr.response);
//           resolve(binaryData);
//         } else {

//         }
//       };
//       xhr.onerror = () => {

//       };
//       xhr.send();
//     });
//   }
//   export function convertBinaryToBase64(binaryData: Uint8Array) {
//     let base64Data = btoa(
//       String.fromCharCode.apply(null, Array.from(binaryData))
//     );
//     return base64Data;

// }
