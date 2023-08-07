import React, {useState, useEffect} from 'react';
import UndoRedo from './UndoRedo';

export default function ToDoHeader({date, undoRedoActions, setUndoRedo, redoActions, setRedoActs, createTodo, onDeleteTodo, todos, setTodos}) {


  
  	return (
    	<div id="header">
			{/* Displays title for the Daily view */}
      		<h1 id="daily-view-title">Daily Todo's - {date.toLocaleDateString()}</h1>
			
			{/* Contains functionality for undo/redo create/delete todos */}
      		<UndoRedo 
				undoRedoActions={undoRedoActions} 
				setUndoRedo={setUndoRedo}
				redoActions={redoActions}
				setRedoActs={setRedoActs}
				createTodo={createTodo}
				onDeleteTodo={onDeleteTodo}
				todos={todos}
				setTodos={setTodos}
        	/>
    	</div>
  )
}
