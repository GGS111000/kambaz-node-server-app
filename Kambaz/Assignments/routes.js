import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {

  app.get("/api/courses/:cid/assignments", async (req, res) => {
    const assignments = await dao.findAssignmentsForCourse(req.params.cid);
    res.json(assignments);
  });

  app.get("/api/assignments/:aid", async (req, res) => {
    const assignment = await dao.findAssignmentById(req.params.aid);
    res.json(assignment);
  });

  app.post("/api/courses/:cid/assignments", async (req, res) => {
    const newAssignment = await dao.createAssignment(req.params.cid, req.body);
    res.json(newAssignment);
  });

  app.put("/api/assignments/:aid", async (req, res) => {
    const status = await dao.updateAssignment(req.params.aid, req.body);
    res.json(status);
  });

  app.delete("/api/assignments/:aid", async (req, res) => {
    const status = await dao.deleteAssignment(req.params.aid);
    res.json(status);
  });

}
