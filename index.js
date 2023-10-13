const tasks = document.querySelector('#taskList');

// Поле - ввод, название задачи
const name = document.querySelector('#taskTitle');

// Поле - ввод, описание задачи
const description = document.querySelector('#taskDescription');


function isValidTask() {
    // Проверяем заполенны ли поля название и описание, если не заполнено хотя-бы одно поле - прерываем дальнейшее выполнение функции возвратив пустое значение.
    if (!name.value || !description.value) return;

    // Создаем элемент DIV
    const task = document.createElement('div');

}
// Кнопка add
const addBtn = document.querySelector('#taskAddButton');
addBtn.addEventListener("click",isValidTask )
