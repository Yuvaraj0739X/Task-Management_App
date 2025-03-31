import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DarkModeToggle from './components/DarkModeToggle';
import TaskForm from './components/TaskForm';
import PriorityList from './components/PriorityList';
import './App.css';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [activeList, setActiveList] = useState('My Day');

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('myDayTasks')) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('myDayTasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    const newTask = {
      id: Date.now(),
      text: task.text,
      date: task.date,
      priority: task.priority,
      completed: false
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const moveTask = (dragIndex, hoverIndex) => {
    const draggedTask = tasks[dragIndex];
    const newTasks = [...tasks];
    newTasks.splice(dragIndex, 1);
    newTasks.splice(hoverIndex, 0, draggedTask);
    setTasks(newTasks);
  };

  const getCurrentDate = () => {
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    return new Date().toLocaleDateString('en-US', options);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
        <div className="sidebar">
          <div className="sidebar-header">
            <h1>Task Manager</h1>
            <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          </div>
          
          <div className="sidebar-menu">
            <div 
              className={`menu-item ${activeList === 'My Day' ? 'active' : ''}`}
              onClick={() => setActiveList('My Day')}
            >
              My Day
            </div>
          </div>
        </div>

        <div className="main-content">
          <header>
            <h2>My Day</h2>
            <p>{getCurrentDate()}</p>
          </header>

          <div className="content-section">
            <h3>Focus on your day</h3>
            <p>Get things done with My Day, a list that refreshes every day.</p>
            
            <TaskForm addTask={addTask} />
            
            <PriorityList 
              tasks={tasks} 
              toggleTask={toggleTask} 
              deleteTask={deleteTask} 
              moveTask={moveTask}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default App;