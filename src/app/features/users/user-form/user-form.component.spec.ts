import { TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideNgxMask } from 'ngx-mask';

import { UserFormComponent } from './user-form.component';
import { User } from '../../../core/models/user.model';

const dialogRefMock = { close: vi.fn() };

const createComponent = (user?: User) =>
  TestBed.configureTestingModule({
    imports: [UserFormComponent, NoopAnimationsModule],
    providers: [
      { provide: MatDialogRef, useValue: dialogRefMock },
      { provide: MAT_DIALOG_DATA, useValue: { user } },
      provideNgxMask(),
    ],
  }).createComponent(UserFormComponent);

describe('UserFormComponent', () => {
  beforeEach(() => vi.clearAllMocks());

  it('deve ser criado', () => {
    const fixture = createComponent();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('isEdit é false quando não há usuário', () => {
    const { componentInstance } = createComponent();
    expect(componentInstance.isEdit).toBe(false);
  });

  it('isEdit é true quando usuário é fornecido', () => {
    const user: User = { id: '1', name: 'Ana', email: 'ana@a.com', cpf: '123.456.789-09', phone: '(11) 99999-0001', phoneType: 'mobile' };
    const { componentInstance } = createComponent(user);
    expect(componentInstance.isEdit).toBe(true);
  });

  it('formulário começa inválido (campos obrigatórios vazios)', () => {
    const { componentInstance } = createComponent();
    expect(componentInstance.form.invalid).toBe(true);
  });

  it('preenche o formulário automaticamente no modo edição', () => {
    const user: User = { id: '1', name: 'Ana Lima', email: 'ana@email.com', cpf: '123.456.789-09', phone: '(11) 99999-0001', phoneType: 'mobile' };
    const { componentInstance } = createComponent(user);
    expect(componentInstance.form.controls.name.value).toBe('Ana Lima');
    expect(componentInstance.form.controls.email.value).toBe('ana@email.com');
  });

  it('não fecha o dialog quando formulário inválido', () => {
    const { componentInstance } = createComponent();
    componentInstance.save();
    expect(dialogRefMock.close).not.toHaveBeenCalled();
  });

  it('fecha o dialog com os dados quando formulário válido', () => {
    const { componentInstance } = createComponent();
    componentInstance.form.setValue({
      email: 'teste@email.com',
      name: 'Teste User',
      cpf: '123.456.789-09',
      phone: '(11) 99999-0001',
      phoneType: 'mobile',
    });
    componentInstance.save();
    expect(dialogRefMock.close).toHaveBeenCalledWith({
      email: 'teste@email.com',
      name: 'Teste User',
      cpf: '123.456.789-09',
      phone: '(11) 99999-0001',
      phoneType: 'mobile',
    });
  });

  it('phoneMask é celular quando phoneType é mobile', () => {
    const { componentInstance } = createComponent();
    componentInstance.form.controls.phoneType.setValue('mobile');
    expect(componentInstance.phoneMask).toBe('(00) 00000-0000');
  });

  it('phoneMask é fixo quando phoneType é landline', () => {
    const { componentInstance } = createComponent();
    componentInstance.form.controls.phoneType.setValue('landline');
    expect(componentInstance.phoneMask).toBe('(00) 0000-0000');
  });
});
