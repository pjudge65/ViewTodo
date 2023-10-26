const express = require("express");
const {
  httpGetAllProjects,
  httpCreateProject,
} = require("./projects.controller");

const projectsRouter = express.Router();

/**
 * Retrieves all todos currently in the db.
 */
projectsRouter.get("/", httpGetAllProjects);

//Add New Todo to db
projectsRouter.post("/", httpCreateProject);

module.exports = projectsRouter;
