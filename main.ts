import "npm:reflect-metadata"
import { Application, container } from './src/deps.ts';
import { TodoController } from "./src/ToDo.controller.ts";
import { ToDoService } from "./src/ToDo.service.ts";

const app = new Application();
const port: number = 8000;

// Register the dependencies with the container
container.register("ToDoService", {useValue: ToDoService});
container.register<TodoController>("TodoController", {useClass: TodoController});

// Resolve the controller instance from the container
const todoController = container.resolve(TodoController);

app.use(todoController.router.routes())
app.use(todoController.router.allowedMethods());

await app.listen({ port });