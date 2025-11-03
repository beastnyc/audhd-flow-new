import { useState, useEffect } from 'react';

export default function FocusTimer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState<'focus' | 'break'>('focus');

  const presets = [
    { label: '5 min', minutes: 5, type: 'Quick burst' },
    { label: '15 min', minutes: 15, type: 'Short focus' },
    { label: '25 min', minutes: 25, type: 'Pomodoro' },
    { label: '45 min', minutes: 45, type: 'Deep work' },
  ];

  useEffect(() => {
    let interval: number | null = null;

    if (isActive) {
      interval = window.setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setIsActive(false);
            // Timer finished - could add notification here
            if (sessionType === 'focus') {
              setSessionType('break');
              setMinutes(5);
            } else {
              setSessionType('focus');
              setMinutes(25);
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, minutes, seconds, sessionType]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
    setSessionType('focus');
  };

  const setPreset = (presetMinutes: number) => {
    setIsActive(false);
    setMinutes(presetMinutes);
    setSeconds(0);
    setSessionType('focus');
  };

  const formatTime = (mins: number, secs: number) => {
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((minutes * 60 + seconds) / (sessionType === 'focus' ? 25 * 60 : 5 * 60)) * 100;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          Focus Timer
        </h2>
        <span className={`text-sm px-3 py-1 rounded-full ${
          sessionType === 'focus'
            ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
            : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
        }`}>
          {sessionType === 'focus' ? '🎯 Focus' : '☕ Break'}
        </span>
      </div>

      <div className="text-center mb-6">
        <div className="relative inline-block">
          <svg className="w-48 h-48 transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-slate-200 dark:text-slate-700"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 88}`}
              strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress / 100)}`}
              className={sessionType === 'focus' ? 'text-indigo-500' : 'text-green-500'}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl font-bold text-slate-800 dark:text-slate-100">
              {formatTime(minutes, seconds)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mb-4">
        <button
          onClick={toggleTimer}
          className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
            isActive
              ? 'bg-amber-500 hover:bg-amber-600 text-white'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          {isActive ? '⏸️ Pause' : '▶️ Start'}
        </button>
        <button
          onClick={resetTimer}
          className="px-6 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg font-medium transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {presets.map(({ label, minutes: presetMins, type }) => (
          <button
            key={label}
            onClick={() => setPreset(presetMins)}
            disabled={isActive}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50 hover:border-indigo-300 dark:hover:border-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <div className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{type}</div>
          </button>
        ))}
      </div>

      <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
        <p className="text-xs text-indigo-700 dark:text-indigo-300">
          💡 Adjust durations to match your focus style - no rigid rules here!
        </p>
      </div>
    </div>
  );
}
