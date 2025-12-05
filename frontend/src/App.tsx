import { useState, useEffect } from 'react';
import { Task } from './types';
import { fetchTasks } from './api';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { SummaryPanel } from './components/SummaryPanel';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  if (loading) {
    return <div style={{ padding: '2rem' }}>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>Estimate Tracker</h1>
      
      {error && (
        <div style={{ color: 'red', marginBottom: '1rem', padding: '1rem', backgroundColor: '#ffe6e6', borderRadius: '4px' }}>
          {error}
        </div>
      )}

      <SummaryPanel tasks={tasks} />
      
      <TaskForm onTaskCreated={loadTasks} />
      
      <TaskList tasks={tasks} onTaskUpdated={loadTasks} />
    </div>
  );
}

export default App;

