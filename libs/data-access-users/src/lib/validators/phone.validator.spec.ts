import { FormControl } from '@angular/forms';
import { phoneValidator } from './phone.validator';

const ctrl = (value: string) => new FormControl(value);

describe('phoneValidator', () => {
  it('retorna null para valor vazio', () => {
    expect(phoneValidator(ctrl(''))).toBeNull();
  });

  it('retorna null para celular válido', () => {
    expect(phoneValidator(ctrl('(11) 99999-0001'))).toBeNull();
  });

  it('retorna null para fixo válido', () => {
    expect(phoneValidator(ctrl('(31) 3333-0003'))).toBeNull();
  });

  it('retorna erro para formato sem parênteses', () => {
    expect(phoneValidator(ctrl('11999990001'))).toEqual({ phoneInvalid: true });
  });

  it('retorna erro para número incompleto', () => {
    expect(phoneValidator(ctrl('(11) 9999'))).toEqual({ phoneInvalid: true });
  });
});
