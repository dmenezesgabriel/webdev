import { Todo } from "@/application/entities/todo";
import { TodoRepository } from "@/application/repositories/todo-repository";
import { UserRepository } from "@/application/repositories/user-repository";

export interface CreateTodoUseCaseRequest {
  title: string;
  userId: string;
}

export class CreateTodoUseCase {
  constructor(
    private readonly todoRepository: TodoRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute({ title, userId }: CreateTodoUseCaseRequest) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error("User not found");

    const todo = new Todo({ title, userId });
    await this.todoRepository.create(todo);
    return { todo };
  }
}
