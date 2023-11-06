document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const inputBox = document.querySelector("input");

  class Todo {
    constructor(task) {
      this.task = task;
      this.completed = false;
    }
  }

  class TodoList {
    constructor() {
      this.items = [];
    }

    initializeWithCachedTodos() {
      const todos = JSON.parse(localStorage.getItem("todos")) || [];
      this.items = todos;
    }

    addTodo(todo) {
      if(inputBox.value.trim() === ""){
        alert('First write the note!');
        return;
      }
      this.items.push(todo);
      this.saveTodoToLocalStorage();
      this.renderToPage();
    }

    removeTodo(task) {
      this.items = this.items.filter((item) => item.task !== task);
      this.saveTodoToLocalStorage();
      this.renderToPage();
    }

    completedToDO(task) {
      const todo = this.items.find((item) => item.task === task);
      if (todo) {
        todo.completed = !todo.completed; 
        this.saveTodoToLocalStorage();
        this.renderToPage();
      }
    }

    saveTodoToLocalStorage() {
      localStorage.setItem("todos", JSON.stringify(this.items));
    }

    renderToPage() {
      const ul = document.getElementById("list-container");
      ul.innerHTML = "";

      debugger;

      this.items.forEach((item) => {
        const li = document.createElement("li");
        const status = item.completed ? "completed" : "incomplete";
        const icon = item.completed ? "fa-check-circle" : "fa-solid fa-check";
        const statusTextClass = item.completed
          ? "completed-text"
          : "incomplete-text";

        li.innerHTML = `
          <span class="task ${status}">${item.task}</span>
          <div class="row-container">
            <button class="check-button">
              <i class="fas ${icon}"></i>
            </button>
            <button class="delete-button">
              <i class="fas fa-trash"></i>
            </button>
            <span class="${statusTextClass}">${
            item.completed ? "Completed" : "Incomplete"
            }</span>
          </div>
        `;

        ul.appendChild(li);
      });

      const completeButtons = ul.querySelectorAll(".check-button");
      completeButtons.forEach((button, index) => {
        button.addEventListener("click", () => handleCompleteTask(index));
      });

      const deleteButtons = ul.querySelectorAll(".delete-button");
      deleteButtons.forEach((button, index) => {
        button.addEventListener("click", () => handleDeleteTask(index));
      });
    }
  }

  const TODO_LIST = new TodoList();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (inputBox.value === "") return;

    const newTask = new Todo(inputBox.value);

    TODO_LIST.addTodo(newTask);

    inputBox.value = "";
  });

  function handleCompleteTask(index) {
    const task = TODO_LIST.items[index].task;
    TODO_LIST.completedToDO(task);
  }

  function handleDeleteTask(index) {
    const task = TODO_LIST.items[index].task;
    TODO_LIST.removeTodo(task);
  }

  TODO_LIST.initializeWithCachedTodos();
  TODO_LIST.renderToPage();
});