"use client";
import { Mission } from "@/types/plant";

interface Props {
  mission: Mission;
  isCompleted: boolean;
  onSelect: () => void;
}

// Subtle bg tint per emoji category
function getIconBg(emoji: string): string {
  if (["💧", "🌊", "🚿"].some(e => emoji.includes(e[0]))) return "rgba(0,100,255,0.08)";
  if (["☀️", "🌤", "🌞"].some(e => emoji.includes(e[0]))) return "rgba(255,149,0,0.10)";
  if (["🌿", "🍃", "🌱", "🌾"].some(e => emoji.includes(e[0]))) return "rgba(0,108,73,0.10)";
  return "rgba(0,78,203,0.06)";
}

export default function MissionCard({ mission, isCompleted, onSelect }: Props) {
  return (
    <button
      onClick={() => !isCompleted && onSelect()}
      disabled={isCompleted}
      className="w-full flex items-center justify-between px-6 py-4 text-left transition-colors duration-150 active:scale-[0.99]"
      style={{ opacity: isCompleted ? 1 : 1 }}
    >
      {/* Icon + text */}
      <div className="flex items-center gap-4" style={{ opacity: isCompleted ? 0.55 : 1 }}>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0"
          style={{ backgroundColor: isCompleted ? "var(--toss-surface-high)" : getIconBg(mission.emoji) }}
        >
          {mission.emoji}
        </div>
        <div>
          <p
            className="text-[15px] font-bold"
            style={{
              color: "var(--toss-on-surface)",
              textDecoration: isCompleted ? "line-through" : "none",
            }}
          >
            {mission.label}
          </p>
          <p className="text-xs mt-0.5" style={{ color: "var(--toss-on-surface-variant)" }}>
            {isCompleted ? "완료" : `+${mission.xpReward} XP`}
          </p>
        </div>
      </div>

      {/* Action */}
      {isCompleted ? (
        <div
          className="flex items-center gap-1 font-bold text-[13px] px-3 py-1.5 rounded-xl flex-shrink-0"
          style={{ backgroundColor: "var(--toss-surface-high)", color: "var(--toss-on-surface-variant)" }}
        >
          <span>✓</span>
          <span>완료</span>
        </div>
      ) : (
        <button
          className="text-[13px] font-bold px-4 py-2 rounded-xl flex-shrink-0 active:scale-95 transition-transform text-white"
          style={{ background: "linear-gradient(135deg, #004ecb, #0064ff)", boxShadow: "0 4px 12px rgba(0,78,203,0.25)" }}
          onClick={e => { e.stopPropagation(); onSelect(); }}
        >
          하기
        </button>
      )}
    </button>
  );
}
