import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    dueDate: Date,
    course: { type: String, required: true }, // RS101 / CS4550 之类
    points: { type: Number, default: 100 }
  },
  { collection: "assignments" }
);

export default assignmentSchema;
