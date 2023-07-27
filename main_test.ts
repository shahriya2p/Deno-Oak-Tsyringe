import "npm:reflect-metadata"
import { testing,Context,Middleware} from "./src/deps.ts";
import { ToDoService } from "./src/ToDo.service.ts";
import { assertEquals } from "https://deno.land/std@0.195.0/testing/asserts.ts";

const id="1";
const createTodoPayload={id: '3',todo: 'walk do1',isCompleted: true};
const updateTodoPayload={ todo: 'walk' }


const getAllTodosRes = [
  {id: '1',todo: 'walk dog',isCompleted: true,},
  {id: '2',todo: 'eat food',isCompleted: false,}, 
]

const getTodoByIdRes = {id: '1',todo: 'walk dog',isCompleted: true,}

const createdTodoRes = [
  { id: "1", todo: "walk dog", isCompleted: true },
  { id: "2", todo: "eat food", isCompleted: false },
  { id: "3", todo: "walk do1", isCompleted: false }
]

const updateTodoByIdRes = [
  { id: "1", todo: "walk", isCompleted: true },
  {id: "2",todo: "eat food",isCompleted: false},
]

const deleteTodoByIdRes =[
  {id: "2",todo: "eat food",isCompleted: false},
]

const mw: Middleware = async (ctx: Context, next) => {
  const todoService=new ToDoService();
  switch (ctx.request.url.pathname) {
    case "/getAllTodos":
      ctx.response.body = todoService.getAllTodos();
      break;
    case "/getTodoById":
      ctx.response.body = todoService.getTodoById(id);
      break;
    case "/createTodo":
      ctx.response.body = todoService.createTodo(createTodoPayload);
      break;
    case "/updateTodoById":
      ctx.response.body = todoService.updateTodoById(id, updateTodoPayload);
      break;
    case "/deleteTodoById":
      ctx.response.body = todoService.deleteTodoById(id);
      break;
    default:
      ctx.response.body = "path not found"
    }
    await next();
};

Deno.test({
  name: "Get All Todos",
  async fn() {
    const ctx = testing.createMockContext({
      path: "/getAllTodos",
    });
    const next = testing.createMockNext();
    await mw(ctx, next);
    assertEquals(ctx.response.body,getAllTodosRes);
  },
});

Deno.test({
  name: "Get Todo By Id",
  async fn() {
    const ctx = testing.createMockContext({
      path: "/getTodoById",
    });
    const next = testing.createMockNext();
    await mw(ctx, next);
    assertEquals(ctx.response.body,getTodoByIdRes);
  },
});

Deno.test({
  name: "Create Todo",
  async fn() {
    const ctx = testing.createMockContext({
      path: "/createTodo",
    });
    const next = testing.createMockNext();
    await mw(ctx, next);
    assertEquals(ctx.response.body,createdTodoRes);
  },
});

Deno.test({
  name: "Update Todo By Id",
  async fn() {
    const ctx = testing.createMockContext({
      path: "/updateTodoById",
    });
    const next = testing.createMockNext();
    await mw(ctx, next);
    assertEquals(ctx.response.body,updateTodoByIdRes);
  },
});

Deno.test({
  name: "Delete Todo By Id",
  async fn() {
    const ctx = testing.createMockContext({
      path: "/deleteTodoById",
    });
    const next = testing.createMockNext();
    await mw(ctx, next);
    assertEquals(ctx.response.body,deleteTodoByIdRes);
  },
});