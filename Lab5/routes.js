// path: C:\Users\cuixj\2025\fall\webdev\kambaz-node-server-app\Lab5\routes.js

// ====== 一些“持久化”的内存数据，server 不重启就会一直在内存里 ======
const assignment = {
  id: 1,
  title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10",
  completed: false,
  score: 0,
};

let moduleObj = {
  id: "cs5610-lab5",
  name: "Lab 5 Module",
  description: "Practice HTTP server integration",
  course: "CS5610",
};

let todos = [
  { id: 1, title: "Task 1", description: "First task", completed: false },
  { id: 2, title: "Task 2", description: "Second task", completed: true },
  { id: 3, title: "Task 3", description: "Third task", completed: false },
  { id: 4, title: "Task 4", description: "Fourth task", completed: true },
];

export default function Lab5Routes(app) {
  // ================= 5.2 Welcome =================
  app.get("/lab5/welcome", (req, res) => {
    res.send("Welcome to Lab 5");
  });

  // ============= 5.2.2.1 Path Parameters ==========
  const add = (req, res) => {
    const { a, b } = req.params;
    const sum = parseInt(a) + parseInt(b);
    res.send(sum.toString());
  };
  const subtract = (req, res) => {
    const { a, b } = req.params;
    const diff = parseInt(a) - parseInt(b);
    res.send(diff.toString());
  };
  const multiply = (req, res) => {
    const { a, b } = req.params;
    const prod = parseInt(a) * parseInt(b);
    res.send(prod.toString());
  };
  const divide = (req, res) => {
    const { a, b } = req.params;
    const divisor = parseInt(b);
    if (divisor === 0) {
      return res.status(400).send("Division by zero");
    }
    const result = parseInt(a) / divisor;
    res.send(result.toString());
  };

  app.get("/lab5/add/:a/:b", add);
  app.get("/lab5/subtract/:a/:b", subtract);
  app.get("/lab5/multiply/:a/:b", multiply);
  app.get("/lab5/divide/:a/:b", divide);

  // ============= 5.2.2.2 Query Parameters ==========
  const calculator = (req, res) => {
    const { a, b, operation } = req.query;
    const x = parseInt(a);
    const y = parseInt(b);

    if (Number.isNaN(x) || Number.isNaN(y)) {
      return res.status(400).send("Parameters a and b must be numbers");
    }

    let result;
    switch (operation) {
      case "add":
        result = x + y;
        break;
      case "subtract":
        result = x - y;
        break;
      case "multiply":
        result = x * y;
        break;
      case "divide":
        if (y === 0) {
          return res.status(400).send("Division by zero");
        }
        result = x / y;
        break;
      default:
        result = "Invalid operation";
    }
    res.send(result.toString());
  };

  app.get("/lab5/calculator", calculator);

  // ============= 5.2.3 Working With Objects ==========
  const getAssignment = (req, res) => {
    res.json(assignment);
  };
  const getAssignmentTitle = (req, res) => {
    res.json(assignment.title);
  };
  const setAssignmentTitle = (req, res) => {
    const { newTitle } = req.params;
    assignment.title = newTitle;
    res.json(assignment);
  };

  app.get("/lab5/assignment", getAssignment);
  app.get("/lab5/assignment/title", getAssignmentTitle);
  app.get("/lab5/assignment/title/:newTitle", setAssignmentTitle);

  // 模块对象的一些路由（On your own 部分）
  const getModule = (req, res) => {
    res.json(moduleObj);
  };
  const getModuleName = (req, res) => {
    res.json(moduleObj.name);
  };
  const setModuleName = (req, res) => {
    const { newName } = req.params;
    moduleObj.name = newName;
    res.json(moduleObj);
  };

  app.get("/lab5/module", getModule);
  app.get("/lab5/module/name", getModuleName);
  app.get("/lab5/module/name/:newName", setModuleName);

  // ============= 5.2.4 Working With Arrays ==========
  const getTodos = (req, res) => {
    const { completed } = req.query;
    if (completed !== undefined) {
      const completedBool = completed === "true";
      const completedTodos = todos.filter(
        (t) => t.completed === completedBool
      );
      res.json(completedTodos);
      return;
    }
    res.json(todos);
  };

  const getTodoById = (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    res.json(todo);
  };

  const createNewTodo = (req, res) => {
    const newTodo = {
      id: new Date().getTime(),
      title: "New Task",
      description: "New Task Description",
      completed: false,
    };
    todos.push(newTodo);
    res.json(todos);
  };

  const removeTodo = (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex((t) => t.id === parseInt(id));
    if (index !== -1) {
      todos.splice(index, 1);
    }
    res.json(todos);
  };

  const updateTodoTitle = (req, res) => {
    const { id, title } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) {
      todo.title = title;
    }
    res.json(todos);
  };

  const updateTodoCompleted = (req, res) => {
    const { id, completed } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) {
      todo.completed = completed === "true";
    }
    res.json(todos);
  };

  const updateTodoDescription = (req, res) => {
    const { id, description } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) {
      todo.description = description;
    }
    res.json(todos);
  };

  // POST 新增 todo（5.2.6.1）
  const postNewTodo = (req, res) => {
    const newTodo = { ...req.body, id: new Date().getTime() };
    todos.push(newTodo);
    res.json(newTodo);
  };

  // DELETE 删除 todo（5.2.6.2）
  const deleteTodo = (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex((t) => t.id === parseInt(id));
    if (index === -1) {
      return res
        .status(404)
        .json({ message: `Unable to delete Todo with ID ${id}` });
    }
    todos.splice(index, 1);
    res.sendStatus(200);
  };

  // PUT 更新 todo（5.2.6.3）
  const putUpdateTodo = (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex((t) => t.id === parseInt(id));
    if (index === -1) {
      return res
        .status(404)
        .json({ message: `Unable to update Todo with ID ${id}` });
    }
    todos = todos.map((t) =>
      t.id === parseInt(id) ? { ...t, ...req.body } : t
    );
    res.sendStatus(200);
  };

  // 路由顺序很重要，注意 create 要在 :id 前面
  app.get("/lab5/todos", getTodos);
  app.get("/lab5/todos/create", createNewTodo);
  app.get("/lab5/todos/:id/delete", removeTodo);
  app.get("/lab5/todos/:id", getTodoById);
  app.get("/lab5/todos/:id/title/:title", updateTodoTitle);
  app.get("/lab5/todos/:id/completed/:completed", updateTodoCompleted);
  app.get("/lab5/todos/:id/description/:description", updateTodoDescription);

  app.post("/lab5/todos", postNewTodo);
  app.delete("/lab5/todos/:id", deleteTodo);
  app.put("/lab5/todos/:id", putUpdateTodo);
}
