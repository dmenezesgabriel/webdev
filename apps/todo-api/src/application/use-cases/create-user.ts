import { hash } from "bcryptjs";

import { User } from "@/application/entities/user";
import { UserRepository } from "@/application/repositories/user-repository";

import { UserAlreadyExistsError } from "./error/user-already-exists-error";

interface createUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface createUserUseCaseResponse {
  user: User;
}

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({
    name,
    email,
    password,
  }: createUserUseCaseRequest): Promise<createUserUseCaseResponse> {
    const passwordHash = await hash(password, 6);

    const userWithSameEmail = await this.userRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = new User({ name, email, password: passwordHash });
    const newUser = await this.userRepository.create(user);

    return { user: newUser };
  }
}
