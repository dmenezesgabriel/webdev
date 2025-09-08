import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up.component';

const meta: Meta<SignUpComponent> = {
  title: 'Auth/SignUp',
  component: SignUpComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
    }),
  ],

  argTypes: {
    formSubmit: { action: 'formSubmit' },
  },
};

export default meta;
type Story = StoryObj<SignUpComponent>;

export const Default: Story = {};
