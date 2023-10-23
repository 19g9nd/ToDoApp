const returnButton = document.getElementById("returnButton");

// Добавьте обработчик события для кнопки "Вернуться на главную страницу"
returnButton.addEventListener("click", () => {
    // Перенаправьтесь на главную страницу
    window.location.href = "./MainPage.html"; // Замените "MainPage.html" на путь к вашей главной странице
});

// Get the task ID from the URL
const taskId = new URL(window.location.href).searchParams.get("id");
// Retrieve tasks from local storage
const storedTasks = JSON.parse(localStorage.getItem('TASKS')) || [];
const taskIndex = storedTasks.findIndex(task => task.id === taskId);
if (taskIndex !== -1) { // Check if the task was found
    const task = storedTasks[taskIndex];

    // можно заполнить форму данными из задачи
} else {
    window.location = './404.html';
}

const saveBtn = document.getElementById('saveButton');

saveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const updatedTitle = document.getElementById("title").value;
    const updatedDescription = document.getElementById("description").value;
// Найдите задачу в массиве storedTasks по taskId
    if (taskIndex !== -1) {
        debugger;
        const updatedTask = storedTasks[taskIndex];
        // Обновите данные задачи
        updatedTask.title = updatedTitle;
        updatedTask.description = updatedDescription;

        // Обновите задачу в массиве storedTasks
        storedTasks[taskIndex] = updatedTask;

        // Сохраните обновленный массив задач в локальном хранилище
        localStorage.setItem('TASKS', JSON.stringify(storedTasks));
    } else {
    alert("Задача улетела")
    }

    window.location.href = "./MainPage.html"; // Перенаправление на главную страницу
});
