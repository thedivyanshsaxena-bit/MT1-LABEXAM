import express from "express";

const app = express();
const PORT = 4000;

app.use(express.json());

let tasks = [
  {
    id: 1,
    taskName: "Develop Login Page",
    assignedTo: "Divyansh Saxena",
    status: "Pending",
    priority: "High"
  },
  {
    id: 2,
    taskName: "Design Dashboard",
    assignedTo: "Priya Verma",
    status: "In Progress",
    priority: "Medium"
  },
  {
    id: 3,
    taskName: "Test Registration Form",
    assignedTo: "Amit Kumar",
    status: "Completed",
    priority: "Low"
  }
];

function validateTask(task, requireAllFields = true) {
  const fields = ["taskName", "assignedTo", "status", "priority"];
  const missing = fields.filter(field =>
    requireAllFields
      ? task[field] === undefined || task[field] === null || String(task[field]).trim() === ""
      : task[field] !== undefined && (task[field] === null || String(task[field]).trim() === "")
  );
  return missing;
}

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Employee Task Management REST API",
    endpoints: [
      "GET /tasks",
      "GET /tasks/:id",
      "POST /tasks",
      "PUT /tasks/:id",
      "DELETE /tasks/:id"
    ]
  });
});

// Retrieve all tasks
app.get("/tasks", (req, res) => {
  res.status(200).json(tasks);
});

// Retrieve one task by ID
app.get("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: "Task id must be an integer" });
  }

  const task = tasks.find(item => item.id === id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  return res.status(200).json(task);
});

// Add a task
app.post("/tasks", (req, res) => {
  if (!req.is("application/json")) {
    return res.status(415).json({ message: "Content-Type must be application/json" });
  }

  const missingFields = validateTask(req.body);
  if (missingFields.length > 0) {
    return res.status(400).json({
      message: "All task fields are required",
      missingFields
    });
  }

  const id = req.body.id === undefined ? Math.max(0, ...tasks.map(task => task.id)) + 1 : Number(req.body.id);
  if (!Number.isInteger(id) || tasks.some(task => task.id === id)) {
    return res.status(400).json({ message: "Task id must be a unique integer" });
  }

  const newTask = {
    id,
    taskName: String(req.body.taskName).trim(),
    assignedTo: String(req.body.assignedTo).trim(),
    status: String(req.body.status).trim(),
    priority: String(req.body.priority).trim()
  };

  tasks.push(newTask);
  return res.status(201).json({
    message: "Task added successfully",
    task: newTask
  });
});

// Update an existing task
app.put("/tasks/:id", (req, res) => {
  if (!req.is("application/json")) {
    return res.status(415).json({ message: "Content-Type must be application/json" });
  }

  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: "Task id must be an integer" });
  }

  const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  const allowedFields = ["taskName", "assignedTo", "status", "priority"];
  const updates = {};
  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      if (req.body[field] === null || String(req.body[field]).trim() === "") {
        return res.status(400).json({ message: `${field} cannot be empty` });
      }
      updates[field] = String(req.body[field]).trim();
    }
  }

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ message: "Provide at least one task field to update" });
  }

  tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
  return res.status(200).json({
    message: "Task updated successfully",
    task: tasks[taskIndex]
  });
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: "Task id must be an integer" });
  }

  const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];
  return res.status(200).json({
    message: "Task deleted successfully",
    task: deletedTask
  });
});

// Malformed JSON and other Express errors
app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return res.status(400).json({ message: "Invalid JSON request body" });
  }
  console.error(error);
  return res.status(500).json({ message: "Internal server error" });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Express Server running at http://localhost:${PORT}`);
});
