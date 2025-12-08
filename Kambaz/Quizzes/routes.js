// Kambaz/Quizzes/routes.js
import * as dao from "./dao.js";

export default function QuizRoutes(app) {
    console.log("✅ QuizRoutes registered"); 
  // 获取某课程下所有 quizzes
  app.get("/api/courses/:cid/quizzes", async (req, res) => {
    try {
      const quizzes = await dao.findQuizzesForCourse(req.params.cid);
      res.json(quizzes);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to fetch quizzes" });
    }
  });

  // 为某课程创建一个新 quiz（默认 New Quiz）
  app.post("/api/courses/:cid/quizzes", async (req, res) => {
    try {
      const courseId = req.params.cid;
      const body = req.body || {};
      const quiz = await dao.createQuizForCourse(courseId, body);
      res.json(quiz);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to create quiz" });
    }
  });

  // 获取单个 quiz
  app.get("/api/quizzes/:qid", async (req, res) => {
    try {
      const quiz = await dao.findQuizById(req.params.qid);
      if (!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
      }
      res.json(quiz);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to fetch quiz" });
    }
  });

  // 更新 quiz（详情、questions 都一起更新）
  app.put("/api/quizzes/:qid", async (req, res) => {
    try {
      const updated = await dao.updateQuiz(req.params.qid, req.body);
      res.json(updated);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to update quiz" });
    }
  });

  // 删除 quiz
  app.delete("/api/quizzes/:qid", async (req, res) => {
    try {
      await dao.deleteQuiz(req.params.qid);
      res.sendStatus(200);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to delete quiz" });
    }
  });

  // 发布 / 取消发布
  app.post("/api/quizzes/:qid/publish", async (req, res) => {
    try {
      const { isPublished } = req.body;
      const updated = await dao.updateQuiz(req.params.qid, { isPublished });
      res.json(updated);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to change publish status" });
    }
  });
}
