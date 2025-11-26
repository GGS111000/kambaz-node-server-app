import assignmentModel from "./model.js";

export const findAssignmentsForCourse = (courseId) =>
  assignmentModel.find({ course: courseId });

export const findAssignmentById = (assignmentId) =>
  assignmentModel.findById(assignmentId);

export const createAssignment = (courseId, assignment) =>
  assignmentModel.create({ ...assignment, course: courseId });

export const updateAssignment = (assignmentId, assignment) =>
  assignmentModel.updateOne({ _id: assignmentId }, assignment);

export const deleteAssignment = (assignmentId) =>
  assignmentModel.deleteOne({ _id: assignmentId });
