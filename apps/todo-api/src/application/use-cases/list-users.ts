import { UserRepository } from "../repositories/user-repository";

export class ListUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute() {
    const users = await this.userRepository.findAll();

    return { users };
  }
}
