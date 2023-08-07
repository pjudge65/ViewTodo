import React from 'react'
import AddToDo from '../Utils/AddToDo'
import TodoItem from './ToDoItem'

export default function ToDoDisplay({todos, setTodos, loadTodos, onDeleteTodo, date, undoRedoActions, setUndoRedo, createTodo, projects, activeProject, setActiveProject}) {

  // filters the todos by date and by project
  const filterFunction = function(value, index, array){
    let todoDate = new Date(value.dueDate);

    // if todo's duedate = the date chosen to display, display the todo
    if (todoDate.toLocaleDateString() === date.toLocaleDateString()){

      // if the date is true, then filter by project
      if (activeProject === "Inbox"){
        return true
      } else {

        return value.project === activeProject
      }
    } else {
      return false
    }
  }

  return (
    <div id="todo-display-container">
        {/* Displays todos with correct due date and that match the active project */}
        {todos.filter(filterFunction).map(todo => {
            return <TodoItem key={todo._id} todo={todo} onDeleteTodo={onDeleteTodo}/>
        })}
        {/* Contains button and functionality for adding to-dos */}
        <AddToDo 
          todos={todos} 
          setTodos={setTodos} 
          loadTodos={loadTodos} 
          date={date} 
          undoRedoActions={undoRedoActions} 
          setUndoRedo={setUndoRedo} 
          createTodo={createTodo} 
          projects={projects}
        />
    </div>
  )
}
