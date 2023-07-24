import { autoInjectable, Context, container } from './deps.ts';
import { ToDoService } from './ToDo.service.ts';
import { router, route } from './router.ts';

@autoInjectable()
@router("/todos")
export class TodoController {
    private todoService: ToDoService
    constructor () {
        this.todoService = container.resolve(ToDoService)
      }


  @route("GET", "/") 
  getAllTodos(ctx: Context) {
    ctx.response.body = this.todoService.getAllTodos(ctx);
    return ctx
  }

  @route("GET", "/:id") 
  getTodoById(ctx: any) {
    ctx.response.body = this.todoService.getTodoById(ctx.params.id);
  }

  @route("POST", "/")
  createTodo(ctx: Context, payload: any) {
    ctx.response.body = this.todoService.createTodo(payload);
  }

  @route("PUT", "/:id") 
  updateTodoById(ctx: any, payload: any) {
    console.log('put', payload)
    ctx.response.body = this.todoService.updateTodoById(ctx.params.id, payload);
  }

  @route("DELETE", "/:id") 
  deleteTodoById(ctx: any) {
    ctx.response.body = this.todoService.deleteTodoById(ctx.params.id);
  }
}