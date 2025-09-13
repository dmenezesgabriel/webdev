import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../core/user/user.service';
import type { UserCredentials } from '../../core/user/user.model';
import { Router } from '@angular/router';
import { AuthTokenService } from '../auth.service';

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
    private userService: UserService,
    private router: Router,
    private AuthTokenService: AuthTokenService
  ) {}

  signInForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.signInForm.valid) {
      this.isSubmitting = true;

      const credentials = this.signInForm.value as UserCredentials;

      this.userService.loginUser(credentials).subscribe({
        next: (response) => {
          console.log('Login successful: ', response);
          this.AuthTokenService.saveToken(response.data.token);
          this.router.navigate(['/todos']);
          this.isSubmitting = false;
        },
        error: (error) => {
          console.log('Login failed', error);
          this.isSubmitting = false;
        },
      });
    } else {
      Object.keys(this.signInForm.controls).forEach((key) => {
        this.signInForm.get(key)?.markAllAsTouched();
      });
    }
  }
}
