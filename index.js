const taskManager = new TaskManager();

document.querySelector('#taskAddButton').addEventListener('click', () => {
    const taskName = document.querySelector('#taskTitle').value;
    const taskDescription = document.querySelector('#taskDescription').value;
       if (!taskName.value || !taskDescription.value) {
         return;
     }
    const newTask = new Task(taskName, taskDescription);
    taskManager.addTask(newTask);
     // Очищаем поля ввода
    taskName.value = '';
    taskDescription.value = '';
    taskManager.renderTasks();
});

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault(); // Предотвращаем отправку формы
});



// const tasks = document.querySelector('#taskList');
// const name = document.querySelector('#taskTitle');
// const description = document.querySelector('#taskDescription');
// const addBtn = document.querySelector('#taskAddButton');
//
// function isValidTask() {
//     if (!name.value || !description.value) {
//         return;
//     }
//
//     // Создаем элемент DIV для задачи
//     const task = document.createElement('div');
//     task.className = 'task';
//     task.setAttribute('data-status', 'in-progress'); // По умолчанию - "В процессе"
//     // Создаем элементы для названия, описания и других данных задачи
//     const taskTitle = document.createElement('h3');
//     taskTitle.textContent = name.value;
//
//     const taskDescription = document.createElement('p');
//     taskDescription.textContent = description.value;
//
//     const taskDate = document.createElement('p');
//     taskDate.textContent = 'Дата создания: ' + new Date().toLocaleDateString();
//
//     const statusButton = createStatusButton(); // Функция для создания кнопки статуса
//
//     const editButton = document.createElement('button');
//     editButton.className = 'btn btn-sm btn-primary edit-task';
//     editButton.textContent = 'Редактировать';
//
//     const deleteButton = document.createElement('button');
//     deleteButton.className = 'btn btn-sm btn-danger delete-task';
//     deleteButton.textContent = 'Удалить';
//
//     // Добавляем элементы в задачу
//     task.appendChild(taskTitle);
//     task.appendChild(taskDescription);
//     task.appendChild(taskDate);
//     task.appendChild(statusButton);
//     task.appendChild(editButton);
//     task.appendChild(deleteButton);
//
//     // Добавляем задачу в список задач
//     tasks.appendChild(task);
//
//     // Очищаем поля ввода
//     name.value = '';
//     description.value = '';
// }
//
// function changeTaskStatus(taskElement, newStatus) {
//     taskElement.setAttribute('data-status', newStatus);
// }
//
//
// function createStatusButton() {
//     const statusButton = document.createElement('div');
//     statusButton.className = 'btn-group';
//
//     const dropdownButton = document.createElement('button');
//     dropdownButton.className = 'btn btn-secondary dropdown-toggle';
//     dropdownButton.textContent = 'В процессе'; // По умолчанию
//     dropdownButton.addEventListener('click', () => {
//         dropdownMenu.classList.toggle('show');
//     });
//     const dropdownMenu = document.createElement('div');
//     dropdownMenu.className = 'dropdown-menu';
//     const dropdownItem1 = document.createElement('a');
//     dropdownItem1.className = 'dropdown-item';
//     dropdownItem1.href = '#';
//     dropdownItem1.textContent = 'В процессе';
//     dropdownItem1.setAttribute('data-status', 'in-progress');
//     const dropdownItem2 = document.createElement('a');
//
//     dropdownItem2.className = 'dropdown-item';
//     dropdownItem2.href = '#';
//     dropdownItem2.textContent = 'Выполнена';
//     dropdownItem2.setAttribute('data-status', 'done');
//     dropdownMenu.appendChild(dropdownItem1);
//
//     dropdownMenu.appendChild(dropdownItem2);
//     statusButton.appendChild(dropdownButton);
//
//
//
//     dropdownMenu.addEventListener('click', (e) => {
//         e.preventDefault();
//         const newStatus = e.target.getAttribute('data-status');
//         dropdownButton.textContent = e.target.textContent;
//         const taskElement = dropdownButton.closest('.task');
//         changeTaskStatus(taskElement, newStatus);
//     });
//     statusButton.appendChild(dropdownMenu);
//
//     return statusButton;
//     // Обработка изменения статуса задачи
// }
//
// // Добавляем обработчик события на кнопку "Добавить"
// addBtn.addEventListener('click', isValidTask);
//
// // Добавляем обработчик события на форму для добавления задачи
// document.querySelector('form').addEventListener('submit', (e) => {
//     e.preventDefault(); // Предотвращаем отправку формы
//     isValidTask();
// });
