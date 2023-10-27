import React, { useEffect, useState } from 'react';
import WeeklyTodoItem from './WeeklyTodoItem';

export default function WeeklyDayView({date, displayDaily, todos}) {

	// uses this list against getDay() to populate weekday names
	const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
	let day = days[date.getDay()];
	let month = months[date.getMonth()];

	// filters todos by day on the weekly view
	const filterFunction = function(value, index, array){
		let todoDate = new Date(value.dueDate);
		return todoDate.toLocaleDateString() == date.toLocaleDateString();
	  }

	// navigates to the chosen daily view
	const handleClick = function(e){
		e.preventDefault();
		displayDaily(date);
	}


	return (
		// displays the date as well as the todos for that date
		<div className="weeklyDay" id="monday-weekly" onClick={handleClick}>
			<h4>{day}</h4>
			<h1>{`${month} ${date.getDate()}`}</h1>
			<div className="weekly-todo-display">
				{todos.filter(filterFunction).map(todo => {
					return <WeeklyTodoItem key={todo._id} todo={todo} />
				})}
			</div>
		</div>
	)
}
