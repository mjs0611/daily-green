"use client";
import { ProgressBar } from "@toss/tds-mobile";

interface Props {
  emoji: string;
  label: string;
  value: number; // 0-100
  color: string; // hex color
}

export default function StatBar({ emoji, label, value, color }: Props) {
  const isLow = value < 30;
  return (
    <div className="flex items-center gap-3">
      <div className="bg-white/50 dark:bg-black/20 p-2 rounded-xl backdrop-blur-md shadow-sm border border-black/5 dark:border-white/5">
        <span className="text-xl w-6 flex justify-center items-center">{emoji}</span>
      </div>
      <div className="flex-1">
        <div className="flex justify-between text-xs mb-1.5">
          <span className={`font-semibold tracking-wide ${isLow ? 'text-red-500' : 'text-gray-700 dark:text-gray-200'}`}>{label}</span>
          <span className={`font-bold ${isLow ? 'text-red-500' : 'text-emerald-600 dark:text-emerald-400'}`}>{Math.round(value)}%</span>
        </div>
        <div className="h-3 w-full bg-black/5 dark:bg-white/10 rounded-full overflow-hidden shadow-inner relative">
          <div
            className="h-full rounded-full transition-all duration-1000 ease-out relative"
            style={{ width: `${value}%`, backgroundColor: isLow ? '#EF4444' : color }}
          >
            <div className="absolute inset-0 bg-white/20 w-full animate-pulse blur-[1px]"></div>
            <div className="absolute top-0 left-0 right-0 h-[40%] bg-white/30 rounded-t-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
