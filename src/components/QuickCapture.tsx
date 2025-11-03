import { useState, FormEvent } from 'react';
import { EnergyLevel } from '../types';

interface QuickCaptureProps {
  onAddTask: (title: string, energyRequired: EnergyLevel) => void;
}

export default function QuickCapture({ onAddTask }: QuickCaptureProps) {
  const [taskTitle, setTaskTitle] = useState('');
  const [energyRequired, setEnergyRequired] = useState<EnergyLevel>('medium');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      onAddTask(taskTitle.trim(), energyRequired);
      setTaskTitle('');
      setEnergyRequired('medium');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
      <h2 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-100">
        Quick Capture
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="What needs to be done? (Press Enter)"
            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            autoFocus
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Energy needed:
          </label>
          <div className="grid grid-cols-4 gap-2">
            {(['high', 'medium', 'low', 'burnout'] as EnergyLevel[]).map((level) => {
              const config = {
                high: { emoji: '⚡', label: 'High' },
                medium: { emoji: '🌤️', label: 'Medium' },
                low: { emoji: '🌙', label: 'Low' },
                burnout: { emoji: '🛌', label: 'Rest' },
              };

              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => setEnergyRequired(level)}
                  className={`
                    p-2 rounded-lg border-2 transition-all text-sm
                    ${energyRequired === level
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                      : 'border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-500'
                    }
                  `}
                >
                  <div className="text-lg">{config[level].emoji}</div>
                  <div className="mt-1">{config[level].label}</div>
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          disabled={!taskTitle.trim()}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
        >
          Add Task
        </button>
      </form>

      <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
        <p className="text-xs text-slate-600 dark:text-slate-400">
          ⌨️ Pro tip: Press Enter to quickly add tasks
        </p>
      </div>
    </div>
  );
}
