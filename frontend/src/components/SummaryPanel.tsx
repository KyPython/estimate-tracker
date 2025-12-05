import { Task } from '../types';

interface SummaryPanelProps {
  tasks: Task[];
}

export const SummaryPanel = ({ tasks }: SummaryPanelProps) => {
  const completedTasks = tasks.filter((t) => t.actualHours !== null);
  
  const calculateStats = () => {
    if (completedTasks.length === 0) {
      return {
        averageError: null,
        totalEstimated: 0,
        totalActual: 0,
        overEstimateCount: 0,
        underEstimateCount: 0,
      };
    }

    let totalError = 0;
    let totalEstimated = 0;
    let totalActual = 0;
    let overEstimateCount = 0;
    let underEstimateCount = 0;

    completedTasks.forEach((task) => {
      const estimated = task.estimatedHours;
      const actual = task.actualHours!;
      const error = ((actual - estimated) / estimated) * 100;

      totalError += Math.abs(error);
      totalEstimated += estimated;
      totalActual += actual;

      if (actual > estimated) {
        overEstimateCount++;
      } else if (actual < estimated) {
        underEstimateCount++;
      }
    });

    return {
      averageError: totalError / completedTasks.length,
      totalEstimated,
      totalActual,
      overEstimateCount,
      underEstimateCount,
    };
  };

  const stats = calculateStats();

  return (
    <div
      style={{
        border: '2px solid #007bff',
        borderRadius: '8px',
        padding: '1.5rem',
        backgroundColor: '#f0f8ff',
        marginBottom: '2rem',
      }}
    >
      <h2>Summary Statistics</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div>
          <strong>Total Tasks:</strong> {tasks.length}
        </div>
        <div>
          <strong>Completed Tasks:</strong> {completedTasks.length}
        </div>
        {stats.averageError !== null && (
          <>
            <div>
              <strong>Average Estimation Error:</strong>{' '}
              <span style={{ color: stats.averageError > 20 ? 'red' : stats.averageError < 10 ? 'green' : 'orange' }}>
                {stats.averageError.toFixed(1)}%
              </span>
            </div>
            <div>
              <strong>Total Estimated:</strong> {stats.totalEstimated.toFixed(1)}h
            </div>
            <div>
              <strong>Total Actual:</strong> {stats.totalActual.toFixed(1)}h
            </div>
            <div>
              <strong>Over Estimates:</strong> {stats.overEstimateCount}
            </div>
            <div>
              <strong>Under Estimates:</strong> {stats.underEstimateCount}
            </div>
          </>
        )}
      </div>

      {completedTasks.length === 0 && (
        <p style={{ color: '#666', marginTop: '1rem' }}>
          Complete some tasks to see statistics
        </p>
      )}
    </div>
  );
};

