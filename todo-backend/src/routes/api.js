const express = require('express');
const todosRouter = require('./todos/todos.router');
const projectsRouter = require('./projects/projects.router');


const api = express.Router();

api.use("/todos", todosRouter);
api.use("/projects", projectsRouter);

module.exports = api;