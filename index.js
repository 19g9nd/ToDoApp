import TaskManager from "./Classes/TaskManager.js";
import {Task, Validator} from "./Classes/Task.js";
const taskManager = new TaskManager();

document.querySelector('#taskAddButton').addEventListener('click', () => {
    console.log('Add button clicked'); // Debug line
    const taskTitleInput = document.querySelector('#taskTitle');
    const taskDescriptionInput = document.querySelector('#taskDescription');

    const taskTitle = taskTitleInput.value;
    const taskDescription = taskDescriptionInput.value;
    const newTask = new Task(taskTitle, taskDescription);
    taskManager.addTask(newTask);
    // Очищаем поля ввода
    taskTitleInput.value = '';
    taskDescriptionInput.value = '';
    taskManager.renderTasks();
});


const sortSelect = document.querySelector('#sortSelect');
sortSelect.addEventListener('change', () => {
    const selectedSortOption = sortSelect.value;
    if (selectedSortOption === 'name') {
        taskManager.sortByName();
    } else if (selectedSortOption === 'date') {
        taskManager.sortByDate();
    }

    taskManager.renderTasks(); // Перерисовываем задачи после сортировки
});

const done = document.querySelector('#filterDone')
done.addEventListener('click',()=> {
    console.log('done clicked');
    // Фильтруем выполненные задачи
    taskManager.filterByDone();

})
const all = document.querySelector('#filterAll')

all.addEventListener('click',()=>{
    console.log('All clicked');
    taskManager.filterByAll();
})

const inProgress = document.querySelector('#filterInProgress')
inProgress.addEventListener('click',()=> {
    console.log('inProgress clicked');
    // Фильтруем выполненные задачи
    taskManager.filterByInProgress();

})
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault(); // Предотвращаем отправку формы
});

export default taskManager;