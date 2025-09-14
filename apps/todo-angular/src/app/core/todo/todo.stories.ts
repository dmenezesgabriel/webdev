import {
  applicationConfig,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { http, HttpResponse, delay } from 'msw';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoComponent } from './todo.component';
import { provideHttpClient } from '@angular/common/http';
import { CardComponent } from '../../shared/card/card.component';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import type {
  Todo,
  TodoListResponse,
  TodoRequest,
  TodoResponse,
} from './todo.model';
import { TodoItemComponent } from './todo-item/todo-item.component';

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
      imports: [ReactiveFormsModule],
      declarations: [CardComponent, TodoItemComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<TodoComponent>;

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
  ],
  parameters: {
    msw: {
      handlers: [
        http.get<{}, {}, TodoListResponse>(
          'http://localhost:3333/todos',
          async () => {
            return HttpResponse.json({ data: initialMockTodos });
          }
        ),
        ...mutatingHandlers(initialMockTodos),
      ],
    },
  },
  args: {
    todos: [...initialMockTodos],
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
};
