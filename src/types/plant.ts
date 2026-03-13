export type PlantStage = 'seed' | 'sprout' | 'young' | 'flowering' | 'mature' | 'special';

export interface PlantStats {
  water: number;    // 0-100
  sunlight: number; // 0-100
  health: number;   // 0-100
}

export interface Mission {
  id: string;
  emoji: string;
  label: string;
  statEffect: Partial<PlantStats>;
  xpReward: number;
}

export interface PlantState {
  stage: PlantStage;
  stats: PlantStats;
  xp: number;              // current XP toward next stage
  xpRequired: number;      // XP needed for next stage
  streak: number;          // consecutive days
  lastCareTime: string | null;  // ISO string
  completedMissions: string[];  // mission IDs completed today
  todayMissions: string[];      // today's 3 mission IDs
  todayMissionsDate: string;    // YYYY-MM-DD
  isWilting: boolean;
  isDead: boolean;
  totalDaysAlive: number;
}
