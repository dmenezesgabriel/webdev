import {
  applicationConfig,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { http, HttpResponse, delay } from 'msw';
import { SignInComponent } from './sign-in.component';
import { provideHttpClient } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
import { environment } from '../../../environments/environment';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import { Router } from '@angular/router';

const meta: Meta<SignInComponent> = {
  title: 'Auth/SignIn',
  component: SignInComponent,
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
type Story = StoryObj<SignInComponent>;

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        http.post(`${environment.todoApiBaseUrl}/sessions`, async () => {
          await delay(500); // Simulate network latency
          return HttpResponse.json({ data: { token: 'mock-auth-token-123' } });
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const emailInput = canvas.getByPlaceholderText('Enter your email');
    const passwordInput = canvas.getByPlaceholderText('Enter your password');
    const submitButton = canvas.getByRole('button', { name: 'Sign In' });

    await userEvent.type(emailInput, 'johndoe@example.com', { delay: 100 });
    await userEvent.type(passwordInput, '123456', { delay: 100 });

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(canvas.getByText('Signing In...')).toBeInTheDocument();
    });
  },
};
