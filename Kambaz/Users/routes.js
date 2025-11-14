import UsersDao from "./dao.js";

export default function UserRoutes(app, db) {
  const dao = UsersDao(db);

  // SIGN UP
  app.post("/api/users/signup", (req, res) => {
    const existing = dao.findUserByUsername(req.body.username);
    if (existing) {
      res.status(400).json({ message: "Username already taken" });
      return;
    }
    const newUser = dao.createUser(req.body);
    req.session.currentUser = newUser;   // ✅ store into session
    res.json(newUser);
  });

  // SIGN IN
  app.post("/api/users/signin", (req, res) => {
    const { username, password } = req.body;
    const user = dao.findUserByCredentials(username, password);

    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    req.session.currentUser = user;      // ✅ store into session
    res.json(user);
  });

  // PROFILE
  app.post("/api/users/profile", (req, res) => {
    const currentUser = req.session.currentUser;   // ✅ load from session

    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  });

  // SIGN OUT
  app.post("/api/users/signout", (req, res) => {
    req.session.destroy();      // ✅ clear session
    res.sendStatus(200);
  });

  // CRUD operations -----

  app.post("/api/users", (req, res) => {
    const newUser = dao.createUser(req.body);
    res.json(newUser);
  });

  app.get("/api/users", (req, res) => {
    res.json(dao.findAllUsers());
  });

  app.get("/api/users/:userId", (req, res) => {
    res.json(dao.findUserById(req.params.userId));
  });

  app.put("/api/users/:userId", (req, res) => {
    const updatedUser = dao.updateUser(req.params.userId, req.body);

    // Keep session in sync
    req.session.currentUser = updatedUser;

    res.json(updatedUser);
  });

  app.delete("/api/users/:userId", (req, res) => {
    dao.deleteUser(req.params.userId);
    res.sendStatus(200);
  });
}
