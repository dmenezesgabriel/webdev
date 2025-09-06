import { TodoRepository } from "@/application/repositories/todo-repository";
import { UserRepository } from "@/application/repositories/user-repository";

export interface DeleteTodoUseCaseRequest {
  userId: string;
  todoId: string;
}

export class DeleteTodoUseCase {
  constructor(
    private readonly todoRepository: TodoRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute({ userId, todoId }: DeleteTodoUseCaseRequest) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error("User not found");

    await this.todoRepository.delete(userId, todoId);
  }
}
