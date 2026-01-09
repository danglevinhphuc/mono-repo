# Node.js CI/CD Demo with TypeScript & PostgreSQL

This project demonstrates a robust CI/CD ready Node.js application using TypeScript, PostgreSQL, and Docker.

## Setup

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run with Docker Compose** (Recommended):
    ```bash
    docker-compose up --build
    ```
    This starts the application on port `3000` and a PostgreSQL database on port `5432`.

3.  **Run Locally (Dev)**:
    Ensure you have a PostgreSQL instance running and configured in `.env` (or use defaults).
    ```bash
    npm run dev
    ```

4.  **Run Tests**:
    ```bash
    npm test
    ```
    (Enforces 80% code coverage)

## API Documentation (cURL Examples)

Here are the commands to test the API endpoints.

### 1. Health Check
Verify the application is running.

```bash
curl -X GET http://localhost:3000/health
```
**Expected Response:**
```json
{"status":"ok"}
```

### 2. Create an Item
Add a new item to the database.

```bash
curl -X POST http://localhost:3000/items \
  -H "Content-Type: application/json" \
  -d '{"name": "My First Item"}'
```
**Expected Response:**
```json
{"id": 1, "name": "My First Item", "created_at": "..."}
```

### 3. List All Items
Retrieve all items.

```bash
curl -X GET http://localhost:3000/items
```
**Expected Response:**
```json
[{"id": 1, "name": "My First Item", ...}]
```

### 4. Get Single Item
Get an item by ID.

```bash
curl -X GET http://localhost:3000/items/1
```

### 5. Delete an Item
Remove an item by ID.

```bash
curl -X DELETE http://localhost:3000/items/1
```
**Expected Response:** `204 No Content`

### 6. Verify Deletion
Try to get the deleted item.

```bash
curl -X GET http://localhost:3000/items/1
```
**Expected Response:**
```json
{"error": "Item not found"}
```
