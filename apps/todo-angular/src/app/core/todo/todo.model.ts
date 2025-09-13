export interface Todo {
  id: string;
  userId: string;
  title: string;
  completedAt: Date | null;
  createdAt: Date | undefined;
}

export interface TodoListResponse {
  data: Todo[];
}

export interface TodoResponse {
  data: Todo;
}
