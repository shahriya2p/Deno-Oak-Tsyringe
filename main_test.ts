import "npm:reflect-metadata"
import { testing,Context,Middleware} from "./src/deps.ts";
import { assertEquals } from "https://deno.land/std@0.195.0/testing/asserts.ts";

const BASE_URL = "http://localhost:8000";

const id="1";
const createTodoPayload={todo: 'new todo'};
const updateTodoPayload={ todo: 'updated todo' }


const getAllTodosRes = [
  {id: '1',todo: 'walk dog',isCompleted: true,},
  {id: '2',todo: 'eat food',isCompleted: false,}, 
]

const getTodoByIdRes = {id: '1',todo: 'walk dog',isCompleted: true,}

const createdTodoRes = [
  { id: "1", todo: "walk dog", isCompleted: true },
  { id: "2", todo: "eat food", isCompleted: false },
  { id: "3", todo: "new todo", isCompleted: false }
]

const updateTodoByIdRes = [
  { id: "1", todo: "updated todo", isCompleted: true },
  {id: "2",todo: "eat food",isCompleted: false},
  { id: "3", todo: "new todo", isCompleted: false }
]

const deleteTodoByIdRes =[
  {id: "2",todo: "eat food",isCompleted: false},
  { id: "3", todo: "new todo", isCompleted: false }
]

const mw: Middleware = async (ctx: Context, next) => {
  switch (ctx.request.url.pathname) {
    case "/getAllTodos": {
      const allTodos = await fetch(`${BASE_URL}/todos/`);
      ctx.response.body = JSON.parse(await allTodos.text()); 
      break;
    }

    case "/getTodoById": {
      const todosById = await fetch(`${BASE_URL}/todos/${id}`);
      ctx.response.body = JSON.parse(await todosById.text());  
      break;
    }

    case "/createTodo": {
      const createTodo = await fetch(`${BASE_URL}/todos/`,{method: "POST",headers: {
        "Content-Type": "application/json",
      }, body:JSON.stringify(createTodoPayload)});
      ctx.response.body = JSON.parse(await createTodo.text());
      break;
    }

    case "/updateTodoById": {
      const updateTodoById = await fetch(`${BASE_URL}/todos/${id}`,{method: "PUT",headers: {
        "Content-Type": "application/json",
      }, body:JSON.stringify(updateTodoPayload)});
      ctx.response.body = JSON.parse(await updateTodoById.text());
      break;
    }

    case "/deleteTodoById": {
      const deleteTodoById = await fetch(`${BASE_URL}/todos/${id}`,{method: "DELETE"});
      ctx.response.body = JSON.parse(await deleteTodoById.text());
      break;
    }

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