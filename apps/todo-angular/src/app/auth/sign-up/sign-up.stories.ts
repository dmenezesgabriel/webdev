import {
  applicationConfig,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular';

import { SignUpComponent } from './sign-up.component';
import { provideHttpClient } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';

const meta: Meta<SignUpComponent> = {
  title: 'Auth/SignUp',
  component: SignUpComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [SharedModule],
    }),
    applicationConfig({ providers: [provideHttpClient()] }),
  ],

  // argTypes: {
  //   formSubmit: { action: 'formSubmit' }, //event emitter
  // },
};

export default meta;
type Story = StoryObj<SignUpComponent>;

export const Default: Story = {};
