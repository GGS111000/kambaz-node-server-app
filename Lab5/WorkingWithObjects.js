// const assignment = {
//   id: 1,
//   title: "NodeJS Assignment",
//   description: "Create a NodeJS server with ExpressJS",
//   due: "2021-10-10",
//   completed: false,
//   score: 0,
// };

// export default function WorkingWithObjects(app) {
//   const getAssignment = (req, res) => {
//     res.json(assignment);
//   };

//   const getAssignmentTitle = (req, res) => {
//     res.json(assignment.title);
//   };

//   app.get("/lab5/assignment", getAssignment);
//   app.get("/lab5/assignment/title", getAssignmentTitle);
// }
let assignment = {
  id: 1,
  title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-09-09",
  completed: false,
};

export default function WorkingWithObjects(app) {
  app.get("/lab5/assignment", (req, res) => {
    res.json(assignment);
  });

  app.get("/lab5/assignment/title/:title", (req, res) => {
    assignment.title = req.params.title;
    res.json(assignment);
  });
}
