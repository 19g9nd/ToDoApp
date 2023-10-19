class TaskManager {
    #tasks = [];
    constructor() {
        this.#tasks = this.loadTasksFromLocalStorage(); // Загрузижение задач из localStorage
        this.renderTasks(); // Перерисовывание задач на странице
        console.log(this.loadTasksFromLocalStorage());

    }
    // Метод для загрузки задач из localStorage
    loadTasksFromLocalStorage() {
        const storedTasks = localStorage.getItem('TASKS');
        return JSON.parse(storedTasks) || [];
    }

    // Метод для сохранения задач в localStorage
    saveTasksToLocalStorage() {
        localStorage.setItem('TASKS', JSON.stringify(this.#tasks));
    }
    addTask(task) {
        this.#tasks.push(task);
        // После добавления задачи, сохраняем обновленный список в localStorage
        this.saveTasksToLocalStorage();
    }
    filterByInProgress() {
        return this.#tasks.filter(task => task.getCompletionStatus() === 'in-progress');
    }

    filterByDone() {
        return this.#tasks.filter(task => task.getCompletionStatus() === 'done');
    }
    sortByName() {
        this.#tasks.sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });
    }

    sortByDate() {
        this.#tasks.sort((a, b) => b.getCreationDate() - a.getCreationDate());
    }

    renderTasks() {
        const tasksContainer = document.querySelector('#taskList');
        tasksContainer.innerHTML = '';

        this.#tasks.forEach((taskData) => { // taskData вместо task
            // экземпляр класса Task на основе данных из localStorage
            const task = new Task(taskData.title, taskData.description, taskData.completionStatus);
            const taskElement = task.createTaskElement();
            tasksContainer.appendChild(taskElement);
        });

    }
}
