class TaskManager {
    #tasks = [];
    constructor() {
       // this.#tasks = this.loadTasksFromLocalStorage(); // Загрузижение задач из localStorage
        this.renderTasks(); // Перерисовывание задач на странице
      //  console.log(this.loadTasksFromLocalStorage());

    }
    // Метод для загрузки задач из localStorage
    loadTasksFromLocalStorage() {
        const storedTasks = localStorage.getItem('TASKS');
        return JSON.parse(storedTasks) || [];
    }
getTasks(){
        return this.#tasks;
}

    // Метод для сохранения задач в localStorage
    saveTasksToLocalStorage() {
        localStorage.setItem('TASKS', JSON.stringify(this.#tasks));
    }
    deleteTask(taskId) {
        // Find the index of the task with the matching ID
        const taskIndex = this.#tasks.findIndex(task => task.getId() === taskId);
        this.#tasks.splice(taskIndex, 1);
            //this.saveTasksToLocalStorage(); // Save the updated tasks
        this.renderTasks();

    }

    addTask(task) {
        this.#tasks.push(task);
        console.log(this.#tasks);
        // После добавления задачи, сохраняем обновленный список в localStorage
       // this.saveTasksToLocalStorage();
    }
    filterByInProgress() {
        return this.#tasks.filter(task => task.getCompletionStatus() === false);
    }

    filterByDone() {
        return this.#tasks.filter(task => task.getCompletionStatus() === true);
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
        this.#tasks.forEach((task) => {
            const taskElement = task.createTaskElement();
            tasksContainer.appendChild(taskElement);
        });
        // this.#tasks.forEach((taskData) => { // taskData вместо task
        //     // экземпляр класса Task на основе данных из localStorage
        //     const task = new Task(taskData.title, taskData.description, taskData.completionStatus);
        //     const taskElement = task.createTaskElement();
        //     tasksContainer.appendChild(taskElement);
        // });

    }
}
