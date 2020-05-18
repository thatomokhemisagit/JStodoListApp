'use strict';

//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


//Function add
function addTodo(event) {

    //Prevents form from submitting
    event.preventDefault();

    //assign user input to listItem variable
    let listItem = todoInput.value;

    //Pass todo item to saveList function if available
    if (listItem.trim() === '' || listItem.trim() == null) {
        validateInputForm();
    }
    else {
        addTodoItem(todoInput.value);
    }
    
    //CLEAR INPUT AFTER APPENDING
    todoInput.value = '';
}

function addTodoItem(todo) {

    //Todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //Create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //SAVE ITEMS TO LOCAL STORATE
    saveList(todoInput.value);

    //CHECK MARK BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('completed-btn');
    todoDiv.appendChild(completedButton);

    //TRASH MARK BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    //APPEND TO LIST
    todoList.appendChild(todoDiv);
}

//This function is triggered when a user tries to submit empty form
function validateInputForm() {
    
    //Get form & input names
    let todoItem = document.forms['listForm']['todoItem'].value;

    if (todoItem === '' || todoItem == null) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter todo list item. . .',
        });
        return false;
    }
    else {
        return true;
    }
}

//Function check and delete
function deleteCheck(event) {
    const item = event.target;

    //CHECK BUTTON
    if (item.classList[0] === 'completed-btn') {
        const todoItem = item.parentElement;
        todoItem.classList.toggle('completed');
    }

    //DELETE BUTTON
    if (item.classList[0] === 'trash-btn') {
        const todoItem = item.parentElement;

        //Animation
        todoItem.classList.add('fall');
        removeListItem(todoItem);

        todoItem.addEventListener('transitionend', function () {
            todoItem.remove();
        });
    }
}

//Filter todo items
function filterTodo(event) {

    const todos = todoList.childNodes;

    todos.forEach(function (todo) {
        switch (event.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                }
                else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                }
                else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

//This function is called when a new item is added to the todo list.
function saveList(todo) {

    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

//This function is called when the DomContentLoaded event occurs (the html document finishes loading)
//------------------------------------------------------------------------------------------------------
// 1.  if there is no existing local storage called 'todos' then assign an empty array to variable todos.
// 2.  If there is an existing local storeage called 'todos' fetch the items from local storage and parse then to a string using JSON.parse
// 3.  For each item in the todo array, create the html structure for an item and add it to the document
function getTodos() {
    
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(todo => todoItems(todo));
}

//This function is called when when the browser is refreshed.
function todoItems(todo) {

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //Create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //CHECK MARK BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('completed-btn');
    todoDiv.appendChild(completedButton);

    //TRASH MARK BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    //APPEND TO LIST
    todoList.appendChild(todoDiv);
}

//This function is called when user clicks delete button
function removeListItem(todo) {

    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}
