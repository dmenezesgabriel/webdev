import { ChangeDetectionStrategy, Component, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  @Output() formSubmit = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  signUpForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
  });

  onSubmit(event: Event) {
    event.preventDefault();

    console.log('Form submitted: ', this.signUpForm.value);
    this.formSubmit.emit(JSON.stringify(this.signUpForm.value));
  }
}
