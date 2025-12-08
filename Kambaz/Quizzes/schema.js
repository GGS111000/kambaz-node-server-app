// Kambaz/Quizzes/schema.js
import mongoose from "mongoose";

const optionSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => new mongoose.Types.ObjectId().toString(),
    },
    text: String,
    isCorrect: { type: Boolean, default: false },
  },
  { _id: false }
);

const blankSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => new mongoose.Types.ObjectId().toString(),
    },
    correctAnswers: [String], // 每个空可以有多个正确答案
  },
  { _id: false }
);

const questionSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => new mongoose.Types.ObjectId().toString(),
    },
    title: String,
    type: {
      type: String,
      enum: ["MULTIPLE_CHOICE", "TRUE_FALSE", "FILL_BLANK"],
      default: "MULTIPLE_CHOICE",
    },
    text: String, // 题干
    points: { type: Number, default: 1 },
    options: [optionSchema], // 选择题、判断题用
    blanks: [blankSchema], // 填空题用
  },
  { _id: false }
);

const quizSchema = new mongoose.Schema(
  {
    // 直接存课程的 Canvas cid 字符串，跟前端 /Courses/[cid] 对齐
    course: { type: String, required: true },

    title: { type: String, default: "New Quiz" },
    description: { type: String, default: "" },
    points: { type: Number, default: 10 },

    isPublished: { type: Boolean, default: false },
    shuffleAnswers: { type: Boolean, default: false },

    timeLimitEnabled: { type: Boolean, default: false },
    timeLimitMinutes: { type: Number, default: 0 },

    dueDate: Date,
    availableDate: Date,
    untilDate: Date,

    questions: [questionSchema],
  },
  {
    collection: "quizzes",
    timestamps: true,
  }
);

export default quizSchema;
