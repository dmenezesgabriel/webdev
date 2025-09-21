import {
  applicationConfig,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { http, HttpResponse, delay } from 'msw';
import { TodoComponent } from './todo.component';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import type {
  Todo,
  TodoListResponse,
  TodoRequest,
  TodoResponse,
} from './todo.model';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import { SharedModule } from '../../shared/shared.module';

const mutatingHandlers = (todos: Todo[]) => [
  http.post<{}, TodoRequest, TodoResponse>(
    'http://localhost:3333/todos',
    async ({ request }) => {
      const body = await request.json();
      const newTodo: Todo = {
        id: String(todos.length + 1),
        userId: '1',
        title: body.title,
        completedAt: null,
        createdAt: new Date(),
      };

      todos.push(newTodo);

      return HttpResponse.json({ data: newTodo });
    }
  ),
  http.patch<{ id: string }, {}, TodoResponse>(
    'http://localhost:3333/todos/:id/toggle',
    async ({ params }) => {
      const { id } = params;
      const todoToUpdate = todos.find((todo) => todo.id === id);

      if (todoToUpdate) {
        todoToUpdate.completedAt = todoToUpdate.completedAt ? null : new Date();
        return HttpResponse.json({ data: todoToUpdate });
      }

      return new HttpResponse(null, { status: 404 });
    }
  ),
  http.delete('http://localhost:3333/todos/:id', async ({ params }) => {
    const { id } = params;
    const indexToDelete = todos.findIndex((todo) => todo.id === id);

    if (indexToDelete !== -1) {
      todos.splice(indexToDelete, 1);
      return HttpResponse.json({});
    }

    return new HttpResponse(null, { status: 404 });
  }),
];

const meta: Meta<TodoComponent> = {
  title: 'Todo/Todos',
  component: TodoComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [SharedModule],
      declarations: [TodoItemComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<TodoComponent>;

const initialMockTodos: Todo[] = [
  {
    id: '1',
    userId: '1',
    title: 'Test Todo 1',
    completedAt: null,
    createdAt: new Date('2025-09-14T15:00:00Z'),
  },
  {
    id: '2',
    userId: '1',
    title: 'Test Todo 2',
    completedAt: new Date('2025-09-14T14:00:00Z'),
    createdAt: new Date('2025-09-14T14:00:00Z'),
  },
];

let mockTodos: Todo[] = [];

export const Default: Story = {
  decorators: [
    applicationConfig({
      providers: [
        provideHttpClient(),
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({ todos: [...initialMockTodos] }),
          },
        },
      ],
    }),
    (Story) => {
      console.log(initialMockTodos);
      mockTodos.splice(0, mockTodos.length);
      mockTodos.push(...initialMockTodos);

      return Story();
    },
  ],
  parameters: {
    msw: {
      handlers: [
        http.get<{}, {}, TodoListResponse>(
          'http://localhost:3333/todos',
          async () => {
            return HttpResponse.json({ data: mockTodos });
          }
        ),
        ...mutatingHandlers(mockTodos),
      ],
    },
  },
  args: {
    todos: mockTodos,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const todoListItems = canvas.getAllByRole('listitem');
    expect(todoListItems.length).toBe(2);

    const newTodoInput = canvas.getByPlaceholderText('Add a new task');
    const addTodoButton = canvas.getByRole('button', { name: /add todo/i });

    await userEvent.type(newTodoInput, 'Test Todo 3');
    await userEvent.click(addTodoButton);

    await waitFor(async () => {
      const updateTodoListItems = canvas.getAllByRole('listitem');
      expect(updateTodoListItems.length).toBe(3);
      expect(canvas.getByText('Test Todo 3')).toBeInTheDocument();
    });

    const currentTodoListItems = canvas.getAllByRole('listitem');

    const lastTodoCheckbox = within(currentTodoListItems[2]).getByRole(
      'checkbox'
    );
    await userEvent.click(lastTodoCheckbox);

    await waitFor(() => {
      expect(lastTodoCheckbox).toBeChecked();
    });

    const lastTodoDeleteButton = within(currentTodoListItems[2]).getByRole(
      'button',
      {
        name: /delete/i,
      }
    );
    await userEvent.click(lastTodoDeleteButton);

    await waitFor(() => {
      const finalTodoListItems = canvas.getAllByRole('listitem');
      expect(finalTodoListItems.length).toBe(2);
    });
  },
};

export const Empty: Story = {
  decorators: [
    applicationConfig({
      providers: [
        provideHttpClient(),
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({ todos: [] }),
          },
        },
      ],
    }),
  ],
  parameters: {
    msw: {
      handlers: [
        http.get<{}, {}, TodoListResponse>(
          'http://localhost:3333/todos',
          () => {
            return HttpResponse.json({ data: [] });
          }
        ),
        ...mutatingHandlers([]),
      ],
    },
  },
  args: {
    todos: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const emptyStateMessage = canvas.getByText('No tasks found');
    expect(emptyStateMessage).toBeInTheDocument();
  },
};

export const Loading: Story = {
  decorators: [
    applicationConfig({
      providers: [
        provideHttpClient(),
        {
          provide: ActivatedRoute,
          useValue: {
            data: new Observable(),
          },
        },
      ],
    }),
  ],
  parameters: {
    msw: {
      handlers: [
        http.get<{}, {}, TodoListResponse>(
          'http://localhost:3333/todos',
          async () => {
            await delay('infinite');
            return HttpResponse.json({ data: [] });
          }
        ),
        ...mutatingHandlers([]),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const newTodoInput = canvas.getByPlaceholderText('Add a new task');
    const addTodoButton = canvas.getByRole('button', { name: /add todo/i });

    await userEvent.type(newTodoInput, 'Test Todo 3');
    await userEvent.click(addTodoButton);

    await waitFor(() => {
      const loadingMessage = canvas.getByText('Loading todos...');
      expect(loadingMessage).toBeInTheDocument();
    });
  },
};
