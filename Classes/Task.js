import TaskManager from "./TaskManager.js";
class ToJson {
    toJSON() {
        const jsonable = {};

        for (const key of arguments) {
            jsonable[key] = this[key];
        }

        return jsonable;
    }
}

export class Validator {
    static validCharacters = /^[a-zA-Zа-яА-Я0-9]+$/;

    static wordCategory = /^(?:[a-zA-Z]+|[а-яА-Я]+|\d+)$/;

    static wordLength = /^.{1,16}$/;

    static validName = /^(?! )[a-zA-Zа-яА-Я0-9]+(?: [a-zA-Zа-яА-Я0-9]+)+[^ ]$/;

    static validDescription = /^(?! )(?![a-zA-Zа-яА-Я0-9 ]*$).+$/;

    static validateName(name) {
        if (Validator.validName.test(name)) {
            if (!/^\s/.test(name) && !/\s$/.test(name)) {
                const words = name.trim().split(' ');
                if (words.length >= 2) {
                    if (!words.every(word => /^\d+$/.test(word))) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    static validDescription(description) {
        if (!Validator.validDescription.test(description)) {
            alert("Описание не валидно")
    }
}

    static validateWord(word) {
        return Validator.wordCategory.test(word);
    }

    static validateWordLength(word) {
        return Validator.wordLength.test(word);
    }

    static validateCharacters(str) {
        return Validator.validCharacters.test(str);
    }
}

export class Task extends ToJson {
    #id;
    #title;
    #description;
    #creationDate;
    #completionStatus;

    constructor(title, description, status = false, creationDate) {
        super();
        this.#id = this.generateUniqueId();
        this.#title = title;
        this.#description = description;
        this.#creationDate = creationDate || new Date();
        this.#completionStatus = status;
    }

    generateUniqueId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    toJSON() {
        return super.toJSON('id', 'title', 'description', 'creationDate', 'completionStatus');
    }

    get id() {
        return this.#id;
    }

    get title() {
        return this.#title;
    }

    get description() {
        return this.#description;
    }

    get creationDate() {
        return this.#creationDate;
    }

    get completionStatus() {
        return this.#completionStatus;
    }

    set title(value) {
        this.#title = value;
    }

    set description(value) {
        this.#description = value;
    }

    set creationDate(value) {
        this.#creationDate = value;
    }

    set completionStatus(value) {
        this.#completionStatus = value;
    }

    set id(value) {
        this.#id = value;
    }

    createTaskElement() {
        const taskElement = document.createElement('div');
        taskElement.className = 'TaskElement';

        const taskTitle = document.createElement('h3');
        taskTitle.textContent = this.#title;
        taskTitle.className = 'taskTitle';

        const taskDescription = document.createElement('p');
        taskDescription.textContent = this.#description;
        taskDescription.className = 'taskDescription';

        const taskDate = document.createElement('p');
        taskDate.textContent = 'Дата создания: ' + this.#creationDate.toLocaleString();
        taskDate.className = 'taskDate';

        const statusButton = this.createStatusButton();

        const editButton = document.createElement('button');
        editButton.className = 'btn btn-sm btn-primary edit-task';
        editButton.textContent = 'Редактировать';

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-sm btn-danger delete-task';
        deleteButton.textContent = 'Удалить';

        deleteButton.addEventListener('click', () => {
            const taskId = this.#id;
            taskManager.deleteTask(taskId);
        });

        editButton.addEventListener('click', () => {
            const taskId = this.#id;
            window.location.href = `edit.html?id=${taskId}`;
        });

        taskTitle.addEventListener('click', () => {
            const taskId = this.#id;
            window.location.href = `details.html?id=${taskId}`;
        });

        const status = this.#completionStatus ? 'Done' : 'In-progress';
        taskElement.setAttribute('data-status', status);

        taskElement.appendChild(taskTitle);
        taskElement.appendChild(taskDescription);
        taskElement.appendChild(taskDate);
        taskElement.appendChild(statusButton);
        taskElement.appendChild(editButton);
        taskElement.appendChild(deleteButton);

        return taskElement;
    }

    createStatusButton() {
        const statusButton = document.createElement('div');
        statusButton.className = 'btn-group';

        const checkbox = this.createCheckbox();
        statusButton.appendChild(checkbox);

        return statusButton;
    }

    createCheckbox() {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        checkbox.addEventListener('click', () => {
            const taskElement = checkbox.closest('.TaskElement');
            if (taskElement) {
                const isChecked = checkbox.checked;
                taskElement.setAttribute('data-status', isChecked ? 'Done' : 'In-progress');
            }
        });

        return checkbox;
    }
}

