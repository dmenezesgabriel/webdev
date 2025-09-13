export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthTokenResponse {
  data: { token: string };
}
