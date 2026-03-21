"use client";
import { useState, useEffect, useCallback } from "react";
import { Button, ProgressBar } from "@toss/tds-mobile";
import { GoogleAdMob } from "@apps-in-toss/web-framework";

interface Props {
  onAdComplete: () => void;
  adAvailable: boolean;
}

// 테스트용 광고 그룹 ID (실 배포 시 콘솔에서 발급받은 ID로 교체)
const AD_GROUP_ID = process.env.NEXT_PUBLIC_TOSS_REWARDED_AD_GROUP_ID ?? "ait-ad-test-rewarded-id";

const isAdMobSupported = () => {
  try {
    return GoogleAdMob.loadAppsInTossAdMob.isSupported?.() === true;
  } catch {
    return false;
  }
};

export default function AdButton({ onAdComplete, adAvailable }: Props) {
  const [phase, setPhase] = useState<"idle" | "loading" | "watching" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const [adLoaded, setAdLoaded] = useState(false);
  const supported = isAdMobSupported();

  // 토스 앱: 광고 사전 로드
  const loadAd = useCallback(() => {
    if (!supported || !adAvailable) return;
    setPhase("loading");
    try {
      GoogleAdMob.loadAppsInTossAdMob({
        options: { adGroupId: AD_GROUP_ID },
        onEvent: (e) => {
          if (e.type === "loaded") {
            setAdLoaded(true);
            setPhase("idle");
          }
        },
        onError: () => {
          setPhase("idle");
        },
      });
    } catch {
      setPhase("idle");
    }
  }, [supported, adAvailable]);

  useEffect(() => {
    loadAd();
  }, [loadAd]);

  // 모의 진행 타이머 (토스 앱 외부)
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (phase === "watching" && !supported) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 4; // 200ms × 25 = 5초
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [phase, supported]);

  useEffect(() => {
    if (progress >= 100 && phase === "watching") {
      setPhase("done");
      onAdComplete();
    }
  }, [progress, phase, onAdComplete]);

  const handleWatch = () => {
    if (!adAvailable || phase === "watching" || phase === "loading") return;

    if (supported) {
      // 토스 앱: 실제 리워드 광고
      setPhase("watching");
      try {
        GoogleAdMob.showAppsInTossAdMob({
          options: { adGroupId: AD_GROUP_ID },
          onEvent: (e) => {
            if (e.type === "userEarnedReward") onAdComplete();
            if (e.type === "dismissed") {
              setPhase("idle");
              setAdLoaded(false);
              loadAd();
            }
          },
          onError: () => setPhase("idle"),
        });
      } catch {
        setPhase("idle");
      }
    } else {
      // 개발/웹 환경: 모의 5초 광고
      setPhase("watching");
    }
  };

  const remainingSeconds = Math.ceil(((100 - progress) / 100) * 5);

  if (phase === "loading") {
    return (
      <div className="py-3 px-4 rounded-2xl flex items-center justify-center gap-2" style={{ backgroundColor: "var(--toss-surface-high)" }}>
        <span className="animate-spin text-sm">⏳</span>
        <span className="text-xs font-medium" style={{ color: "var(--toss-on-surface-variant)" }}>광고 불러오는 중...</span>
      </div>
    );
  }
  if (phase === "watching" && !supported) {
    return (
      <div className="py-3 px-4 rounded-2xl flex flex-col gap-2" style={{ backgroundColor: "rgba(245,158,11,0.08)" }}>
        <div className="flex items-center justify-between text-xs font-medium" style={{ color: "#e87600" }}>
          <span>📺 광고 시청 중...</span>
          <span>{remainingSeconds}초</span>
        </div>
        <ProgressBar progress={progress / 100} size="light" color="#F59E0B" animate />
      </div>
    );
  }
  if (!adAvailable) {
    return (
      <div className="py-3 px-4 rounded-2xl flex items-center justify-center gap-2" style={{ backgroundColor: "var(--toss-surface-high)" }}>
        <span>✅</span>
        <span className="text-xs font-medium" style={{ color: "var(--toss-on-surface-variant)" }}>1시간 후 광고 다시 볼 수 있어요</span>
      </div>
    );
  }
  return (
    <Button display="full" color="primary" size="large" onClick={handleWatch}>
      📺 광고 보고 성장 XP +50 받기
    </Button>
  );
}
