import { EnergyLevel } from '../types';

interface EnergyTrackerProps {
  currentEnergy: EnergyLevel;
  onEnergyChange: (energy: EnergyLevel) => void;
}

const energyLevels: { level: EnergyLevel; label: string; emoji: string; description: string }[] = [
  { level: 'high', label: 'High Energy', emoji: '⚡', description: 'Ready for challenging tasks' },
  { level: 'medium', label: 'Medium Energy', emoji: '🌤️', description: 'Good for routine work' },
  { level: 'low', label: 'Low Energy', emoji: '🌙', description: 'Simple tasks only' },
  { level: 'burnout', label: 'Burnout', emoji: '🛌', description: 'Rest time needed' },
];

export default function EnergyTracker({ currentEnergy, onEnergyChange }: EnergyTrackerProps) {
  const getEnergyColor = (level: EnergyLevel) => {
    const colors = {
      high: 'bg-green-500',
      medium: 'bg-amber-500',
      low: 'bg-red-500',
      burnout: 'bg-purple-500',
    };
    return colors[level];
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
      <h2 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-100">
        How's your energy?
      </h2>

      <div className="grid grid-cols-2 gap-3">
        {energyLevels.map(({ level, label, emoji, description }) => (
          <button
            key={level}
            onClick={() => onEnergyChange(level)}
            className={`
              relative p-4 rounded-lg border-2 transition-all
              ${currentEnergy === level
                ? `${getEnergyColor(level)} border-transparent text-white`
                : 'bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-500'
              }
            `}
          >
            <div className="text-2xl mb-1">{emoji}</div>
            <div className="text-sm font-medium">{label}</div>
            <div className={`text-xs mt-1 ${currentEnergy === level ? 'text-white/90' : 'text-slate-500 dark:text-slate-400'}`}>
              {description}
            </div>
            {currentEnergy === level && (
              <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full" />
            )}
          </button>
        ))}
      </div>

      <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
        <p className="text-sm text-indigo-700 dark:text-indigo-300">
          💡 Your task list will adapt based on your energy level
        </p>
      </div>
    </div>
  );
}
