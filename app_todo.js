"use strict";
const express = require("express");
const app = express();
let todos = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public", express.static(__dirname + "/public"));

app.post("/addTodo", (req, res) => {
  const task = req.body.task;
  todos.push(task);
  res.json({ message: "Task added", todos });
});

app.post("/getTodos", (req, res) => {
  res.json({ todos });
});

app.listen(8081, () => console.log("ToDo app listening on port 8081!"));
