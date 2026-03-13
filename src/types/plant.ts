export type PlantStage = 'seed' | 'sprout' | 'young' | 'bud' | 'flower' | 'fruit' | 'bloom' | 'special';

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
  xp: number;
  xpRequired: number;
  streak: number;
  lastCareDate: string | null;   // YYYY-MM-DD (for streak validation)
  lastCareTime: string | null;   // ISO string (for time decay)
  adLastWatched: string | null;  // ISO string (for ad cooldown)
  completedMissions: string[];
  todayMissions: string[];
  todayMissionsDate: string;
  isWilting: boolean;
  isDead: boolean;
  totalDaysAlive: number;
}
