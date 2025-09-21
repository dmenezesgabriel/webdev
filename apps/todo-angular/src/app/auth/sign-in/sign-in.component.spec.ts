import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { SignInComponent } from './sign-in.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { CardComponent } from '../../shared/card/card.component';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let authService: AuthService;
  let router: Router;

  const mockAuthService = {
    loginUser: jest.fn(),
    saveToken: jest.fn(),
  };

  const mockRouter = {
    navigate: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignInComponent, CardComponent],
      imports: [ReactiveFormsModule],
      providers: [
        provideHttpClient(),
        FormBuilder,
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);

    mockAuthService.loginUser.mockReset();
    mockRouter.navigate.mockReset();

    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values and required validators', () => {
    expect(component.signInForm).toBeDefined();
    expect(component.signInForm.get('email')).toBeDefined();
    expect(component.signInForm.get('password')).toBeDefined();
    expect(component.signInForm.valid).toBe(false);
  });

  it('should show error for invalid email', fakeAsync(() => {
    const emailControl = component.signInForm.get('email');
    const emailInput = fixture.debugElement.query(By.css('#email'));

    emailInput.nativeElement.value = 'invalid-email';
    emailInput.nativeElement.dispatchEvent(new Event('input'));
    emailInput.nativeElement.dispatchEvent(new Event('blur'));

    emailControl?.markAllAsTouched();

    fixture.detectChanges();
    tick();

    const erroMessage = fixture.debugElement.query(By.css('.error-message'));

    expect(emailControl?.invalid).toBe(true);
    expect(erroMessage).toBeTruthy();
    expect(erroMessage.nativeElement.textContent).toContain(
      'Please enter a valid email'
    );
  }));

  it('should call authService loginUser and navigate on valid form submission', fakeAsync(() => {
    const mockResponse = { data: { token: 'mock-token-123' } };

    mockAuthService.loginUser.mockReturnValue(of(mockResponse));

    component.signInForm.setValue({
      email: 'johndoe@example.com',
      password: '123456',
    });

    const form = fixture.debugElement.query(By.css('form')).nativeElement;
    form.dispatchEvent(new Event('submit'));

    fixture.detectChanges();
    tick();

    expect(mockAuthService.saveToken).toHaveBeenCalledWith('mock-token-123');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/todos']);
    expect(component.isSubmitting).toBe(false);
  }));

  it('should handle login error gracefully', fakeAsync(() => {
    const mockError = { error: 'Invalid Credentials' };

    mockAuthService.loginUser.mockReturnValue(throwError(() => mockError));

    component.signInForm.setValue({
      email: 'johndoe@eample.com',
      password: '123456',
    });

    const form = fixture.debugElement.query(By.css('form')).nativeElement;
    form.dispatchEvent(new Event('submit'));

    fixture.detectChanges();
    tick();

    expect(mockAuthService.loginUser).toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
    expect(component.isSubmitting).toBe(false);
  }));

  it('should mark all controls as touched when the form is invalid', () => {
    const emailControl = component.signInForm.get('email');
    jest.spyOn(emailControl as any, 'markAllAsTouched');

    const form = fixture.debugElement.query(By.css('form')).nativeElement;
    form.dispatchEvent(new Event('submit'));

    expect(component.signInForm.invalid).toBe(true);
    expect(emailControl?.markAllAsTouched).toHaveBeenCalled();
  });
});
