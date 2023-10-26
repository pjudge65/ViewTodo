const todos = require("../../models/todos/todos.model.js");
const { findProjects } = require("../../models/projects/projects.model.js");

/**
 * Retrieves all todos currently in the db.
 */
async function httpGetAllTodos(req, res) {
  let filter = {};
  todos
    .findTodos(filter, "", 0)
    .then((todo) => {
      if (todo !== null) {
        res.status(200).json(todo);
      } else {
        res.status(404).json({ Error: "Not found" });
      }
    })
    // catch and log errors in retrieving todos
    .catch((error) => {
      console.error(error);
      res.status(400).json({ Error: "Request failed." });
    });
}

/**
 * Unused handler for further editing of todo items
 */
async function httpEditTodos(req, res) {
  todos
    .replaceTodo(
      req.params._id,
      req.body.title,
      req.body.dueDate,
      req.body.reminder,
      req.body.priority,
      req.body.notes
    )

    .then((numUpdated) => {
      if (numUpdated === 1) {
        res.json({
          _id: req.params._id,
          title: req.body.title,
          dueDate: req.body.dueDate,
          reminder: req.body.reminder,
          priority: req.body.priority,
          notes: req.body.notes,
        });
      } else {
        res.status(404).json({ Error: "Document not found" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(400).json({ Error: "Request to update a document failed" });
    });
}

//Add New Todo to db
async function httpCreateTodo(req, res) {
  // parses the given todo object for saving
  const todoObj = req.body;

  // validates title, due date, and that project exists
  if (!todoObj.title || !todoObj.dueDate) {
    return res.status(400).json({
      Error: "Missing todo title or due date",
    });
  }
  console.log(todoObj.project !== undefined)
  if (todoObj.project !== undefined && todoObj.project !== "Inbox") {
    const projects = await findProjects({ title: todoObj.project });
    if (!projects[0]) {
      return res.status(400).json({
        Error: "Invalid project name",
      });
    }
  }
  todos
    .createTodo(
      todoObj.title,
      todoObj.dueDate,
      todoObj.project,
      todoObj.priority,
      todoObj.notes
    )
    .then((todo) => {
      res.status(201).json(todo);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error: "Invalid Request" });
    });
}

// Deletes todo by id
async function httpDeleteTodo(req, res) {
  todos
    .deleteById(req.params._id)
    .then((deletedCount) => {
      if (deletedCount === 1) {
        res.status(204).send();
      } else {
        res.status(404).json({ Error: "Document not Found" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.send({ error: "Request to delete a document failed" });
    });
}

module.exports = {
  httpGetAllTodos,
  httpCreateTodo,
  httpEditTodos,
  httpDeleteTodo,
};
