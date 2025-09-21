import {
  ChangeDetectionStrategy,
  Component,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, Validators, type AbstractControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import type { NewUser } from '../../core/user/user.model';

function passwordMatchValidator(control: AbstractControl) {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword) {
    return null;
  }

  return password.value === confirmPassword.value
    ? null
    : { passwordMismatch: true };
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  signUpForm = this.fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: [passwordMatchValidator] }
  );

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.signUpForm.valid) {
      this.isSubmitting = true;

      const newUser = this.signUpForm.value as NewUser;

      this.authService.registerUser(newUser).subscribe({
        next: (response) => {
          console.log('User registered successfully');
          this.isSubmitting = false;
          this.cdr.markForCheck();
          this.router.navigate(['/sign-in']);
        },
        error: (error) => {
          console.error('Registration failed: ', error);
          this.isSubmitting = false;
          this.cdr.markForCheck();
        },
      });
    } else {
      Object.keys(this.signUpForm.controls).forEach((key) => {
        this.signUpForm.get(key)?.markAllAsTouched();
      });
    }
  }
}
