import React from 'react'

export default function WeeklyTodoItem({todo}) {
    return (
        // displays the title of the todo on the weekly view page
        <div className="weeklyTodoItem">
            <h4>{todo.title}</h4>
        </div>
    )
}
