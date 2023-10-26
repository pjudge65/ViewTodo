const Project = require("./projects.mongo");

const createProject = async (title) => {
  const project = new Project({
    title: title,
  });
  return project.save();
};


// looks up all projects in db
const findProjects = async (filter) => {
  const query = Project.find(filter);
  return query.exec();
};

module.exports = {
  createProject,
  findProjects
}