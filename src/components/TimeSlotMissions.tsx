"use client";
import { useState } from "react";
import { TimeSlotMissions as TSM, TimeSlot, Mission } from "@/types/plant";
import { getMissionById } from "@/lib/missions";
import { getCurrentTimeSlot, getSlotMeta } from "@/lib/weather";
import MissionCard from "./MissionCard";
import MissionInteractionModal from "./MissionInteractionModal";

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
  const allSlotsCompleted = totalCompleted >= total;

  const [selected, setSelected] = useState<{ mission: Mission; slotId: string } | null>(null);

  return (
    <div className="mx-4 mt-4 toss-card rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-5 pb-3">
        <h3
          className="text-lg font-black"
          style={{ color: "var(--toss-on-surface)", fontFamily: "var(--font-headline, sans-serif)" }}
        >
          오늘의 미션
        </h3>
        <span
          className="text-xs font-bold px-3 py-1 rounded-full"
          style={{ backgroundColor: "rgba(0,78,203,0.08)", color: "var(--toss-primary)" }}
        >
          {total - totalCompleted > 0 ? `${total - totalCompleted}개 남음` : "🎉 완료!"}
        </span>
      </div>

      {/* 시간대 탭 */}
      <div className="flex gap-1.5 px-4 pb-3">
        {ALL_SLOTS.map((slot) => {
          const m = getSlotMeta(slot);
          const isCurrent = slot === currentSlot;
          const slotDone =
            (timeSlotMissions[slot] ?? []).filter(id =>
              completedMissions.includes(`${slot}_${id}`)
            ).length === (timeSlotMissions[slot] ?? []).length &&
            (timeSlotMissions[slot] ?? []).length > 0;
          return (
            <div
              key={slot}
              className="flex-1 text-center py-1.5 rounded-xl text-[11px] font-bold"
              style={{
                backgroundColor: isCurrent
                  ? "var(--toss-primary)"
                  : slotDone
                  ? "rgba(0,78,203,0.08)"
                  : "var(--toss-surface-low)",
                color: isCurrent ? "#fff" : slotDone ? "var(--toss-primary)" : "var(--toss-on-surface-variant)",
              }}
            >
              {m.emoji} {m.name}
            </div>
          );
        })}
      </div>

      {/* Mission list */}
      <div>
        {missionIds.map((missionId, idx) => {
          const mission = getMissionById(missionId);
          if (!mission) return null;
          const slotId = `${currentSlot}_${missionId}`;
          return (
            <div key={slotId}>
              {idx > 0 && (
                <div className="mx-6" style={{ height: 1, backgroundColor: "var(--toss-surface-high)" }} />
              )}
              <MissionCard
                mission={mission}
                isCompleted={completedMissions.includes(slotId)}
                onSelect={() => setSelected({ mission, slotId })}
              />
            </div>
          );
        })}
      </div>

      {/* Completion message */}
      {slotCompleted === missionIds.length && missionIds.length > 0 && (
        <div className="mx-4 mb-3 p-3 rounded-xl text-center"
          style={{ backgroundColor: "rgba(0,108,73,0.08)" }}
        >
          <p className="text-sm font-semibold" style={{ color: "var(--toss-secondary)" }}>
            {allSlotsCompleted ? "🎉 오늘 미션 완주! 내일 또 만나요!" : `✅ ${meta.name} 미션 완료!`}
          </p>
        </div>
      )}


      {selected && (
        <MissionInteractionModal
          mission={selected.mission}
          onComplete={() => {
            onComplete(selected.slotId);
            setSelected(null);
          }}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
