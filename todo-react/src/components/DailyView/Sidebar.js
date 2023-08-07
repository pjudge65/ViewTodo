import React from 'react';
import AddProject from '../Utils/AddProject';
import ProjectDisplay from './ProjectDisplay';
import ReturnImport from './ReturnImport';

export default function Sidebar({todos, setTodos, loadTodos, onDeleteTodo, projects, activeProject, setActiveProject, createProject, date, undoRedoActions, setUndoRedo, setRedoActs}) {
  return (
    <div id="sidebar">
        {/* Contains all functionality around importing & returns to weekly view */}
        <ReturnImport 
          todos={todos} 
          loadTodos={loadTodos} 
          onDeleteTodo={onDeleteTodo} 
          projects={projects} 
          activeProject={activeProject}
          setActiveProject={setActiveProject}
          createProject={createProject} 
          date={date} 
          undoRedoActions={undoRedoActions} 
          setUndoRedo={setUndoRedo}
          setRedoActs={setRedoActs}
        />
        {/* Displays items from project list */}
        <ProjectDisplay 
          projects={projects} 
          activeProject={activeProject} 
          setActiveProject={setActiveProject}
        />
    </div>
  )
}
