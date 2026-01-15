# Full Stack Time Tracker (Node.js + React)

A robust, production-ready **Full Stack Application** featuring a **React** frontend and a **Node.js** backend. It showcases **Clean Architecture**, **TypeScript**, **PostgreSQL**, **Docker**, and **Nginx** reverse proxying.

## 🚀 Features

### 🎨 Frontend (`frontend/`)
-   **React 19 & Vite**: Fast, modern UI development.
-   **Tailwind CSS**: Utility-first styling with "Glassmorphism" aesthetics.
-   **Time Tracking UI**: Clean interface to manage work logs.

### ⚙️ Backend (`backend/`)
-   **Clean Architecture**: Separation of concerns (Domain, Application, Infrastructure, Interface).
-   **Node.js & Express**: Scalable server-side logic.
-   **PostgreSQL**: Relational database with connection pooling.
-   **Flyway**: Automated database migrations.

### 🏗️ Infrastructure
-   **Monorepo Structure**: Separate `frontend` and `backend` directories.
-   **Nginx Gateway**: Serves static files and proxies API requests on port 80.
-   **Docker Compose**: Orchestrates the entire stack (Frontend, Backend, DB, Migrations).

---

## 🛠️ Setup & Installation

### Prerequisites
-   Docker & Docker Compose

### 🚀 Fast Start
Run the entire application stack:
```bash
docker-compose up --build
```
-   **Web App**: [http://localhost](http://localhost) (Nginx -> React)
-   **API**: [http://localhost/items](http://localhost/items) (Nginx -> Node.js)
-   **DB**: `localhost:5432`

---

## 📂 Project Structure

```
├── backend/            # Node.js Application
│   ├── src/           # Source code (Clean Architecture)
│   ├── db/            # Database migrations
│   └── Dockerfile     # Backend container
│
├── frontend/           # React Application
│   ├── src/           # UI Components
│   └── Dockerfile     # Frontend + Nginx container
│
└── docker-compose.yml  # Stack orchestration
```

---

## 🧪 Testing

### Backend Unit Tests
```bash
cd backend
npm install
npm test
```

### Frontend Unit Tests
```bash
cd frontend
npm install
npm test
```

### Manual API Testing
Import `backend/postman_collection.json` into Postman.

---

## ⚙️ CI/CD Configuration

The project uses a `Jenkinsfile` configured to build and deploy from the `backend/` directory.
-   **Build**: Compiles TypeScript.
-   **Deploy**: Executes `run-hub.sh` (located in `backend/`) to pull/run Docker images.
