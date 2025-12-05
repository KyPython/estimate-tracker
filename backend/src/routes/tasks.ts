import { Router, Request, Response } from 'express';
import { taskQueries, Task } from '../db';

const router = Router();

// GET /tasks
router.get('/', (req: Request, res: Response) => {
  try {
    const tasks = taskQueries.getAll.all() as Task[];
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// POST /tasks
router.post('/', (req: Request, res: Response) => {
  try {
    const { title, description, estimatedHours, status } = req.body;

    if (!title || estimatedHours === undefined) {
      return res.status(400).json({ error: 'Title and estimatedHours are required' });
    }

    if (typeof estimatedHours !== 'number' || estimatedHours <= 0) {
      return res.status(400).json({ error: 'estimatedHours must be a positive number' });
    }

    const validStatuses: Task['status'][] = ['pending', 'in-progress', 'completed'];
    const taskStatus = status || 'pending';
    if (!validStatuses.includes(taskStatus)) {
      return res.status(400).json({ error: 'status must be one of: pending, in-progress, completed' });
    }

    const result = taskQueries.create.run(
      title,
      description || null,
      estimatedHours,
      taskStatus
    );

    const task = taskQueries.getById.get(result.lastInsertRowid) as Task;
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// PUT /tasks/:id
router.put('/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { title, description, estimatedHours, actualHours, status } = req.body;

    // Check if task exists
    const existingTask = taskQueries.getById.get(id) as Task | undefined;
    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Validate actualHours if provided
    if (actualHours !== undefined && (typeof actualHours !== 'number' || actualHours < 0)) {
      return res.status(400).json({ error: 'actualHours must be a non-negative number' });
    }

    // Validate status if provided
    const validStatuses: Task['status'][] = ['pending', 'in-progress', 'completed'];
    if (status !== undefined && !validStatuses.includes(status)) {
      return res.status(400).json({ error: 'status must be one of: pending, in-progress, completed' });
    }

    // Update task with provided fields, keeping existing values if not provided
    taskQueries.update.run(
      title !== undefined ? title : existingTask.title,
      description !== undefined ? description : existingTask.description,
      estimatedHours !== undefined ? estimatedHours : existingTask.estimatedHours,
      actualHours !== undefined ? actualHours : existingTask.actualHours,
      status !== undefined ? status : existingTask.status,
      id
    );

    const updatedTask = taskQueries.getById.get(id) as Task;
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

export default router;

