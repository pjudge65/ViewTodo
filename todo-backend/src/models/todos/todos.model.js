const Todo = require("./todos.mongo");

// creates todo object in mongo with given arguments
const createTodo = async (title, dueDate, project, priority, notes) => {
  // console.log(dueDate, project, priority, notes);
  const todo = new Todo({
    title: title,
    dueDate: dueDate,
    project: project,
    priority: priority,
    notes: notes,
  });
  // console.log(todo)
  return todo.save();
};

// looks up all todos in db
const findTodos = async (filter) => {
  const query = Todo.find(filter);
  return query.exec();
};

// unused function for editing todos (to be made later)
const replaceTodo = async (_id, title, dueDate, project, priority, notes) => {
  const result = await Todo.replaceOne(
    { _id: _id },
    {
      title: title,
      dueDate: dueDate,
      project: project,
      priority: priority,
      notes: notes,
    },
    { runValidators: true }
  );
  return result.modifiedCount;
};

// function to delete todo object by id
const deleteById = async (_id) => {
  const result = await Todo.deleteOne({ _id: _id });
  return result.deletedCount;
};

module.exports = {
  deleteById,
  createTodo,
  findTodos,
  replaceTodo,
};
