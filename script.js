const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

let tasks = [];

function addTask() {
  const taskText = inputBox.value.trim();
  if (taskText === '') {
    alert("You must write something!");
    return;
  }

  const newTask = {
    text: taskText,
    completed: false
  };

  tasks.push(newTask);
  inputBox.value = "";
  saveAndRenderTasks();
}

function saveAndRenderTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function renderTasks() {
  listContainer.innerHTML = "";
  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.textContent = task.text;
    if (task.completed) {
      li.classList.add("checked");
    }

    // Toggle complete on click
    li.addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      saveAndRenderTasks();
    });

    // Delete button
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    span.addEventListener("click", (e) => {
      e.stopPropagation(); // prevent li click event
      tasks.splice(index, 1);
      saveAndRenderTasks();
    });

    li.appendChild(span);
    listContainer.appendChild(li);
  });
}

function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }
  renderTasks();
}

loadTasks();
