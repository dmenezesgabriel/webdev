import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { JwtAuthService } from './jwt-auth.service';
import { BehaviorSubject, take } from 'rxjs';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let JwtAuthService: JwtAuthService;
  let router: Router;

  const isLoggedInSubject = new BehaviorSubject<boolean>(false);

  const mockJwtAuthService = {
    isLoggedIn$: isLoggedInSubject.asObservable(),
  };

  const mockRouter = {
    navigate: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: JwtAuthService, useValue: mockJwtAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    });

    guard = TestBed.inject(AuthGuard);
    JwtAuthService = TestBed.inject(JwtAuthService);
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
