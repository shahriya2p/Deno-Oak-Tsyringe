import { autoInjectable, inject } from "./deps.ts";
import { ToDoRepository } from "./ToDoRepository.ts";
import Todo from "./interfaces/Todos.ts"

@autoInjectable()
export class ToDoService {

    constructor(
      @inject(ToDoRepository) private todoRepository: ToDoRepository
      ) { }

      getAllTodos =  ({ response }: { response: any }) => {
        response.status = 200;
        response.body = {
          success: true,
          data: this.todoRepository.todos,
        };
      }
    
      createTodo = async (
        { request, response }: { request: any; response: any },
      ) => {
        const body = await request.body();
        console.log('req', await body.value)
        const value = await body.value
        if (!request.hasBody) {
          response.status = 400;
          response.body = {
            success: false,
            message: "No data provided",
          };
          return;
        }
    
        const newTodo: Todo = {
          id: (+(this.todoRepository.todos[this.todoRepository.todos.length - 1].id) + 1).toString(),
          todo: value.todo,
          isCompleted: false,
        };
        const data = [...this.todoRepository.todos, newTodo];
        this.todoRepository.todos = data;
        response.body = {
          success: true,
          data,
        };
      }
    
      getTodoById = (
        { params, response }: { params: { id: string }; response: any },
      ) => {
        const todo: Todo | undefined = this.todoRepository.todos.find((t) => {
          return t.id === params.id;
        });
        if (!todo) {
          response.status = 404;
          response.body = {
            success: false,
            message: "No todo found",
          };
          return;
        }
    
        response.status = 200;
        response.body = {
          success: true,
          data: todo,
        };
      }
    
      updateTodoById = async (
        { params, request, response }: {
          params: { id: string },
          request: any,
          response: any,
        },
      ) => {
        const todo: Todo | undefined = this.todoRepository.todos.find((t) => t.id === params.id);
        console.log(todo)
        if (!todo) {
          response.status = 404;
          response.body = {
            success: false,
            message: "No todo found",
          };
          return;
        }
    
        const body = await request.body();
        const updatedData: { todo?: string; isCompleted?: boolean } = await body.value;
        const newTodos = this.todoRepository.todos.map((t) => {
          return t.id === params.id ? { ...t, ...updatedData } : t;
        });
        response.status = 200;
        response.body = {
          success: true,
          data: newTodos,
        };
      }
    
      deleteTodoById = (
        { params, response }: { params: { id: string }; response: any },
      ) => {
        const allTodos = this.todoRepository.todos.filter((t) => t.id !== params.id);
    
        response.status = 200;
        response.body = {
          success: true,
          data: allTodos,
        };
      }
}