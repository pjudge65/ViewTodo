import React, {useEffect, useState} from 'react'

export default function ProjectDisplayItem({project, activeProject, setActiveProject, handleProjectChange}) {

  //state variable which decides if the text is bigger or not
  const [isBold, setIsBold] = useState(false);

  // when project title clicked, it gets set to the Active Project
  const handleClick = function(e){
    e.preventDefault();
    handleProjectChange(project.title);
  }

  //whenever active project changes, update the bold state variable
  useEffect(()=>{
    if (project.title) setIsBold(project.title === activeProject)
  },[activeProject])


  return (
    // displays the project title in Project Display
    <div className="project-display-item">
        <a className="project-item" onClick={handleClick} style={{fontSize: (isBold) ? "25px":"15px"}}>{project.title}</a>
    </div>
  )
}
