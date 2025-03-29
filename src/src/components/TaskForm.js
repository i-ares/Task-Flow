import React, { useState, useEffect } from 'react';

function TaskForm({ addTask, editId, startEdit, tasks }) {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [deadline, setDeadline] = useState('');

  useEffect(() => {
    if (editId !== null) {
      const taskToEdit = tasks.find(task => task.id === editId);
      if (taskToEdit) {
        setTitle(taskToEdit.title);
        setDetails(taskToEdit.details);
        setDeadline(taskToEdit.deadline);
      }
    }
  }, [editId, tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(title, details, deadline);
    clearForm();
  };

  const clearForm = () => {
    setTitle('');
    setDetails('');
    setDeadline('');
  };

  return (
    <div className="input-group">
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title" 
        />
        <textarea 
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Task details"
        ></textarea>
        <input 
          type="date" 
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <button type="submit" className="add-btn">
          {editId === null ? 'Add Task' : 'Update Task'}
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
