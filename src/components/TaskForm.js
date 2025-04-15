import React, { useState, useEffect } from 'react';

function TaskForm({ addTask, editId, startEdit, tasks, onCancelEdit }) {
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
    } else {
      clearForm();
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

  const handleCancel = () => {
    clearForm();
    onCancelEdit();
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
        <div className="form-buttons">
          <button type="submit" className="add-btn">
            {editId === null ? 'Add Task' : 'Update Task'}
          </button>
          {editId !== null && (
            <button type="button" className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
