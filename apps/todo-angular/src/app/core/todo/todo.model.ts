export interface Todo {
  id: string;
  userId: string;
  title: string;
  completedAt: Date;
  createdAt: Date;
}

export interface TodoListResponse {
  data: Todo[];
}

export interface TodoResponse {
  data: Todo;
}
