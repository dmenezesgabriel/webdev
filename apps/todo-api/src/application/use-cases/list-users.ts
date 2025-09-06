import { UserRepository } from "../repositories/user-repository";

export class ListUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute() {
    return this.userRepository.findAll();
  }
}
