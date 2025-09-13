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
  data: { token: string };
}
