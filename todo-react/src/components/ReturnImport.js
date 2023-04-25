import React, {useState, useEffect, useRef} from 'react';
import { useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import AddProject from './AddProject';
import ImportResultForm from './ImportResultForm';

export default function ReturnImport({todos, setTodos, loadTodos, onDeleteTodo, projects, activeProject, setActiveProject, createProject, date, undoRedoActions, setUndoRedo, setRedoActs}) {

    let navigate = useNavigate();
    const [importResults, setImportResults] = useState([]);
    const [isOpenImport, setOpenImport] = useState(false);
    const [isOpenImportResult, setOpenImportResult] = useState(false);
    const [integrationReady, setIntegrationReady] = useState(false);
    const closePopupImport = () => setOpenImport(false);
    const closePopupImportResult = () => setOpenImportResult(false);
    const openPopupImportResult = () => setOpenImportResult(true);
    const importDataRef = useRef();

    // routes back to "Weekly View" when the return button is clicked
    const displayWeekly = function(){
        setActiveProject("Inbox");
        let newPath = '/';
        navigate(newPath);
    };

    // Reads the start/end times on imported items and returns a readable string 
    const processTimeNotes = function(importItem){
        let startTime, endTime;
        let startString, endString;
        let isEveningStart = false;
        let isEveningEnd = false;
        if (importItem){
            // gets a substring of the time from the date objects
            startTime = parseInt(importItem["startDatetime"].substring(11, 16));
            endTime = parseInt(importItem["endDatetime"].substring(11, 16));
            // convert military time to pm from the start-time
            if (startTime >= 12) {
                if (startTime > 12) startTime = startTime % 12;
                if (startTime === 0) startTime = 12;
                startString = `${startTime} pm`;
            } else {
                // convert if AM 
                if (startTime == 0) startTime = 12;
                startString = `${startTime} am`
            }
            // convert military time to pm from the end-time
            if (endTime>= 12){
                if (endTime > 12) endTime = endTime % 12;
                if (endTime === 0) endTime = 12;
                endString = `${endTime} pm`
            } else {
                // convert if AM
                if (endTime == 0) endTime = 12;
                endString = `${endTime} am`
            }
        // outputs readble String "XX am/pm to YY am/pm"
        return `${startString} to ${endString}`
        }
    }

    // Sends the import-results (after filtering) to be added to our mongo db
    const integrateCalendarData = async function(){
        let add_response;
        let undoRedoObjs = [];
        if (importResults.length === 0) return;
        
        //Iterates through the todo objects remaining to be added
        for (let i=0; i < importResults.length; i++){
            // addes the readable time string to our notes
            let notesString = `[${processTimeNotes(importResults[i])}] ${importResults[i].notes}`

            // sets our data to our new todo object
            const newTodo = {title: importResults[i].title, 
                                project: "Inbox", 
                                dueDate: date.toLocaleDateString(), 
                                priority: "", 
                                notes: notesString}
                                
            // sends our todo object to be saved by Mongo
            add_response = await fetch('/todos', {
                method: 'post',
                body: JSON.stringify(newTodo),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const todo = await add_response.json();
            if (add_response.status === 201){
                // everytime we create a todo, we save it in an array for undoing
                undoRedoObjs.push(todo);
            }
        }
        // If all todos successfully integrated
        if(add_response.status == 201){
            // set a new undo action corresponding to importing multiple todos
            const newUndo = {"action": "create", "todoObj": undoRedoObjs};
            setUndoRedo(prevActions => {
            return [...prevActions, newUndo]
        })
            setRedoActs([])
            alert("Successfully imported from the microservice")
        } else{
            alert(`Failed to import, status code = ${add_response.status}`)
        }
        loadTodos();
    }


    // Calls the import-appointments-microservice 
    // and receives calendar information to be parsed
    const handleImport = async function(event){
        event.preventDefault();

        // closes the initial popup (asking if you want to continue importing)
        closePopupImport();

        // sets the chosen date to the correct format for calling the microservice
        const month = (date.getMonth() < 9) ? `0${date.getMonth()+1}` : (date.getMonth()+1);
        const day = (date.getDate() < 10) ? `0${date.getDate()}`: (date.getDate());
        const dateString = `${date.getFullYear()}-${month}-${day}`;

        // calls microservice and awaits the appointment objects
        const response = await fetch(`http://localhost:8000/api/appointments?date=${dateString}T00:00`);
        const data = await response.json();

        // get the data back from the application in "data"
        if (response.status == 200){
            // if success, we open the "Import Form" popup, displaying our resultant
            // data for filtering
            openPopupImportResult();
            setImportResults(data.appointments);
        }
    }
    return (
        <div id="top-left">
            <div id="return-import-div">
                {/* Clicking the Return Button will take you back to the Weekly View */}
                <div id="back-button-div" type="button" className="popup-cont">
                    <Popup
                        trigger={
                            <button id="back-button" onClick={displayWeekly}>
                            &#60;
                            </button>
                        }
                        position={'left bottom'}
                        on={['hover']}
                        arrow={true}
                        mouseEnterDelay={500}
                        contentStyle={{width: "auto"}}
                        className="tooltipPopup"
                    >Return to Weekly View</Popup>

                </div>

                {/* Clicking on the Import Button will call the Appointments microservice */}
                <div id="import-button-div">
                    <Popup 
                        trigger={
                            <button id="import-button" type="button" className="button" onClick={()=>setOpenImport(open=> !open)}>Import</button>
                        }
                        position='bottom right'
                        on={['hover']}
                        arrow={true}
                        mouseEnterDelay={500}
                        contentStyle={{width:"auto"}}
                        className="tooltipPopup"
                    >Import Calendar Data</Popup>

                    {/* Popup asking if you want to continue importing */}
                    <Popup open={isOpenImport} closeOnDocumentClick onClose={closePopupImport}>
                        <div className='modal'>
                            <h4>Import Calendar Appointments (from Microservice) to automatically generate to-do items?</h4>
                            <h5>Warning: Importing might affect current to-dos.</h5>
                            <button id="import-yes" onClick={handleImport}>Yes</button>
                            <button id="import-no" onClick={closePopupImport}>No</button>
                        </div>
                    </Popup>

                    {/* Popup which allows user to filter imported results to be added to DB */}
                    <Popup open={isOpenImportResult} closeOnDocumentClick onClose={closePopupImportResult}>
                        
                        <div className='modal'>
                            <ImportResultForm importResults={importResults} 
                                                setImportResults={setImportResults} 
                                                isOpenImportResult={isOpenImportResult}
                                                setOpenImportResult={setOpenImportResult}
                                                integrateCalendarData={integrateCalendarData}
                                                processTimeNotes={processTimeNotes}
                            ></ImportResultForm>
                        </div>
                    </Popup>
                </div>
            </div>
            {/* Add project button and functionality */}
            <AddProject 
                projects={projects} 
                activeProject={activeProject} 
                setActiveProject={setActiveProject} 
                createProject={createProject}
            />
        </div>
    )
}
