import { Task, TaskFormData } from './types';

const API_BASE = import.meta.env.VITE_API_URL || '/tasks';

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch(API_BASE);
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return response.json();
};

export const createTask = async (task: TaskFormData): Promise<Task> => {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create task');
  }
  return response.json();
};

export const updateTask = async (id: number, updates: Partial<Task>): Promise<Task> => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update task');
  }
  return response.json();
};

