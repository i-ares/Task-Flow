let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let taskId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
let editId = null;

document.getElementById('addTaskBtn').addEventListener('click', addTask);

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const title = document.getElementById('taskTitle').value;
    const details = document.getElementById('taskDetails').value;
    const deadline = document.getElementById('taskDeadline').value;

    if (!title) {
        alert('Please enter a task title');
        return;
    }

    if (editId === null) {
        tasks.push({
            id: taskId++,
            title,
            details,
            deadline,
            completed: false
        });
    } else {
        const taskIndex = tasks.findIndex(t => t.id === editId);
        tasks[taskIndex] = {
            ...tasks[taskIndex],
            title,
            details,
            deadline
        };
        editId = null;
    }

    saveTasks();
    renderTasks();
    clearForm();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        document.getElementById('taskTitle').value = task.title;
        document.getElementById('taskDetails').value = task.details;
        document.getElementById('taskDeadline').value = task.deadline;
        editId = id;
    }
}

function renderTasks() {
    const incompleteContainer = document.getElementById('incompleteTasks');
    const completedContainer = document.getElementById('completedTasks');
    
    incompleteContainer.innerHTML = '';
    completedContainer.innerHTML = '';

    tasks.forEach(task => {
        const taskCard = createTaskCard(task);
        if (task.completed) {
            completedContainer.innerHTML += taskCard;
        } else {
            incompleteContainer.innerHTML += taskCard;
        }
    });

    
}

function createTaskCard(task) {
    return `
        <div class="task-card ${task.completed ? 'completed-task' : ''}">
            <div class="task-header">
                <div class="task-title">${task.title}</div>
                ${task.deadline ? `
                    <div class="task-deadline">
                        <span class="${task.completed ? 'strike-text' : ''}">
                            <span class="deadline-label">Due:</span>
                            ${new Date(task.deadline).toLocaleDateString('en-US', {
                                weekday: 'short', 
                                year: 'numeric', 
                                month: 'short', 
                                day: 'numeric'
                            })}
                        </span>
                    </div>
                ` : ''}
            </div>
            <div class="task-details">${task.details}</div>
            <div class="task-actions">
                <button class="${task.completed ? 'incomplete-btn' : 'complete-btn'}" 
                        onclick="toggleComplete(${task.id})">
                    ${task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                </button>
                <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        </div>
    `;
}


function clearForm() {
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDetails').value = '';
    document.getElementById('taskDeadline').value = '';
}

// Initial render
renderTasks();
