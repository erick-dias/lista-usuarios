import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaskDirective } from 'ngx-mask';

import { User, cpfValidator, phoneValidator } from '@lista-usuarios/data-access-users';

export interface UserFormData {
  user?: User;
}

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    NgxMaskDirective,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  private readonly dialogRef = inject(MatDialogRef<UserFormComponent>);
  readonly data = inject<UserFormData>(MAT_DIALOG_DATA);

  readonly isEdit = !!this.data?.user;

  readonly form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    name: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    cpf: new FormControl('', {
      validators: [Validators.required, cpfValidator],
      nonNullable: true,
    }),
    phone: new FormControl('', {
      validators: [Validators.required, phoneValidator],
      nonNullable: true,
    }),
    phoneType: new FormControl<'mobile' | 'landline'>('mobile', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  get phoneMask(): string {
    return this.form.controls.phoneType.value === 'mobile'
      ? '(00) 00000-0000'
      : '(00) 0000-0000';
  }

  constructor() {
    if (this.data?.user) {
      this.form.patchValue(this.data.user);
    }
  }

  save(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.getRawValue());
    }
  }
}
