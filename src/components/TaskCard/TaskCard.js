import React from 'react';
import './TaskCard.css';
import deleteIcon from "./delete (1).png"

function TaskCard({ task, delFunction, index }) {
    return (
        <div className='task-card'> 
            <h1 className='task-title'>{task}</h1>   
            <img src= {deleteIcon} alt='delete' className='delete-icon' onClick={() => delFunction(index)}/>
        </div>
    );
}

export default TaskCard; 
