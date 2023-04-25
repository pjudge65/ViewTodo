import React, {useState, useEffect} from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function AddProject({projects, activeProject, setActiveProject, createProject}) {

  // variable to hold input value
  const [projectTitle, setProjectTitle] = useState("");

  // state variables for displaying add-project form
  const [isOpen, setOpen] = useState(false);
  const closePopup = () => setOpen(false);

  // processes input and saves project to db
  const handleSubmit = (event) => {
    event.preventDefault();
    closePopup();
    if (projectTitle == "") return;

    // creates project object, resets inputs, and sends to db
    const newProj = {"title": projectTitle}
    createProject(newProj);
    setProjectTitle("");

  }

  
  
  return (
    <div id="project-header">
      <div id="add-project-div" className="popup-cont">
        <Popup
          trigger={
            // Click this to display add-project form
            <button id="add-project-button" type="button" className="button" onClick={()=>setOpen(open=> !open)}>+</button>
          }
          position={'right top'}
          on={['hover']}
          arrow={true}
          mouseEnterDelay={500}
          contentStyle={{width: "auto"}}
          className="tooltipPopup"
        >Create New Project</Popup>

        {/* Add-project form itself, displayed in popup */}
        <Popup open={isOpen} closeOnDocumentClick onClose={closePopup} className="projectPopup">
          <div className="modal">
            <form id="add-project-form" onSubmit={handleSubmit}>
              <h2>Create New Project</h2>
              <label htmlFor="project-title">Project Name</label>
              <input 
                type="text" 
                id="project-title" 
                name="project-title" 
                value={projectTitle} 
                onChange={(e)=> setProjectTitle(e.target.value)}
              />
              <input type="submit" value="Submit"/>
            </form>
          </div>

        </Popup>

      </div>
    </div>
  )
}
