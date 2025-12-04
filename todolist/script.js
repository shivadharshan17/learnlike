const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks on startup
window.onload = loadTasks;

addBtn.onclick = addTask;

// ✔ Add task when pressing Enter key
taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

// ADD TASK
function addTask() {
    let text = taskInput.value.trim();
    if (text === "") return;

    createTask(text);
    saveTask(text);

    taskInput.value = "";
}

// CREATE TASK ELEMENT
function createTask(text, completed = false) {
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.textContent = text;

    if (completed) span.classList.add("completed");

    span.onclick = () => {
        span.classList.toggle("completed");
        updateTasks();
    };

    let editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.innerHTML = "✏️";

    editBtn.onclick = () => {
        let newText = prompt("Edit task:", span.textContent);
        if (newText !== null && newText.trim() !== "") {
            span.textContent = newText.trim();
            updateTasks();
        }
    };

    let deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = "🗑️";

    deleteBtn.onclick = () => {
        li.remove();
        updateTasks();
    };

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
}

// SAVE IN LOCAL STORAGE
function saveTask(text) {
    let data = JSON.parse(localStorage.getItem("tasks") || "[]");
    data.push({ text, completed: false });
    localStorage.setItem("tasks", JSON.stringify(data));
}

// UPDATE LOCAL STORAGE
function updateTasks() {
    let items = taskList.querySelectorAll("li");
    let data = [];

    items.forEach(li => {
        let span = li.querySelector("span");
        data.push({
            text: span.textContent,
            completed: span.classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(data));
}

// LOAD TASKS
function loadTasks() {
    let data = JSON.parse(localStorage.getItem("tasks") || "[]");
    data.forEach(item => createTask(item.text, item.completed));
}
