import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app) {
  const dao = EnrollmentsDao();

  // 当前登录用户选课
  const enroll = async (req, res) => {
    const currentUser = req.session?.currentUser || null;
    if (!currentUser) {
      return res.sendStatus(401);
    }
    const { courseId } = req.params;
    const status = await dao.enrollUserInCourse(currentUser._id, courseId);
    res.json(status);
  };

  // 当前登录用户退课
  const unenroll = async (req, res) => {
    const currentUser = req.session?.currentUser || null;
    if (!currentUser) {
      return res.sendStatus(401);
    }
    const { courseId } = req.params;
    const status = await dao.unenrollUserFromCourse(currentUser._id, courseId);
    res.json(status);
  };

  // 当前登录用户 —— 选了哪些课（返回“课程列表”，不是 enrollment 列表）
  const myEnrollments = async (req, res) => {
    const currentUser = req.session?.currentUser || null;
    if (!currentUser) {
      return res.sendStatus(401);
    }
    const courses = await dao.findCoursesForUser(currentUser._id);
    res.json(courses);
  };

  // 某门课里的所有学生
  const usersInCourse = async (req, res) => {
    const { courseId } = req.params;
    const list = await dao.findUsersForCourse(courseId);
    res.json(list);
  };

  app.post("/api/courses/:courseId/enroll", enroll);
  app.post("/api/courses/:courseId/unenroll", unenroll);
  app.get("/api/enrollments/current", myEnrollments);
  app.get("/api/courses/:courseId/users", usersInCourse);
}
