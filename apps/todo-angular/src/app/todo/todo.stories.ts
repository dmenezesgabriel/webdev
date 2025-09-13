import {
  applicationConfig,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoComponent } from './todo.component';
import { provideHttpClient } from '@angular/common/http';
import { CardComponent } from '../shared/card/card.component';

const meta: Meta<TodoComponent> = {
  title: 'Todo/Todos',
  component: TodoComponent,
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
type Story = StoryObj<TodoComponent>;

export const Default: Story = {};
