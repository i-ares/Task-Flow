import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskColumn from './components/TaskColumn';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('taskflow_tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const [editId, setEditId] = useState(null);
  const [taskId, setTaskId] = useState(() => {
    const savedTasks = localStorage.getItem('taskflow_tasks');
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      return parsedTasks.length > 0 ? Math.max(...parsedTasks.map(t => t.id)) + 1 : 1;
    }
    return 1;
  });

  useEffect(() => {
    localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title, details, deadline) => {
    if (!title) {
      alert('Please enter a task title');
      return;
    }

    if (editId === null) {
      setTasks([...tasks, {
        id: taskId,
        title,
        details,
        deadline,
        completed: false
      }]);
      setTaskId(taskId + 1);
    } else {
      setTasks(tasks.map(task => 
        task.id === editId 
          ? { ...task, title, details, deadline } 
          : task
      ));
      setEditId(null);
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, completed: !task.completed } 
        : task
    ));
  };

  const startEdit = (id) => {
    setEditId(id);
    return tasks.find(task => task.id === id);
  };

  const cancelEdit = () => {
    setEditId(null);
  };

  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="container">
      <Header />
      <TaskForm 
        addTask={addTask} 
        editId={editId} 
        startEdit={startEdit}
        tasks={tasks}
        onCancelEdit={cancelEdit} 
      />
      <div className="tasks-container">
        <TaskColumn 
          title="Active Tasks" 
          tasks={activeTasks} 
          onDelete={deleteTask}
          onToggleComplete={toggleComplete}
          onEdit={startEdit}
          columnClass="active-column"
        />
        <TaskColumn 
          title="Completed Tasks" 
          tasks={completedTasks} 
          onDelete={deleteTask}
          onToggleComplete={toggleComplete}
          onEdit={startEdit}
          columnClass="completed-column"
        />
      </div>
    </div>
  );
}

export default App;
