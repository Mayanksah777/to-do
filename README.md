# MERN To-Do Application

A full-stack To-Do app built with:
- MongoDB + Mongoose
- Express + Node.js
- React (Vite) + React Router
- JWT authentication

## Project structure

```text
to-do/
  backend/
  frontend/
```

## 1) Backend setup

```bash
cd backend
cp .env.example .env
```

Update `.env` values (especially `MONGO_URI` and `JWT_SECRET`).

Run backend:

```bash
npm install
npm run dev
```

Backend API runs at `http://localhost:5000`.

## 2) Frontend setup

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`.

## API endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Tasks (JWT protected)
- `POST /api/tasks`
- `GET /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`
