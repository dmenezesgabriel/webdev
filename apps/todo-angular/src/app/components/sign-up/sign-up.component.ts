import { ChangeDetectionStrategy, Component, Output } from '@angular/core';
import { FormBuilder, Validators, type AbstractControl } from '@angular/forms';
import { EventEmitter } from '@angular/core';

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
  styleUrl: './sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  isSubmitting = false;

  @Output() formSubmit = new EventEmitter();

  constructor(private fb: FormBuilder) {}

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

      // mock
      setTimeout(() => {
        console.log('Form submitted: ', this.signUpForm.value);
        this.isSubmitting = false;
      }, 1500);
    } else {
      Object.keys(this.signUpForm.controls).forEach((key) => {
        this.signUpForm.get(key)?.markAllAsTouched;
      });
    }

    this.formSubmit.emit(JSON.stringify(this.signUpForm.value)); // storybook action
  }
}
