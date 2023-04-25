import React from 'react'
import ToDoDisplay from './ToDoDisplay'
import ToDoHeader from './ToDoHeader'

export default function MainDailyContainer({todos, setTodos, loadTodos, onDeleteTodo, date, undoRedoActions, setUndoRedo, redoActions, setRedoActs, createTodo, projects, activeProject, setActiveProject, dailyPopupOpen, setDailyPopup}) {
  return (
    <div id="main-todo-container">
        {/* Displays the Title for the day and contains undo/redo */}
        <ToDoHeader 
            date={date} 
            undoRedoActions={undoRedoActions} 
            setUndoRedo={setUndoRedo}
            redoActions={redoActions}
            setRedoActs={setRedoActs}
            onDeleteTodo={onDeleteTodo}
            todos={todos}
            setTodos={setTodos}
            createTodo={createTodo}
        />
        {/* Contains all components related to display of todos */}
        <ToDoDisplay 
            todos={todos} 
            setTodos={setTodos} 
            loadTodos={loadTodos} 
            onDeleteTodo={onDeleteTodo} 
            date={date}
            undoRedoActions={undoRedoActions}
            setUndoRedo={setUndoRedo}
            createTodo={createTodo}
            projects={projects}
            activeProject={activeProject}
            setActiveProject={setActiveProject}
        />
    </div>
  )
}
