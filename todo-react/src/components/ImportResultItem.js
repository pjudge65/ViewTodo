import React, {useRef, useState, useEffect} from 'react'

export default function ImportResultItem({idx, importResult, isChecked, setIsChecked, processTimeNotes}) {

    const toggleRef = useRef(); 

    // tracks whether this import result is checked or not
    const [itemChecked, setItemChecked] = useState(true);
    const [startTime, setStartTime] = useState("");
    
    // when itemChecked is changed, we update the array that
    // tracks all items whether they are checked or not
    useEffect(()=>{
        const new_array = isChecked;
        new_array[idx] = itemChecked;
        setIsChecked(new_array);
    }, [itemChecked])


    // updates the checked state variable when an item is clicked
    function handleToggle(e){
        setItemChecked(itemChecked => !itemChecked)
      }

    return (
        // produces each import item on the form
        <div className="importResult" onClick={handleToggle} style={{backgroundColor: itemChecked ? "#2A2A2A" : "#3A3A3A"}}>
            <input type="checkbox" name="importChecked" checked={itemChecked} onChange={handleToggle}/>
            <div className="importResultData">
                <p>Title: {importResult.title}</p>
                <p>Duration: {processTimeNotes(importResult)}</p>
                <p>Notes: {importResult.notes}</p>
            </div>

         </div>
    )
}
