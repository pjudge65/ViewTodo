import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export default function UndoRedo({
  undoRedoActions,
  setUndoRedo,
  redoActions,
  setRedoActs,
  onDeleteTodo,
  createTodo,
  todos,
  setTodos,
}) {
  // creates state variable to be displayed on tooltip
  const [undoString, setUndoString] = useState("Undo");
  const [redoString, setRedoString] = useState("Redo");

  // updates the tooltip display string for "undo"
  useEffect(() => {
    if (undoRedoActions.length == 0) {
      setUndoString("Undo");
    } else {
      // checks the undo action at the top of the stack
      // and displays the "action" (create/delete)
      if (undoRedoActions.at(-1).action === "create") {
        if (undoRedoActions.at(-1).todoObj.length > 1) {
          setUndoString("Undo Calendar Integration");
        } else {
          setUndoString("Undo Create Todo");
        }
      } else {
        setUndoString("Undo Delete Todo");
      }
    }
  }, [undoRedoActions]);

  // updates the tooltip display string for "redo"
  useEffect(() => {
    if (redoActions.length == 0) {
      setRedoString("Redo");
    } else {
      // checks the redo action at the top of the stack
      // and displays the "action" (create/delete)
      if (redoActions.at(-1).action === "create") {
        if (redoActions.at(-1).todoObj.length > 1) {
          setRedoString("Redo Calendar Integration");
        } else {
          setRedoString("Redo Create Todo");
        }
      } else {
        setRedoString("Redo Delete Todo");
      }
    }
  }, [redoActions]);

  // Undo's last action (l.a.) -
  // If l.a. was to create todo -> deletes todo
  // If l.a. was to delete todo -> creates a copy of that todo
  const handleUndo = async function (event) {
    event.preventDefault();
    const newUndoRedoActs = [...undoRedoActions];
    const newRedoActs = [...redoActions];
    const todoCheck = [...todos];
    if (newUndoRedoActs.length != 0) {
      // pops the last item added to the undo stack off
      let undoObj = newUndoRedoActs.pop();

      // if last action was creating a todo, we delete that todo
      if (undoObj.action === "create") {
        let deleteSuccess = true;
        let outputArr = [];

        // loops through multiple incase last action was an "integrate"
        for (let i = 0; i < undoObj.todoObj.length; i++) {
          // finds the todo in question by id, then sends to delete function
          if (todoCheck.find((todo) => todo._id === undoObj.todoObj[i]._id)) {
            if (onDeleteTodo(undoObj.todoObj[i]._id, false)) {
              outputArr = [...outputArr, undoObj.todoObj[i]];
            }
          }
        }
        // Adds this undo-action to the stack of redo-actions
        setRedoActs([...newRedoActs, { action: "create", todoObj: outputArr }]);
        setUndoRedo([...newUndoRedoActs]);
      }
      // if last action was to delete, we create that todo again
      else if (undoObj.action === "delete") {
        for (let i = 0; i < undoObj.todoObj.length; i++) {
          // create a duplicate of the deleted todo
          const newTodo = await createTodo(undoObj.todoObj[i], false);

          // adds the undo-action to redo-actions
          setRedoActs([
            ...newRedoActs,
            { action: "delete", todoObj: [newTodo] },
          ]);
          setUndoRedo([...newUndoRedoActs]);
        }
      }
    }
  };

  // takes the last undone action and reverses it
  // If a "delete" was undone -> delete again
  // if a "create" was undone -> create again
  const handleRedo = async function (event) {
    event.preventDefault();

    const newRedoActs = [...redoActions];
    const newUndoRedoActs = [...undoRedoActions];
    const todoCheck = [...todos];

    if (newRedoActs.length != 0) {
      // pops that last undone action off the stack
      const redoObj = newRedoActs.pop();

      // if we're redoing a create, create the todo again
      if (redoObj.action === "create") {
        for (let i = 0; i < redoObj.todoObj.length; i++) {
          const newTodo = await createTodo(redoObj.todoObj[i], false);
        }
        setRedoActs([...newRedoActs]);
      } else if (redoObj.action === "delete") {
        // if we're redoing a delete, find the todo by id and delete
        for (let i = 0; i < redoObj.todoObj.length; i++) {
          if (todoCheck.find((todo) => todo._id === redoObj.todoObj[i]._id)) {
            const delTodo = await onDeleteTodo(redoObj.todoObj[i]._id, false);
          }
        }
        setRedoActs([...newRedoActs]);
      }
    }
  };

  return (
    <div id="undo-redo" className="popup-cont">
      {/* tooltip for "undo" button */}
      <Popup
        trigger={
          // undo button
          <button id="undo-button" className="sidebar-button" onClick={handleUndo}>
            undo
          </button>
        }
        position={"bottom left"}
        on={["hover"]}
        arrow={true}
        contentStyle={{ width: "auto" }}
        mouseEnterDelay={500}
        className="tooltipPopup"
      >
        {undoString}
      </Popup>
      {/* tooltip for "redo" button */}
      <Popup
        trigger={
          // redo button
          <button id="redo-button" className="sidebar-button" onClick={handleRedo}>
            redo
          </button>
        }
        position={"bottom left"}
        on={["hover"]}
        arrow={true}
        contentStyle={{ width: "auto" }}
        mouseEnterDelay={500}
        className="tooltipPopup"
      >
        {redoString}
      </Popup>
    </div>
  );
}
