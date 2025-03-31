import React from 'react';
import Task from './Task';

const PriorityList = ({ tasks, toggleTask, deleteTask, moveTask }) => {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>No tasks yet. Add one to get started!</p>
      ) : (
        tasks.map((task, index) => (
          <Task
            key={task.id}
            task={task}
            index={index}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
          />
        ))
      )}
    </div>
  );
};

export default PriorityList;