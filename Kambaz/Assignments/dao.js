import { v4 as uuidv4 } from "uuid";

export default function AssignmentsDao(db) {
  function findAssignmentsForCourse(courseId) {
    return db.assignments.filter((a) => a.course === courseId);
  }

  function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: uuidv4() };
    db.assignments = [...db.assignments, newAssignment];
    return newAssignment;
  }

  function deleteAssignment(assignmentId) {
    db.assignments = db.assignments.filter((a) => a._id !== assignmentId);
    return { status: "OK" };
  }

  function updateAssignment(assignmentId, updates) {
    const a = db.assignments.find((x) => x._id === assignmentId);
    if (!a) return { status: "NOT_FOUND" };
    Object.assign(a, updates);
    return a;
  }

  return {
    findAssignmentsForCourse,
    createAssignment,
    deleteAssignment,
    updateAssignment,
  };
}
