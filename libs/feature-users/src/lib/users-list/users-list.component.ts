import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, debounceTime, filter, map, merge, startWith, switchMap, take } from 'rxjs';
import { of, Subject } from 'rxjs';

import { User, UsersService } from '@lista-usuarios/data-access-users';
import { UserFormComponent } from '../user-form/user-form.component';

const AVATAR_COLORS = [
  '#1976d2', '#388e3c', '#f57c00', '#7b1fa2',
  '#c62828', '#00838f', '#ad1457', '#1565c0', '#2e7d32',
];

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent {
  private readonly usersService = inject(UsersService);
  private readonly dialog = inject(MatDialog);
  private readonly refresh$ = new Subject<void>();

  readonly searchControl = new FormControl('');
  readonly users = signal<User[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  constructor() {
    merge(
      this.searchControl.valueChanges.pipe(startWith(''), map(v => v ?? '')),
      this.refresh$.pipe(map(() => this.searchControl.value ?? ''))
    ).pipe(
      debounceTime(300),
      switchMap(term => {
        this.loading.set(true);
        this.error.set(null);
        return this.usersService.search(term).pipe(
          catchError(() => {
            this.error.set('Erro ao carregar usuários. Tente novamente.');
            return of([]);
          })
        );
      }),
      takeUntilDestroyed()
    ).subscribe(users => {
      this.users.set(users);
      this.loading.set(false);
    });
  }

  getInitials(name: string): string {
    return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
  }

  getAvatarColor(name: string): string {
    return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
  }

  clearSearch(): void {
    this.searchControl.setValue('');
  }

  openAddModal(): void {
    this.openUserForm();
  }

  openEditModal(user: User): void {
    this.openUserForm(user);
  }

  private openUserForm(user?: User): void {
    this.dialog
      .open(UserFormComponent, {
        width: '540px',
        data: { user },
        disableClose: false,
      })
      .afterClosed()
      .pipe(
        take(1),
        filter(Boolean),
        switchMap(formData =>
          user
            ? this.usersService.update({ ...user, ...formData })
            : this.usersService.add(formData)
        )
      )
      .subscribe({
        next: () => this.refresh$.next(),
        error: () => this.error.set('Erro ao salvar usuário. Tente novamente.'),
      });
  }
}
