import { v4 as uuidv4 } from "uuid";

export default function CoursesDao(db) {
  const findAllCourses = () => db.courses;

  const findCoursesForEnrolledUser = (userId) => {
    const { courses, enrollments } = db;

    return courses.filter((course) =>
      enrollments.some(
        (e) => e.user === userId && e.course === course._id
      )
    );
  };

  const createCourse = (course) => {
    const newCourse = { ...course, _id: uuidv4() };
    db.courses.push(newCourse);
    return newCourse;
  };

  const deleteCourse = (courseId) => {
    db.courses = db.courses.filter((c) => c._id !== courseId);
  };

  const updateCourse = (courseId, updates) => {
    const course = db.courses.find((c) => c._id === courseId);
    Object.assign(course, updates);
    return course;
  };

  return {
    findAllCourses,
    findCoursesForEnrolledUser,
    createCourse,
    deleteCourse,
    updateCourse,
  };
}
