import {
  applicationConfig,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular';

import { SignUpComponent } from './sign-up.component';
import { provideHttpClient } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
import { http, HttpResponse, delay } from 'msw';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

const meta: Meta<SignUpComponent> = {
  title: 'Auth/SignUp',
  component: SignUpComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [SharedModule],
    }),
    applicationConfig({
      providers: [
        provideHttpClient(),
        { provide: Router, useValue: { navigate: () => null } },
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<SignUpComponent>;

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        http.post(`${environment.todoApiBaseUrl}/users`, async () => {
          await delay(500);
          return HttpResponse.json({ data: { id: '1', name: 'John Doe' } });
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const nameInput = canvas.getByPlaceholderText('Enter your full name');
    const emailInput = canvas.getByPlaceholderText('Enter your email');
    const passwordInput = canvas.getByPlaceholderText('Create a password');
    const confirmPasswordInput = canvas.getByPlaceholderText(
      'Confirm your password'
    );
    const submitButton = canvas.getByRole('button', { name: 'Get Started' });

    await userEvent.type(nameInput, 'John Doe', { delay: 100 });
    await userEvent.type(emailInput, 'johndoe@example.com', { delay: 100 });
    await userEvent.type(passwordInput, '123456', { delay: 100 });
    await userEvent.type(confirmPasswordInput, '123456', { delay: 100 });

    expect(submitButton).toBeEnabled();

    await userEvent.click(submitButton);

    expect(canvas.getByText('Signing up...')).toBeInTheDocument();
  },
};
