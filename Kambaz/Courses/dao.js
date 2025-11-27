import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
import EnrollmentsDao from "../Enrollments/dao.js";

export default function CoursesDao() {

  const enrollmentsDao = EnrollmentsDao();

  /** 1. GET all courses */
  function findAllCourses() {
    // 必须返回完整课程，不再只返回部分字段
    return model.find({});
  }

  /** 2. GET courses for a specific enrolled user */
  async function findCoursesForEnrolledUser(userId) {
    // 使用 EnrollmentDao 正确查课程，不再用 db.enrollments
    return enrollmentsDao.findCoursesForUser(userId);
  }

  /** 3. CREATE course */
  function createCourse(course) {
    const newCourse = { ...course, _id: uuidv4() };
    return model.create(newCourse);
  }

  /** 4. DELETE course */
  function deleteCourse(courseId) {
    return model.deleteOne({ _id: courseId });
  }

  /** 5. UPDATE course */
  function updateCourse(courseId, courseUpdates) {
    return model.updateOne(
      { _id: courseId },
      { $set: courseUpdates }
    );
  }

  /** 6. GET one course by ID */
  function findCourseById(courseId) {
    return model.findById(courseId);
  }

  return {
    findAllCourses,
    findCoursesForEnrolledUser,
    createCourse,
    deleteCourse,
    updateCourse,
    findCourseById,
  };
}
