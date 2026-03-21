"use client";

interface Props {
  emoji: string;
  label: string;
  value: number; // 0-100
  color: string; // hex color (fallback, gradient used for normal state)
}

export default function StatBar({ emoji, label, value }: Props) {
  const isLow = value < 30;

  return (
    <div className="flex items-center gap-3">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: "var(--toss-surface-low, #f5f3f3)" }}
      >
        <span className="text-lg">{emoji}</span>
      </div>
      <div className="flex-1">
        <div className="flex justify-between text-xs mb-1.5">
          <span
            className="font-semibold"
            style={{ color: isLow ? "#ba1a1a" : "var(--toss-on-surface, #1b1c1c)" }}
          >
            {label}
          </span>
          <span
            className="font-bold"
            style={{ color: isLow ? "#ba1a1a" : "var(--toss-secondary, #006c49)" }}
          >
            {Math.round(value)}%
          </span>
        </div>
        <div
          className="h-3 w-full rounded-full overflow-hidden"
          style={{ backgroundColor: "var(--toss-surface-high, #eae8e7)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-1000 ease-out"
            style={{
              width: `${value}%`,
              background: isLow
                ? "#ba1a1a"
                : "linear-gradient(to right, #006c49, #3fe0a1, #63fdbb)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
