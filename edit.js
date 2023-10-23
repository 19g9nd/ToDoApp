
const returnButton = document.getElementById("returnButton");

returnButton.addEventListener("click", () => {
    // Перенаправьтесь на главную страницу
    window.location.href = "./MainPage.html"; 
});

const taskId = new URL(window.location.href).searchParams.get("id");
const storedTasks = JSON.parse(localStorage.getItem('TASKS')) || [];
const taskIndex = storedTasks.findIndex(task => task.id === taskId);
if (taskIndex !== -1) { 
    const task = storedTasks[taskIndex];

    // можно заполнить форму данными из задачи
} else {
    window.location = './Pages/404.html';
}

const saveBtn = document.getElementById('saveButton');

saveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const updatedTitle = document.getElementById("title").value;
    const updatedDescription = document.getElementById("description").value;
// Найдите задачу в массиве storedTasks по taskId
    if (taskIndex !== -1) {
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
