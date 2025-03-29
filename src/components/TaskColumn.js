import React from 'react';
import TaskCard from './TaskCard';

function TaskColumn({ title, tasks, onDelete, onToggleComplete, onEdit, columnClass }) {
  return (
    <div className={columnClass}>
      <h3>{title}</h3>
      <div>
        {tasks.map(task => (
          <TaskCard 
            key={task.id}
            task={task}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskColumn;
