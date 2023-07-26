import { assert,assertEquals } from "https://deno.land/std@0.195.0/testing/asserts.ts";
import "npm:reflect-metadata"
import { ToDoService } from "./src/ToDo.service.ts";
import { Todo } from "./src/interfaces/Todos.ts";
const todoService = new ToDoService(/* Dependencies here */);

const allTodos = [
  {
    id: '1',
    todo: 'walk dog',
    isCompleted: true,
  },
  {
    id: '2',
    todo: 'eat food',
    isCompleted: false,
  },
];
// ToDo Sample Test Data for POST Request
const newToDoPayload = {
  todo: 'New Task 1'
}
// Test data for todo item
const todoData: Todo = {
  id: "3",
  todo: "New Task 1",
  isCompleted: false,
};

// ToDo Sample Test Data for PUT Request
const updatedTodoPayload = {
  todo: 'Updated Task 1',
  isCompleted: true
}
const updatedTodoData: Todo | string = {
  id: "1",
  todo: "Updated Task 1",
  isCompleted: true,
};

const errorMsg = 'Something Went Wrong'
// Create a test suite for TodoService
// Deno.test("TodoService CRUD Operations", () => {
//   // Initialize the TodoService and any dependencies using tsyringe


//   Deno.test("Get All Todo", () => {
//     const todos = todoService.getAllTodos();
//     assertEquals(allTodos, todos)
//   })
//   // Test Create Todo
//   Deno.test("Create Todo", async () => {
//     const createdTodo = await todoService.createTodo(newToDoPayload);
//     if(typeof createdTodo != "string") {
//       assertEquals(createdTodo, [...allTodos,todoData]);
//     }
//   });

//   // Test Read Todo
//   Deno.test("Read Todo", async () => {
//     const todo = await todoService.getTodoById("1");
//     console.log('Read Todo with given id: ', todo);
//     assertEquals(todo, todoData);
//   });

//   // Test Update Todo
//   Deno.test("Update Todo", async () => {
//     const updatedTodo = await todoService.updateTodoById("1", updatedTodoPayload);
//     if(typeof updatedTodoData != "string") {
//       assertEquals(updatedTodo, allTodos.map(todo => {
//         if(todo.id == "1") {
//           todo = { ...todo, ...updatedTodoPayload}
//         }
//         return todo
//       }));
//     }
//   });

//   // Test Delete Todo
//   Deno.test("Delete Todo", async () => {
//     await todoService.deleteTodoById("1");
//     const deletedTodo = await todoService.getTodoById("1");
//     console.log('Deleted Todo', deletedTodo)
//     assertEquals(deletedTodo, null);
//   });
// });


Deno.test("Get All Todo", () => {
  const todos = todoService.getAllTodos();
  assertEquals(allTodos, todos)
})


// Test Update Todo
Deno.test("Update Todo", async () => {
  const updatedTodo = await todoService.updateTodoById("1", updatedTodoPayload);
  if(typeof updatedTodoData != "string") {
    assertEquals(updatedTodo, allTodos.map(todo => {
      if(todo.id == "1") {
        todo = { ...todo, ...updatedTodoPayload}
      }
      return todo
    }));
  }
});

// Test Create Todo
Deno.test("Create Todo", async () => {
  const createdTodo = await todoService.createTodo(newToDoPayload);
  if(typeof createdTodo != "string") {
    console.log('created',createdTodo)
    console.log('actual', [...allTodos, todoData])
    assertEquals([...allTodos,todoData],createdTodo);
  }
});


// Test Read Todo
Deno.test("Read Todo", async () => {
  const todo = await todoService.getTodoById("1");
  console.log('Read Todo with given id: ', todo);
  assertEquals(todo, allTodos[0]);
});



// // Test Delete Todo
Deno.test("Delete Todo", async () => {
  await todoService.deleteTodoById("1");
  const deletedTodo = await todoService.getTodoById("1");
  console.log('Deleted Todo', deletedTodo)
  assertEquals(deletedTodo, allTodos[0]);
});