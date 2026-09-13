# HRIS

HRIS is a human resources information system with a React frontend and a Laravel API backend. It provides authentication and CRUD APIs for employees, departments, and positions.

## Stack

- **Frontend:** React 19, React Router, Axios, Vite, Tailwind CSS
- **Backend:** Laravel 13, PHP 8.3+, Laravel Sanctum
- **Database:** MySQL 8.4 (Docker) or SQLite for local development
- **Development tools:** Docker Compose, PHPUnit

## Project structure

```text
.
├── backend/       Laravel application and API
├── frontend/      React/Vite application
├── tests/         Project test suite
├── docker-compose.yaml
└── Dockerfile
```

## Requirements

For local development:

- PHP 8.3 or later
- Composer
- Node.js 22 or later and npm
- MySQL, or SQLite if using the default Laravel configuration

For the containerized setup, install Docker Desktop with Docker Compose.

## Local installation

1. Install backend dependencies:

   ```bash
   cd backend
   composer install
   ```

2. Create the backend environment file and application key:

   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

   On Windows PowerShell, use `Copy-Item .env.example .env` instead of `cp`.

3. Configure the database in `backend/.env`. The example file uses SQLite. Create the database file if needed, then run migrations and seed sample data:

   ```powershell
   New-Item database/database.sqlite -ItemType File
   php artisan migrate --seed
   ```

4. Install frontend dependencies:

   ```bash
   cd ../frontend
   npm install
   ```

5. Start the applications in separate terminals:

   ```bash
   cd backend
   php artisan serve --port=8000
   ```

   ```bash
   cd frontend
   npm run dev
   ```

   Open the frontend at [http://localhost:5173](http://localhost:5173). The frontend expects the API at `http://localhost:8000/api`.

## Docker Compose

Docker Compose starts the React development server, Laravel API, MySQL, and phpMyAdmin:

```bash
docker compose up --build
```

| Service | URL / port | Purpose |
| --- | --- | --- |
| Frontend | [http://localhost:5173](http://localhost:5173) | React/Vite app |
| Backend API | [http://localhost:8000](http://localhost:8000) | Laravel API |
| phpMyAdmin | [http://localhost:8081](http://localhost:8081) | MySQL administration |
| MySQL | `localhost:3309` | Database server |

The Compose database credentials are `hris` / `hris` with database `hris` and root password `root`. Run migrations with:

```bash
docker compose exec app php artisan migrate --seed
```

Stop the services with `docker compose down`.

## API endpoints

The API is served from `http://localhost:8000/api`.

### Authentication

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/login` | Authenticate a user and return a Sanctum token |
| `POST` | `/signup` | Register a user |
| `GET` | `/user` | Return the authenticated user |
| `POST` | `/logout` | Revoke the current token |

`/user` and `/logout` require an `Authorization: Bearer <token>` header.

### Resources

Laravel API resource routes are available for `/departments`, `/employees`, and `/positions`. Each supports the standard `index`, `store`, `show`, `update`, and `destroy` operations.

## Useful commands

```bash
# Backend, from backend/
php artisan test
php artisan route:list
php artisan migrate:fresh --seed

# Frontend, from frontend/
npm run lint
npm run build
npm run preview
```

## Environment configuration

Copy `backend/.env.example` to `backend/.env` for local development. When using Docker Compose with MySQL, use:

```dotenv
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=hris
DB_USERNAME=hris
DB_PASSWORD=hris
```

Never commit `.env` files or production credentials.

## License

This project is intended for internal/project use. Add the applicable license here if the project is released publicly.
