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
get Tasks(){
        return this.#tasks;
}

    // Метод для сохранения задач в localStorage
    saveTasksToLocalStorage() {
       // debugger;
        const jsonStr = JSON.stringify(this.#tasks);
        localStorage.setItem('TASKS', jsonStr);
    }
    deleteTask(taskId) {
        // Find the index of the task with the matching ID
        const taskIndex = this.#tasks.findIndex(task => task.id === taskId);
        this.#tasks.splice(taskIndex, 1);
        this.saveTasksToLocalStorage();
        this.renderTasks();

    }

    addTask(task) {
        this.#tasks.push(task)
        console.log(this.#tasks);
        // После добавления задачи, сохраняем обновленный список в localStorage
        this.saveTasksToLocalStorage();
    }
    filterByInProgress() {
      return this.#tasks.filter(task => task.completionStatus === false);
    }

    filterByDone() {
        return this.#tasks.filter(task => task.completionStatus === true);
    }

    sortByName() {
        const sortedTasks = [...this.#tasks]; // Создаем копию массива задач
        sortedTasks.sort((a, b) => {
            const nameA = a.title.toLowerCase();
            const nameB = b.title.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });
        this.#tasks = sortedTasks; // Присваиваем отсортированный массив обратно
    }


    sortByDate() {
        this.#tasks.sort((a, b) => b.creationDate - a.creationDate);
    }

    renderTasks() {
        const tasksContainer = document.querySelector('#taskList');
        tasksContainer.innerHTML = '';

        this.#tasks.forEach((taskData) => {
            let task = this.#tasks.find(t => t.id === taskData.id);
            if (!task) {
                // Если задачи с данным ID еще нет в массиве, создаем новый экземпляр
                task = new Task(taskData.title, taskData.description, taskData.completionStatus);
                this.#tasks.push(task); // Добавляем его в массив задач
            }

            const taskElement = task.createTaskElement();
            tasksContainer.appendChild(taskElement);
        });
    }

}