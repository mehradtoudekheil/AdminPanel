# Shop Admin Panel

A full-stack learning project: an admin panel for an e-commerce store, built with **Node.js, Express, MongoDB** (backend) and **React, Vite, Tailwind CSS** (frontend).

## Project Structure

```
AdminPanel/
├── backend/      # Express + MongoDB REST API
└── frontend/     # React + Tailwind admin/user dashboard
```

## Features

- JWT authentication with refresh tokens
- Role-based access control (`user`, `admin`, `superadmin`)
- Categories with nested subcategories
- Products with image upload
- Orders with stock management
- User management & role assignment
- Profile management (avatar, address, dark mode)
- Admin dashboard with stats
- API documentation via Swagger
- Rate limiting & input validation

## Tech Stack

**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, Multer, express-validator, Swagger

**Frontend:** React, Vite, Tailwind CSS

## Getting Started

### Backend

```bash
cd backend
npm install
cp .env.example .env   # fill in your own values
npm run dev
```

API runs on `http://localhost:8000`
Swagger docs: `http://localhost:8000/api-docs`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## API Documentation

Full endpoint reference is available in [`backend/API.md`](./backend/API.md) and via Swagger UI at `/api-docs`.

## Status

This is a learning project built step by step, not intended for production use as-is.
