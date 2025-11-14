import PathParameters from "./PathParameters.js";
import QueryParameters from "./QueryParameters.js";
import WorkingWithObjects from "./WorkingWithObjects.js";
import WorkingWithArrays from "./WorkingWithArrays.js";

export default function Lab5(app) {
  // 5.2 Welcome
  app.get("/lab5/welcome", (req, res) => {
    res.send("Welcome to Lab 5");
  });

  // 5.2.2 Path Parameters
  PathParameters(app);

  // 5.2.2.2 Query Parameters
  QueryParameters(app);

  // 5.2.3 Working with Objects (assignment)
  WorkingWithObjects(app);

  // 5.2.4 Working with Arrays (todos)
  WorkingWithArrays(app);
}
