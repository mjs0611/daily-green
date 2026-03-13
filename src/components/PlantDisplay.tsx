"use client";
import { PlantStage } from "@/types/plant";
import { STAGE_INFO } from "@/lib/plantState";
import { useEffect, useState } from "react";

interface Props {
  stage: PlantStage;
  isWilting: boolean;
  isDead: boolean;
  xp: number;
  xpRequired: number;
  justLeveledUp?: boolean;
}

export default function PlantDisplay({ stage, isWilting, isDead, xp, xpRequired, justLeveledUp }: Props) {
  const [celebrating, setCelebrating] = useState(false);
  const info = STAGE_INFO[stage];
  const progress = Math.min((xp / xpRequired) * 100, 100);

  useEffect(() => {
    if (justLeveledUp) {
      setCelebrating(true);
      const t = setTimeout(() => setCelebrating(false), 2000);
      return () => clearTimeout(t);
    }
  }, [justLeveledUp]);

  return (
    <div className="flex flex-col items-center gap-4 py-6">
      {/* Celebration overlay */}
      {celebrating && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="text-6xl animate-bounce">🎉</div>
        </div>
      )}

      {/* Plant emoji with animation */}
      <div
        className={`text-[80px] leading-none select-none transition-all duration-500 ${
          isDead ? 'grayscale opacity-50 rotate-45' :
          isWilting ? 'opacity-70' :
          celebrating ? 'scale-125' : 'plant-float'
        }`}
        style={{
          filter: isWilting && !isDead ? 'sepia(0.5)' : undefined,
          animation: isWilting && !isDead ? 'wilt 2s ease-in-out infinite' :
                     celebrating ? 'levelup 0.5s ease-in-out infinite' : undefined,
        }}
      >
        {isDead ? '🪦' : info.emoji}
      </div>

      {/* Stage name */}
      <div className="text-center">
        <p className="text-lg font-bold text-gray-800 dark:text-white">{info.name}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {isDead ? '💀 식물이 떠났어요...' : isWilting ? '😢 식물이 힘들어요!' : info.description}
        </p>
      </div>

      {/* XP Progress bar */}
      {!isDead && stage !== 'special' && (
        <div className="w-full px-4">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
            <span>성장 진행도</span>
            <span>{xp} / {xpRequired} XP</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all duration-700"
              style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #00C473, #0066FF)' }}
            />
          </div>
        </div>
      )}
      {stage === 'special' && (
        <p className="text-sm font-medium text-yellow-500">✨ 최고 단계 달성!</p>
      )}
    </div>
  );
}
