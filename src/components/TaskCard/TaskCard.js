import React from 'react';
import './TaskCard.css';
import deleteIcon from "./delete (1).png"

function TaskCard({ title,category, delFunction, index }) {
    return (
        <div className='task-card'> 
            <h1 className='task-title'>{title}</h1>
               <span className='task-category'>{category}</span>
            <img src= {deleteIcon} alt='delete' className='delete-icon' onClick={() => delFunction(index)}/>
        </div>
    );
}

export default TaskCard; 
