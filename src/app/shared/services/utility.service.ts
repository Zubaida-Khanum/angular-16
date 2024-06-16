import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor() {}
  markAllFieldsAsDirtyAndTouched(form: FormGroup) {
    for (const controlName in form.controls) {
      if (form.controls.hasOwnProperty(controlName)) {
        const control = form.get(controlName);
        control?.markAsDirty();
        control?.markAsTouched();
      }
    }
  }
  hasDuplicateValue(
    value: any,
    propertyName: string,
    array: any[],
    isUpdate: boolean = false,
    columnPK?: string
  ) {
    let compareValue: any = null;
    if (isUpdate && columnPK) {
      array = array.filter((x: any) => x[columnPK] != value[columnPK]);
      if (typeof value == 'string') {
        compareValue = value.toLowerCase();
      } else {
        compareValue = value[propertyName];
      }
    } else {
      if (typeof value == 'string') {
        compareValue = value.toLowerCase();
      } else {
        compareValue = value;
      }
    }
    const propertyValues = array.map((item) => item[propertyName]);
    let occurrences;
    if (typeof compareValue == 'string') {
      occurrences = propertyValues.filter(
        (propertyValue: any) =>
          propertyValue.toLowerCase() == compareValue.toLowerCase()
      ).length;
    } else {
      occurrences = propertyValues.filter(
        (propertyValue: any) => propertyValue == compareValue
      ).length;
    }
    return occurrences > 0;
  }
}
