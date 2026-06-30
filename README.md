# Spond Club - Membership Signup Portal

This is a full-stack membership registration portal built for Spond Club. It features a responsive multi-step signup wizard (React/TypeScript) and a backend API (Go) that validates registrations and saves them into a local PostgreSQL database.

---

## 🚀 How to Run the App Locally

### 1. Database (Docker)
Spin up the PostgreSQL database container from the root directory:
docker compose up -d

### 2. Backend (Go)
Go into the backend directory and start the server. The tables will be created and seeded automatically on startup if the database is empty:

cd backend

go run .

The API runs at http://localhost:8080.

### 3. Frontend (React)
Open a new terminal window, go to the frontend directory, install the packages, and boot up Vite:

cd frontend

npm install

npm run dev

The web app will open at http://localhost:5173.

---

## 🧪 Running Tests

### Backend Tests (Go Unit Tests)
cd backend

go test -v

### Frontend Tests (Vitest + React Testing Library)
cd frontend

npm run test

---

## 🧠 Technology Choices & Architecture

### Backend: Go (Gin + PGX)
* Performance: I chose Go over Java because it compiles down to a single lightweight binary, uses very little RAM (~15MB inside Docker), and starts instantly. This makes it perfect for containerized environments.
* Code Structure: I applied standard separation of concerns. All internal database logic lives in db.go, while handlers.go is dedicated strictly to managing HTTP requests, payload validation, and JSON responses.
* Data Integrity: The database maps explicit relational constraints using Foreign Keys and ON DELETE CASCADE to ensure submissions are strictly tied to a valid form layout.

### Frontend: React (TypeScript + Vite)
* Modular Components: Instead of dumping everything into a massive monolithic file, I split the wizard into small, testable sub-components (ClubSelector, WizardForm, and separate step views). This keeps the UI highly readable and easy to maintain.
* Unit Testing: I configured Vitest with a jsdom virtual browser environment to verify that form steps render properly and that client-side input validation catches errors before any API requests go out.

---

## 🛠️ Next Steps & Potential Improvements

1. End-to-End Testing: I would like to  automate full UI regression tests that simulate a user filling out the registration from step 1 to submission.
2. Security & Auth: For a real-world launch, I would implement authentication (such as JWT tokens) so that only authorized club administrators can query the database and access sensitive member information.
3. Database Migrations.
4. Add Deployment.
5. More complete testing.