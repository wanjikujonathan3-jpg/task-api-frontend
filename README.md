# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# Task Manager — Full Stack Application

A full stack task management app built with Django REST Framework and React.

🔗 **Live App:** https://task-api-frontend-6bzmtyk6n-wanjikujonathan3-3808s-projects.vercel.app
🔗 **Live API:** https://taskapi-1-5rf9.onrender.com/api/

## Features
- User registration and JWT authentication
- Full CRUD operations for tasks
- Filter tasks by status
- Search tasks by title or description
- Order tasks by date or status
- Pagination
- Custom validation on all inputs
- Consistent error response format
- React frontend with live API integration

## Tech Stack

**Backend**
- Django + Django REST Framework
- PostgreSQL
- JWT Authentication (SimpleJWT)
- django-filter
- Deployed on Render

**Frontend**
- React (Vite)
- Axios
- React Router
- Deployed on Vercel

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/auth/register/ | Register a new user | No |
| POST | /api/auth/login/ | Login, get JWT tokens | No |
| POST | /api/auth/refresh/ | Refresh access token | No |
| GET | /api/tasks/ | List your tasks | Yes |
| POST | /api/tasks/ | Create a task | Yes |
| GET | /api/tasks/{id}/ | Get a single task | Yes |
| PATCH | /api/tasks/{id}/ | Update a task | Yes |
| DELETE | /api/tasks/{id}/ | Delete a task | Yes |

## Query Parameters

| Parameter | Example | Description |
|-----------|---------|-------------|
| status | ?status=pending | Filter by status |
| search | ?search=django | Search title/description |
| ordering | ?ordering=-created_at | Order results |
| page | ?page=2 | Paginate results |

## Local Setup

### Backend
```bash
git clone https://github.com/wanjikujonathan3-jpg/taskapi.git
cd taskapi
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
# create .env file with your own values
python manage.py migrate
python manage.py runserver
```

### Frontend
```bash
git clone <your-frontend-repo-url>
cd taskmanager-frontend
npm install
npm run dev
```

## Environment Variables
## Author
Built by Jonathan Wanjiku as part of a self-directed full stack development roadmap.