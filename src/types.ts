export type EnergyLevel = 'high' | 'medium' | 'low' | 'burnout';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  energyRequired: EnergyLevel;
  createdAt: Date;
  priority: 'high' | 'medium' | 'low';
}

export interface AppState {
  currentEnergy: EnergyLevel;
  tasks: Task[];
  sensoryMode: boolean;
  focusSessionActive: boolean;
}
