import taskManager from "../index.js";
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

    static validName = /^(?![ ])[a-zA-Zа-яА-Я0-9 ]{1,16}[^ ]$/;

    static validDescription = /^(?![ ])(?![a-zA-Zа-яА-Я0-9 ]*$).+$/;

    static validateName(name) {
        return Validator.validName.test(name);
    }

    static validateDescription(description, name) {
        return !Validator.isOnlyWhitespace(description) && description.trim() !== name;
    }

    static isOnlyWhitespace(str) {
        return /^\s*$/.test(str);
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
        this.#id =  this.generateUniqueId();
        this.#title = title;
        this.#description = description;
        this.#creationDate = creationDate || new Date(); // Используйте переданную дату или создайте новую
        this.#completionStatus = status;
    }
    generateUniqueId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    toJSON() {
        return super.toJSON('id','title', 'description','creationDate', 'completionStatus');
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

    createTaskElement(){
        const taskElement =  document.createElement('div');
        taskElement.className = 'TaskElement';
        // Создаем элементы для названия, описания и других данных задачи
        const taskTitle = document.createElement('h3');
        taskTitle.textContent = this.#title;
        taskTitle.className = 'taskTitle';
        const taskDescription = document.createElement('p');
        taskDescription.textContent = this.#description;
        taskDescription.className = 'taskDescription';
        const taskDate = document.createElement('p');
        taskDate.textContent = 'Дата создания: ' + this.#creationDate.toLocaleString();
        taskDate.className = 'taskDate';
        const statusButton = this.createStatusButton(); // Функция для создания кнопки статуса
        const editButton = document.createElement('button');
        editButton.className = 'btn btn-sm btn-primary edit-task';
        editButton.textContent = 'Редактировать';

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-sm btn-danger delete-task';
        deleteButton.textContent = 'Удалить';
        // Обработчик события для удаления задачи
        deleteButton.addEventListener('click', () => {
            console.log('Button clicked');
            const taskId = this.#id; // ID задачи
            console.log(taskId);
            taskManager.deleteTask(taskId);
            console.log(taskManager.Tasks);
        });

        taskTitle.addEventListener('click', () => {
            console.log('title clicked');
            const taskId = this.#id; // Use the ID property of the Task instance
            console.log(taskId);
             window.location.href = `details.html?id=${taskId}`;
        });
        

        // Добавляем элементы в задачу
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
        const label = this.createStatusLabel(checkbox);

        statusButton.appendChild(checkbox);
        statusButton.appendChild(label);

        return statusButton;
    }

    createCheckbox() {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
    
        checkbox.addEventListener('click', function() {
            const taskElement = this.closest('.TaskElement');
            if (taskElement) {
                const isChecked = this.checked;
                taskElement.setAttribute('data-status', isChecked ? 'Done' : 'In-progress');

                //taskManager.renderTasks();
            }
        });
    
        return checkbox;
    }
    
    createStatusLabel(checkbox) {
        const label = document.createElement('label');
        label.textContent = checkbox.checked ? 'Выполнена' : 'В процессе';
        label.className = 'status';

        return label;
    }
    
}
