import type { User } from "@/application/entities/user";

export class UserHTTPPresenter {
  static present(user: User) {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }
}
