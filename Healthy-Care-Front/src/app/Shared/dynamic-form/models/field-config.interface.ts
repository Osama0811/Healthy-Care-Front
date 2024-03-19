import { ValidatorFn } from '@angular/forms';

export interface FieldConfig {
  disabled?: boolean,
  NonVisible?: boolean,
  label?: string,
  name: string,
  options?: (string|undefined)[],
  placeholder?: string,
  type: string,
  validation?: ValidatorFn[],
  value?: any,
  textType?:string
}
