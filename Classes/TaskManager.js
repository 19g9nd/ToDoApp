class TaskManager {
    constructor() {
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }
    filterByInProgress() {
        return this.tasks.filter(task => task.status === 'in-progress');
    }

    filterByDone() {
        return this.tasks.filter(task => task.status === 'done');
    }
    renderTasks() {
        const tasksContainer = document.querySelector('#taskList');
        tasksContainer.innerHTML = '';

        this.tasks.forEach((task) => {
            const taskElement = task.createTaskElement();
            tasksContainer.appendChild(taskElement);
        });
    }
}
