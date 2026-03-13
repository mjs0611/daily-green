"use client";
import { Mission } from "@/types/plant";

interface Props {
  mission: Mission;
  isCompleted: boolean;
  onComplete: (missionId: string) => void;
}

export default function MissionCard({ mission, isCompleted, onComplete }: Props) {
  return (
    <button
      onClick={() => !isCompleted && onComplete(mission.id)}
      disabled={isCompleted}
      className={`w-full flex items-center gap-3 p-3.5 rounded-2xl border-2 transition-all duration-200 text-left ${
        isCompleted
          ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
          : 'border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800 active:scale-95 hover:border-[#00C473]'
      }`}
    >
      <span className="text-2xl">{mission.emoji}</span>
      <div className="flex-1">
        <p className={`text-sm font-semibold ${isCompleted ? 'text-green-600 dark:text-green-400 line-through' : 'text-gray-800 dark:text-white'}`}>
          {mission.label}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500">+{mission.xpReward} XP</p>
      </div>
      <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${
        isCompleted ? 'border-green-500 bg-green-500' : 'border-gray-300 dark:border-gray-600'
      }`}>
        {isCompleted && <span className="text-white text-xs">✓</span>}
      </div>
    </button>
  );
}
