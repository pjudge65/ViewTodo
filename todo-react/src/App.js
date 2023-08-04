import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DailyView from "./components/DailyView";
import WeeklyView from './components/WeeklyView';
import './App.css';
import { v4 as uuidv4 } from 'uuid';


const SESSION_STORAGE_KEY = "undo_redo";


function App() {
  const [todos, setTodos] = useState([]);
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState("Inbox");
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [weekNav, setWeekNav] = useState(0);
  const [undoRedoActions, setUndoRedo] = useState([]);
  const [redoActions, setRedoActs] = useState([]);
  const [wklyPopupOpen, setWklyPopup] = useState(true);
  const [dailyPopupOpen, setDailyPopup] = useState(true);

 
  //loads todos/projects from mongo, populates this week's dates on weekly view
  useEffect(()=> {
    loadTodos();
    loadProjects();
    populateDates();
  }, [])

  useEffect(()=>{
    populateDates();
  }, [weekNav])




  // Populates an array of this week's dates Monday through Sunday
  const populateDates = function(){
    let today = new Date();
    today.setDate(today.getDate()+(weekNav*7))
    let todaysDay = today.getDay();
    if (todaysDay === 0) todaysDay = 7;
    let dayDiff = todaysDay - 1;
    let dayArray = [];

    //subtract Day by the date, you should get Monday's date
    let weekDate = new Date(today.setDate(today.getDate() - dayDiff));

    //sets the date in the array and increments
    for (let i=0; i<7; i++){
      dayArray[i] = new Date(weekDate);
      weekDate.setDate(weekDate.getDate() + 1);
    }
    setDaysOfWeek(dayArray);
  }
  
  // loads the todos from mongo
  const loadTodos = async () => {
    const response = await fetch('/todos');
    const newTodos = await response.json();
    setTodos(newTodos);
    
  };

  // loads the list of projects from mongo
  const loadProjects = async () => {
    const response = await fetch('/projects');
    const newProjects = await response.json();
    setProjects(newProjects);
    
  };

  // saves a new todo object in our todos db
  const createTodo = async function(newTodo, click){
    const response = await fetch('/todos', {
      method: 'post',
      body: JSON.stringify(newTodo),
      headers: {
          'Content-Type': 'application/json'
      },
    });
    const todo = await response.json();
    if(response.status === 201){
        //if we created a todo normally, add it to undo-actions stack
        if (click){
          const newUndo = {"action": "create", "todoObj": [todo]};
          setUndoRedo(prevActions => {
              return [...prevActions, newUndo]
          })
          setRedoActs([])
        }
        loadTodos();
        return todo;
    } else {
        alert(`Failed to add todo, status code = ${response.status}`);
        return null;
    }
  }

  // Deletes a todo object from our mongo db
  const onDeleteTodo = async function(_id, click){
    const todoDelete = todos.find(todo => todo._id === _id);
    const response = await fetch(`/todos/${_id}`, {method: 'DELETE'});

    if (response.status === 204){

      // if we deleted a todo object normally, add it to undo-actions stack
      if (click){
        const newUndo = {"action":"delete", "todoObj": [todoDelete]};
        setUndoRedo(prevActions => {
          return [...prevActions, newUndo]
        })
        setRedoActs([])
      }
      const getResponse = await fetch('/todos');
      const newTodos = await getResponse.json();
      // set the todos array to the response of the call (which returns the new todo list)
      setTodos(newTodos);
      return true;
    } else {
        console.error(`Failed to delete todo with _id=${_id}, status code = ${response.status}`)
        return false;
    }
  }

  // adds a new project object to our mongo db
  const createProject = async function(newProject, click){
    const response = await fetch('/projects', {
      method: 'post',
      body: JSON.stringify(newProject),
      headers: {
          'Content-Type': 'application/json'
      },
    });
    const project = await response.json();
    if(response.status === 201){
        loadProjects();
        return project;
    } else {
        alert(`Failed to add todo, status code = ${response.status}`);
        return null;
    }

    
  }


  return (
    <Router>
      <Routes>
        {/* Weekly View loads on default or on route to "/" */}
        <Route path="/" exact element={<WeeklyView 
                                          dates={daysOfWeek} 
                                          weekNav={weekNav}
                                          setWeekNav={setWeekNav}
                                          todos={todos} 
                                          setTodos={setTodos} 
                                          loadTodos={loadTodos}
                                          createTodo={createTodo}
                                          projects={projects}
                                          wklyPopupOpen={wklyPopupOpen}
                                          setWklyPopup={setWklyPopup}
                                      />} 
        />
          
        {/* Daily View loads when clicking a day on the weekly view */}
        <Route path="/daily-view" element={<DailyView 
                                              todos={todos} 
                                              setTodos={setTodos} 
                                              loadTodos={loadTodos} 
                                              onDeleteTodo={onDeleteTodo}
                                              projects={projects}
                                              activeProject={activeProject}
                                              setActiveProject={setActiveProject}
                                              createProject={createProject}
                                              undoRedoActions={undoRedoActions}
                                              setUndoRedo = {setUndoRedo}
                                              redoActions={redoActions}
                                              setRedoActs={setRedoActs}
                                              createTodo = {createTodo}
                                              dailyPopupOpen={dailyPopupOpen}
                                              setDailyPopup={setDailyPopup}
                                          />}
        />
          
      </Routes>
    </Router>
  )

}

export default App;
