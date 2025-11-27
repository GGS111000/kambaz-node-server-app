import model from "./model.js";

export default function EnrollmentsDao() {
  // 当前用户选了哪些课，返回的是课程列表
  async function findCoursesForUser(userId) {
    const enrollments = await model
      .find({ user: userId })
      .populate("course");
    return enrollments.map((e) => e.course);
  }

  // 某门课里有哪些学生，返回的是用户列表
  async function findUsersForCourse(courseId) {
    const enrollments = await model
      .find({ course: courseId })
      .populate("user");
    return enrollments.map((e) => e.user);
  }

  // 选课 —— 课件里的写法是 _id = `${userId}-${courseId}` 避免重复
  async function enrollUserInCourse(userId, courseId) {
    return model.create({
      _id: `${userId}-${courseId}`,
      user: userId,
      course: courseId,
    });
  }

  // 退课（单个用户）
  async function unenrollUserFromCourse(userId, courseId) {
    return model.deleteOne({ user: userId, course: courseId });
  }

  // 删除课程时，把所有选这个课的 enrollment 一起删掉
  async function unenrollAllUsersFromCourse(courseId) {
    return model.deleteMany({ course: courseId });
  }

  return {
    findCoursesForUser,
    findUsersForCourse,
    enrollUserInCourse,
    unenrollUserFromCourse,
    unenrollAllUsersFromCourse,
  };
}
