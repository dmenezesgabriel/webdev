import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoItemComponent } from './todo-item.component';

const meta: Meta<TodoItemComponent> = {
  title: 'Todo/Todo-Item',
  component: TodoItemComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
      declarations: [],
    }),
  ],
};

export default meta;
type Story = StoryObj<TodoItemComponent>;

export const Default: Story = {
  args: {
    todo: {
      id: '1',
      title: 'Example Todo Item',
      userId: '1',
    },
  },
};
