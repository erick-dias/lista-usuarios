import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, throwError } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/users';

  search(term: string): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl).pipe(
      map(users =>
        term.trim()
          ? users.filter(u => u.name.toLowerCase().includes(term.toLowerCase()))
          : users
      ),
      catchError(() => throwError(() => new Error('Erro ao carregar usuários')))
    );
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`).pipe(
      catchError(() => throwError(() => new Error('Usuário não encontrado')))
    );
  }

  add(data: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(this.baseUrl, data).pipe(
      catchError(() => throwError(() => new Error('Erro ao criar usuário')))
    );
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${user.id}`, user).pipe(
      catchError(() => throwError(() => new Error('Erro ao atualizar usuário')))
    );
  }
}
