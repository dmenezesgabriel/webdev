import {
  applicationConfig,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular';

import { SignInComponent } from './sign-in.component';
import { provideHttpClient } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';

const meta: Meta<SignInComponent> = {
  title: 'Auth/SignIn',
  component: SignInComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [SharedModule],
    }),
    applicationConfig({ providers: [provideHttpClient()] }),
  ],
};

export default meta;
type Story = StoryObj<SignInComponent>;

export const Default: Story = {};
