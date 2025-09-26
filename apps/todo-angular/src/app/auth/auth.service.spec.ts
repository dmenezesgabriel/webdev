import { TestBed } from '@angular/core/testing';

import { JwtAuthService } from './jwt-auth.service';

import { provideHttpClient } from '@angular/common/http';
import type { NewUser, User } from '../core/user/user.model';
import type { AuthTokenResponse, LoginCredentials } from './auth.model';
import { environment } from '../../environments/environment';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { LoggedIn } from '../shared/header/header.stories';

describe('JwtAuthService', () => {
  let service: JwtAuthService;
  let httpMock: HttpTestingController;
  let router: Router;

  const mockRouter = {
    navigate: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        JwtAuthService,
      ],
    });

    service = TestBed.inject(JwtAuthService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });

  it('should register a new user', () => {
    const newUser: NewUser = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    };

    const mockResponse: User = { ...newUser, id: '1', role: 'USER' };

    service.registerUser(newUser).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.todoApiBaseUrl}/users`);

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newUser);

    req.flush(mockResponse);
  });

  it('should login an user and save token', () => {
    const credentials: LoginCredentials = {
      email: 'johndow@example.com',
      password: '123456',
    };

    const mockTokenResponse: AuthTokenResponse = {
      data: { token: 'mock-token' },
    };

    jest.spyOn(service, 'saveToken');

    service.loginUser(credentials).subscribe(() => {
      expect(service.saveToken).toHaveBeenCalledWith('mock-token');
      expect(service.isLoggedIn$).toBeTruthy();
    });

    const req = httpMock.expectOne(`${environment.todoApiBaseUrl}/sessions`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(credentials);

    req.flush(mockTokenResponse);
  });

  it('should get a token from localStorage', () => {
    const token = 'test-token';

    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(token);

    expect(service.getToken()).toBe(token);
  });

  it('should save a token to localStorage', () => {
    const token = 'test-token';

    jest.spyOn(Storage.prototype, 'setItem');

    service.saveToken(token);

    expect(localStorage.setItem).toHaveBeenCalledWith('authToken', token);
  });

  it('should check for a token', () => {
    jest.spyOn(service, 'getToken').mockReturnValue('some-token');

    expect(service.hasToken()).toBe(true);

    jest.spyOn(service, 'getToken').mockReturnValue(null);

    expect(service.hasToken()).toBe(false);
  });

  it('should remove token and navigate to sign-in on logout', () => {
    const loggedInSubject = (service as any).loggedIn;
    jest.spyOn(loggedInSubject, 'next');

    jest.spyOn(Storage.prototype, 'removeItem');
    jest.spyOn(router, 'navigate');

    service.logout();

    expect(localStorage.removeItem).toHaveBeenCalledWith('authToken');
    expect(loggedInSubject.next).toHaveBeenCalledWith(false);
    expect(router.navigate).toHaveBeenCalledWith(['/sign-in']);
  });
});
