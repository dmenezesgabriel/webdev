import { TodoRepository } from "@/application/repositories/todo-repository";
import { UserRepository } from "@/application/repositories/user-repository";

export class ListTodosUseCase {
  constructor(
    private readonly todoRepository: TodoRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error("User not found");

    return { todos: await this.todoRepository.findAllByUser(userId) };
  }
}
