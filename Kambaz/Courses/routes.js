import CoursesDao from "./dao.js";
import EnrollmentsDao from "../Enrollments/dao.js";

export default function CourseRoutes(app) {
  const dao = CoursesDao();              // 不需要 db
  const enrollmentsDao = EnrollmentsDao(); // 也不需要 db

  /** GET all courses */
  const findAllCourses = async (req, res) => {
    const courses = await dao.findAllCourses();
    res.json(courses);
  };

  /** GET courses for enrolled user */
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

  /** POST: Create Course */
  const createCourse = async (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) return res.sendStatus(401);

    // Create new course
    const newCourse = await dao.createCourse(req.body);

    // Automatically enroll creator
    await enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);

    res.json(newCourse);
  };

  /** DELETE: Remove Course */
  const deleteCourse = async (req, res) => {
    const { courseId } = req.params;

    // Remove all enrollments
    await enrollmentsDao.unenrollAllUsersFromCourse(courseId);

    // Remove course
    const status = await dao.deleteCourse(courseId);

    res.json(status);
  };

  /** PUT: Update Course */
  const updateCourse = async (req, res) => {
    const { courseId } = req.params;
    const status = await dao.updateCourse(courseId, req.body);
    res.json(status);
  };

  /** POST: Enroll user in course */
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

  /** DELETE: Unenroll user from course */
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

  // -------- ROUTE BINDINGS -------- //
  app.get("/api/courses", findAllCourses);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.post("/api/courses", createCourse);
  app.put("/api/courses/:courseId", updateCourse);
  app.delete("/api/courses/:courseId", deleteCourse);

  app.post("/api/users/:uid/courses/:cid", enrollUserInCourse);
  app.delete("/api/users/:uid/courses/:cid", unenrollUserFromCourse);
}
