import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { BehaviorSubject, take } from 'rxjs';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  const isLoggedInSubject = new BehaviorSubject<boolean>(false);

  const mockAuthService = {
    isLoggedIn$: isLoggedInSubject.asObservable(),
  };

  const mockRouter = {
    navigate: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should create guard', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true when the user is logged in', (done) => {
    isLoggedInSubject.next(true);

    guard
      .canActivate()
      .pipe(take(1))
      .subscribe((result) => {
        expect(result).toBe(true);
        expect(router.navigate).not.toHaveBeenCalled();

        done();
      });
  });

  it('should return false and navigate to sign-in when the user is not logged in', (done) => {
    isLoggedInSubject.next(false);

    guard
      .canActivate()
      .pipe(take(1))
      .subscribe((result) => {
        expect(result).toBe(false);
        expect(router.navigate).toHaveBeenCalledWith(['/sign-in']);

        done();
      });
  });
});
