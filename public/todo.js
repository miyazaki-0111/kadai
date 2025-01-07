"use strict";

document.getElementById("addTask").addEventListener("click", () => {
    const task = document.getElementById("task").value;
    if (!task) return;

    fetch("/addTodo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("task").value = "";
        updateList(data.todos);
    });
});

function updateList(todos) {
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = "";
    todos.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task;
        todoList.appendChild(li);
    });
}
