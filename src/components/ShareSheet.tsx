"use client";
import Image from "next/image";
import { PlantState } from "@/types/plant";
import { STAGE_INFO } from "@/lib/plantState";
import { useState } from "react";

interface Props {
  plant: PlantState;
  onClose: () => void;
}

export default function ShareSheet({ plant, onClose }: Props) {
  const [copied, setCopied] = useState(false);
  const info = STAGE_INFO[plant.stage];

  const shareText = `🌿 초록하루\n나의 식물이 "${info.name}" 단계에 도달했어요!\n🔥 ${plant.streak}일 연속 케어 중\n💧 ${plant.stats.water}  ☀️ ${plant.stats.sunlight}  💚 ${plant.stats.health}\n\n나도 식물 키워보기 → https://daily-green.vercel.app`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: '초록하루 🌿', text: shareText });
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const completedToday = plant.completedMissions.filter(id => plant.todayMissions.includes(id)).length;
  const totalMissions = plant.todayMissions.length;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" />
      <div
        className="relative w-full max-w-[430px] bg-white dark:bg-gray-900 rounded-t-3xl pb-10 pt-5 px-5 shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Handle bar */}
        <div className="w-10 h-1 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-5" />

        <h2 className="text-base font-bold text-gray-900 dark:text-white text-center mb-4">내 식물 공유하기</h2>

        {/* Share card preview */}
        <div className="bg-gradient-to-b from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-5 flex flex-col items-center gap-3 mb-5">
          <div className="relative w-28 h-28">
            <Image
              src={info.image}
              alt={info.name}
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>

          <div className="text-center">
            <p className="text-lg font-bold text-gray-800 dark:text-white">{info.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{info.description}</p>
          </div>

          <div className="flex gap-4 text-center">
            <div>
              <p className="text-lg font-bold text-orange-500">🔥 {plant.streak}</p>
              <p className="text-[10px] text-gray-400">연속 케어</p>
            </div>
            <div className="w-px bg-gray-200 dark:bg-gray-600" />
            <div>
              <p className="text-lg font-bold text-green-500">{completedToday}/{totalMissions}</p>
              <p className="text-[10px] text-gray-400">오늘 미션</p>
            </div>
            <div className="w-px bg-gray-200 dark:bg-gray-600" />
            <div>
              <p className="text-lg font-bold text-blue-500">{plant.totalDaysAlive}</p>
              <p className="text-[10px] text-gray-400">함께한 날</p>
            </div>
          </div>

          {/* Stats mini */}
          <div className="flex gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span>💧 {plant.stats.water}</span>
            <span>☀️ {plant.stats.sunlight}</span>
            <span>💚 {plant.stats.health}</span>
          </div>
        </div>

        {/* Share button */}
        <button
          onClick={handleShare}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#00C473] to-[#0066FF] text-white font-semibold text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          {copied ? (
            <>✅ 복사됐어요!</>
          ) : (
            <>{'share' in navigator ? '🔗 공유하기' : '📋 텍스트 복사하기'}</>
          )}
        </button>

        <button
          onClick={onClose}
          className="w-full mt-2.5 py-3 rounded-2xl text-gray-500 dark:text-gray-400 text-sm font-medium"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
