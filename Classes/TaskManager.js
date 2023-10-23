import {Task} from "./Task.js";

export default class TaskManager {
    #tasks = [];
    constructor() {
        this.#tasks = this.loadTasksFromLocalStorage(); // Загрузижение задач из localStorage
        this.renderTasks(); // Перерисовывание задач на странице
        console.log(this.loadTasksFromLocalStorage());
    }
    // Метод для загрузки задач из localStorage
    loadTasksFromLocalStorage() {
        const storedTasks = JSON.parse(localStorage.getItem('TASKS')) || [];
        return storedTasks.map((task) => {
            const loadedTask = new Task(task.title, task.description, task.completionStatus, new Date(task.creationDate));
            loadedTask.id = task.id;
            return loadedTask;
        });
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
        task.creationDate = task.creationDate.toLocaleString();
        this.#tasks.push(task);
        this.saveTasksToLocalStorage();
        console.log(this.#tasks);
    }


    filterByInProgress() {
        const filteredTasks = this.#tasks.filter(task => task.completionStatus === false);
        this.renderTasks(filteredTasks);
    }
    filterByAll() {
        const filteredTasks = this.#tasks.filter(task => task.completionStatus === true || task.completionStatus === false);
        this.renderTasks(filteredTasks);
    }
    filterByDone() {
        //bug completionStatus не передается правильно
        debugger;
        console.log(this.#tasks);
        const filteredTasks = this.#tasks.filter(task => task.completionStatus === true);
        this.renderTasks(filteredTasks);
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
        const sortedTasks = [...this.#tasks];
        sortedTasks.sort((a, b) => b.creationDate.getTime() - a.creationDate.getTime());
        this.#tasks = sortedTasks;
    }


    renderTasks(tasksToDisplay = this.#tasks) {
        const tasksContainer = document.querySelector('#taskList');
        tasksContainer.innerHTML = '';
        tasksToDisplay.forEach((task) => {
            const taskElement = task.createTaskElement();
            tasksContainer.appendChild(taskElement);
        });
    }

}