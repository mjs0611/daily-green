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
  lastCareDate: string | null;        // YYYY-MM-DD (for streak validation)
  lastCareTime: string | null;        // kept for migration compat
  adLastWatched: string | null;       // ISO string (for ad cooldown)
  lastLoginBonusDate: string | null;  // YYYY-MM-DD (daily login bonus)
  completedMissions: string[];
  todayMissions: string[];
  todayMissionsDate: string;
  isWilting: boolean;
  isDead: boolean;
  totalDaysAlive: number;
}

export interface MissionResult {
  state: PlantState;
  luckyBonus: boolean;
  xpGained: number;
}
