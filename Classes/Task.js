class Task {

    constructor(name,description,status ='in-progress') {
        this.name = name;
        this.description = description;
        this.status = status;
        this.date = new Date();
    }
    createTaskElement(){
        const taskElement =  document.createElement('div');
        taskElement.className = 'TaskElement';
        taskElement.setAttribute('data-status', this.status); // По умолчанию - "В процессе"
        // Создаем элементы для названия, описания и других данных задачи
        const taskTitle = document.createElement('h3');
        taskTitle.textContent = this.name;

        const taskDescription = document.createElement('p');
        taskDescription.textContent = this.description;

        const taskDate = document.createElement('p');
        taskDate.textContent = 'Дата создания: ' + this.date.toLocaleString();

        const statusButton = this.createStatusButton(); // Функция для создания кнопки статуса

        const editButton = document.createElement('button');
        editButton.className = 'btn btn-sm btn-primary edit-task';
        editButton.textContent = 'Редактировать';

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-sm btn-danger delete-task';
        deleteButton.textContent = 'Удалить';

        // Добавляем элементы в задачу
        taskElement.appendChild(taskTitle);
        taskElement.appendChild(taskDescription);
        taskElement.appendChild(taskDate);
        taskElement.appendChild(statusButton);
        taskElement.appendChild(editButton);
        taskElement.appendChild(deleteButton);

        return taskElement;
    }

    createStatusButton(){
        const statusButton = document.createElement('div');
        statusButton.className = 'btn-group';

        const dropdownButton = document.createElement('button');
        dropdownButton.className = 'btn btn-secondary dropdown-toggle';
        dropdownButton.textContent = this.status === 'in-progress' ? 'В процессе' : 'Выполнена';

        const dropdownMenu = document.createElement('div');
        dropdownMenu.className = 'dropdown-menu';

        const inProgressItem = document.createElement('a');
        inProgressItem.className = 'dropdown-item';
        inProgressItem.href = '#';
        inProgressItem.textContent = 'В процессе';
        inProgressItem.addEventListener('click', () => {
            dropdownButton.textContent = 'В процессе';
            this.status = 'in-progress';
        });

        const doneItem = document.createElement('a');
        doneItem.className = 'dropdown-item';
        doneItem.href = '#';
        doneItem.textContent = 'Выполнена';
        doneItem.addEventListener('click', () => {
            dropdownButton.textContent = 'Выполнена';
            this.status = 'done';
        });

        dropdownMenu.appendChild(inProgressItem);
        dropdownMenu.appendChild(doneItem);
        dropdownButton.addEventListener('click', () => {
            dropdownMenu.classList.toggle('show');
        });
        statusButton.appendChild(dropdownButton);
        statusButton.appendChild(dropdownMenu);

        return statusButton;
    }

}
