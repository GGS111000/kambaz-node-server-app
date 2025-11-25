import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
// 连接 MongoDB
const CONNECTION_STRING =
  process.env.DATABASE_CONNECTION_STRING ||
  "mongodb://127.0.0.1:27017/kambaz";
mongoose.connect(CONNECTION_STRING);
const app = express();
// 设 CORS
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// 设置 session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.json());

// 加载 Users 的路由
import UserRoutes from "./Kambaz/Users/routes.js";
UserRoutes(app);

import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js";

CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);




// 启动服务器
app.listen(process.env.PORT || 4000, () => {
  console.log("🔥 Server running at http://localhost:4000");
  console.log("🔥 Connected to MongoDB:", CONNECTION_STRING);
});
