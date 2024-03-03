import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function forbiddenUrlValidator(url: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return url === control.value
      ? { forbiddenUrl: { value: control.value } }
      : null;
  };
}
