# Estimate Tracker

A full-stack web application for tracking time estimates versus actual time spent on tasks, helping developers improve their estimation accuracy over time.

**Repository**: https://github.com/KyPython/estimate-tracker

## Overview

Estimate Tracker allows you to:
- Create tasks with estimated completion time (in hours)
- Log actual time spent on each task
- View per-task statistics showing the difference between estimate and actual
- See aggregate statistics including average estimation error

This tool is inspired by the "Estimating" chapter from **The Pragmatic Programmer** by Andrew Hunt and David Thomas, which emphasizes the importance of:
- Learning from past estimates to improve future accuracy
- Tracking estimation accuracy as a skill to develop
- Using historical data to make better predictions

## Tech Stack

- **Backend**: Node.js + Express + TypeScript
- **Database**: SQLite (via better-sqlite3)
- **Frontend**: React + TypeScript + Vite

## Project Structure

```
estimate-tracker/
├── backend/
│   ├── src/
│   │   ├── db.ts          # Database setup and queries
│   │   ├── index.ts       # Express server
│   │   └── routes/
│   │       └── tasks.ts   # Task API routes
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.tsx      # Form to create tasks
│   │   │   ├── TaskList.tsx      # List of tasks with stats
│   │   │   └── SummaryPanel.tsx  # Aggregate statistics
│   │   ├── api.ts         # API client functions
│   │   ├── types.ts       # TypeScript types
│   │   ├── App.tsx        # Main app component
│   │   └── main.tsx       # Entry point
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Install frontend dependencies:**
   ```bash
   cd frontend
   npm install
   ```

### Running the Application

1. **Start the backend server:**
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on `http://localhost:3001`

2. **Start the frontend development server:**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:3000`

3. **Open your browser:**
   Navigate to `http://localhost:3000` to use the application.

### Building for Production

**Backend:**
```bash
cd backend
npm run build
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
```
The built files will be in `frontend/dist/`.

## API Endpoints

- `GET /tasks` - Get all tasks
- `POST /tasks` - Create a new task
  ```json
  {
    "title": "Task title",
    "description": "Task description (optional)",
    "estimatedHours": 5.0,
    "status": "pending"
  }
  ```
- `PUT /tasks/:id` - Update a task
  ```json
  {
    "actualHours": 6.5,
    "status": "completed"
  }
  ```

## Features

### Task Management
- Create tasks with title, description, estimated hours, and status
- Update actual hours spent on tasks
- Change task status (pending, in-progress, completed)
- View creation date for each task

### Statistics
- **Per-task**: Shows percentage difference between estimate and actual
- **Aggregate**: 
  - Average estimation error (absolute percentage)
  - Total estimated vs actual hours
  - Count of over-estimates and under-estimates

## Connection to "The Pragmatic Programmer"

The "Estimating" chapter in The Pragmatic Programmer discusses several key principles:

1. **Iterate the Schedule**: Break work into smaller tasks and estimate each, then iterate to refine estimates.

2. **Estimate to Avoid Surprises**: The goal isn't perfect accuracy, but avoiding surprises by identifying tasks that might take longer than expected.

3. **Track Your Estimates**: Keep a log of estimates vs. actuals to improve your estimation skills over time.

4. **Ask "Does This Number Help Me?":** Estimates should be actionable—they help you plan and make decisions.

This application directly supports principle #3 by providing a tool to track estimates versus actuals, enabling developers to:
- Identify patterns in their estimation accuracy
- Learn which types of tasks they consistently over- or under-estimate
- Improve future estimates based on historical data
- Build estimation skills through practice and reflection

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy

**Backend (Railway)**:
1. Visit https://railway.app
2. Create new project → Deploy from GitHub repo
3. Select `backend` folder as root
4. Deploy

**Frontend (Vercel)**:
1. Visit https://vercel.com
2. Import GitHub repository
3. Set root directory to `frontend`
4. Add environment variable: `VITE_API_URL` = your backend URL
5. Deploy

## License

ISC

