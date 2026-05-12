import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { User } from '../models/user.model';

const MOCK_USERS: User[] = [
  {
    id: 1,
    name: 'Giana Sandrini',
    email: 'giana@attoratus.com.br',
    cpf: '123.456.789-00',
    phone: '(11) 99999-0001',
    phoneType: 'mobile',
  },
  {
    id: 2,
    name: 'Carlos Mendes',
    email: 'carlos.mendes@empresa.com.br',
    cpf: '987.654.321-11',
    phone: '(21) 98888-0002',
    phoneType: 'mobile',
  },
  {
    id: 3,
    name: 'Fernanda Oliveira',
    email: 'fernanda.oliveira@email.com',
    cpf: '456.789.123-22',
    phone: '(31) 3333-0003',
    phoneType: 'landline',
  },
  {
    id: 4,
    name: 'Rafael Souza',
    email: 'rafael.souza@teste.com.br',
    cpf: '321.654.987-33',
    phone: '(41) 97777-0004',
    phoneType: 'mobile',
  },
  {
    id: 5,
    name: 'Mariana Costa',
    email: 'mariana.costa@dominio.com',
    cpf: '654.321.098-44',
    phone: '(51) 96666-0005',
    phoneType: 'mobile',
  },
  {
    id: 6,
    name: 'Bruno Almeida',
    email: 'bruno.almeida@corp.com.br',
    cpf: '789.012.345-55',
    phone: '(61) 3222-0006',
    phoneType: 'landline',
  },
];

@Injectable({ providedIn: 'root' })
export class UsersService {
  search(term: string): Observable<User[]> {
    return of(MOCK_USERS).pipe(
      delay(500),
      map(users =>
        term.trim()
          ? users.filter(u => u.name.toLowerCase().includes(term.toLowerCase()))
          : users
      ),
      catchError(() => throwError(() => new Error('Erro ao carregar usuários')))
    );
  }

  getById(id: number): Observable<User | undefined> {
    return of(MOCK_USERS.find(u => u.id === id)).pipe(delay(200));
  }
}
