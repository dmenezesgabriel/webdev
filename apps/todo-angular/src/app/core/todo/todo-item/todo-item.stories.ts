import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoItemComponent } from './todo-item.component';
import { userEvent, within, expect, fn } from 'storybook/test';

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
      completedAt: null,
      createdAt: new Date(),
    },
    toggle: fn(),
    delete: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const toggleCheckbox = canvas.getByRole('checkbox');
    const deleteButton = canvas.getByRole('button', { name: /delete/i });

    await userEvent.click(toggleCheckbox);
    await userEvent.click(deleteButton);

    expect(args.toggle).toHaveBeenCalledWith('1');
    expect(args.delete).toHaveBeenCalledWith('1');
  },
};
