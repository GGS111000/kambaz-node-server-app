// Kambaz/Modules/dao.js
import { v4 as uuidv4 } from "uuid";

export default function ModulesDao(db) {
  // 1) 查某课程的全部 modules
  function findModulesForCourse(courseId) {
    const { modules } = db;
    return modules.filter((m) => m.course === courseId);
  }

  // 2) 创建 module
  function createModule(module) {
    const newModule = { ...module, _id: uuidv4() };
    db.modules = [...db.modules, newModule];
    return newModule;
  }

  // 3) 删除 module
  function deleteModule(moduleId) {
    db.modules = db.modules.filter((m) => m._id !== moduleId);
    return { status: "ok" };
  }

  // 4) 更新 module
  function updateModule(moduleId, moduleUpdates) {
    const module = db.modules.find((m) => m._id === moduleId);
    Object.assign(module, moduleUpdates);
    return module;
  }

  return {
    findModulesForCourse,
    createModule,
    deleteModule,
    updateModule,
  };
}
