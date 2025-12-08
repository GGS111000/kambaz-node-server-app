// Kambaz/Quizzes/dao.js
import QuizModel from "./model.js";

export const createQuizForCourse = (courseId) => {
  // 默认新建一个空 quiz
  return QuizModel.create({
    course: courseId,
    title: "New Quiz",
    description: "",
  });
};

export const findQuizzesForCourse = (courseId) =>
  QuizModel.find({ course: courseId }).sort({
    availableDate: 1,
    createdAt: 1,
  });

export const findQuizById = (quizId) => QuizModel.findById(quizId);

export const updateQuiz = (quizId, quiz) =>
  QuizModel.findByIdAndUpdate(quizId, quiz, { new: true });

export const deleteQuiz = (quizId) => QuizModel.findByIdAndDelete(quizId);
