"use client";
import { useState } from "react";

interface Props {
  onAdComplete: () => void;
  disabled?: boolean;
}

export default function AdButton({ onAdComplete, disabled }: Props) {
  const [watching, setWatching] = useState(false);
  const [cooldown, setCooldown] = useState(false);

  const handleClick = () => {
    if (disabled || watching || cooldown) return;
    setWatching(true);
    // Simulate 5-second ad
    setTimeout(() => {
      setWatching(false);
      setCooldown(true);
      onAdComplete();
      // 1-hour cooldown simulation (in real app, track with timestamp)
      setTimeout(() => setCooldown(false), 60 * 60 * 1000);
    }, 5000);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || watching || cooldown}
      className={`w-full py-3.5 px-4 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
        watching
          ? 'bg-yellow-400 text-yellow-900 cursor-wait'
          : cooldown || disabled
          ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
          : 'bg-gradient-to-r from-[#00C473] to-[#0066FF] text-white active:scale-95 hover:opacity-90'
      }`}
    >
      {watching ? (
        <>
          <span className="animate-spin">⏳</span>
          <span>광고 시청 중... (5초)</span>
        </>
      ) : cooldown ? (
        <>
          <span>✅</span>
          <span>광고 보기 완료 (1시간 후 다시 가능)</span>
        </>
      ) : (
        <>
          <span>📺</span>
          <span>광고 보면 성장 2배! 🌱</span>
        </>
      )}
    </button>
  );
}
