import React from 'react';

function TaskCard({ task, onDelete, onToggleComplete, onEdit }) {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };

  return (
    <div className={`task-card ${task.completed ? 'completed-task' : ''}`}>
      <div className="task-header">
        <div className="task-title">{task.title}</div>
        {task.deadline && (
          <div className="task-deadline">
            <span className={task.completed ? 'strike-text' : ''}>
              <span className="deadline-label">Due:</span>
              {formatDate(task.deadline)}
            </span>
          </div>
        )}
      </div>
      <div className="task-details">{task.details}</div>
      <div className="task-actions">
        <button 
          className={task.completed ? 'incomplete-btn' : 'complete-btn'}
          onClick={() => onToggleComplete(task.id)}
        >
          {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
        </button>
        <button 
          className="edit-btn" 
          onClick={() => onEdit(task.id)}
        >
          Edit
        </button>
        <button 
          className="delete-btn" 
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
