import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, debounceTime, startWith, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { UsersService } from '../../../core/services/users.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent {
  private readonly usersService = inject(UsersService);

  readonly searchControl = new FormControl('');
  readonly users = signal<User[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  constructor() {
    this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(term => {
        this.loading.set(true);
        this.error.set(null);
        return this.usersService.search(term ?? '').pipe(
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
}
