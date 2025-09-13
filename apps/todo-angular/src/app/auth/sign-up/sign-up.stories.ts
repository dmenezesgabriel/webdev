import {
  applicationConfig,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up.component';
import { CardComponent } from '../../shared/card/card.component';
import { provideHttpClient } from '@angular/common/http';

const meta: Meta<SignUpComponent> = {
  title: 'Auth/SignUp',
  component: SignUpComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
      declarations: [CardComponent],
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
