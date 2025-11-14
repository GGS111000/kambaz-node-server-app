import express from "express";
import "dotenv/config";
import cors from "cors";
import session from "express-session";

import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";

import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModulesRoutes from "./Kambaz/Modules/routes.js";

import db from "./Kambaz/Database/index.js";

const app = express();

/***********************
 * 1️⃣ CORS 最前面
 ***********************/
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "http://localhost:3000",
  })
);

/***********************
 * 2️⃣ Session
 ***********************/
app.use(
  session({
    secret: process.env.SESSION_SECRET || "kambaz-secret",
    resave: false,
    saveUninitialized: false,
  })
);

/***********************
 * 3️⃣ Body parser
 ***********************/
app.use(express.json());

/***********************
 * 4️⃣ All routes AFTER json
 ***********************/
Hello(app);
Lab5(app);
UserRoutes(app, db);
CourseRoutes(app, db);
ModulesRoutes(app, db);

/***********************
 * 5️⃣ Start server
 ***********************/
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
