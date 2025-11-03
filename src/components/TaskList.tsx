import { Task, EnergyLevel } from '../types';

interface TaskListProps {
  tasks: Task[];
  currentEnergy: EnergyLevel;
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export default function TaskList({ tasks, currentEnergy, onToggleTask, onDeleteTask }: TaskListProps) {
  const energyHierarchy = {
    high: 4,
    medium: 3,
    low: 2,
    burnout: 1,
  };

  const canDoTask = (taskEnergy: EnergyLevel) => {
    return energyHierarchy[currentEnergy] >= energyHierarchy[taskEnergy];
  };

  const getTasksByMatchLevel = () => {
    const perfect = tasks.filter(t => !t.completed && canDoTask(t.energyRequired) && t.energyRequired === currentEnergy);
    const doable = tasks.filter(t => !t.completed && canDoTask(t.energyRequired) && t.energyRequired !== currentEnergy);
    const tooHard = tasks.filter(t => !t.completed && !canDoTask(t.energyRequired));
    const completed = tasks.filter(t => t.completed);

    return { perfect, doable, tooHard, completed };
  };

  const { perfect, doable, tooHard, completed } = getTasksByMatchLevel();

  const getEnergyIcon = (energy: EnergyLevel) => {
    const icons = {
      high: '⚡',
      medium: '🌤️',
      low: '🌙',
      burnout: '🛌',
    };
    return icons[energy];
  };

  const TaskItem = ({ task, dimmed = false }: { task: Task; dimmed?: boolean }) => (
    <div
      className={`
        group p-4 rounded-lg border transition-all
        ${dimmed
          ? 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 opacity-60'
          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600'
        }
        ${task.completed ? 'opacity-50' : ''}
      `}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggleTask(task.id)}
          className={`
            mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors
            ${task.completed
              ? 'bg-green-500 border-green-500'
              : 'border-slate-300 dark:border-slate-600 hover:border-indigo-500'
            }
          `}
        >
          {task.completed && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <p className={`text-slate-800 dark:text-slate-200 ${task.completed ? 'line-through' : ''}`}>
            {task.title}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm">{getEnergyIcon(task.energyRequired)}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 capitalize">
              {task.energyRequired} energy
            </span>
          </div>
        </div>

        <button
          onClick={() => onDeleteTask(task.id)}
          className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-all"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
      <h2 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-100">
        Your Tasks
      </h2>

      {tasks.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎯</div>
          <p className="text-slate-500 dark:text-slate-400">No tasks yet. Add one above!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {perfect.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-green-600 dark:text-green-400 mb-2 flex items-center gap-2">
                <span>✨</span> Perfect match for your energy
              </h3>
              <div className="space-y-2">
                {perfect.map(task => <TaskItem key={task.id} task={task} />)}
              </div>
            </div>
          )}

          {doable.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2 flex items-center gap-2">
                <span>👍</span> You can do these
              </h3>
              <div className="space-y-2">
                {doable.map(task => <TaskItem key={task.id} task={task} />)}
              </div>
            </div>
          )}

          {tooHard.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-2">
                <span>⏸️</span> Save these for later
              </h3>
              <div className="space-y-2">
                {tooHard.map(task => <TaskItem key={task.id} task={task} dimmed />)}
              </div>
            </div>
          )}

          {completed.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-500 mb-2 flex items-center gap-2">
                <span>✅</span> Completed
              </h3>
              <div className="space-y-2">
                {completed.map(task => <TaskItem key={task.id} task={task} />)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
