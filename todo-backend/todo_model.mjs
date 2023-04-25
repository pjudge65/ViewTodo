import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.set('strictQuery', false);
mongoose.connect(
    process.env.MONGODB_CONNECT,
    { useNewUrlParser: true }
);

// Connect to the db
const db = mongoose.connection;
// call open event once database connection is successful
db.once("open", (err) => {
    if(err){
        res.status(500).json({ error: '500:Connection to the server failed.' });
    } else  {
        console.log('Successfully connected to MongoDB Todos collection using Mongoose.');
    }
});

/**
 * Define todo schema
 */
const todoSchema = mongoose.Schema({
    title: { type: String, required: true},
    dueDate: { type: String, required: false},
    project: {type: String, required: false},
    priority: {type: String, required: false},
    notes: {type: String, required: false}


});

// Compile a model from the schema (todo and project)
const Todo = mongoose.model("Todo", todoSchema);

const projectSchema = mongoose.Schema({
    title: {type: String, required: true}
})

const Project = mongoose.model("Project", projectSchema);

const createProject = async(title)=>{
    const project = new Project({
        title: title
    });
    return project.save();
}

// looks up all projects in db
const findProjects = async(filter) => {
    const query = Project.find(filter);
    return query.exec();
}

// creates todo object in mongo with given arguments
const createTodo = async (title, dueDate, project, priority, notes) => {
    const todo = new Todo({
        title: title,
        dueDate: dueDate,
        project: project,
        priority: priority,
        notes: notes
    });
    return todo.save();
}

// looks up all todos in db
const findTodos = async(filter) => {
    const query = Todo.find(filter);
    return query.exec();
}

// unused function for editing todos (to be made later)
const replaceTodo = async(_id, title, dueDate, project, priority, notes) => {
    const result = await Todo.replaceOne({_id: _id}, {
        title: title,
        dueDate: dueDate,
        project: project,
        priority: priority,
        notes: notes
    }, {runValidators: true});
    return result.modifiedCount;
}

// function to delete todo object by id
const deleteById = async(_id) => {
    const result = await Todo.deleteOne({_id: _id});
    return result.deletedCount;
};

export {deleteById, createTodo, findTodos, replaceTodo, createProject, findProjects}