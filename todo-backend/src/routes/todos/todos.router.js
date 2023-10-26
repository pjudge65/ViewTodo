const express = require('express');
const {
  httpGetAllTodos,
  httpCreateTodo,
  httpEditTodos,
  httpDeleteTodo,
} = require("./todos.controller")

const todosRouter = express.Router();

/**
 * Retrieves all todos currently in the db.
 */
todosRouter.get("/", httpGetAllTodos);

//Add New Todo to db
todosRouter.post("/", httpCreateTodo);

/**
 * Unused handler for further editing of todo items
 */
todosRouter.put("/:_id", httpEditTodos);

// Deletes todo by id
todosRouter.delete("/:_id", httpDeleteTodo);

module.exports = todosRouter;