import { autoInjectable, Context, container } from './deps.ts';
import { ToDoService } from './ToDo.service.ts';
import { router, GET,POST,PUT,DELETE} from './router.ts';

@autoInjectable()
@router("/todos")
export class TodoController {
    private todoService: ToDoService
    constructor () {
        this.todoService = container.resolve(ToDoService)
      }

  @GET("/") 
  getAllTodos(ctx: Context) {
    ctx.response.body = this.todoService.getAllTodos(ctx);
    return ctx
  }

  @GET("/:id") 
  getTodoById(ctx: any) {
    ctx.response.body = this.todoService.getTodoById(ctx.params.id);
  }

  @POST("/")
  createTodo(ctx: Context, payload: any) {
    ctx.response.body = this.todoService.createTodo(payload);
  }

  @PUT("/:id") 
  updateTodoById(ctx: any, payload: any) {
    ctx.response.body = this.todoService.updateTodoById(ctx.params.id, payload);
  }

  @DELETE("/:id") 
  deleteTodoById(ctx: any) {
    ctx.response.body = this.todoService.deleteTodoById(ctx.params.id);
  }
}