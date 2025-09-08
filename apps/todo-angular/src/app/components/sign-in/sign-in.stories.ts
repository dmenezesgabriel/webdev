import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './sign-in.component';

const meta: Meta<SignInComponent> = {
  title: 'Auth/SignIn',
  component: SignInComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
    }),
  ],

  // argTypes: {
  //   formSubmit: { action: 'formSubmit' },
  // },
};

export default meta;
type Story = StoryObj<SignInComponent>;

export const Default: Story = {};
