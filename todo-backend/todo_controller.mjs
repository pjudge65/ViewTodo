import 'dotenv/config';
import * as todos from './todo_model.mjs';
import express from 'express';
import proxy from 'express-http-proxy';
const port = process.env.PORT;

// create instance of express
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// proxies requests to the api
app.use('/api', proxy('http://localhost:8080/'));



/**
 * Retrieves all todos currently in the db.
 */
app.get('/todos', (req, res) => {
    let filter = {};
    todos.findTodos(filter, '', 0)
        .then(todo => {
            if (todo !== null) {
                res.status(200).json(todo)
            } else {
                res.status(404).json({ Error: "Not found" })
            }
        }) 
        // catch and log errors in retrieving todos
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed.' })
        });
});

/**
 * Retrieves all projects currently in the db.
 */
app.get('/projects', (req, res) => {
    let filter = {};
    todos.findProjects(filter, '', 0)
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
});

/**
 * Unused handler for further editing of todo items
 */
app.put('/todos/:_id', (req, res) => {
    todos.replaceTodo(
        req.params._id,
        req.body.title,
        req.body.dueDate,
        req.body.reminder,
        req.body.priority,
        req.body.notes
    )

    .then(numUpdated => {
        if (numUpdated === 1) {
            res.json({
                _id: req.params._id,
                title: req.body.title,
                dueDate: req.body.dueDate,
                reminder: req.body.reminder,
                priority: req.body.priority,
                notes: req.body.notes
            })
        } else {
            res.status(404).json({ Error: 'Document not found' });
        }
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({ Error: 'Request to update a document failed'});
    });
});

//Add New Todo to db
app.post('/todos', (req,res) => {
    // parses the given todo object for saving
    todos.createTodo(
        req.body.title,
        req.body.dueDate,
        req.body.project,
        req.body.priority,
        req.body.notes
    )
    .then(todo => {
        res.status(201).json(todo);
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({error: 'Invalid Request'});
    })
});

//Add New Project
app.post('/projects', (req,res) => {
    // parses the project title for saving
    todos.createProject(
        req.body.title
    )
    .then(project => {
        res.status(201).json(project);
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({error: 'Invalid Request'});
    })
});

// Deletes todo by id
app.delete('/todos/:_id', (req, res) => {
    todos.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Document not Found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request to delete a document failed'});
        });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`); 
});
