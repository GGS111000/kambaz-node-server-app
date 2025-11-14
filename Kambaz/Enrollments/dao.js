import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {
  function enrollUserInCourse(userId, courseId) {
    db.enrollments.push({
      _id: uuidv4(),
      user: userId,
      course: courseId,
    });
  }

  function unenrollCourse(courseId) {
    db.enrollments = db.enrollments.filter(
      (e) => e.course !== courseId
    );
  }

  return {
    enrollUserInCourse,
    unenrollCourse,
  };
}
