import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  isSubmitting = false;

  constructor(private fb: FormBuilder) {}

  signInForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.signInForm.valid) {
      this.isSubmitting = true;

      setTimeout(() => {
        console.log('Form submitted: ', this.signInForm.value);
        this.isSubmitting = false;
      }, 1500);
    } else {
      Object.keys(this.signInForm.controls).forEach((key) => {
        this.signInForm.get(key)?.markAllAsTouched();
      });
    }
  }
}
