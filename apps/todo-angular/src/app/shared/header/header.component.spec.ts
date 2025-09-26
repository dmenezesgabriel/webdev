import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { JwtAuthService } from '../../auth/jwt-auth.service';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockActivatedRoute: any;
  let JwtAuthService: JwtAuthService;

  const isLoggedInSubject = new BehaviorSubject<boolean>(false);

  const mockJwtAuthService = {
    isLoggedIn$: isLoggedInSubject.asObservable(),
    logout: jest.fn(),
  };

  beforeEach(async () => {
    mockActivatedRoute = {
      data: of({ todos: [] }),
    };

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterModule],
      providers: [
        provideHttpClient(),
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
        {
          provide: JwtAuthService,
          useValue: mockJwtAuthService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('HeaderComponent', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });

    it('should show Sign In link when not loggedIn', fakeAsync(() => {
      isLoggedInSubject.next(false);

      fixture.detectChanges();
      tick();

      const signInLink = fixture.debugElement.query(By.css('a.link-btn'));

      expect(signInLink.nativeElement.href).toContain('/sign-in');
      expect(signInLink.nativeElement.textContent.trim()).toContain('Sign In');
    }));

    it('should show Sign Up link when not loggedIn', fakeAsync(() => {
      isLoggedInSubject.next(false);

      fixture.detectChanges();
      tick();

      const signInLink = fixture.debugElement.query(By.css('a.action-btn'));

      expect(signInLink.nativeElement.href).toContain('/sign-up');
      expect(signInLink.nativeElement.textContent.trim()).toContain('Sign Up');
    }));

    it('should show Logout link when loggedIn', fakeAsync(() => {
      isLoggedInSubject.next(true);

      fixture.detectChanges();
      tick();

      const signInLink = fixture.debugElement.query(By.css('a.link-btn'));

      expect(signInLink.nativeElement.textContent.trim()).toContain('Logout');
    }));
  });

  it('should call JwtAuthService logout method when logout button is clicked', fakeAsync(() => {
    isLoggedInSubject.next(true);

    fixture.detectChanges();
    tick();

    const logoutLink = fixture.debugElement.query(By.css('a.link-btn'));

    expect(logoutLink).toBeTruthy();

    logoutLink.nativeElement.click();

    expect(mockJwtAuthService.logout).toHaveBeenCalled();
  }));
});
