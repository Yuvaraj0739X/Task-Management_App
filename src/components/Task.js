import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const Task = ({ task, index, toggleTask, deleteTask, moveTask }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'TASK',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveTask(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const priorityColors = {
    high: '#ff6b6b',
    medium: '#ffd166',
    low: '#06d6a0'
  };

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`task ${isDragging ? 'dragging' : ''}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
        />
        <div className="task-details">
          <span className={`task-text ${task.completed ? 'completed' : ''}`}>
            {task.text}
          </span>
          {task.date && (
            <span className="task-date">
              {new Date(task.date).toLocaleDateString()}
            </span>
          )}
        </div>
        <div 
          className="priority-indicator"
          style={{ backgroundColor: priorityColors[task.priority] }}
        ></div>
      </div>
      <button 
        className="delete-task"
        onClick={() => deleteTask(task.id)}
      >
        ×
      </button>
    </div>
  );
};

export default Task;