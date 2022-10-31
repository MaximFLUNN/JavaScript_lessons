let todos = [];
let users = [];
let idNewTodo = 201;
const form = document.querySelector('form');
form.addEventListener('submit', addNewTodo);
document.addEventListener('DOMContentLoaded', getDataServer);

function getUsers() {
    return fetch('https://jsonplaceholder.typicode.com/users/').then(response => {
        if (response.ok) { return response.json(); }
        throw new Error("Failed fetch");
        }).then(json => { users = json }).catch(console.error);
}

function getTodos() {
    return fetch('https://jsonplaceholder.typicode.com/todos/').then(response => {
        if (response.ok) { return response.json(); }
        throw new Error("Failed fetch");
        }).then(json => { todos = json }).catch(console.error);
}

function renderSiteInfo() {
    renderUser();
    renderTodos();
}

function getDataServer() { Promise.all([getUsers(), getTodos()]).then(elem => { renderSiteInfo(); }) }

function changeStatus() {
    const id = this.parentElement.dataset.id;
    let status = !todos[todos.findIndex(e => e.id == id)].completed;
    todos[todos.findIndex(e => e.id == id)].completed = status
    sendStatusToDo(id, status);
    renderTodos();
}

function deleteItem() {
    const id = this.parentElement.dataset.id;
    todos.splice(todos.findIndex(elem => elem.id == id), 1);
    let todo = this.parentElement;
    todo.querySelector('input').removeEventListener('change', changeStatus);
    todo.querySelector('.close').removeEventListener('click', deleteItem);
    sendRemoveTodo(id);
    todo.remove();
}

function addNewTodo(event) {
    try {
        let Created_userId = users.findIndex(el => el.name == form.user.value) + 1
        if (form.todo.value == '') { throw new Error('Void form text!'); }
        if (!Created_userId) { throw new Error('Enter user!'); }
        event.preventDefault();
        newTodoElement = {
            userId: Created_userId,
            id: idNewTodo++,
            title: form.todo.value,
            completed: false
        }
        todos.unshift(newTodoElement);
        sendNewTodo(newTodoElement);
        renderTodos();
    }
    catch(error) { alert(error); }
}

function renderTodos() {        
    const lst = document.getElementById('todo-list');
    lst.innerHTML = '';
    todos.forEach(element => {
        const el = document.createElement('li');
        el.className = 'todo-item';
        el.dataset.id = element.id;
        if (element.completed) {
            el.innerHTML = `<span class="liText strikethroughText"> <del> ${element.title} <i> by <b> ${users.find(elem => elem.id === element.userId).name} </b></i> </del> </span>`
        }
        else {
            el.innerHTML = `<span class="liText"> ${element.title} <i> by <b> ${users.find(elem => elem.id === element.userId).name} </b></i> </span>`
        }
        const status = document.createElement('input');
        status.type = 'checkbox';
        status.checked = element.completed;
        status.addEventListener('change', changeStatus)
        const close = document.createElement('span');
        close.innerHTML = ' &times';
        close.className = 'close';
        close.addEventListener('click', deleteItem);
        el.prepend(status);
        el.append(close);
        lst.appendChild(el);
    });
}

function renderUser() {
    const lst = document.getElementById('user-todo');
    users.forEach(element => {
        const el = document.createElement('option');
        el.innerText = element.name;
        lst.appendChild(el);
    });
}

async function sendNewTodo(NTE) { 
    sendToServer('https://jsonplaceholder.typicode.com/todos/', 'POST', JSON.stringify(NTE)) 
}

async function sendStatusToDo(id, status) { 
    sendToServer(`https://jsonplaceholder.typicode.com/todos/${id}`, 'PATCH', JSON.stringify({completed: status})) 
}

async function sendRemoveTodo(id) { 
    sendToServer(`https://jsonplaceholder.typicode.com/todos/${id}`, 'DELETE', JSON.stringify({})) 
}

async function sendToServer(path, _method, _json) {
    fetch(path, {
        method: _method,
        body: _json,
        headers: { "Content-type": "application/json; charset=UTF-8" }
    }).then(response => { if (response.ok) { return response.json(); } throw new Error("Failed fetch"); }).catch(console.error);
}
