import React, { useRef } from "react";
import ToDoItemNotes from "./ToDoItemNotes";

export default function ToDoItem({
  todo,
  onDeleteTodo,
  undoRedoActions,
  setUndoRedo,
}) {
  const todoVanishRef = useRef();

  // sends the todo to the delete function
  function handleDelete() {
    onDeleteTodo(todo._id, true);
  }

  // displays todo information when div is clicked
  function handleTodoClick(e) {
    if (e.target.nodeName != "INPUT") {
      todoVanishRef.current.classList.contains("todo-notes-vanish")
        ? todoVanishRef.current.classList.remove("todo-notes-vanish")
        : todoVanishRef.current.classList.add("todo-notes-vanish");
    }
  }

  return (
    <div className="todo-item" onClick={handleTodoClick}>
      {/* displays the todo with an associated checkbox */}
      <label>
        <input
          type="checkbox"
          checked={todo.complete}
          onChange={handleDelete}
        />
      </label>
      <h4>{todo.title}</h4>

      <ToDoItemNotes todo={todo} todoVanishRef={todoVanishRef} />

    </div>
  );
}
