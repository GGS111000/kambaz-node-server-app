import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
import EnrollmentsDao from "../Enrollments/dao.js";

export default function CoursesDao() {
  const enrollmentsDao = EnrollmentsDao();

  // 所有课程
  function findAllCourses() {
    return model.find({});
  }

  // 某个用户选了哪些课（目前没直接用，但保留）
  async function findCoursesForEnrolledUser(userId) {
    return enrollmentsDao.findCoursesForUser(userId);
  }

  // 创建课程
  function createCourse(course) {
    const newCourse = { ...course, _id: uuidv4() };
    return model.create(newCourse);
  }

  // 删除课程（具体删 enrollment 在 Routes 里处理）
  function deleteCourse(courseId) {
    return model.deleteOne({ _id: courseId });
  }

  // 更新课程
  function updateCourse(courseId, courseUpdates) {
    return model.updateOne(
      { _id: courseId },
      { $set: courseUpdates }
    );
  }

  // 根据 ID 查课程
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
