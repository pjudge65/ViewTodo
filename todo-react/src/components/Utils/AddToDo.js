import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import "./Utils.css";
import "reactjs-popup/dist/index.css";
import { v4 as uuidv4 } from "uuid";

export default function AddToDo({
  todos,
  setTodos,
  loadTodos,
  date,
  undoRedoActions,
  setUndoRedo,
  createTodo,
  projects,
}) {
  // sets the default input values for the add-todo form
  const [inputs, setInputs] = useState({
    title: "",
    dueDate: "",
    project: "Inbox",
    priority: "1",
    notes: "",
  });

  // controls the state of the popup
  const [isOpen, setOpen] = useState(false);
  const closePopup = () => setOpen(false);

  // changes the state variables when the values for inputs change
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  // process the state of the input values into a new todo and
  // sends todo to be saved to DB
  const handleAddTodo = async (event) => {
    event.preventDefault();
    closePopup();
    if (inputs.title == "") return;

    // processing date string in local format
    let dueDateString = inputs.dueDate;
    if (dueDateString == "") {
      dueDateString = date.toLocaleDateString();
    } else {
      let dateInputArr = dueDateString.split("-");
      dueDateString = `${dateInputArr[1]}/${dateInputArr[2]}/${dateInputArr[0]}`;
    }

    // sends the new todo object to be saved, and resets the default inputs
    const newTodo = { ...inputs, dueDate: dueDateString };
    setInputs({
      title: "",
      dueDate: "",
      project: "Inbox",
      priority: "1",
      notes: "",
    });
    createTodo(newTodo, true);
  };

  return (
    <div id="add-todo-button">
      {/* Click to display the add-todo form */}
      <Popup
        trigger={
          <button
            type="button"
            className="button"
            id="add-td-btn"
            onClick={() => setOpen((open) => !open)}
          >
            +
          </button>
        }
        position={"top right"}
        on={["hover"]}
        arrow={true}
        contentStyle={{ width: "auto" }}
        mouseEnterDelay={500}
        className="tooltipPopup"
      >
        Create New To-do
      </Popup>

      {/* The add-todo form itself */}
      <Popup
        open={isOpen}
        modal
        nested
        onClose={closePopup}
        className="todoFormPopup"
      >
        <div className="modal" id="todo-modal">
          <form id="add-todo-form" onSubmit={handleAddTodo}>
            <h2>Create New To-Do</h2>

            <label>Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={inputs.title || ""}
              onChange={handleChange}
            />

            <label>Due Date</label>
            <input
              type="date"
              id="due-date"
              name="dueDate"
              value={inputs.dueDate || ""}
              onChange={handleChange}
            />

            <label>Project</label>
            <select
              name="project"
              id="project"
              value={inputs.project || "Inbox"}
              onChange={handleChange}
            >
              <option value="Inbox">Inbox</option>
              {projects.map((project, index) => (
                <option key={index} value={project.title}>
                  {project.title}
                </option>
              ))}
            </select>

            <label>Priority</label>
            <select
              name="priority"
              id="priority"
              value={inputs.priority || 1}
              onChange={handleChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>

            <label>Notes</label>
            <input
              type="text"
              id="notes"
              name="notes"
              value={inputs.notes || ""}
              onChange={handleChange}
            />
            <input type="submit" />
          </form>
        </div>
      </Popup>
    </div>
  );
}
