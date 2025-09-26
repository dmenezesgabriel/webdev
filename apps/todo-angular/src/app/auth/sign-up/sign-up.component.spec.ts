import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import { provideHttpClient } from '@angular/common/http';
import { CardComponent } from '../../shared/card/card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtAuthService } from '../jwt-auth.service';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let JwtAuthService: JwtAuthService;
  let router: Router;

  const mockJwtAuthService = {
    registerUser: jest.fn(),
  };

  const mockRouter = {
    navigate: jest.fn(),
  };

  beforeEach(async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    await TestBed.configureTestingModule({
      declarations: [SignUpComponent, CardComponent],
      imports: [ReactiveFormsModule],
      providers: [
        provideHttpClient(),
        { provide: JwtAuthService, useValue: mockJwtAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    JwtAuthService = TestBed.inject(JwtAuthService);
    router = TestBed.inject(Router);

    mockJwtAuthService.registerUser.mockReset();
    mockRouter.navigate.mockReset();

    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values and validators', () => {
    expect(component.signUpForm.get('name')).toBeDefined();
    expect(component.signUpForm.get('email')).toBeDefined();
    expect(component.signUpForm.get('password')).toBeDefined();
    expect(component.signUpForm.get('confirmPassword')).toBeDefined();
    expect(component.signUpForm.valid).toBe(false);
  });

  it('should throw an error for invalid name', fakeAsync(() => {
    const nameControl = component.signUpForm.get('name');
    const nameInput = fixture.debugElement.query(By.css('#name')).nativeElement;

    nameInput.value = 'ab';
    nameInput.dispatchEvent(new Event('input'));
    nameInput.dispatchEvent(new Event('blur'));

    fixture.detectChanges();
    tick();

    const errorMessage = fixture.debugElement.query(By.css('.error-message'));
    expect(nameControl?.invalid).toBe(true);
    expect(errorMessage.nativeElement.textContent).toContain(
      'Name must be at least 3 characters',
    );
  }));

  it('should show an error when passwords do not match', fakeAsync(() => {
    const passwordControl = component.signUpForm.get('password');
    const confirmPasswordControl = component.signUpForm.get('confirmPassword');

    passwordControl?.setValue('123456');
    confirmPasswordControl?.setValue('456789');

    passwordControl?.markAsDirty();
    confirmPasswordControl?.markAsDirty();

    fixture.detectChanges();
    tick();

    expect(component.signUpForm.errors).toEqual({ passwordMismatch: true });
    expect(component.signUpForm.valid).toBe(false);
  }));

  it('should call JwtAuthService registerUser and navigate on valid form submission', fakeAsync(() => {
    const mockResponse = { data: { id: '1', name: 'John Doe' } };
    mockJwtAuthService.registerUser.mockReturnValue(of(mockResponse));

    component.signUpForm.setValue({
      name: 'John Doe',
      email: 'johndoe@eample.com',
      password: '123456',
      confirmPassword: '123456',
    });

    const form = fixture.debugElement.query(By.css('form')).nativeElement;
    form.dispatchEvent(new Event('submit'));

    fixture.detectChanges();
    tick();

    expect(mockJwtAuthService.registerUser).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'johndoe@eample.com',
      password: '123456',
      confirmPassword: '123456',
    });

    expect(router.navigate).toHaveBeenCalledWith(['/sign-in']);
    expect(component.isSubmitting).toBe(false);
  }));

  it('should handle registration error gracefully', fakeAsync(() => {
    const mockError = { error: 'Registration failed' };
    mockJwtAuthService.registerUser.mockReturnValue(
      throwError(() => {
        mockError;
      }),
    );

    component.signUpForm.setValue({
      name: 'John Doe',
      email: 'johndoe@eample.com',
      password: '123456',
      confirmPassword: '123456',
    });

    const form = fixture.debugElement.query(By.css('form')).nativeElement;
    form.dispatchEvent(new Event('submit'));

    fixture.detectChanges();
    tick();

    expect(mockJwtAuthService.registerUser).toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
    expect(component.isSubmitting).toBe(false);
  }));

  it('should mark all controls as touched when the form is invalid', () => {
    const nameControl = component.signUpForm.get('name');
    const spy = jest.spyOn(nameControl as any, 'markAllAsTouched');

    component.signUpForm.setValue({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });

    const form = fixture.debugElement.query(By.css('form')).nativeElement;
    form.dispatchEvent(new Event('submit'));

    expect(component.signUpForm.invalid).toBe(true);
    expect(spy).toHaveBeenCalled();
  });
});
