import { TodoRepository } from "../repositories/todo-repository";

export interface ToggleTodoCompletionUseCaseRequest {
  userId: string;
  todoId: string;
}

export class ToggleTodoCompletionUseCase {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute({ userId, todoId }: ToggleTodoCompletionUseCaseRequest) {
    const todo = await this.todoRepository.findById(userId, todoId);

    if (!todo) {
      throw new Error("Todo not found.");
    }

    todo.toggleComplete();

    const updatedTodo = await this.todoRepository.update(todo);

    return { todo: updatedTodo };
  }
}
