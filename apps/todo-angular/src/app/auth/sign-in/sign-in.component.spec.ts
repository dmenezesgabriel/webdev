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
import { JwtAuthService } from '../jwt-auth.service';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let JwtAuthService: JwtAuthService;
  let router: Router;

  const mockJwtAuthService = {
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
        { provide: JwtAuthService, useValue: mockJwtAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    JwtAuthService = TestBed.inject(JwtAuthService);
    router = TestBed.inject(Router);

    mockJwtAuthService.loginUser.mockReset();
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
      'Please enter a valid email',
    );
  }));

  it('should call JwtAuthService loginUser and navigate on valid form submission', fakeAsync(() => {
    const mockResponse = { data: { token: 'mock-token-123' } };

    mockJwtAuthService.loginUser.mockReturnValue(of(mockResponse));

    component.signInForm.setValue({
      email: 'johndoe@example.com',
      password: '123456',
    });

    const form = fixture.debugElement.query(By.css('form')).nativeElement;
    form.dispatchEvent(new Event('submit'));

    fixture.detectChanges();
    tick();

    expect(mockJwtAuthService.saveToken).toHaveBeenCalledWith('mock-token-123');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/todos']);
    expect(component.isSubmitting).toBe(false);
  }));

  it('should handle login error gracefully', fakeAsync(() => {
    const mockError = { error: 'Invalid Credentials' };

    mockJwtAuthService.loginUser.mockReturnValue(throwError(() => mockError));

    component.signInForm.setValue({
      email: 'johndoe@eample.com',
      password: '123456',
    });

    const form = fixture.debugElement.query(By.css('form')).nativeElement;
    form.dispatchEvent(new Event('submit'));

    fixture.detectChanges();
    tick();

    expect(mockJwtAuthService.loginUser).toHaveBeenCalled();
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
