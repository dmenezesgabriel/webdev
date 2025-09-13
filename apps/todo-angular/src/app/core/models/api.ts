export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface NewUser {
  name: string;
  email: string;
  password: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface AuthTokenResponse {
  token: string;
}

export interface Todo {
  id: string;
  userId: string;
  title: string;
}

export interface TodoListResponse {
  data: Todo[];
}

export interface TodoResponse {
  data: Todo;
}
