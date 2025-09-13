import {
  applicationConfig,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './sign-in.component';
import { CardComponent } from '../../shared/card/card.component';
import { provideHttpClient } from '@angular/common/http';

const meta: Meta<SignInComponent> = {
  title: 'Auth/SignIn',
  component: SignInComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
      declarations: [CardComponent],
    }),
    applicationConfig({ providers: [provideHttpClient()] }),
  ],
};

export default meta;
type Story = StoryObj<SignInComponent>;

export const Default: Story = {};
