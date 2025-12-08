// Kambaz/Quizzes/model.js
import mongoose from "mongoose";
import quizSchema from "./schema.js";

const QuizModel = mongoose.model("QuizModel", quizSchema);
export default QuizModel;
