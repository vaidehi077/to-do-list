import React, { useEffect, useState } from 'react';
import './Home.css';
import addIcon from './add.png';
import TaskCard from './../../components/TaskCard/TaskCard';

function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState('');
  const [category, setCategory] = useState('');

  const saveTasksToLS = (tasksToSave) => {
    localStorage.setItem('tasks', JSON.stringify(tasksToSave));
  }

const validateNewTasks = () =>
 { if (newTask === '') {
  setError('Please enter a task');
  return false;
} else if (newTask.length < 5) {
  setError('Task must be at least 5 characters long!');
  return false;
} else {
  setError('');
  return true;
}}

  const addTask = () =>
   {
   const validationResult = validateNewTasks();
   if(!validationResult) return;

    const newTasks = [{
      title: newTask,
      category: category,
    },
    ...tasks
  ];
    saveTasksToLS(newTasks);
    setTasks(newTasks);
    setNewTask('');
  }

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    saveTasksToLS(newTasks);
  }

  useEffect(() => {
    if (tasks.length === 0) {
      return;
    }
    saveTasksToLS(tasks);
  }, [tasks])

  useEffect(() => {
    const tasksFromLocalStorage = localStorage.getItem('tasks');
    if (tasksFromLocalStorage) {
      setTasks(JSON.parse(tasksFromLocalStorage));
    }
  }, [])

  return (
    <div>
      <h1 className='app-title'>ToDo-App</h1>
     
      <div className='tasks-container'>
        {

         tasks.map((task, i) => {
          const {title , category} = task; 

          return (
          <TaskCard 
           title={title} 
           category= {category}
            key={i} delFunction={deleteTask} 
            index={i} />)
         })
         };
      </div>

      <p className='error-msg'>{error}</p>

      <div className='input-container'>
        <input
          type='text'
          placeholder='Add a new task'
          className='task-input'
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <select
          className='category-select'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Category</option>
          <option value='Study'>📝 Study</option>
          <option value='Work'>👩🏻‍💻 Work</option>
          <option value='Personal'>🧘 Personal</option>
          <option value='Health'>💪 Health</option>
          <option value='Family'>🏡 Family</option>
          <option value='Social'>🌐 Social</option>
          <option value='Errands'>🛒 Errands</option>
          <option value='Hobbies'>🎵 Hobbies</option>
          <option value='Goals'>🎯 Goals</option>
        </select>
        <img src={addIcon} alt='add' className='add-icon' onClick={addTask} />
      </div>
    </div>
  );
}

export default Home;
