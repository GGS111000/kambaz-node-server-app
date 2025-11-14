// Kambaz/Modules/routes.js
import ModulesDao from "../Modules/dao.js";

export default function ModulesRoutes(app, db) {
  const dao = ModulesDao(db);

  // GET modules for a course
  const findModulesForCourse = (req, res) => {
    const { courseId } = req.params;
    const modules = dao.findModulesForCourse(courseId);
    res.json(modules);
  };

  // POST create module
  const createModuleForCourse = (req, res) => {
    const { courseId } = req.params;
    const module = { ...req.body, course: courseId };
    const newModule = dao.createModule(module);
    res.json(newModule);
  };

  // DELETE module
  const deleteModule = (req, res) => {
    const { moduleId } = req.params;
    const result = dao.deleteModule(moduleId);
    res.json(result);
  };

  // PUT update module
  const updateModule = (req, res) => {
    const { moduleId } = req.params;
    const moduleUpdates = req.body;
    const updated = dao.updateModule(moduleId, moduleUpdates);
    res.json(updated);
  };

  // Register routes
  app.get("/api/courses/:courseId/modules", findModulesForCourse);
  app.post("/api/courses/:courseId/modules", createModuleForCourse);
  app.delete("/api/modules/:moduleId", deleteModule);
  app.put("/api/modules/:moduleId", updateModule);
}
