class Task {
    #id;
    #title;
    #description;
    #creationDate;
    #completionStatus;
    constructor(title, description, status = false) {
        this.#id = Date.now().toString(36) + Math.random().toString(36).substr(2);
        this.#title = title;
        this.#description = description;
        this.#creationDate = new Date();
        this.#completionStatus = status;
    }
    getId() {
        return this.#id;
    }

    getTitle() {
        return this.#title;
    }

    getDescription() {
        return this.#description;
    }

    getCreationDate() {
        return this.#creationDate;
    }

    getCompletionStatus() {
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
        //taskElement.setAttribute('data-status', this.#completionStatus); // По умолчанию - "В процессе" (не работает)
        // Создаем элементы для названия, описания и других данных задачи
        const taskTitle = document.createElement('h3');
        taskTitle.textContent = this.#title;

        const taskDescription = document.createElement('p');
        taskDescription.textContent = this.#description;

        const taskDate = document.createElement('p');
        taskDate.textContent = 'Дата создания: ' + this.#creationDate.toLocaleString();

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
            const taskId = this.getId(); // ID задачи
            console.log(taskId);
            taskManager.deleteTask(taskId);
            console.log(taskManager.getTasks());
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

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = this.#completionStatus;

        const label = document.createElement('label');
        label.textContent = this.#completionStatus ? 'Выполнена' : 'В процессе';

        checkbox.addEventListener('change', () => {
            this.#completionStatus = checkbox.checked;
            label.textContent = checkbox.checked ? 'Выполнена' : 'В процессе';
        });

        statusButton.appendChild(checkbox);
        statusButton.appendChild(label);

        return statusButton;
    }


}
