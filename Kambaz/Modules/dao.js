import { v4 as uuidv4 } from "uuid";

export default function ModulesDao(db) {
  function findModulesForCourse(courseId) {
    return db.modules.filter((m) => m.course === courseId);
  }

  function createModule(module) {
    const newModule = { ...module, _id: uuidv4() };
    db.modules = [...db.modules, newModule];
    return newModule;
  }

  function deleteModule(moduleId) {
    db.modules = db.modules.filter((m) => m._id !== moduleId);
    return { status: "OK" };
  }

  function updateModule(moduleId, moduleUpdates) {
    const module = db.modules.find((m) => m._id === moduleId);
    if (!module) return { status: "NOT_FOUND" };
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
