import { Todo } from "./interfaces/Todos.ts"
import { autoInjectable } from "./deps.ts";

@autoInjectable()
export class ToDoRepository {
    todos: Todo[] = [
        {
          id: '1',
          todo: 'walk dog',
          isCompleted: true,
        },
        {
          id: '2',
          todo: 'eat food',
          isCompleted: false,
        },
      ];    
}

