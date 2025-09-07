import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up.component';
import { fn } from 'storybook/test';

const ActionsData = {
  onSubmit: fn(),
};

const meta: Meta<SignUpComponent> = {
  title: 'Auth/SignUp',
  component: SignUpComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
    }),
  ],
  args: {
    ...ActionsData,
  },
};

export default meta;
type Story = StoryObj<SignUpComponent>;

export const Default: Story = {};
