import React, { useEffect } from 'react'
import ProjectDisplayItem from './ProjectDisplayItem'

export default function ProjectDisplay({projects, activeProject, setActiveProject}) {


  // Whenever a new project is clicked, set the "Active" project which is read globally from App.js
  const handleProjectChange = function(projectName){
    setActiveProject(projectName);
  } 


  
  return (
    <div id="project-display">
        {/* Display "Inbox" as the default, then adds any extra items in the Projects list for display */}
        <a className="project-item" onClick={()=>handleProjectChange("Inbox")} style={{fontSize: (activeProject==="Inbox") ? "25px":"15px"}}>Inbox</a>
        <h4>Choose a Project to Display</h4>
        {projects.map(project => {
            return <ProjectDisplayItem 
                      key={project._id} 
                      project={project} 
                      activeProject={activeProject} 
                      setActiveProject={setActiveProject} 
                      handleProjectChange={handleProjectChange}
                    />
        })}
    </div>
  )
}
