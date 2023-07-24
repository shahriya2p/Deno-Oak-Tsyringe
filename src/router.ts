import {  Router, Context } from "./deps.ts";

type RouteData = {
  path: string;
  method: string;
};

export function route(method: string, path: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    Reflect.defineMetadata("route", { method, path }, descriptor.value);
    return descriptor;
  };
}


export function router(basePath: string) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    const router = new Router({  prefix: basePath });
    const methods = Object.getOwnPropertyNames(constructor.prototype);
    for (const methodName of methods) {
      const method = constructor.prototype[methodName];
      if (typeof method === "function" && Reflect.hasMetadata("route", method)) {
        const routeData = Reflect.getMetadata("route", method) as RouteData;
        switch (routeData.method) {
          case "GET":
            router.get(routeData.path, async (ctx: Context) => {
              const instance = new constructor();
              await method.call(instance, ctx);
            });
            break;
          case "POST":
            router.post(routeData.path, async (ctx: Context) => {
              const instance = new constructor();
              // Read the request body as JSON and store it in the `payload` variable
              const payload = await ctx.request.body({ type: "json" }).value;
              await method.call(instance, ctx, payload);
            });
            break;
          case "PUT":
            router.put(routeData.path, async (ctx: Context) => {
              const instance = new constructor();
              // Read the request body as JSON and store it in the `payload` variable
              const payload = await ctx.request.body({ type: "json" }).value;
              await method.call(instance, ctx, payload);
            });
            break;
          case "DELETE":
            router.delete(routeData.path, async (ctx: Context) => {
              const instance = new constructor();
              await method.call(instance, ctx);
            });
            break;
          default:
            throw new Error(`Unsupported HTTP method: ${routeData.method}`);
        }
      }
    }
    Reflect.defineMetadata("router", router, constructor);
  }
}