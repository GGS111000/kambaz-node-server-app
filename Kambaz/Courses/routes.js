import CoursesDao from "./dao.js";
import EnrollmentsDao from "../Enrollments/dao.js";

export default function CourseRoutes(app) {
  const dao = CoursesDao();
  const enrollmentsDao = EnrollmentsDao();

  // GET all courses
  const findAllCourses = async (req, res) => {
    const courses = await dao.findAllCourses();
    res.json(courses);
  };

  // GET courses for enrolled user （/api/users/current/courses）
  const findCoursesForEnrolledUser = async (req, res) => {
    let { userId } = req.params;

    if (userId === "current") {
      const currentUser = req.session.currentUser;
      if (!currentUser) return res.sendStatus(401);
      userId = currentUser._id;
    }

    const courses = await enrollmentsDao.findCoursesForUser(userId);
    res.json(courses);
  };

  // POST: Create Course, 并自动把创建者 enroll
  const createCourse = async (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) return res.sendStatus(401);

    const newCourse = await dao.createCourse(req.body);
    await enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);

    res.json(newCourse);
  };

  // DELETE: Remove Course（连同所有 enrollments）
  const deleteCourse = async (req, res) => {
    const { courseId } = req.params;

    await enrollmentsDao.unenrollAllUsersFromCourse(courseId);
    const status = await dao.deleteCourse(courseId);

    res.json(status);
  };

  // PUT: Update Course —— 关键 bug 修复点
  const updateCourse = async (req, res) => {
    const { courseId } = req.params;
    await dao.updateCourse(courseId, req.body);
    const full = await dao.findCourseById(courseId);  // ✅ 不再直接用 model
    res.json(full);
  };

  // （可选）老版本的 enroll API，如果你 Dashboard 还在用，可以保留
  const enrollUserInCourse = async (req, res) => {
    let { uid, cid } = req.params;

    if (uid === "current") {
      const currentUser = req.session.currentUser;
      if (!currentUser) return res.sendStatus(401);
      uid = currentUser._id;
    }

    const status = await enrollmentsDao.enrollUserInCourse(uid, cid);
    res.json(status);
  };

  const unenrollUserFromCourse = async (req, res) => {
    let { uid, cid } = req.params;

    if (uid === "current") {
      const currentUser = req.session.currentUser;
      if (!currentUser) return res.sendStatus(401);
      uid = currentUser._id;
    }

    const status = await enrollmentsDao.unenrollUserFromCourse(uid, cid);
    res.json(status);
  };

  // -------- ROUTE BINDINGS --------
  app.get("/api/courses", findAllCourses);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.post("/api/courses", createCourse);
  app.put("/api/courses/:courseId", updateCourse);
  app.delete("/api/courses/:courseId", deleteCourse);

  // 老接口，先保留，等前端切到 /api/courses/:courseId/enroll 后可以删
  app.post("/api/users/:uid/courses/:cid", enrollUserInCourse);
  app.delete("/api/users/:uid/courses/:cid", unenrollUserFromCourse);
}
