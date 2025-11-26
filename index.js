import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js"; 
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import UserRoutes from "./Kambaz/Users/routes.js";

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
// 让 express-session 在 Render 这种代理后面工作
app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,        // 在 https 上必须设 true
      sameSite: "none",    // 允许跨站点发送 cookie（Vercel → Render）
    },
  })
);


app.use(express.json());

UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);


// 启动服务器
app.listen(process.env.PORT || 4000, () => {
  console.log("🔥 Server running at http://localhost:4000");
  console.log("🔥 Connected to MongoDB:", CONNECTION_STRING);
});
