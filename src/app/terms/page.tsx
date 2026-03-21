"use client";

const SECTIONS = [
  {
    title: "제1조 목적",
    content: [
      "이 약관은 모준승(이하 '운영자')이 토스 앱인토스(Apps in Toss) 플랫폼을 통해 제공하는 플랜티(Planty) 서비스(이하 '서비스')의 이용에 관한 조건 및 절차, 운영자와 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.",
    ],
  },
  {
    title: "제2조 정의",
    items: [
      "'서비스'란 운영자가 제공하는 가상 식물 육성 미니게임 플랜티(Planty) 및 이에 부속된 미션, 정원, 스트릭, 광고 리워드 등 관련 기능 전체를 의미합니다.",
      "'이용자'란 이 약관에 동의하고 서비스를 이용하는 자를 의미합니다.",
      "'식물 데이터'란 이용자가 서비스를 이용하는 과정에서 기기 내 로컬 저장소에 생성·저장되는 성장 단계, XP, 미션 완료 기록, 연속 케어 스트릭(Streak), 스트릭 실드, 정원 수집 정보 등 게임 내 일체의 정보를 의미합니다.",
      "'광고 리워드'란 이용자가 제3자 광고(Google AdMob 등)를 시청함으로써 획득하는 게임 내 보상(성장 XP 등)을 의미합니다.",
    ],
  },
  {
    title: "제3조 약관의 효력 및 변경",
    items: [
      "이 약관은 서비스 내 공지 또는 별도 화면을 통해 이용자에게 공시함으로써 효력이 발생합니다.",
      "운영자는 관련 법령을 위배하지 않는 범위 내에서 약관을 변경할 수 있으며, 변경 시 시행일 7일 전에 서비스 내 공지합니다.",
      "이용자가 변경된 약관에 동의하지 않는 경우 서비스 이용을 중단할 수 있으며, 계속 이용 시 변경된 약관에 동의한 것으로 봅니다.",
    ],
  },
  {
    title: "제4조 서비스 내용",
    content: ["운영자는 이용자에게 다음의 서비스를 제공합니다."],
    items: [
      "가상 식물 육성 — 씨앗부터 황금 식물까지 8단계 성장 및 XP 시스템",
      "일일 미션 — 시간대(아침·낮·저녁·밤)별 미션 제공 및 완료 보상",
      "스트릭 및 실드 — 연속 케어 일수 기록, 스트릭 실드로 하루 보호",
      "정원 수집 — 졸업한 식물을 정원에 영구 보관",
      "광고 리워드 — 선택적 광고 시청을 통한 성장 XP 획득",
      "계절 이벤트 — 봄·여름·가을·겨울 시즌별 식물 유형 보너스",
      "기타 운영자가 정하는 부가 서비스",
    ],
    footer: "서비스는 연중무휴 24시간 제공을 원칙으로 하나, 시스템 점검·장애·토스 플랫폼 정책 변경 등의 사유로 일시 중단될 수 있습니다.",
  },
  {
    title: "제5조 데이터 저장 및 관리",
    items: [
      "식물 데이터는 이용자 기기의 로컬 저장소(localStorage)에 저장됩니다. 운영자 서버에는 어떠한 개인 식물 데이터도 전송·보관되지 않습니다.",
      "기기 초기화, 앱 데이터 삭제, 브라우저 캐시 삭제 등으로 로컬 저장소가 삭제된 경우 식물 데이터는 복구되지 않으며, 운영자는 이에 대한 책임을 지지 않습니다.",
      "이용자는 직접 데이터 삭제('새 씨앗 심기') 기능을 통해 데이터를 초기화할 수 있습니다.",
    ],
  },
  {
    title: "제6조 광고 및 리워드",
    items: [
      "서비스 내 광고는 Google AdMob(앱인토스 광고 시스템)을 통해 제공됩니다. 광고 시청은 이용자의 자유로운 선택이며, 시청 시 게임 내 보상(XP)이 지급됩니다.",
      "광고 리워드는 게임 내 보상으로만 활용되며, 현금·포인트 등 경제적 가치로 전환되지 않습니다.",
      "운영자는 광고 콘텐츠의 내용 및 제3자 광고 제공자의 정책 변경에 대해 책임을 지지 않습니다.",
      "광고 이용 가능 여부는 운영자 또는 토스 플랫폼 정책에 따라 변경될 수 있습니다.",
    ],
  },
  {
    title: "제7조 이용자 의무",
    content: ["이용자는 다음 행위를 하여서는 안 됩니다."],
    items: [
      "로컬 저장소 데이터를 직접 조작하거나 비정상적인 방법으로 게임 데이터를 변조하는 행위",
      "자동화 도구(봇, 스크립트 등)를 이용한 비정상적 서비스 이용",
      "운영자 또는 제3자의 지식재산권 침해",
      "서비스 운영을 고의로 방해하는 행위",
      "관련 법령 또는 이 약관을 위반하는 행위",
    ],
  },
  {
    title: "제8조 지식재산권",
    items: [
      "서비스 내 콘텐츠(디자인, 텍스트, 이미지, 캐릭터, 게임 로직 등)에 대한 지식재산권은 운영자에게 귀속됩니다.",
      "이용자는 서비스를 이용하여 얻은 콘텐츠를 운영자의 사전 서면 동의 없이 복제, 배포, 상업적으로 이용할 수 없습니다.",
    ],
  },
  {
    title: "제9조 서비스 변경 및 종료",
    items: [
      "운영자는 서비스 내용, 기능, UI를 사전 고지 없이 변경할 수 있습니다.",
      "서비스를 종료하는 경우, 운영자는 30일 이상의 사전 공지 후 서비스를 종료합니다.",
      "서비스 종료 시 로컬 저장소에 저장된 데이터는 이용자 기기에 남아 있으나, 서비스 접근이 불가능해집니다.",
    ],
  },
  {
    title: "제10조 책임 제한",
    items: [
      "운영자는 천재지변, 불가항력적 사유, 토스 플랫폼 장애 등으로 인한 서비스 중단에 대해 책임을 지지 않습니다.",
      "이용자의 기기 환경, 네트워크 상태, OS 업데이트 등으로 인한 서비스 이용 장애에 대해 운영자는 책임을 지지 않습니다.",
      "이용자가 기기 초기화 등으로 로컬 저장 데이터를 손실한 경우, 운영자는 이를 복구할 의무가 없습니다.",
      "서비스는 무료로 제공되며, 운영자의 고의 또는 중대한 과실이 없는 한 서비스 이용으로 발생한 손해에 대해 책임을 지지 않습니다.",
    ],
  },
  {
    title: "제11조 분쟁 해결",
    items: [
      "서비스 이용과 관련한 분쟁은 운영자와 이용자 간의 합의로 해결함을 원칙으로 합니다.",
      "합의가 이루어지지 않는 경우, 민사소송법에 따른 관할 법원에서 해결합니다.",
      "이 약관은 대한민국 법령에 따라 규율됩니다.",
    ],
  },
];

export default function TermsPage() {
  return (
    <div
      className="min-h-screen px-5 py-10 max-w-lg mx-auto"
      style={{ backgroundColor: "var(--toss-surface, #fbf9f8)", color: "var(--toss-on-surface, #1b1c1c)" }}
    >
      {/* Header */}
      <div className="mb-8">
        <p
          className="text-xs font-black uppercase tracking-widest mb-1"
          style={{ color: "var(--toss-primary, #004ecb)" }}
        >
          Planty
        </p>
        <h1
          className="text-2xl font-black"
          style={{ fontFamily: "var(--font-headline, sans-serif)" }}
        >
          서비스 이용약관
        </h1>
        <p className="text-xs mt-1" style={{ color: "var(--toss-on-surface-variant, #424656)" }}>
          시행일: 2026년 3월 21일
        </p>
      </div>

      {/* Notice */}
      <div
        className="rounded-2xl p-4 mb-8 text-sm leading-relaxed"
        style={{ backgroundColor: "rgba(0,78,203,0.06)", color: "var(--toss-on-surface, #1b1c1c)" }}
      >
        플랜티는 <strong>토스 앱인토스(Apps in Toss)</strong> 플랫폼에서 동작하는 무료 가상 식물 육성 미니게임입니다. 서비스 이용 시 본 약관에 동의한 것으로 간주합니다.
      </div>

      {/* Sections */}
      <div className="space-y-8">
        {SECTIONS.map((sec) => (
          <section key={sec.title}>
            <h2
              className="text-[15px] font-black mb-3"
              style={{ color: "var(--toss-on-surface, #1b1c1c)", fontFamily: "var(--font-headline, sans-serif)" }}
            >
              {sec.title}
            </h2>
            {sec.content && (
              <p className="text-sm leading-relaxed mb-2" style={{ color: "var(--toss-on-surface-variant, #424656)" }}>
                {sec.content}
              </p>
            )}
            {sec.items && (
              <ul className="space-y-2">
                {sec.items.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm leading-relaxed" style={{ color: "var(--toss-on-surface-variant, #424656)" }}>
                    <span className="flex-shrink-0 font-bold" style={{ color: "var(--toss-primary, #004ecb)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
            {sec.footer && (
              <p className="text-sm leading-relaxed mt-2" style={{ color: "var(--toss-on-surface-variant, #424656)" }}>
                {sec.footer}
              </p>
            )}
          </section>
        ))}
      </div>

      {/* Footer */}
      <div
        className="mt-10 pt-6 space-y-1"
        style={{ borderTop: "1px solid var(--toss-surface-high, #eae8e7)" }}
      >
        <p className="text-xs font-semibold" style={{ color: "var(--toss-on-surface, #1b1c1c)" }}>문의</p>
        <p className="text-xs" style={{ color: "var(--toss-on-surface-variant, #424656)" }}>mojuns@gmail.com</p>
        <p className="text-xs mt-3" style={{ color: "var(--toss-on-surface-variant, #424656)" }}>
          Planty v0.1.0 · © 2026 모준승
        </p>
      </div>
    </div>
  );
}
