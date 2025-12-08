// C:\Users\cuixj\2025\fall\webdev\kambaz-node-server-app\Kambaz\Users\routes.js
import UsersDao from "./dao.js";

export default function UserRoutes(app) {
  const dao = UsersDao();

  // 登录
  const signin = async (req, res) => {

    const { username, password } = req.body;

    const user = await dao.findUserByCredentials(username, password);
    console.log(user);
    console.log("request", req.body);
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
    } else {
      req.session.currentUser = user;
      res.json(user);
    }
  };

  // 注册
  const signup = async (req, res) => {
    const exists = await dao.findUserByUsername(req.body.username);
    if (exists) {
      return res.status(400).json({ message: "Username exists" });
    }
    const newUser = await dao.createUser(req.body);
    req.session.currentUser = newUser;
    res.json(newUser);
  };

  // 读取当前登录用户（给前端 Navigation / Profile 用）
  const profile = async (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) {
      return res.sendStatus(401); // 没登录
    }
    // 也可以从数据库再查一遍，保证是最新数据
    const freshUser = await dao.findUserById(currentUser._id);
    res.json(freshUser || currentUser);
  };

  // 更新当前用户（Profile 页面点 Update）
  const updateProfile = async (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) {
      return res.sendStatus(401);
    }
    await dao.updateUser(currentUser._id, req.body);
    const updated = await dao.findUserById(currentUser._id);
    req.session.currentUser = updated;
    res.json(updated);
  };

  // 登出
  const signout = (req, res) => {
    req.session.destroy(() => {
      res.sendStatus(200);
    });
  };

  // 获取全部用户（Users 页面用）
  const findAllUsers = async (req, res) => {
      const { role, name } = req.query;
    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return;
    }
    if (name) {
    const users = await dao.findUsersByPartialName(name);
    res.json(users);
    return;
  }
    const users = await dao.findAllUsers();
    res.json(users);
  };

  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };
   const deleteUser = async (req, res) => {
      const status = await dao.deleteUser(req.params.userId);
      res.json(status);
  };

// const updateUser = async (req, res) => {
//     const { userId } = req.params;
//     const userUpdates = req.body;

//     await dao.updateUser(userId, userUpdates);
//     const currentUser = req.session["currentUser"];
//    if (currentUser && currentUser._id === userId) {
//      req.session["currentUser"] = { ...currentUser, ...userUpdates };
//    }
//     res.json(currentUser);
//   };
const updateUser = async (req, res) => {
  const { userId } = req.params;
  const updates = req.body;

  // 1. Update DB
  await dao.updateUser(userId, updates);

  // 2. Get fresh version
  const updated = await dao.findUserById(userId);

  // 3. Merge with session if needed (保留你之前的修复)
  if (req.session.currentUser && req.session.currentUser._id === userId) {
    req.session.currentUser = { ...req.session.currentUser, ...updates };
  }

  // 4. Send updated data
  res.json(updated);
};


const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };

  // 路由绑定
  app.post("/api/users/signin", signin);
  app.post("/api/users/signup", signup);
  app.post("/api/users/profile", profile);   // ✅ 对应前端 client.profile()
  //app.put("/api/users/profile", updateProfile); // ✅ 对应前端 updateUser()
  app.post("/api/users/signout", signout);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.delete("/api/users/:userId", deleteUser);
  app.put("/api/users/:userId", updateUser);
  app.post("/api/users", createUser);
}
