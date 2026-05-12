import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { UsersService } from './users.service';
import { User } from '../models/user.model';

const BASE_URL = 'http://localhost:3000/users';

const MOCK_USERS: User[] = [
  { id: '1', name: 'Ana Lima', email: 'ana@email.com', cpf: '123.456.789-09', phone: '(11) 99999-0001', phoneType: 'mobile' },
  { id: '2', name: 'Bruno Silva', email: 'bruno@email.com', cpf: '111.444.777-35', phone: '(21) 3333-0002', phoneType: 'landline' },
];

describe('UsersService', () => {
  let service: UsersService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(UsersService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  describe('search', () => {
    it('retorna todos os usuários quando term está vazio', () => {
      service.search('').subscribe(users => {
        expect(users).toHaveLength(2);
      });
      http.expectOne(BASE_URL).flush(MOCK_USERS);
    });

    it('filtra usuários pelo nome', () => {
      service.search('Ana').subscribe(users => {
        expect(users).toHaveLength(1);
        expect(users[0].name).toBe('Ana Lima');
      });
      http.expectOne(BASE_URL).flush(MOCK_USERS);
    });

    it('retorna vazio quando nenhum usuário bate com o filtro', () => {
      service.search('xyz').subscribe(users => {
        expect(users).toHaveLength(0);
      });
      http.expectOne(BASE_URL).flush(MOCK_USERS);
    });

    it('a busca é case-insensitive', () => {
      service.search('ana').subscribe(users => {
        expect(users).toHaveLength(1);
      });
      http.expectOne(BASE_URL).flush(MOCK_USERS);
    });
  });

  describe('getById', () => {
    it('faz GET para o endpoint correto', () => {
      service.getById('1').subscribe();
      const req = http.expectOne(`${BASE_URL}/1`);
      expect(req.request.method).toBe('GET');
      req.flush(MOCK_USERS[0]);
    });
  });

  describe('add', () => {
    it('faz POST com os dados do novo usuário', () => {
      const newUser = { name: 'Carlos', email: 'c@c.com', cpf: '000.000.000-00', phone: '(11) 99999-0000', phoneType: 'mobile' as const };
      service.add(newUser).subscribe();
      const req = http.expectOne(BASE_URL);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newUser);
      req.flush({ id: '3', ...newUser });
    });
  });

  describe('update', () => {
    it('faz PUT no endpoint do usuário correto', () => {
      const updated = { ...MOCK_USERS[0], name: 'Ana Atualizada' };
      service.update(updated).subscribe();
      const req = http.expectOne(`${BASE_URL}/1`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updated);
      req.flush(updated);
    });
  });
});
