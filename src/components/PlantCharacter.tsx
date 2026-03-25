"use client";
import type { PlantStage, PlantType } from "@/types/plant";

interface Props {
  stage: PlantStage;
  plantType: PlantType;
  isWilting?: boolean;
  isDead?: boolean;
  isHappy?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const STAGE_NUM: Record<PlantStage, number> = {
  seed: 1, sprout: 2, young: 3, bud: 4,
  flower: 5, fruit: 6, bloom: 7, special: 8,
};

export default function PlantCharacter({ stage, plantType, className, style }: Props) {
  const num = STAGE_NUM[stage];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/plants/${plantType}/stage_${num}.png`}
      alt={`${plantType} ${stage}`}
      className={className}
      style={{ objectFit: "contain", display: "block", width: "100%", height: "100%", ...style }}
    />
  );
}
