import React, {useState, useEffect, useRef} from 'react'
import ImportResultItem from './ImportResultItem';

export default function ImportResultForm({importResults, setImportResults, isOpenImportResult, setOpenImportResult, integrateCalendarData, processTimeNotes}) {
  
  // tracks whether each import item is checked or not (array)
  const [isChecked, setIsChecked] = useState([]);

  // when import results are updated, we can process that change to the DB
  useEffect(()=> {
    if (!isOpenImportResult){
      integrateCalendarData();
    }
  }, [importResults])

  // on submitting the form, filter the results, and submit for processing
  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenImportResult(false);

    // only adds the items that are checked to the array and saves it
    const new_array = importResults.filter((value, idx) => isChecked[idx]);
    setImportResults(oldResults => [...new_array]);
  }

  return (
    <div>
      <form id="import-result-form" onSubmit={handleSubmit}>
        <h3>Select Appointments to Import</h3>
        {/* Displays each Import Result on the form to be chosen for filtering */}
        {importResults.map((importResult, idx) => 
          <ImportResultItem 
            key={idx} 
            idx={idx}
            importResult={importResult} 
            isChecked={isChecked}
            setIsChecked={setIsChecked}
            processTimeNotes={processTimeNotes}  
          ></ImportResultItem>
        )}
        <input type="submit"></input>
      </form>
    </div>
  )
}
