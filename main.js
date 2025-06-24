const tasks = [
  {
    title: "Nấu cơm",
    completed: true,
  },
  {
    title: "Rửa bát",
    completed: false,
  },
  {
    title: "Quét nhà",
    completed: false,
  },
];

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const taskList = document.querySelector("#task-list");

todoForm.onsubmit = function (e) {
  e.preventDefault();
  const value = todoInput.value.trim();
  if (!value) {
    alert("Hãy nhập gì đó!");
    return;
  }
  const newTask = {
    title: value,
    completed: false,
  };
  tasks.push(newTask);
  //re-render
  render();

  //clear input
  todoInput.value = "";
};

function render() {
  const html = tasks
    .map(
      (task) => `<li class="task-item ${task.completed ? "completed" : ""}">
            <span class="task-title">${task.title}</span>
    <div class="task-action">
      <button class="task-btn edit">Edit</button>
      <button class="task-btn done">${
        task.completed ? "Mark as undone" : "Mark as done"
      }</button>
      <button class="task-btn delete">Delete</button>
    </div>
  </li>`
    )
    .join("");

  taskList.innerHTML = html;
}

render();
