import { User } from "@/application/entities/user";
import { UserRepository } from "@/application/repositories/user-repository";

interface createUserUseCaseRequest {
  name: string;
  email: string;
}

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ name, email }: createUserUseCaseRequest) {
    const user = new User({ name, email });
    await this.userRepository.create(user);
    return user;
  }
}
