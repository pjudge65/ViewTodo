import React, {useRef} from 'react'

export default function ToDoItem( {todo, onDeleteTodo, undoRedoActions, setUndoRedo} ) {
  const todoVanishRef = useRef();

  // sends the todo to the delete function 
  function handleDelete(){
    onDeleteTodo(todo._id, true);
  }

  // displays todo information when div is clicked
  function handleTodoClick(e){
    if (e.target.nodeName != "INPUT"){
      todoVanishRef.current.classList.contains("todo-notes-vanish") ? 
                todoVanishRef.current.classList.remove("todo-notes-vanish") : 
                todoVanishRef.current.classList.add("todo-notes-vanish")
    }
  }

  // processes todo object to display notes/priority information
  let notes, priority;
  if (todo.notes){
    notes = "Notes: "+todo.notes;
  } else {
    notes = "";
  }
  if (todo.priority){
    const priArray = ["High", "Medium", "Low"]
    priority = `Priority: ${priArray[parseInt(todo.priority)-1]}`;
  }

  return (
    <div className= "todo-item" onClick={handleTodoClick}>
        {/* displays the todo with an associated checkbox */}
        <label>
            <input type="checkbox" checked={todo.complete} onChange={handleDelete}/>
        </label>
        <h4 >{todo.title}</h4>
        <div className="todo-notes-vanish" ref={todoVanishRef} >
          <p>{notes}</p>
          <p>{priority}</p>
          <p>Project: {todo.project}</p>
        </div>
    </div>
  )
}
