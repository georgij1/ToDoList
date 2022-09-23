const AddTaskBtn = document.getElementById('add-task-btn');
const deskTaskInput = document.getElementById('description-task');
const todoWrapper = document.querySelector('.todos-wrapper');

let tasks = [];
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let todoItemElements = [];

function Task(description){
    this.description = description;
    this.completed = false;
}

const createTemplate = (task, index) => {
    return `
        <div class="todo-item ${task.completed ? 'checked' : ''}">
             <div class="description">${task.description}</div>
             <div class="buttons">
                <div onclick="completedTask(${index})" class="btn-complete" ${task.completed ? 'checked' : ''}>Сделано</div>
                <button onclick="deleteTask(${index})" class="btn-delete">Удалить</button>
            </div>       
        </div>
    `
}

const filterTasks = () => {
    const activeTasks = tasks.length && tasks.filter(item => item.completed == false);
    const completedTasks = tasks.length && tasks.filter(item => item.completed == true);
    tasks = [...activeTasks,...completedTasks];
}

const fillHtmlList = () => {
    todoWrapper.innerHTML = "";
    let Length = tasks.length;
    if (Length > 0){
        filterTasks()
        tasks.forEach((item, index) => {
            todoWrapper.innerHTML += createTemplate(item, index);
        });
        todoItemElements = document.querySelectorAll('.todo-item');
    }
}
fillHtmlList();

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const completedTask = index => {
    console.log(index)
    tasks[index].completed = !tasks[index].completed;
    if (tasks[index].completed){
        todoItemElements[index].classList.add('checked');
    }
    else {
        todoItemElements[index].classList.remove('checked');
    }
    updateLocal();
    fillHtmlList();
}

AddTaskBtn.addEventListener('click', () => {
    tasks.push(new Task(deskTaskInput.value));
    console.log(tasks);
    updateLocal();
    fillHtmlList()
    deskTaskInput.value = '';
})

const deleteTask = index => {
    todoItemElements[index].classList.add('delition')
  setTimeout(() => {
      console.log(index);
      tasks.splice(index, 1);
      updateLocal();
      fillHtmlList();
  }, 500)
}

let add_task_btn = document.querySelector('#add-task-btn');

let todos_wrapper = document.querySelector('.todos-wrapper');
let text_help = document.querySelector('.text_help');

if (todos_wrapper.clientHeight == 0) {
    text_help.style.display = "block"
}

else {
    text_help.style.display = "none"
}

add_task_btn.addEventListener('click', function () {
    if (todos_wrapper.clientHeight == 0) {
        text_help.style.display = "block"
    }

    else {
        text_help.style.display = "none"
    }
})

let btn_delete = document.querySelector('.btn-delete');

btn_delete.addEventListener('click', function () {
    if (todos_wrapper.clientHeight == 0) {
        text_help.style.display = "block"
    }

    else {
        text_help.style.display = "none"
    }
})

add_task_btn.addEventListener('click' , function () {
    if (deskTaskInput.value == "") {
        console.log('Вы ничего не ввели')
    }
})