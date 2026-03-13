"use client";

interface Props {
  emoji: string;
  label: string;
  value: number; // 0-100
  color: string; // CSS gradient or hex
}

export default function StatBar({ emoji, label, value, color }: Props) {
  const isLow = value < 30;
  return (
    <div className="flex items-center gap-3">
      <span className="text-xl w-6">{emoji}</span>
      <div className="flex-1">
        <div className="flex justify-between text-xs mb-1">
          <span className={`font-medium ${isLow ? 'text-red-500' : 'text-gray-600 dark:text-gray-300'}`}>{label}</span>
          <span className={`font-medium ${isLow ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>{Math.round(value)}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div
            className="h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${value}%`, background: color }}
          />
        </div>
      </div>
    </div>
  );
}
