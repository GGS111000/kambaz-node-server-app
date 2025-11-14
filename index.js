// index.js — Node 后端入口

import express from "express";
import "dotenv/config";
import cors from "cors";
import session from "express-session";

import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";

import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import db from "./Kambaz/Database/index.js";

// 1️⃣ 创建 app （必须第一步）
const app = express();

// 2️⃣ CORS（必须放最前面）
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "http://localhost:3000",
  })
);

// 3️⃣ Session 配置
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};

if (process.env.SERVER_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.SERVER_URL,
  };
}

app.use(session(sessionOptions));

// 4️⃣ Body parser
app.use(express.json());

// 5️⃣ 所有 routes（必须在 json 之后）
Hello(app);
Lab5(app);
UserRoutes(app, db);
CourseRoutes(app, db);

// 6️⃣ 启动服务
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
