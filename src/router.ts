import { Router, Context } from "./deps.ts";

type HttpMethod = "get" | "post" | "put" | "delete";
type MethodDecorator = (
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<any>
) => TypedPropertyDescriptor<any> | void;
export interface RouteType {
  method: HttpMethod;
  path: string;
}

export function Controller(baseRoute: string) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    const router = new Router<Context>();
    const instance = new constructor() as T & { [key: string]: any };
    const prototype = Object.getPrototypeOf(instance);

    for (const propertyKey of Object.getOwnPropertyNames(prototype)) {
      const route = Reflect.getMetadata("route", prototype, propertyKey);
      if (route) {
        const { method, path }: RouteType = route;
        const handler = (instance[propertyKey as keyof T] as Function).bind(instance);
        router[method](baseRoute + path, handler);
      }
    }
    Reflect.defineMetadata("router", router, constructor);
    constructor.prototype.router = router;
  };
}
export function GET(path: string): MethodDecorator {
  return function (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
    Reflect.defineMetadata("route", { method: "get", path }, target, propertyKey);
  };
}

export function POST(path: string): MethodDecorator {
  return function (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
    Reflect.defineMetadata("route", { method: "post", path }, target, propertyKey);
  };
}

export function PUT(path: string): MethodDecorator {
  return function (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
    Reflect.defineMetadata("route", { method: "put", path }, target, propertyKey);
  };
}

export function DELETE(path: string): MethodDecorator {
  return function (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
    Reflect.defineMetadata("route", { method: "delete", path }, target, propertyKey);
  };
}
