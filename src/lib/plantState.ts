import { PlantState, PlantStage, PlantStats, MissionResult } from "@/types/plant";
import { getTodayMissions } from "./missions";
import { format, isYesterday, parseISO, differenceInCalendarDays } from "date-fns";

const STORAGE_KEY = "daily_green_state";

const STAGE_ORDER: PlantStage[] = ['seed', 'sprout', 'young', 'bud', 'flower', 'fruit', 'bloom', 'special'];

const XP_REQUIRED: Record<PlantStage, number> = {
  seed: 30,
  sprout: 60,
  young: 100,
  bud: 150,
  flower: 200,
  fruit: 250,
  bloom: 300,
  special: 9999,
};

export const STAGE_INFO: Record<PlantStage, { image: string; name: string; description: string }> = {
  seed:    { image: '/plants/stage_1_seed.png',    name: '씨앗',      description: '작은 씨앗이 싹을 틔우려 해요' },
  sprout:  { image: '/plants/stage_2_sprout.png',  name: '새싹',      description: '귀여운 새싹이 올라왔어요!' },
  young:   { image: '/plants/stage_3_young.png',   name: '어린 식물', description: '쑥쑥 자라고 있어요!' },
  bud:     { image: '/plants/stage_4_bud.png',     name: '꽃봉오리',  description: '꽃이 피려고 해요!' },
  flower:  { image: '/plants/stage_5_flower.png',  name: '꽃',        description: '예쁜 꽃이 피었어요!' },
  fruit:   { image: '/plants/stage_6_fruit.png',   name: '열매',      description: '달콤한 열매가 맺혔어요!' },
  bloom:   { image: '/plants/stage_7_bloom.png',   name: '만개',      description: '화려하게 만개했어요!' },
  special: { image: '/plants/stage_8_golden.png',  name: '황금 식물', description: '전설의 황금 식물이 되었어요!' },
};

export function getInitialState(): PlantState {
  const today = format(new Date(), 'yyyy-MM-dd');
  return {
    stage: 'seed',
    stats: { water: 80, sunlight: 80, health: 80 },
    xp: 0,
    xpRequired: XP_REQUIRED['seed'],
    streak: 0,
    lastCareDate: null,
    lastCareTime: null,
    adLastWatched: null,
    lastLoginBonusDate: null,
    completedMissions: [],
    todayMissions: getTodayMissions(today),
    todayMissionsDate: today,
    isWilting: false,
    isDead: false,
    totalDaysAlive: 0,
  };
}

export function loadState(): PlantState {
  if (typeof window === 'undefined') return getInitialState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getInitialState();
    const state: PlantState = JSON.parse(raw);

    // Migrate old state missing new fields
    if (state.lastCareDate === undefined) state.lastCareDate = null;
    if (state.adLastWatched === undefined) state.adLastWatched = null;
    if (state.lastLoginBonusDate === undefined) state.lastLoginBonusDate = null;

    const today = format(new Date(), 'yyyy-MM-dd');

    // Refresh missions on new day
    if (state.todayMissionsDate !== today) {
      state.todayMissions = getTodayMissions(today);
      state.todayMissionsDate = today;
      state.completedMissions = [];
      state.totalDaysAlive += 1;
    }

    // Streak & wilting/dead: based on days since last care
    if (state.lastCareDate && state.lastCareDate !== today) {
      const lastDate = parseISO(state.lastCareDate);
      const daysSince = differenceInCalendarDays(new Date(), lastDate);

      if (daysSince >= 3) {
        state.streak = 0;
        state.isDead = true;
        state.isWilting = false;
      } else if (daysSince === 2) {
        state.streak = 0;
        state.isWilting = true;
        state.isDead = false;
      } else if (daysSince === 1) {
        // Cared yesterday — streak intact, not wilting
        state.isWilting = false;
        state.isDead = false;
      }
    } else if (!state.lastCareDate) {
      // Never cared (brand new plant)
      state.isWilting = false;
      state.isDead = false;
    }

    return state;
  } catch {
    return getInitialState();
  }
}

export function saveState(state: PlantState): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}


// Apply XP to state, handling level up chain
function applyXp(state: PlantState, xp: number): PlantState {
  let { stage, xpRequired } = state;
  let finalXp = state.xp + xp;

  while (finalXp >= xpRequired && stage !== 'special') {
    finalXp -= xpRequired;
    const currentIndex = STAGE_ORDER.indexOf(stage);
    stage = STAGE_ORDER[Math.min(currentIndex + 1, STAGE_ORDER.length - 1)];
    xpRequired = XP_REQUIRED[stage];
  }

  return { ...state, xp: finalXp, xpRequired, stage };
}

export function completeMission(
  state: PlantState,
  missionId: string,
  statEffect: Partial<PlantStats>,
  xpReward: number
): MissionResult {
  if (state.completedMissions.includes(missionId) || state.isDead) {
    return { state, luckyBonus: false, xpGained: 0 };
  }

  const today = format(new Date(), 'yyyy-MM-dd');

  // Streak logic
  let newStreak = state.streak;
  let newLastCareDate = state.lastCareDate;

  if (state.lastCareDate !== today) {
    if (state.lastCareDate) {
      const lastDate = parseISO(state.lastCareDate);
      newStreak = isYesterday(lastDate) ? state.streak + 1 : 1;
    } else {
      newStreak = 1;
    }
    newLastCareDate = today;
  }

  const newStats: PlantStats = {
    water: Math.min(100, state.stats.water + (statEffect.water ?? 0)),
    sunlight: Math.min(100, state.stats.sunlight + (statEffect.sunlight ?? 0)),
    health: Math.min(100, state.stats.health + (statEffect.health ?? 0)),
  };

  // Lucky bonus: 20% chance of 2x XP
  const luckyBonus = Math.random() < 0.2;
  const xpGained = luckyBonus ? xpReward * 2 : xpReward;

  const completedMissions = [...state.completedMissions, missionId];

  let next: PlantState = {
    ...state,
    stats: newStats,
    completedMissions,
    lastCareDate: newLastCareDate,
    streak: newStreak,
    isWilting: false,
    isDead: false,
  };
  next = applyXp(next, xpGained);

  return { state: next, luckyBonus, xpGained };
}

// AD_XP: watching a rewarded ad directly boosts growth (can trigger level up)
const AD_XP_REWARD = 50;

export function applyAdBoost(state: PlantState): { state: PlantState; xpGained: number } {
  let next = applyXp(state, AD_XP_REWARD);
  next = { ...next, isWilting: false, adLastWatched: new Date().toISOString() };
  return { state: next, xpGained: AD_XP_REWARD };
}

// Daily login bonus XP (increases with streak)
function loginBonusXp(streak: number): number {
  if (streak >= 30) return 30;
  if (streak >= 7) return 20;
  if (streak >= 3) return 15;
  return 10;
}

export function claimLoginBonus(
  state: PlantState
): { state: PlantState; bonusXp: number } | null {
  const today = format(new Date(), 'yyyy-MM-dd');
  if (state.lastLoginBonusDate === today || state.isDead) return null;

  const bonusXp = loginBonusXp(state.streak);
  let next = applyXp(state, bonusXp);
  next = { ...next, lastLoginBonusDate: today };
  return { state: next, bonusXp };
}

export function resetPlant(): PlantState {
  return getInitialState();
}

export function isAdAvailable(state: PlantState): boolean {
  if (!state.adLastWatched) return true;
  const lastWatched = new Date(state.adLastWatched);
  const hoursElapsed = (Date.now() - lastWatched.getTime()) / (1000 * 60 * 60);
  return hoursElapsed >= 1;
}
