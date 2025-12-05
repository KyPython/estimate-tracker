export interface Task {
  id: number;
  title: string;
  description: string | null;
  estimatedHours: number;
  actualHours: number | null;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  estimatedHours: number;
  status: 'pending' | 'in-progress' | 'completed';
}

