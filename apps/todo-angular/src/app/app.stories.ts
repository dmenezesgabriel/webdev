import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { AppComponent } from './app.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';

const meta: Meta<AppComponent> = {
  title: 'App',
  component: AppComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      declarations: [SignUpComponent, HeaderComponent],
      imports: [ReactiveFormsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<AppComponent>;

export const Default: Story = {};
