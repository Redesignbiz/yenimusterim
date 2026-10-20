import type { ReactNode } from "react";

/**
 * Sahnedeki işaretler, 24 birimlik bir ızgarada: her servis noktası için bir
 * mağaza, ziyaretçi için bir kişi, sohbet için bir bot; ayrıca "Nasıl
 * çalışır" adımlarının işaretleri (tarayıcı, sohbet, grafik). Her çizim
 * sayfanın tamamında tek: mağaza gösteren her yer aynı mağazayı gösterir.
 *
 * `StorePaths` yalnızca çizim; var olan bir SVG'nin içine konur. `*Icon`
 * bileşenleri çizimi HTML içinde kullanılmak üzere kendi SVG'sine sarar.
 * Yalnızca kontur, `currentColor` ile; kalınlık ızgara üzerinde verildiği
 * için ikonla birlikte ölçeklenir.
 */
export function StorePaths() {
  return (
    <>
      <path d="M3 9.5 5 4h14l2 5.5" />
      <path d="M3 9.5h18v1a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0Z" />
      <path d="M5 13.5V20h14v-6.5" />
      <path d="M10 20v-4h4v4" />
    </>
  );
}

function Svg({ className, children }: { className: string; children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

export function StoreIcon({ className = "" }: { className?: string }) {
  return (
    <Svg className={className}>
      <StorePaths />
    </Svg>
  );
}

export function PersonIcon({ className = "" }: { className?: string }) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="8" r="4.5" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </Svg>
  );
}

export function BotIcon({ className = "" }: { className?: string }) {
  return (
    <Svg className={className}>
      <rect x="4" y="8" width="16" height="12" rx="3" />
      <path d="M12 8V4.5" />
      <circle cx="12" cy="3.5" r="1" />
      <path d="M9 13v1.5M15 13v1.5" />
      <path d="M2 13.5v2M22 13.5v2" />
    </Svg>
  );
}

export function BrowserIcon({ className = "" }: { className?: string }) {
  return (
    <Svg className={className}>
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
      <path d="M3 9h18" />
      <path d="M6.5 6.75h.01M9 6.75h.01" />
      <path d="m10 13.5 2 2 3.5-3.5" />
    </Svg>
  );
}

export function ChatIcon({ className = "" }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M20 12.5a7.5 7.5 0 0 1-10.9 6.7L4 20.5l1.3-4.6A7.5 7.5 0 1 1 20 12.5Z" />
      <path d="M8.5 12.5h.01M12.5 12.5h.01M16.5 12.5h.01" />
    </Svg>
  );
}

export function ChartIcon({ className = "" }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M4 4v16h16" />
      <path d="m7.5 14.5 3.5-4 3 3 5-6" />
    </Svg>
  );
}
