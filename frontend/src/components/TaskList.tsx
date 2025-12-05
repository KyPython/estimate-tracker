import { Task } from '../types';
import { updateTask } from '../api';

interface TaskListProps {
  tasks: Task[];
  onTaskUpdated: () => void;
}

export const TaskList = ({ tasks, onTaskUpdated }: TaskListProps) => {
  const handleActualHoursChange = async (taskId: number, actualHours: number) => {
    try {
      await updateTask(taskId, { actualHours });
      onTaskUpdated();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update task');
    }
  };

  const handleStatusChange = async (taskId: number, status: Task['status']) => {
    try {
      await updateTask(taskId, { status });
      onTaskUpdated();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update task');
    }
  };

  const calculateDifference = (estimated: number, actual: number | null): number | null => {
    if (actual === null) return null;
    return ((actual - estimated) / estimated) * 100;
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString();
  };

  if (tasks.length === 0) {
    return <div>No tasks yet. Create your first task above!</div>;
  }

  return (
    <div>
      <h2>Tasks</h2>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {tasks.map((task) => {
          const diff = calculateDifference(task.estimatedHours, task.actualHours);
          const diffColor = diff === null 
            ? 'gray' 
            : diff > 0 
            ? 'red' 
            : diff < -10 
            ? 'green' 
            : 'orange';

          return (
            <div
              key={task.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '1rem',
                backgroundColor: '#f9f9f9',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                <h3 style={{ margin: 0 }}>{task.title}</h3>
                <span
                  style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.875rem',
                    backgroundColor:
                      task.status === 'completed' ? '#28a745' :
                      task.status === 'in-progress' ? '#ffc107' :
                      '#6c757d',
                    color: 'white',
                  }}
                >
                  {task.status}
                </span>
              </div>

              {task.description && (
                <p style={{ color: '#666', marginBottom: '0.5rem' }}>{task.description}</p>
              )}

              <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#666' }}>
                Created: {formatDate(task.createdAt)}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label>
                    Estimated Hours:
                    <input
                      type="number"
                      step="0.1"
                      value={task.estimatedHours}
                      readOnly
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        marginTop: '0.25rem',
                        backgroundColor: '#f0f0f0',
                      }}
                    />
                  </label>
                </div>

                <div>
                  <label>
                    Actual Hours:
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={task.actualHours ?? ''}
                      onChange={(e) => {
                        const value = e.target.value === '' ? 0 : parseFloat(e.target.value);
                        handleActualHoursChange(task.id, value);
                      }}
                      style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                    />
                  </label>
                </div>
              </div>

              {diff !== null && (
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong style={{ color: diffColor }}>
                    {diff > 0 ? '+' : ''}{diff.toFixed(1)}% {diff > 0 ? 'over' : 'under'} estimate
                  </strong>
                </div>
              )}

              <div>
                <label>
                  Status:
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task.id, e.target.value as Task['status'])}
                    style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

