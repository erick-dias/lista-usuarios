import { AbstractControl, ValidationErrors } from '@angular/forms';

// formato esperado: 000.000.000-00
const CPF_REGEX = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

export function cpfValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value ?? '';
  if (!value) return null;
  return CPF_REGEX.test(value) ? null : { cpfInvalid: true };
}
