# Kanbanly

A Trello-inspired collaborative Kanban board, built as a hands-on project to learn full-stack development end-to-end — auth, database design, permissions, and API design, all owned rather than delegated to a platform.

## Stack

**Frontend**
- React + TypeScript + Vite
- TanStack Query
- dnd-kit (drag and drop)
- Tailwind CSS v4
- lucide-react (icons)
- React Router

**Backend**
- Node.js + Express
- PostgreSQL (via `pg`)
- JWT auth (`jsonwebtoken` + `bcrypt`)
- No third-party auth or BaaS — auth, permissions, and data access are all handled manually

## Why no Supabase

This project started on Supabase, then pivoted to a self-managed Express + PostgreSQL backend on purpose. The goal was to own the parts a BaaS usually handles automatically:

- JWT-based authentication (signup/login/verify) written from scratch
- Manual permission checks in route handlers (replacing Row Level Security) — every board/column/card route confirms the requesting user is in `board_members` before returning data
- Direct SQL via `pool.query()`, no ORM abstraction

## Database schema

- `users` — id, email, password_hash, created_at
- `boards` — id, name, owner_id, created_at
- `board_members` — board_id, user_id, role (composite primary key)
- `columns` — id, board_id, title, position
- `cards` — id, column_id, title, description, position, created_at

All foreign keys cascade on delete. `position` columns support drag-and-drop ordering.

## Progress

- [x] Database schema + membership permission checks
- [x] Signup / login routes (JWT issuance)
- [x] `verifyToken` middleware
- [x] Frontend auth context (`AuthContext` / `AuthProvider` / `useAuth`)
- [x] Boards page UI (board cards, member avatars, sidebar nav)
- [ ] Protected board/column/card CRUD routes
- [ ] Connect frontend to live API (replacing stub data)
- [ ] Drag-and-drop position persistence
- [ ] Realtime updates via Socket.io
- [ ] Presence (who's viewing the board)
- [ ] Conflict handling + deploy

## Running locally

```bash
# backend
cd server
npm install
npm run dev

# frontend
cd client
npm install
npm run dev

cd $env:USERPROFILE
pg_ctl -D "$env:USERPROFILE\scoop\apps\postgresql\current\data" -l logfile start

Run this from your home directory, not C:\Windows\System32 — running pg_ctl from System32 fails with "Access is denied."
psql -U postgres
```

Requires a local PostgreSQL instance and a `.env` file with your `DATABASE_URL` and `JWT_SECRET`.
