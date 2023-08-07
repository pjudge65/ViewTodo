import React, {useState, useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import ToDoDisplay from './ToDoDisplay';
import Sidebar from './Sidebar';
import MainDailyContainer from './MainDailyContainer';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


export default function DailyView({todos, setTodos, loadTodos, weekNav, setWeekNav, onDeleteTodo, projects, activeProject, setActiveProject, createProject, undoRedoActions, setUndoRedo, redoActions, setRedoActs, createTodo, dailyPopupOpen, setDailyPopup}) {
    // 
    // The Main container for all Daily View components
    // 

    // takes the date that is clicked on "WeeklyView" and saves it for use in daily view
    const location = useLocation();
    const [date, changeDate] = useState(location.state.date)
    console.log(location)
    // const date  = location.state.date;

    // controls whether the informative popup is displayed or not
    const closePopup = () => setDailyPopup(false);

    const decDate = function(e){
        e.preventDefault();
        let new_date = new Date(date)
        new_date.setDate(new_date.getDate()-1);
        if (new_date.getDay()===0){
            setWeekNav(weekNav-1)
        }

        changeDate(new_date);
    }

    const incDate = function(e){
        e.preventDefault();
        let new_date = new Date(date);
        new_date.setDate(new_date.getDate()+1);
        if (new_date.getDay()===1){
            setWeekNav(weekNav+1)
        }
        changeDate(new_date);
    }

    
    return (
        <div id="container">
            {/* Contains Projects as well as Return/Import */}
            <button id="day-nav-left" onClick={decDate}>&#60;</button>
            <button id="day-nav-right" onClick={incDate}>&#62;</button>
            <Sidebar 
                todos={todos} 
                loadTodos={loadTodos} 
                onDeleteTodo={onDeleteTodo} 
                date={date} 
                undoRedoActions={undoRedoActions} 
                setUndoRedo={setUndoRedo}
                projects={projects}
                activeProject={activeProject}
                setActiveProject={setActiveProject}
                createProject={createProject}
                setRedoActs={setRedoActs}
            />
            {/* Contains TodoHeader and MainDailyContainer(contains to-do list) */}
            <MainDailyContainer 
                todos={todos} 
                setTodos={setTodos} 
                loadTodos={loadTodos} 
                onDeleteTodo={onDeleteTodo} 
                date={date}
                undoRedoActions={undoRedoActions}
                setUndoRedo={setUndoRedo}
                redoActions={redoActions}
                setRedoActs={setRedoActs}
                createTodo={createTodo}
                projects={projects}
                activeProject={activeProject}
                setActiveProject={setActiveProject}
                dailyPopupOpen={dailyPopupOpen}
                setDailyPopup={setDailyPopup}
            />

            {/* Informative Popup displaying instructions */}
            <button type="button" className="button" id="daily-popup-btn" onClick={()=>setDailyPopup(open=> !open)}>?</button>
            <Popup 
                open={dailyPopupOpen} 
                modal 
                nested 
                onClose={closePopup}
                contentStyle={{width:"auto", textAlign:"center"}}
            >
                <div className='modal'>
                <h2>This is The Daily View</h2>
                <h4>* You can create a new to-do by clicking on </h4>
                <h4> the "+" at the bottom of the screen</h4>
                <h4>* Create Projects to display filtered todos</h4>
                <h4>* To Integrate Calendar Data:</h4>
                <h4>Click "Import" in the top-left corner</h4>
                </div>
            </Popup>
        </div>
    )
}
