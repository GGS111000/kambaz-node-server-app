// let todos = [
//   { id: 1, title: "Task 1", completed: false },
//   { id: 2, title: "Task 2", completed: true },
//   { id: 3, title: "Task 3", completed: false },
//   { id: 4, title: "Task 4", completed: true },
// ];

// export default function WorkingWithArrays(app) {

//   // Retrieve arrays (with optional filtering)
//   const getTodos = (req, res) => {
//     const { completed } = req.query;
//     if (completed !== undefined) {
//       const completedBool = completed === "true";
//       const completedTodos = todos.filter((t) => t.completed === completedBool);
//       res.json(completedTodos);
//       return;
//     }
//     res.json(todos);
//   };

//   // Retrieve by ID
//   const getTodoById = (req, res) => {
//     const { id } = req.params;
//     const todo = todos.find((t) => t.id === parseInt(id));
//     res.json(todo);
//   };

//   // Create (GET version for old labs)
//   const createNewTodo = (req, res) => {
//     const newTodo = {
//       id: new Date().getTime(),
//       title: "New Task",
//       completed: false,
//     };
//     todos.push(newTodo);
//     res.json(todos);
//   };

//   // Create using POST (JSON body)
//   const postNewTodo = (req, res) => {
//     const newTodo = { ...req.body, id: new Date().getTime() };
//     todos.push(newTodo);
//     res.json(newTodo);
//   };

//   // Delete old style
//   const removeTodo = (req, res) => {
//     const { id } = req.params;
//     const idx = todos.findIndex((t) => t.id === parseInt(id));
//     todos.splice(idx, 1);
//     res.json(todos);
//   };

//   // DELETE version (error handling)
//   const deleteTodo = (req, res) => {
//     const { id } = req.params;
//     const idx = todos.findIndex((t) => t.id === parseInt(id));
//     if (idx === -1) {
//       res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
//       return;
//     }
//     todos.splice(idx, 1);
//     res.sendStatus(200);
//   };

//   // Update (PUT)
//   const updateTodo = (req, res) => {
//     const { id } = req.params;
//     const idx = todos.findIndex((t) => t.id === parseInt(id));
//     if (idx === -1) {
//       res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
//       return;
//     }
//     todos = todos.map((t) =>
//       t.id === parseInt(id) ? { ...t, ...req.body } : t
//     );
//     res.sendStatus(200);
//   };

//   // Routes
//   app.get("/lab5/todos", getTodos);
//   app.get("/lab5/todos/create", createNewTodo);
//   app.post("/lab5/todos", postNewTodo);
//   app.get("/lab5/todos/:id/delete", removeTodo);
//   app.delete("/lab5/todos/:id", deleteTodo);
//   app.get("/lab5/todos/:id", getTodoById);
//   app.put("/lab5/todos/:id", updateTodo);
// }
let todos = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: true },
  { id: 3, title: "Task 3", completed: false },
  { id: 4, title: "Task 4", completed: true },
];

export default function WorkingWithArrays(app) {
  // GET all todos
  app.get("/lab5/todos", (req, res) => {
    const { completed } = req.query;
    if (completed !== undefined) {
      const flag = completed === "true";
      return res.json(todos.filter(t => t.completed === flag));
    }
    res.json(todos);
  });

  // GET todo by ID
  app.get("/lab5/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
    res.json(todo);
  });
}
