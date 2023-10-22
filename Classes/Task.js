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


export class Task extends ToJson {
    #id;
    #title;
    #description;
    #creationDate;
    #completionStatus;
    constructor(title, description, status = false, creationDate) {
        super();
        this.#id = Date.now().toString(36) + Math.random().toString(36).substr(2);
        this.#title = title;
        this.#description = description;
        this.#creationDate = creationDate || new Date(); // Используйте переданную дату или создайте новую
        this.#completionStatus = status;
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



    createTaskElement(){
        const taskElement =  document.createElement('div');
        taskElement.className = 'TaskElement';

        taskElement.setAttribute('data-task-id', this.#id); // Устанавливаем значение атрибута data-task-id равным ID задачи
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
        checkbox.checked = this.#completionStatus;


        checkbox.addEventListener('click', function() {
            this.completionStatus = this.checked;
            const taskElement = this.closest('.TaskElement');
            taskElement.setAttribute('data-status', this.completionStatus ? 'Done' : 'In-progress');
        }.bind(checkbox));


        return checkbox;
    }

    createStatusLabel(checkbox) {
        const label = document.createElement('label');
        label.textContent = checkbox.checked ? 'Выполнена' : 'В процессе';
        label.className = 'status';

        return label;
    }
}
