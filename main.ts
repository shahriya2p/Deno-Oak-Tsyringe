import "npm:reflect-metadata"
import { Application} from './src/deps.ts';
import { TodoController } from "./src/ToDo.controller.ts";
const app = new Application();
const port: number = 8000;

const myRouter = Reflect.getMetadata("router", TodoController);

app.use(myRouter.routes());
app.use(myRouter.allowedMethods());

await app.listen({ port });