import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { AppComponent } from './app.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';

const meta: Meta<AppComponent> = {
  title: 'App',
  component: AppComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      declarations: [SignUpComponent, HeaderComponent, CardComponent],
      imports: [ReactiveFormsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<AppComponent>;

export const Default: Story = {};
