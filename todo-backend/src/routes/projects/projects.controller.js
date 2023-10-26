const projects = require("../../models/projects/projects.model.js")

/**
 * Retrieves all projects currently in the db.
 */
async function httpGetAllProjects(req, res) {
  let filter = {};
  projects.findProjects(filter, '', 0)
      .then(project => {
          if (project !== null) {
              res.status(200).json(project)
          } else {
              res.status(404).json({ Error: "Not found" })
          }
      }) 
      // catch and log errors in retrieving projects
      .catch(error => {
          console.error(error);
          res.status(400).json({ Error: 'Request failed.' })
      });
};



//Add New Project
async function httpCreateProject(req,res){
  // parses the project title for saving
  projects.createProject(
      req.body.title
  )
  .then(project => {
      res.status(201).json(project);
  })
  .catch(error => {
      console.log(error);
      res.status(400).json({error: 'Invalid Request'});
  })
};

module.exports = {httpGetAllProjects, httpCreateProject}