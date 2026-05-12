import { AbstractControl, ValidationErrors } from '@angular/forms';

// formato esperado: (00) 00000-0000 (celular) ou (00) 0000-0000 (fixo)
const PHONE_REGEX = /^\(\d{2}\) \d{4,5}-\d{4}$/;

export function phoneValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value ?? '';
  if (!value) return null;
  return PHONE_REGEX.test(value) ? null : { phoneInvalid: true };
}
