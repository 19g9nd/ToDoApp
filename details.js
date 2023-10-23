import { Validator } from "./Classes/Task";

document.getElementById('detailsBackButton').addEventListener('click', () => {
    window.location.href = './Pages/MainPage.html';
});

const taskId = new URL(window.location.href).searchParams.get("id");
const storedTasks = JSON.parse(localStorage.getItem('TASKS')) || [];
const taskIndex = storedTasks.findIndex(task => task.id === taskId);

if (taskIndex !== -1) { 
    const task = storedTasks[taskIndex];
    
    if (Validator.validateName(task.title) && Validator.validateDescription(task.description, task.title)) {
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
       
        alert("Неверное описание или заголовок");
        window.location.href = './Pages/MainPage.html';
    }
} else {
    window.location ='./Pages/404.html'
}