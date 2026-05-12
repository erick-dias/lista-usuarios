import { FormControl } from '@angular/forms';
import { cpfValidator } from './cpf.validator';

const ctrl = (value: string) => new FormControl(value);

describe('cpfValidator', () => {
  it('retorna null para valor vazio', () => {
    expect(cpfValidator(ctrl(''))).toBeNull();
  });

  it('retorna null para CPF no formato correto', () => {
    expect(cpfValidator(ctrl('123.456.789-09'))).toBeNull();
  });

  it('retorna erro para CPF sem pontuação', () => {
    expect(cpfValidator(ctrl('12345678909'))).toEqual({ cpfInvalid: true });
  });

  it('retorna erro para CPF incompleto', () => {
    expect(cpfValidator(ctrl('123.456.789'))).toEqual({ cpfInvalid: true });
  });

  it('retorna erro para formato errado', () => {
    expect(cpfValidator(ctrl('123-456-789.09'))).toEqual({ cpfInvalid: true });
  });
});
