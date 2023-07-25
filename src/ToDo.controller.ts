import { autoInjectable, Context, container } from './deps.ts';
import { ToDoService } from './ToDo.service.ts';
import {  Controller, GET, POST,PUT, DELETE } from './router.ts';

@autoInjectable()
@Controller("/todos")
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
  async createTodo(ctx: Context) {
    const body = await ctx.request.body();
    const value = await body.value;
    ctx.response.body = this.todoService.createTodo(value);
  }

  @PUT("/:id") 
  async updateTodoById(ctx: any) {
    const body = await ctx.request.body();
    const value = await body.value;
    ctx.response.body = this.todoService.updateTodoById(ctx.params.id, value);
  }

  @DELETE("/:id") 
  deleteTodoById(ctx: any) {
    ctx.response.body = this.todoService.deleteTodoById(ctx.params.id);
  }
}