const taskManager = new TaskManager();

document.querySelector('#taskAddButton').addEventListener('click', () => {
    const taskTitleInput = document.querySelector('#taskTitle');
    const taskDescriptionInput = document.querySelector('#taskDescription');

    const taskTitle = taskTitleInput.value;
    const taskDescription = taskDescriptionInput.value;

    if (!taskTitle || !taskDescription) {
        alert('Задача не может быть добавлена. Пожалуйста, заполните название и описание задачи.');
    } else {
        const newTask = new Task(taskTitle, taskDescription);
        taskManager.addTask(newTask);
        // Очищаем поля ввода
        taskTitleInput.value = '';
        taskDescriptionInput.value = '';
        taskManager.renderTasks();
    }
});

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault(); // Предотвращаем отправку формы
});
