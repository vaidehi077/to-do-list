import React, { useEffect, useState } from 'react';
import './Home.css';
import addIcon from './add.png';
import TaskCard from './../../components/TaskCard/TaskCard';


function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [category, setCategory] = useState('');

  const addTask = () => {
    if(newTask==''){
      alert('Please enter a task')
      return
    }
    setTasks([newTask,...tasks ])
    setNewTask('')
  }

  const deleteTask = (index) => {
    const newTasks = tasks;
    newTasks.splice(index, 1);
    setTasks([...newTasks]);

    localStorage.setItem('tasks' , JSON.stringify(newTasks));
  }

  useEffect (() => {
    if(tasks.length === 0){
      return
    }
    localStorage.setItem('tasks' , JSON.stringify(tasks));
  }, {tasks})

  useEffect(() => {
    const tasks = localStorage.getItem('tasks');
    if(tasks){
      setTasks(JSON.parse(tasks));
    }
  }, [])

  return (
    <div>
      <h1 className='app-title'>ToDo-App</h1>
     
      <div className='tasks-container'>
        {
          tasks.map((task, i) => { return <TaskCard task ={task} key={i} delFunction={deleteTask} index={i}/>})
        }
      </div>
      
      <div className='input-container'>
        <input type='text' placeholder='Add a new task' className='task-input' value={newTask}
       onChange={(e) => {
        setNewTask(e.target.value)
       }}
         />
         
        <select className='category-select' value={category} onChange={(e) => setCategory(e.target.value)}> 
          <option> Category</option>
          <option value='Study'> 📝 Study</option>
          <option value='Work'> 👩🏻‍💻 Work</option>
          <option value=' Personal'> 🧘 Personal</option>
          <option value='Health'> 💪 Health </option>
          <option value='Family'>🏡 Family </option>
          <option value='Social'> 🌐 Social </option>
          <option value='Errands'> 🛒 Errands </option>
          <option value='Hobbies'> 🎵 Hobbies</option>
          <option value='Goals'> 🎯 Goals</option>
        </select>

        <img src={addIcon} alt='add' className='add-icon' onClick={addTask}/>
      </div>
    </div>
  );
}

export default Home;
