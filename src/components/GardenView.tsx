"use client";
import { useEffect, useState } from "react";
import { PlantState, CollectedPlant, PlantType } from "@/types/plant";
import { PLANT_TYPE_INFO, PLANT_TYPE_ORDER } from "@/lib/season";
import { STAGE_INFO } from "@/lib/plantState";

interface Props {
  plant: PlantState;
  adAvailable: boolean;
  onAdComplete: () => void;
}

// XP bar with mount animation
function GardenXpBar({ xp, xpRequired }: { xp: number; xpRequired: number }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const id = requestAnimationFrame(() => setWidth(Math.min((xp / xpRequired) * 100, 100)));
    return () => cancelAnimationFrame(id);
  }, [xp, xpRequired]);
  return (
    <div className="h-3 w-full rounded-full overflow-hidden" style={{ backgroundColor: "var(--toss-surface-high)" }}>
      <div
        className="h-full rounded-full"
        style={{
          width: `${width}%`,
          background: "linear-gradient(to right, #006c49, #3fe0a1, #63fdbb)",
          transition: "width 1s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
    </div>
  );
}

function StatLabel(value: number): string {
  if (value >= 80) return "Optimal";
  if (value >= 55) return "Good";
  if (value >= 30) return "Low";
  return "Critical";
}

export default function GardenView({ plant, adAvailable, onAdComplete }: Props) {
  const stageInfo = STAGE_INFO[plant.stage];
  const typeInfo = PLANT_TYPE_INFO[plant.plantType];

  const lockedTypes = PLANT_TYPE_ORDER.filter(
    t => !plant.garden.some(g => g.type === t) && t !== plant.plantType
  );
  const nextType = lockedTypes[0] ?? null;

  return (
    <div className="pb-8">
      {/* Hero */}
      <div className="flex flex-col items-center pt-6 px-6 text-center">
        {/* Plant image with ambient glow */}
        <div className="relative w-56 h-56 mb-5">
          <div
            className="absolute inset-4 rounded-full blur-3xl"
            style={{ backgroundColor: "rgba(99,253,187,0.20)" }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={stageInfo.image}
            alt={stageInfo.name}
            className="relative z-10 w-full h-full object-contain drop-shadow-xl"
            style={{
              animation: !plant.isDead && !plant.isWilting ? "breathe 4s ease-in-out infinite" : undefined,
              filter: plant.isWilting && !plant.isDead
                ? `sepia(0.6) brightness(0.85) hue-rotate(${typeInfo.hueRotate}deg)`
                : typeInfo.hueRotate ? `hue-rotate(${typeInfo.hueRotate}deg)` : undefined,
            }}
          />
        </div>

        {/* Name + stage */}
        <div className="w-full space-y-1 mb-4">
          <h2
            className="text-2xl font-black tracking-tight"
            style={{ color: "var(--toss-on-surface)", fontFamily: "var(--font-headline, sans-serif)" }}
          >
            {plant.name || stageInfo.name}
          </h2>
          <p className="text-sm font-medium" style={{ color: "var(--toss-on-surface-variant)" }}>
            {stageInfo.name} · {typeInfo.emoji} {typeInfo.name}
          </p>
        </div>

        {/* XP bar */}
        {plant.stage !== "special" && !plant.isDead && (
          <div className="w-full space-y-1.5 mb-2">
            <GardenXpBar xp={plant.xp} xpRequired={plant.xpRequired} />
            <div className="flex justify-between text-xs font-bold px-0.5" style={{ color: "var(--toss-primary)" }}>
              <span>{plant.xp} XP</span>
              <span>{plant.xpRequired} XP</span>
            </div>
          </div>
        )}

        {/* Ad button */}
        {!plant.isDead && (
          <button
            className="w-full mt-3 py-4 px-6 rounded-full font-bold text-white flex items-center justify-center gap-2 active:scale-95 transition-all"
            style={{
              background: adAvailable
                ? "linear-gradient(135deg, #004ecb, #0064ff)"
                : "var(--toss-surface-high)",
              color: adAvailable ? "#fff" : "var(--toss-on-surface-variant)",
              boxShadow: adAvailable ? "0 12px 32px -4px rgba(0,84,216,0.15)" : "none",
            }}
            onClick={adAvailable ? onAdComplete : undefined}
            disabled={!adAvailable}
          >
            {adAvailable ? "📺 광고 보고 성장 XP +50 받기" : "✅ 1시간 후 광고 이용 가능"}
          </button>
        )}
      </div>

      {/* Stat grid */}
      {!plant.isDead && (
        <div className="grid grid-cols-3 gap-3 mx-4 mt-5">
          {[
            { label: "SUNLIGHT", value: plant.stats.sunlight, display: StatLabel(plant.stats.sunlight) },
            { label: "HEALTH",   value: plant.stats.health,   display: `${Math.round(plant.stats.health)}%` },
            { label: "MOISTURE", value: plant.stats.water,    display: `${Math.round(plant.stats.water)}%` },
          ].map(({ label, value, display }) => {
            const isLow = value < 30;
            return (
              <div key={label} className="toss-card rounded-2xl p-4 flex flex-col items-center gap-1 text-center"
                style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
                <p className="text-[10px] font-bold uppercase tracking-tight"
                  style={{ color: "var(--toss-on-surface-variant)" }}>{label}</p>
                <p className="text-base font-extrabold"
                  style={{ color: isLow ? "#ba1a1a" : "var(--toss-on-surface)", fontFamily: "var(--font-headline, sans-serif)" }}>
                  {display}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* Collection grid */}
      <div className="mx-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold"
            style={{ color: "var(--toss-on-surface)", fontFamily: "var(--font-headline, sans-serif)" }}>
            내 정원
          </h3>
          <span className="text-xs font-semibold" style={{ color: "var(--toss-on-surface-variant)" }}>
            {plant.garden.length} / {PLANT_TYPE_ORDER.length} 수집
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {/* 수집 완료 */}
          {plant.garden.map((p: CollectedPlant, i: number) => {
            const info = PLANT_TYPE_INFO[p.type];
            const img = STAGE_INFO["special"].image;
            return (
              <div key={i} className="toss-card rounded-2xl p-4 flex flex-col items-center gap-2">
                <div className="w-20 h-20" style={{ filter: `hue-rotate(${info.hueRotate}deg)` }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={info.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold" style={{ color: "var(--toss-on-surface)" }}>{info.emoji} {info.name}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: "var(--toss-primary)" }}>🔥 최고 {p.maxStreak}일</p>
                  <p className="text-[10px]" style={{ color: "var(--toss-on-surface-variant)" }}>{p.totalDaysAlive}일 함께</p>
                </div>
              </div>
            );
          })}

          {/* 현재 키우는 중 */}
          <div className="toss-card rounded-2xl p-4 flex flex-col items-center gap-2 relative"
            style={{ outline: "2px solid rgba(0,78,203,0.25)" }}>
            <span className="absolute top-2 left-2 text-[9px] font-bold text-white px-1.5 py-0.5 rounded-full"
              style={{ backgroundColor: "var(--toss-primary)" }}>
              성장 중
            </span>
            <div className="w-20 h-20" style={{ filter: `hue-rotate(${typeInfo.hueRotate}deg)` }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={STAGE_INFO["seed"].image} alt={typeInfo.name}
                style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <div className="text-center">
              <p className="text-xs font-bold" style={{ color: "var(--toss-on-surface)" }}>{typeInfo.emoji} {typeInfo.name}</p>
              <p className="text-[10px] mt-0.5" style={{ color: "var(--toss-secondary)" }}>성장 중...</p>
            </div>
          </div>

          {/* 다음 식물 */}
          {nextType && (() => {
            const info = PLANT_TYPE_INFO[nextType as PlantType];
            return (
              <div key={nextType} className="toss-card rounded-2xl p-4 flex flex-col items-center gap-2 relative"
                style={{ opacity: 0.55 }}>
                <span className="absolute top-2 left-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                  style={{ backgroundColor: "rgba(232,118,0,0.12)", color: "#e87600" }}>
                  다음
                </span>
                <div className="w-20 h-20 flex items-center justify-center text-5xl">{info.emoji}</div>
                <div className="text-center">
                  <p className="text-xs font-semibold" style={{ color: "var(--toss-on-surface)" }}>{info.name}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: "var(--toss-on-surface-variant)" }}>{info.desc}</p>
                </div>
              </div>
            );
          })()}

          {/* 잠긴 슬롯 */}
          {lockedTypes.slice(1).map((type) => {
            const info = PLANT_TYPE_INFO[type as PlantType];
            return (
              <div key={type} className="toss-card rounded-2xl p-4 flex flex-col items-center gap-2"
                style={{ opacity: 0.3 }}>
                <div className="w-20 h-20 flex items-center justify-center text-4xl">🔒</div>
                <p className="text-xs font-semibold" style={{ color: "var(--toss-on-surface-variant)" }}>{info.emoji} {info.name}</p>
              </div>
            );
          })}
        </div>

        {plant.garden.length === 0 && (
          <p className="text-center text-xs mt-4" style={{ color: "var(--toss-on-surface-variant)" }}>
            황금 식물을 키워 첫 번째 식물을 수집해보세요!
          </p>
        )}
      </div>
    </div>
  );
}
