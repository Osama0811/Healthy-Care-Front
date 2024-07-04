import { style } from '@angular/animations';
import { ValidatorFn } from '@angular/forms';

export interface FieldConfig {
  disabled?: boolean,
  NonVisible?: boolean,
  label?: string,
  name: string,
  placeholder?: string,
  options?: (string|undefined)[],
  type: string,
  validation?: ValidatorFn[],
  value?: any,
  textType?:string,
  class?:string,

}
