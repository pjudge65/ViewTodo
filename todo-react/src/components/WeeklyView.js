import React, {useState, useEffect} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useNavigate } from "react-router-dom";
import WeeklyDayView from './WeeklyDayView';
import AddToDo from './AddToDo';

export default function WeeklyView({dates, todos, setTodos, loadTodos, createTodo, projects, wklyPopupOpen, setWklyPopup}) {

  let navigate = useNavigate();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const todaysDate = new Date();

  // controls the display of the informative popup
  const closePopup = () => setWklyPopup(false);

  // navigates to the daily view with the chosen date as a variable
  const displayDaily = function(date){
    let newPath = '/daily-view';
    let dateString = date.toLocaleDateString();
    navigate(newPath, {
        state: {
            date: date
        }
    });
  }

  return (
    <div>
      <div id="weekly-header">
        {/* The title of the app and the informative popup button */}
        <h1>VieuxTodo</h1>
        <button type="button" className="button" id="weekly-popup-btn" onClick={()=>setWklyPopup(open=> !open)}>?</button>
      </div>

      {/* Displays the todo information for each of the given days */}
      <div id="weekly-view-container">
          {dates.map((date, idx) => 
              <WeeklyDayView key={idx} date={date} displayDaily={displayDaily} todos={todos}/>
          )}
          {/* Weekly view contains an add to-do button as well */}
          <AddToDo todos={todos} setTodos={setTodos} loadTodos={loadTodos} date={todaysDate} createTodo={createTodo} projects={projects}/>

      </div>
      
      {/* The informative popup that opens when the apps opens */}
      <Popup 
          open={wklyPopupOpen} 
          modal 
          nested 
          onClose={closePopup}
          contentStyle={{width:"auto", textAlign:"center"}}
        
      >
          <div className='modal'>
            <h1>Welcome to VieuxTodo</h1>
            <h3>This is the "Weekly View"</h3>
            <h4>You can create a to-do by clicking on the "+" </h4>
            <h4>at the bottom of the screen</h4>
            <h3>To Display the "Daily View":</h3>
            <h4>Click on any day of the week to continue</h4>
          </div>
      </Popup>
    </div>
  )
}
