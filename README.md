# MT1-LABEXAM — Employee Task Management

A complete solution for the **Node.js Full Stack Development MT1 Lab Examination**.

## Requirements covered

### Part A — Core Node.js HTTP and FS modules (`httpServer.js`)
- HTTP server created with `http.createServer()` on port **3000**.
- `GET /` returns a welcome page in HTML.
- `GET /tasks` returns task records as JSON.
- `POST /add-task` accepts JSON and validates `id`, `taskName`, `assignedTo`, and `status`.
- `GET /about` returns application information.
- `GET /home` reads and serves `public/index.html` using `fs.readFile()`.
- Appropriate content types, 404 responses, malformed JSON handling, and file-read error handling.

### Part B — Express REST API (`expressApp.js`)
- Express JSON middleware (`express.json()`).
- Three initial sample tasks stored in a JavaScript array.
- Port **4000**.
- `GET /tasks`, `GET /tasks/:id`, `POST /tasks`, `PUT /tasks/:id`, and `DELETE /tasks/:id`.
- JSON responses, route-parameter lookup, validation, HTTP 201 on creation, and HTTP 404 for missing tasks.
- No database is used. Changes are held in memory and reset when the server restarts.

## Project structure

```text
MT1-LABEXAM/
├── package.json
├── httpServer.js
├── expressApp.js
├── public/
│   └── index.html
├── screenshots/
│   └── README.md
└── README.md
```

## Setup

Install **Node.js (LTS)**, then open a terminal in this project directory.

```bash
npm install
```

## Run Part A — HTTP server

In terminal 1:

```bash
npm run start:http
```

Expected terminal message:

```text
HTTP Server running at http://localhost:3000
```

Open these URLs in a browser:
- http://localhost:3000/
- http://localhost:3000/tasks
- http://localhost:3000/about
- http://localhost:3000/home

To test `POST /add-task` using EchoAPI, Postman, or another API client:
- Method: `POST`
- URL: `http://localhost:3000/add-task`
- Header: `Content-Type: application/json`
- Body (raw JSON):

```json
{
  "id": 4,
  "taskName": "Develop REST API",
  "assignedTo": "Amit Kumar",
  "status": "Pending"
}
```

## Run Part B — Express REST API

Open a second terminal in the same directory:

```bash
npm run start:express
```

Expected terminal message:

```text
Express Server running at http://localhost:4000
```

### API test cases

For POST and PUT requests, choose **Body → raw → JSON** and set `Content-Type: application/json`.

| Method | URL | Expected result |
|---|---|---|
| GET | `http://localhost:4000/tasks` | Returns all tasks |
| GET | `http://localhost:4000/tasks/1` | Returns task with ID 1 |
| POST | `http://localhost:4000/tasks` | Creates a task; status 201 |
| PUT | `http://localhost:4000/tasks/1` | Updates task 1 |
| DELETE | `http://localhost:4000/tasks/1` | Deletes task 1 |

**POST body** (`http://localhost:4000/tasks`):

```json
{
  "id": 4,
  "taskName": "Develop REST API",
  "assignedTo": "Amit Kumar",
  "status": "Pending",
  "priority": "Medium"
}
```

Expected response shape:

```json
{
  "message": "Task added successfully",
  "task": {
    "id": 4,
    "taskName": "Develop REST API",
    "assignedTo": "Amit Kumar",
    "status": "Pending",
    "priority": "Medium"
  }
}
```

**PUT body** (`http://localhost:4000/tasks/1`):

```json
{
  "taskName": "Develop Login Page",
  "assignedTo": "Rahul Sharma",
  "status": "Completed",
  "priority": "High"
}
```

The API also accepts a partial update containing one or more of these fields.

### Optional command-line tests (curl)

With the relevant server running:

```bash
# Part A
curl http://localhost:3000/
curl http://localhost:3000/tasks
curl http://localhost:3000/about
curl http://localhost:3000/home
curl -X POST http://localhost:3000/add-task -H "Content-Type: application/json" -d "{\"id\":4,\"taskName\":\"Develop REST API\",\"assignedTo\":\"Amit Kumar\",\"status\":\"Pending\"}"

# Part B
curl http://localhost:4000/tasks
curl http://localhost:4000/tasks/1
curl -X POST http://localhost:4000/tasks -H "Content-Type: application/json" -d "{\"id\":4,\"taskName\":\"Develop REST API\",\"assignedTo\":\"Amit Kumar\",\"status\":\"Pending\",\"priority\":\"Medium\"}"
curl -X PUT http://localhost:4000/tasks/1 -H "Content-Type: application/json" -d "{\"status\":\"Completed\"}"
curl -X DELETE http://localhost:4000/tasks/1
```

## Screenshots and GitHub submission

The `screenshots/` directory contains a checklist. Capture **your own real screenshots** after running the servers and testing the endpoints, then save them in that directory. Do not submit placeholder or fabricated screenshots.

Suggested screenshots:
1. HTTP server terminal showing port 3000 running.
2. Browser output for `/`, `/tasks`, `/about`, and `/home` (especially `/home` proving FS file serving).
3. Express server terminal showing port 4000 running.
4. EchoAPI GET `/tasks` and GET `/tasks/1`.
5. EchoAPI POST `/tasks` showing status 201 and response.
6. EchoAPI PUT `/tasks/1` showing updated response.
7. EchoAPI DELETE `/tasks/1` showing success response.
8. GitHub repository page and commit history.

### GitHub steps

Create a GitHub repository named **MT1-LABEXAM**. In this folder, run:

```bash
git init
git add .
git commit -m "Initial project setup"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/MT1-LABEXAM.git
git push -u origin main
```

After completing and testing each module, commit the changes with meaningful messages, for example:

```bash
git add .
git commit -m "Implement Node.js HTTP server and FS routing"
git push
git add .
git commit -m "Implement Express task CRUD API"
git push
```

Replace `YOUR-USERNAME` with your GitHub username. Do not run the `git remote add` command again if the remote is already configured.

## Important notes
- Start the two servers in separate terminals; both can run at the same time.
- The HTTP server and Express server maintain separate in-memory arrays.
- Data added, updated, or deleted is not persisted after a server restart, as required by the no-database instruction.
- Screenshots and GitHub commits must be completed from your own machine/account; they cannot be truthfully pre-created in this archive.
