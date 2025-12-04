import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";

import AssignmentRoutes from "./Kambaz/Assignments/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import EnrollmentsRoutes from "./Kambaz/Enrollments/routes.js";

// ------------------------------
// 1. CONNECT TO MONGODB
// ------------------------------
const CONNECTION_STRING =
  process.env.DATABASE_CONNECTION_STRING ||
  "mongodb://127.0.0.1:27017/kambaz";

mongoose.connect(CONNECTION_STRING);

// ------------------------------
// 2. INIT EXPRESS
// ------------------------------
const app = express();

// ------------------------------
// 3. CORS (MOST IMPORTANT PART)
// ------------------------------
/**
 * 必须指定 FRONTEND_URL，否则浏览器不接受 cookie
 * FRONTEND_URL 例子：
 *   https://kambaz-next-js-xxxxx.vercel.app
 */
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // ⭐ 必须设为你的前端部署 URL
    //origin: true, 
    credentials: true,
  })
);

// ------------------------------
// 4. SESSION CONFIG (SUPER IMPORTANT)
// ------------------------------
/**
 * Render 在 HTTPS 代理后，因此需要 trust proxy
 * 而 Vercel->Render 跨域必须设置 secure + sameSite:none
 */
app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,        // ⭐ 部署必须 true
      sameSite: "none",    // ⭐ 跨站点 cookie 关键设置
      httpOnly: true,
      maxAge: 1000 * 60 * 60,  // 1 hour
    },
  })
);

// ------------------------------
// 5. BODY PARSER
// ------------------------------
app.use(express.json());

// ------------------------------
// 6. ROUTES
// ------------------------------
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentsRoutes(app);
// ------------------------------
// 7. START SERVER
// ------------------------------
app.listen(process.env.PORT || 4000, () => {
  console.log("🔥 Server running");
  console.log("🔥 Frontend URL:", process.env.FRONTEND_URL);
  console.log("🔥 Connected to MongoDB:", CONNECTION_STRING);
});
