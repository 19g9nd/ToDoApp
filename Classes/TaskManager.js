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
        // Преобразуйте creationDate в строку перед добавлением в localStorage
        task.creationDate = task.creationDate.toISOString();
        this.#tasks.push(task);
        this.saveTasksToLocalStorage();
        console.log(this.#tasks);
    }


    filterByInProgress() {
        const filteredTasks = this.#tasks.filter(task => task.completionStatus === false);
    }
    filterByAll() {
        const filteredTasks = this.#tasks.filter(task => task.completionStatus === true || task.completionStatus === false);
    }
    filterByDone() {
        const filteredTasks = this.#tasks.filter(task => task.completionStatus === true);
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
        // Создаем временную копию массива задач для сортировки
        const sortedTasks = [...this.#tasks];
        sortedTasks.sort((a, b) => b.creationDate - a.creationDate);

        // Обновляем интерфейс с отсортированными задачами
        this.renderTasks(sortedTasks);

        // Сохраняем отсортированный массив в localStorage
        this.#tasks = sortedTasks;
        this.saveTasksToLocalStorage();
    }

    renderTasks() {
        const tasksContainer = document.querySelector('#taskList');
        tasksContainer.innerHTML = '';
        this.#tasks.forEach((taskData) => {
            // Преобразуйте creationDate из строки обратно в объект Date
            taskData.creationDate = new Date(taskData.creationDate);

            // Создайте экземпляр класса Task на основе данных из localStorage
            const task = new Task(taskData.title, taskData.description, taskData.completionStatus, taskData.creationDate);
            const taskElement = task.createTaskElement();
            tasksContainer.appendChild(taskElement);
        });

    }

}