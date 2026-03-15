"use client";
import { TimeSlotMissions as TSM, TimeSlot } from "@/types/plant";
import { getMissionById } from "@/lib/missions";
import { getCurrentTimeSlot, getSlotMeta } from "@/lib/weather";
import MissionCard from "./MissionCard";

interface Props {
  timeSlotMissions: TSM;
  completedMissions: string[];
  onComplete: (slotId: string) => void;
  totalCompleted: number;
  total: number;
}

const ALL_SLOTS: TimeSlot[] = ["morning", "afternoon", "evening", "night"];

export default function TimeSlotMissions({
  timeSlotMissions,
  completedMissions,
  onComplete,
  totalCompleted,
  total,
}: Props) {
  const currentSlot = getCurrentTimeSlot();
  const meta = getSlotMeta(currentSlot);
  const missionIds = timeSlotMissions[currentSlot] ?? [];
  const slotCompleted = missionIds.filter(id =>
    completedMissions.includes(`${currentSlot}_${id}`)
  ).length;

  // 전체 슬롯 완료 여부 (탭 전환 없이 전체 진행상황 표시용)
  const allSlotsCompleted = totalCompleted >= total;

  return (
    <div className="mx-4 mt-3 glass-panel rounded-3xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold tracking-wide text-gray-800 dark:text-gray-100 flex items-center gap-1.5">
          <span>🌿</span> 오늘의 미션
        </h2>
        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full">{totalCompleted}/{total} 완료</span>
      </div>

      {/* 시간대 탭 */}
      <div className="flex gap-1 mb-4">
        {ALL_SLOTS.map((slot) => {
          const m = getSlotMeta(slot);
          const isCurrent = slot === currentSlot;
          const slotDone = (timeSlotMissions[slot] ?? []).filter(id =>
            completedMissions.includes(`${slot}_${id}`)
          ).length === (timeSlotMissions[slot] ?? []).length && (timeSlotMissions[slot] ?? []).length > 0;
          return (
            <div
              key={slot}
              className={`flex-1 text-center py-1 rounded-lg text-[11px] font-medium transition-colors ${
                isCurrent
                  ? 'bg-emerald-500 text-white'
                  : slotDone
                  ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                  : 'bg-gray-100 dark:bg-gray-700/50 text-gray-400 dark:text-gray-500'
              }`}
            >
              {m.emoji} {m.name}
            </div>
          );
        })}
      </div>

      {/* 현재 시간대 미션만 표시 */}
      <div className="space-y-2">
        {missionIds.map((missionId) => {
          const mission = getMissionById(missionId);
          if (!mission) return null;
          const slotId = `${currentSlot}_${missionId}`;
          return (
            <MissionCard
              key={slotId}
              mission={mission}
              isCompleted={completedMissions.includes(slotId)}
              onComplete={() => onComplete(slotId)}
            />
          );
        })}
      </div>

      {slotCompleted === missionIds.length && missionIds.length > 0 && (
        <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-2xl text-center">
          <p className="text-sm font-semibold text-green-600 dark:text-green-400">
            {allSlotsCompleted ? '🎉 오늘 미션 완주! 내일 또 만나요!' : `✅ ${meta.name} 미션 완료!`}
          </p>
        </div>
      )}
    </div>
  );
}
