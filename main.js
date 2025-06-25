const tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const taskList = document.querySelector("#task-list");

//localStorage
// localStorage.setItem("email", "anducanh125@gmail.com");
// localStorage.setItem("address", "HN, Vn");
// localStorage.removeItem("address");
// console.log(localStorage.getItem("email"));
// localStorage.setItem("tasks", JSON.stringify(tasks));
//JSON
const jsonString = JSON.stringify(tasks);
console.log(JSON.parse(jsonString));

function isDuplicateTask(newTitle, excludeIndex = -1) {
  const isDuplicate = tasks.some(
    (task, index) =>
      task.title.toLowerCase() === newTitle.toLowerCase() &&
      excludeIndex !== index
  );
  return isDuplicate;
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function handleTaskActions(e) {
  const taskItem = e.target.closest(".task-item");
  if (!taskItem) return;
  const taskIndex = +taskItem.getAttribute("data-index");
  // const taskIndex = +taskItem.dataset.index;

  const task = tasks[taskIndex];

  if (e.target.closest(".edit")) {
    let newTitle = prompt("Enter the new task title:", task.title);

    if (newTitle === null) return;

    newTitle = newTitle.trim();
    if (!newTitle) {
      alert("Task title cannot be empty!");
      return;
    }

    // const isDuplicate = tasks.some(
    //   (task, index) =>
    //     task.title.toLowerCase() === newTitle.toLowerCase() &&
    //     taskIndex !== index
    // );
    if (isDuplicateTask(newTitle, taskIndex)) {
      alert(`Đã có "${newTitle}" không thể sửa mới!`);
      return;
    }

    task.title = newTitle;
    render();
    saveTasks();
    return;
  }
  if (e.target.closest(".done")) {
    task.completed = !task.completed;
    render();
    saveTasks();
    return;
  }
  if (e.target.closest(".delete")) {
    if (confirm(`Are you sure yuo want to delete "${task.title}" ?`)) {
      tasks.splice(taskIndex, 1);
      render();
      saveTasks();
    }
  }
}

function addTask(e) {
  e.preventDefault();
  const value = todoInput.value.trim();
  if (!value) {
    alert("Hãy nhập gì đó!");
    return;
  }

  // const isDuplicate = tasks.some(
  //   (task) => task.title.toLowerCase() === value.toLowerCase()
  // );
  if (isDuplicateTask(value)) {
    alert(`Đã có "${value}" không thể sửa mới!`);
    return;
  }

  const newTask = {
    title: value,
    completed: false,
  };
  tasks.push(newTask);
  //re-render
  render();
  saveTasks();

  //clear input
  todoInput.value = "";
}

function render() {
  if (!tasks.length) {
    taskList.innerHTML = `<li class="empty-message">No tasks available</li>`;
    return;
  }
  const html = tasks
    .map(
      (task, index) => `<li class="task-item ${
        task.completed ? "completed" : ""
      }" data-index ="${index}">
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

todoForm.addEventListener("submit", addTask);
taskList.addEventListener("click", handleTaskActions);
