import { Context, autoInjectable, container } from "./deps.ts";
import { ToDoRepository } from "./ToDoRepository.ts";
import { Todo } from "./interfaces/Todos.ts"

@autoInjectable()
export class ToDoService {
    todoRepository = new ToDoRepository();
    constructor() { }

      getAllTodos =  (): Todo[] => {
        return this.todoRepository.todos;
      }
    
      createTodo = (
        payload: any
      ) => {
        const value = payload
        if (!payload) {
          return "Something Went Wrong";
        }
    
        const newTodo: Todo = {
          id: (+(this.todoRepository.todos[this.todoRepository.todos.length - 1].id) + 1).toString(),
          todo: value.todo,
          isCompleted: false,
        };
        const data = [...this.todoRepository.todos, newTodo];
        this.todoRepository.todos = data;
        return data;
      }
    
      getTodoById = (id: string): Todo | string => {
        const todo: Todo | undefined = this.todoRepository.todos.find((t) => {
          return t.id === id;
        });
        if (!todo) {
          return "No To Do Found";
        }
        return todo;
      }

      updateTodoById = (id: any, payload: any) => {
        const todo: Todo | undefined = this.todoRepository.todos.find((t) => t.id === id);
        if (!todo) {
          return 'Something Went Wrong';
        }
        const updatedData: { todo?: string; isCompleted?: boolean } = payload;
        const newTodos = this.todoRepository.todos.map((t) => {
          return t.id === id ? { ...t, ...updatedData } : t;
        });
        
        return newTodos;
      }
    
      deleteTodoById = (id: string): Todo[] => {
        const allTodos = this.todoRepository.todos.filter((t) => t.id !== id);
        return allTodos;
      }
}