import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(__dirname, '../data.db');
const db = new Database(dbPath);

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    estimatedHours REAL NOT NULL,
    actualHours REAL,
    status TEXT NOT NULL DEFAULT 'pending',
    createdAt TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);

export interface Task {
  id: number;
  title: string;
  description: string | null;
  estimatedHours: number;
  actualHours: number | null;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: string;
}

export const taskQueries = {
  getAll: db.prepare('SELECT * FROM tasks ORDER BY createdAt DESC'),
  getById: db.prepare('SELECT * FROM tasks WHERE id = ?'),
  create: db.prepare(`
    INSERT INTO tasks (title, description, estimatedHours, status)
    VALUES (?, ?, ?, ?)
  `),
  update: db.prepare(`
    UPDATE tasks
    SET title = ?, description = ?, estimatedHours = ?, actualHours = ?, status = ?
    WHERE id = ?
  `),
};

export default db;

