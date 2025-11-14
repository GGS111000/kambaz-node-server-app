import CoursesDao from "./dao.js";
import EnrollmentsDao from "../Enrollments/dao.js";

export default function CourseRoutes(app, db) {
  const dao = CoursesDao(db);
  const enrollDao = EnrollmentsDao(db);

  // 1. 获取全部课程（测试用）
  const findAllCourses = (req, res) => {
    res.json(dao.findAllCourses());
  };

  // 2. 获取当前用户课程
  const findCoursesForEnrolledUser = (req, res) => {
    let { userId } = req.params;

    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }

    res.json(dao.findCoursesForEnrolledUser(userId));
  };

  // 3. 创建课程 + 自动 enroll
  const createCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) return res.sendStatus(401);

    const newCourse = dao.createCourse(req.body);
    enrollDao.enrollUserInCourse(currentUser._id, newCourse._id);

    res.json(newCourse);
  };

  // 4. 删除课程
  const deleteCourse = (req, res) => {
    const { courseId } = req.params;
    dao.deleteCourse(courseId);
    enrollDao.unenrollCourse(courseId);
    res.sendStatus(200);
  };

  // 5. 更新课程
  const updateCourse = (req, res) => {
    const { courseId } = req.params;
    const updated = dao.updateCourse(courseId, req.body);
    res.json(updated);
  };

  // ========== Routes ==========
  app.get("/api/courses", findAllCourses);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);

  app.post("/api/users/current/courses", createCourse);

  app.delete("/api/courses/:courseId", deleteCourse);
  app.put("/api/courses/:courseId", updateCourse);
}
