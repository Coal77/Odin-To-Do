import './style.css';
import { projectHandler } from './projectModal';


export const taskHandler = (function createTaskCards() {
    const taskDialog = document.getElementById('task-dialog');
    const closeTaskModals = taskDialog.querySelector('.close-dialog');
    const taskTitle = document.getElementById('task-title');
    const taskSubmit = document.getElementById('task-submit');
    const taskDesc = document.getElementById('task-description');
    const taskDueDate = document.getElementById('task-due-date');
    const taskPriority = document.getElementById('task-priority');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskContainer = document.getElementById('tasks-cont');

    let activeProject = null;

    function Tasks(id, title, description, dueDate, priority, completed) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = completed;
    }

    //? Show task modal
    addTaskBtn.addEventListener('click', () => {
        if(!activeProject) {
            alert('Select a project first!');
            return;
        }
        taskDialog.showModal();
    });

    //? Close task modal
    closeTaskModals.addEventListener('click', function(e) {
        e.preventDefault();
        taskDialog.close();
    });



    //? Check for project selection from the project module
    document.addEventListener('projectSelected', (e) => {
        activeProject = e.detail;
        renderTasks(activeProject);
    });

    //? Submit new task
    taskSubmit.addEventListener('click', function(e) {
        e.preventDefault();

        if(!taskTitle.value.trim()) return;

        const taskCards = new Tasks(crypto.randomUUID(), taskTitle.value, taskDesc.value, taskDueDate.value, taskPriority.value, false);
        activeProject.tasksLibrary.push(taskCards);
        //todo when there is a bug, first check this tasks library even in the project module

        //? Clear inputs
        taskTitle.value = '';
        taskDesc.value = '';
        taskDueDate.value = '';
        taskPriority.value = 'low';

        taskDialog.close();

        renderTasks();
    });

    //* Render Tasks inside selected project
    function renderTasks() {
        taskContainer.innerHTML = '';

        activeProject.tasksLibrary.forEach((task) => {
            const taskCard = document.createElement('div');

            taskCard.innerHTML = `
                <div>
                    <h4>${task.title}</h4>
                    <p>${task.description || ''}</p>
                    <p>Due: ${task.dueDate || 'None'}</p>
                    <p>Priority: ${task.priority}</p>
                </div>
                <button class="delete-task">&#x00D7</button>
            `;

            //? Delete handler
            // taskCard.querySelector('.delete-task').addEventListener('click', () => {
            //     activeProject.tasksLibrary = activeProject.tasksLibrary.filter(t => t.id !== task.id);
            //     renderTasks(project);
            // });

            taskContainer.appendChild(taskCard);
        });
    }

})();


