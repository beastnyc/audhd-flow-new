interface HeaderProps {
  sensoryMode: boolean;
  onToggleSensoryMode: () => void;
}

export default function Header({ sensoryMode, onToggleSensoryMode }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🧠</div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                AUDHD Flow
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Neurodivergent-first productivity
              </p>
            </div>
          </div>

          <button
            onClick={onToggleSensoryMode}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all
              ${sensoryMode
                ? 'bg-purple-50 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600'
              }
            `}
          >
            <span className="text-lg">{sensoryMode ? '🌙' : '✨'}</span>
            <span className="text-sm font-medium hidden sm:inline">
              {sensoryMode ? 'Calm Mode' : 'Full Mode'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
