import { useState, useEffect } from 'react';
import { Task, EnergyLevel } from './types';
import Header from './components/Header';
import EnergyTracker from './components/EnergyTracker';
import QuickCapture from './components/QuickCapture';
import TaskList from './components/TaskList';
import FocusTimer from './components/FocusTimer';

function App() {
  const [currentEnergy, setCurrentEnergy] = useState<EnergyLevel>('medium');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sensoryMode, setSensoryMode] = useState(false);

  // Load state from localStorage
  useEffect(() => {
    const savedEnergy = localStorage.getItem('currentEnergy');
    const savedTasks = localStorage.getItem('tasks');
    const savedSensoryMode = localStorage.getItem('sensoryMode');

    if (savedEnergy) setCurrentEnergy(savedEnergy as EnergyLevel);
    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedSensoryMode) setSensoryMode(JSON.parse(savedSensoryMode));
  }, []);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('currentEnergy', currentEnergy);
  }, [currentEnergy]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('sensoryMode', JSON.stringify(sensoryMode));
  }, [sensoryMode]);

  const handleAddTask = (title: string, energyRequired: EnergyLevel) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      energyRequired,
      createdAt: new Date(),
      priority: 'medium',
    };
    setTasks([...tasks, newTask]);
  };

  const handleToggleTask = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className={`min-h-screen ${sensoryMode ? 'bg-slate-50 dark:bg-slate-900' : 'bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800'}`}>
      <Header
        sensoryMode={sensoryMode}
        onToggleSensoryMode={() => setSensoryMode(!sensoryMode)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Welcome back! 👋
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Let's check in with your energy and see what you can tackle today.
          </p>
        </div>

        {/* Main grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Energy & Quick Capture */}
          <div className="space-y-6">
            <EnergyTracker
              currentEnergy={currentEnergy}
              onEnergyChange={setCurrentEnergy}
            />
            <QuickCapture onAddTask={handleAddTask} />
          </div>

          {/* Middle column - Task List */}
          <div className="lg:col-span-2">
            <TaskList
              tasks={tasks}
              currentEnergy={currentEnergy}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
            />
          </div>
        </div>

        {/* Focus Timer - Full width below */}
        <div className="mt-6">
          <FocusTimer />
        </div>

        {/* Tips section */}
        {!sensoryMode && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-lg p-4 border border-slate-200 dark:border-slate-700">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-1">Energy-Based Planning</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Tasks adapt to your current energy level. No guilt, just realistic expectations.
              </p>
            </div>
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-lg p-4 border border-slate-200 dark:border-slate-700">
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-1">Quick Capture</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Brain dump those fleeting thoughts instantly. Sort them out later.
              </p>
            </div>
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-lg p-4 border border-slate-200 dark:border-slate-700">
              <div className="text-2xl mb-2">🌙</div>
              <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-1">Sensory Modes</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Toggle Calm Mode in the header when you need less visual stimulation.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
