import {
  ChangeDetectionStrategy,
  Component,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

import { Router } from '@angular/router';
import type { LoginCredentials } from '../auth.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  signInForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.signInForm.valid) {
      this.isSubmitting = true;

      const credentials = this.signInForm.value as LoginCredentials;

      this.authService.loginUser(credentials).subscribe({
        next: (response) => {
          console.log('Login successful');
          this.authService.saveToken(response.data.token);
          this.router.navigate(['/todos']);
          this.isSubmitting = false;
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.log('Login failed', error);
          this.isSubmitting = false;
          this.cdr.markForCheck();
        },
      });
    } else {
      Object.keys(this.signInForm.controls).forEach((key) => {
        this.signInForm.get(key)?.markAllAsTouched();
      });
    }
  }
}
