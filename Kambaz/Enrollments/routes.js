import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  const enroll = (req, res) => {
    const currentUser = req.session?.currentUser || null;
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const { courseId } = req.params;
    const status = dao.enrollUserInCourse(currentUser._id, courseId);
    res.json(status);
  };

  const unenroll = (req, res) => {
    const currentUser = req.session?.currentUser || null;
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const { courseId } = req.params;
    const status = dao.unenrollUserFromCourse(currentUser._id, courseId);
    res.json(status);
  };

  const myEnrollments = (req, res) => {
    const currentUser = req.session?.currentUser || null;
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const list = dao.findEnrollmentsForUser(currentUser._id);
    res.json(list);
  };

  app.post("/api/courses/:courseId/enroll", enroll);
  app.post("/api/courses/:courseId/unenroll", unenroll);
  app.get("/api/enrollments/current", myEnrollments);
}
