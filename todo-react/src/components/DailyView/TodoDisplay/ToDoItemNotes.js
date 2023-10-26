import React from "react";

export default function ToDoItemNotes({ todo, todoVanishRef }) {
  // processes todo object to display notes/priority information
  let notes, priority, project;
  if (todo.notes) {
    notes = "Notes: " + todo.notes;
  } else {
    notes = "";
  }
  if (todo.priority) {
    const priArray = ["High", "Medium", "Low"];
    priority = `Priority: ${priArray[parseInt(todo.priority) - 1]}`;
  }
  if (todo.project) {
    project = "Project: " + todo.project;
  } else {
    notes = "";
  }

  if (!todo.notes && !todo.project && !todo.priority) {
    return <></>;
  } else {
    return (
      <div className="todo-notes-vanish" ref={todoVanishRef}>
        <p>{notes}</p>
        <p>{priority}</p>
        <p>{project}</p>
      </div>
    );
  }
}
