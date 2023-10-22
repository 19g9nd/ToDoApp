// Add an event listener to the "Вернуться на главную страницу" button
document.getElementById('detailsBackButton').addEventListener('click', () => {
    window.location.href = './MainPage.html';
});
// Get the task ID from the URL
const taskId = new URL(window.location.href).searchParams.get("id");
debugger;
// Retrieve tasks from local storage
const storedTasks = JSON.parse(localStorage.getItem('TASKS')) || [];
// Find the task by its ID
const taskIndex = storedTasks.findIndex(task => task.id === taskId);
if (taskIndex !== -1) { // Check if the task was found
    const task = storedTasks[taskIndex];
    const taskElement = document.createElement("div");
    const formattedDate = new Date(task.creationDate).toLocaleString();
    taskElement.innerHTML = `
        <h2>Title: ${task.title}</h2>
        <p>Description: ${task.description}</p>
        <p>ID: ${task.id}</p>
        <p>Date: ${formattedDate}</p>
        <p>Status: ${task.completionStatus ? "Completed" : "Incomplete"}</p>
    `;

    const taskListContainer = document.getElementById("taskList");
    taskListContainer.innerHTML = "";
    taskListContainer.appendChild(taskElement);
} else {
    window.location ='./404.html'
}
