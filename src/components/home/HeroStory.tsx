"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { STREETS } from "@/lib/streets";
import { HeroCta } from "./HeroCta";
import { BotIcon, PersonIcon, StoreIcon } from "./StageIcons";

/**
 * Hero'nun kendisi: bir ziyaretçinin bir servis noktasının müşterisine
 * dönüşmesi, döngü hâlinde oynayan üç sahnede.
 *
 * Mosey hero'sundan uyarlandı (LeadHanger landing'inde de aynısı var):
 * sayfanın iddiasının altında kendini kuran bir sahne ve onu izleyen, her
 * seferinde yalnızca biri çerçeveli adımlar. Ziyaretçi sabit kalıyor, dünya
 * onun etrafında değişiyor: markanın sitesine girer ve kamera onu sohbete
 * taşır; etrafında servis noktaları belirir ve biri eşleşir; o servis
 * noktası yanına gelir ve müşteriye ulaşır. Üç sahnenin sonunda kapanış
 * kartı gelir, sonra hikâye başa döner.
 *
 * Nasıl dürüst kalıyor:
 *
 *   - Geçerli adımın içindeki görünmez bir öğe saattir. Her sahne onun
 *     `animationend`'iyle ilerler; sahne ekran dışındayken ya da sekme
 *     arka plandayken bütün animasyonlar birlikte durur, saat ve sahne
 *     birbirinden kaymaz.
 *   - Her animasyon `prefers-reduced-motion: no-preference` içinde ve
 *     varsayılanı bitmiş hâli. Hareket kapalıysa hiçbir şey kendiliğinden
 *     ilerlemez: her sahne tamamlanmış görünür, adımlar yine geçiş yapar.
 *   - Sahne iki düzenden çiziliyor: telefon ve tablet için kareye yakın,
 *     `lg`'den itibaren geniş. Masaüstündeki resim büyütülmüş bir telefon
 *     resmi değil. Hangisinin görüneceğine CSS karar veriyor; gizli olan
 *     kopya animasyon maliyeti taşımıyor.
 *   - Bir düzenin içinde geometri tek bir koordinat sistemi, onun viewBox'ı.
 *     HTML parçaları da aynı kutuya yüzdeyle yerleşiyor; çizgilerle
 *     etiketler her genişlikte birleşik kalıyor. Her düzen kapsayıcı
 *     birimiyle (`cqw`), alt ve üst sınırı olan tek bir temel yazı boyu
 *     tanımlıyor; sahnedeki her şey ona göre `em` ile ölçekleniyor.
 *
 * Servis noktaları semt adıyla anılıyor; gerçek bir işletme adı yazmak
 * olmayan bir referansı ima ederdi. Sahnedeki değerler temsilî.
 */

type Point = { x: number; y: number };
type Anchor = "center" | "left" | "right";

type Dealer = {
  p: Point;
  name: string;
  note: string;
  d: number;
  match?: boolean;
};

type Layout = {
  id: string;
  W: number;
  H: number;
  /**
   * Ziyaretçinin durduğu yer: haritada sahnenin ortası, 1. sahnede sohbette
   * botun solu, 3. sahnede servis noktasına yer açmak için kenar.
   */
  center: Point;
  chatSeat: Point;
  side: Point;
  /** Sohbette ziyaretçinin karşısındaki bot. */
  bot: Point;
  /** Avatar ve harita rozeti boyları, viewBox biriminde. */
  avatar: number;
  dealer: number;
  /**
   * Sahnenin temel yazı boyu. İçerideki her şey (yazı, dolgu, kart, ikon)
   * buna göre `em` ile ölçülüyor; tek değer bütün resmi ölçekliyor.
   */
  type: string;
  /** Kameranın 1. sahnede kat ettiği yol, viewBox biriminde. */
  pan: number;
  /** Markanın sitesinin sol üst köşesi (200 × 160'lık bir pencere). */
  site: Point;
  chat: Point[];
  consent: Point;
  /** 3. sahnede servis noktasına ulaşan talep kartı. Yalnızca geniş düzende. */
  received?: Point;
  dealers: Dealer[];
  streets: string[];
  scan: number;
  qualified: Point;
  dealerSpot: Point;
  notified: Point;
  message: Point;
  messageWidth: string;
  called: Point;
};

const KADIKOY: Dealer = {
  p: { x: 0, y: 0 },
  name: "Kadıköy servis noktası",
  note: "2,1 km · stok var",
  d: 3300,
  match: true,
};

const compact: Layout = {
  id: "compact",
  W: 440,
  H: 400,
  center: { x: 220, y: 190 },
  chatSeat: { x: 70, y: 190 },
  side: { x: 140, y: 190 },
  bot: { x: 370, y: 190 },
  avatar: 52,
  dealer: 34,
  type: "text-[clamp(10px,2.6cqw,15px)]",
  pan: 440,
  site: { x: 120, y: 110 },
  chat: [
    { x: 332, y: 70 },
    { x: 108, y: 112 },
    { x: 332, y: 154 },
    { x: 108, y: 196 },
    { x: 332, y: 238 },
    { x: 108, y: 280 },
  ],
  consent: { x: 220, y: 340 },
  dealers: [
    { p: { x: 100, y: 150 }, name: "Moda servis noktası", note: "stok yok", d: 2200 },
    { p: { x: 348, y: 66 }, name: "Maltepe servis noktası", note: "8,4 km", d: 2500 },
    { p: { x: 84, y: 264 }, name: "Üsküdar servis noktası", note: "6,3 km", d: 2800 },
    { ...KADIKOY, p: { x: 348, y: 258 } },
  ],
  streets: [
    "M -10 128 C 120 104 300 170 450 136",
    "M 156 -10 C 176 120 120 260 172 410",
    "M -10 332 C 140 300 300 364 450 318",
  ],
  scan: 210,
  qualified: { x: 220, y: 248 },
  dealerSpot: { x: 300, y: 190 },
  notified: { x: 220, y: 160 },
  message: { x: 220, y: 290 },
  messageWidth: "w-[15em]",
  called: { x: 220, y: 350 },
};

/*
 * Geniş düzen fazla genişliği kenarlara ait şeylere veriyor: siteye geri
 * uzanan ok, iki tarafı arasında boşluk olan sohbet, daha çok servis noktası
 * olan daha geniş bir harita ve 3. sahnede servis noktası tarafındaki talep
 * kartı.
 */
const wide: Layout = {
  id: "wide",
  W: 960,
  H: 400,
  center: { x: 480, y: 195 },
  chatSeat: { x: 300, y: 195 },
  side: { x: 220, y: 195 },
  bot: { x: 660, y: 195 },
  avatar: 68,
  dealer: 44,
  type: "text-[clamp(12px,1.5cqw,17px)]",
  pan: 640,
  site: { x: 380, y: 115 },
  chat: [
    { x: 614, y: 70 },
    { x: 346, y: 112 },
    { x: 614, y: 154 },
    { x: 346, y: 196 },
    { x: 614, y: 238 },
    { x: 346, y: 280 },
  ],
  consent: { x: 480, y: 345 },
  dealers: [
    { p: { x: 160, y: 100 }, name: "Moda servis noktası", note: "stok yok", d: 2100 },
    { p: { x: 110, y: 290 }, name: "Ataşehir servis noktası", note: "9,1 km", d: 2300 },
    { p: { x: 320, y: 300 }, name: "Üsküdar servis noktası", note: "6,3 km", d: 2500 },
    { p: { x: 690, y: 80 }, name: "Maltepe servis noktası", note: "8,4 km", d: 2700 },
    { p: { x: 850, y: 260 }, name: "Bostancı servis noktası", note: "Bugün kapalı", d: 2900 },
    { ...KADIKOY, p: { x: 650, y: 290 } },
  ],
  streets: STREETS.paths,
  scan: 520,
  qualified: { x: 480, y: 258 },
  dealerSpot: { x: 560, y: 195 },
  notified: { x: 390, y: 165 },
  message: { x: 390, y: 295 },
  messageWidth: "w-[17em]",
  called: { x: 390, y: 355 },
  received: { x: 664, y: 195 },
};

/** Kapanış kartının hikâye başa dönmeden önce sahnede kaldığı süre. */
const CTA_MS = 5000;

/**
 * Sahneler, her birinin süresi ve adımların altında sahnenin ne gösterdiğini
 * söyleyen tek satır. Animasyon sessiz oynuyor; o satır anlatıcısı. Yalnızca
 * sahnede olanı anlatıyor, yayımlanmamış bir rakam vermiyor.
 */
const chapters = [
  {
    tab: "Karşıla",
    ms: 8500,
    caption: "Sitenizdeki ziyaretçi, chatbot'un birkaç sorusunu yanıtlar.",
  },
  {
    tab: "Eşleştir",
    ms: 7000,
    caption:
      "Yeni Müşterim yakındaki servis noktalarını mesafe, ebat uyumu ve stoğa göre karşılaştırır, en uygun olanı bulur.",
  },
  {
    tab: "Bağla",
    ms: 7500,
    caption: "Servis noktası talebin tüm ayrıntılarını alır ve müşteriyi geri arar.",
  },
];

const chat: { text: string; from: "bot" | "visitor"; d: number }[] = [
  { text: "Hangi lastik ebatını arıyorsunuz?", from: "bot", d: 3600 },
  { text: "4 × 205/55R16", from: "visitor", d: 4050 },
  { text: "Hangi ilçedesiniz?", from: "bot", d: 4500 },
  { text: "Kadıköy, İstanbul", from: "visitor", d: 4950 },
  { text: "Ne zaman ihtiyacınız var?", from: "bot", d: 5400 },
  { text: "Bu hafta", from: "visitor", d: 5850 },
];

const pct = (value: number, of: number) => `${(value / of) * 100}%`;

/** Düzenin viewBox'ındaki bir nokta, sahnede CSS konumu olarak. */
function at(L: Layout, { x, y }: Point, anchor: Anchor = "center"): CSSProperties {
  const shift = { center: "-50%", left: "0", right: "-100%" }[anchor];
  return { left: pct(x, L.W), top: pct(y, L.H), transform: `translate(${shift}, -50%)` };
}

/** `a`'dan `b`'ye, iki uçtan verilen yarıçap kadar önce biten bir çizgi. */
function between(a: Point, ra: number, b: Point, rb: number) {
  const len = Math.hypot(b.x - a.x, b.y - a.y);
  const ux = (b.x - a.x) / len;
  const uy = (b.y - a.y) / len;
  return { x1: a.x + ux * ra, y1: a.y + uy * ra, x2: b.x - ux * rb, y2: b.y - uy * rb };
}

/**
 * İki nokta arasında yumuşak bir S: iki tutamacı düz çizginin üçte birinde
 * duran ve `amp` kadar zıt yönlere itilen bir kübik eğri. Bir şey taşıyan
 * bağlantılar (ziyaretçi, talep) bunu paylaşıyor.
 */
function sCurve(a: Point, b: Point, amp: number) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy);
  const nx = -dy / len;
  const ny = dx / len;
  const c1 = { x: a.x + dx / 3 + nx * amp, y: a.y + dy / 3 + ny * amp };
  const c2 = { x: a.x + (2 * dx) / 3 - nx * amp, y: a.y + (2 * dy) / 3 - ny * amp };
  return {
    d: `M ${a.x} ${a.y} C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${b.x} ${b.y}`,
    /** Eğrinin `b`'ye varış yönü, oradaki ok ucu için. */
    end: { x: b.x - c2.x, y: b.y - c2.y },
  };
}

/** Ucu `tip`'te, `dir` yönünü gösteren açık bir ok ucu. */
function arrowhead(tip: Point, dir: Point, size = 8) {
  const len = Math.hypot(dir.x, dir.y);
  const ux = dir.x / len;
  const uy = dir.y / len;
  const back = { x: tip.x - ux * size, y: tip.y - uy * size };
  const half = size * 0.875;
  return `M ${back.x - uy * half} ${back.y + ux * half} L ${tip.x} ${tip.y} L ${back.x + uy * half} ${back.y - ux * half}`;
}

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * Sahnenin konumlu bir parçası. Yerleşim ve hareket bilerek iki ayrı öğede:
 * dıştaki transform ile ortalanıyor, içteki kendi transform'unu bunu
 * bozmadan canlandırabiliyor.
 */
function Piece({
  L,
  p,
  anchor,
  motion = "s-pop",
  d = 0,
  className = "",
  children,
}: {
  L: Layout;
  p: Point;
  anchor?: Anchor;
  motion?: string;
  d?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className="absolute" style={at(L, p, anchor)}>
      <div className={`${motion} ${className}`} style={delay(d)}>
        {children}
      </div>
    </div>
  );
}

function Check({ className = "size-3" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}

function Phone({ className = "size-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />
    </svg>
  );
}

function Badge({ match = false }: { match?: boolean }) {
  return (
    <span
      className={`story-badge flex aspect-square w-full items-center justify-center rounded-sm ${
        match ? "bg-primary text-white" : "bg-surface-container text-ink-muted"
      }`}
    >
      <StoreIcon className="w-[53%]" />
    </span>
  );
}

function Chip({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-[0.4em] rounded-full border border-accent/25 bg-accent-fixed px-[0.7em] py-[0.3em] text-[0.92em] font-semibold whitespace-nowrap text-on-accent-fixed tabular-nums">
      {icon}
      {children}
    </span>
  );
}

/**
 * Talep kaydı, 3. sahnede servis noktası tarafına ulaştığı hâliyle:
 * ziyaretçinin sohbetteki yanıtları ve iletişim izni.
 */
function LeadCard({ title }: { title: string }) {
  const rows: [string, string][] = [
    ["Ebat", "4 × 205/55R16"],
    ["Bölge", "Kadıköy"],
    ["Zaman", "Bu hafta"],
  ];

  return (
    <div className="w-[15em] rounded-md border border-outline-variant bg-surface-lowest">
      <div className="flex items-center justify-between gap-[1em] border-b border-outline-variant px-[1em] py-[0.65em]">
        <span className="eyebrow text-[0.8em] whitespace-nowrap text-ink">{title}</span>
        <span className="text-[0.8em] text-outline">marka.com/lastik</span>
      </div>
      <dl className="divide-y divide-outline-variant text-[0.88em]">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-baseline gap-[0.8em] px-[1.15em] py-[0.55em]">
            <dt className="w-[4.6em] shrink-0 text-[0.92em] text-outline">{label}</dt>
            <dd className="text-ink font-medium">{value}</dd>
          </div>
        ))}
        <div className="flex items-baseline gap-[0.8em] px-[1.15em] py-[0.55em]">
          <dt className="w-[4.6em] shrink-0 text-[0.92em] text-outline">İzin</dt>
          <dd className="inline-flex items-center gap-[0.4em] font-semibold text-accent">
            <Check className="size-[0.9em]" />
            Alındı
          </dd>
        </div>
      </dl>
    </div>
  );
}

/* --------------------------------------------- sahne 1 · Karşıla */

function Engage({ L }: { L: Layout }) {
  const { site, center, pan, W, H } = L;
  const track = W + pan;
  // Ok siteden çıkıp ziyaretçinin sohbetteki yerinin hemen önünde bitiyor;
  // kamera kayarken ziyaretçi oraya yürüyor.
  const tip = { x: L.chatSeat.x + pan - L.avatar / 2 - 18, y: center.y };
  const arrow = sCurve({ x: site.x + 210, y: center.y }, tip, pan / 22);

  return (
    <>
      {/*
        Kamera. Sahneden kayma mesafesi kadar geniş bir şerit: başında markanın
        sitesi, sonunda sohbet. Şerit sola kayarken ziyaretçi oku izleyerek
        siteden çıkıp sohbete geçiyormuş gibi okunur.
      */}
      <div className="story-frame absolute inset-0 overflow-hidden">
        <div
          className="s-pan absolute inset-y-0 left-0"
          style={
            {
              width: pct(track, W),
              "--pan": `-${(pan / track) * 100}%`,
              ...delay(2400),
            } as CSSProperties
          }
        >
          <svg viewBox={`0 0 ${track} ${H}`} className="absolute inset-0 size-full">
            <defs>
              <mask id={`story-arrow-${L.id}`} maskUnits="userSpaceOnUse">
                {/*
                  Açılış ok ucunun biraz ötesine kadar sürüyor, uçları düz.
                  Başlamadan önce kesik bu yolun sonunda sıfır uzunlukta bir
                  nokta; kare uç o noktayı 20px'lik bir kare olarak boyar ve
                  ok ucunu erkenden açardı.
                */}
                <path
                  d={`${arrow.d} h 12`}
                  pathLength={1}
                  className="s-draw"
                  fill="none"
                  stroke="white"
                  strokeWidth="20"
                  strokeLinecap="butt"
                  style={delay(1700)}
                />
              </mask>
            </defs>

            {/* Giriş yolu: çerçevenin kenarından siteye soluk bir çizgi. */}
            <path
              d={`M -20 ${center.y} H ${site.x + 6}`}
              pathLength={1}
              className="s-draw stroke-outline-variant"
              strokeWidth="1.5"
              fill="none"
              style={delay(200)}
            />

            {/* Markanın sitesi, bir tarayıcı penceresi olarak. */}
            <g className="s-fade" style={delay(0)} transform={`translate(${site.x} ${site.y})`}>
              <rect
                width="200"
                height="160"
                rx="6"
                className="fill-surface-lowest stroke-outline-variant"
              />
              <path d="M 0 20 H 200" className="stroke-outline-variant" />
              <circle cx="12" cy="10" r="2.5" className="fill-outline-variant" />
              <circle cx="21" cy="10" r="2.5" className="fill-outline-variant" />
              <circle cx="30" cy="10" r="2.5" className="fill-outline-variant" />
              <text x="44" y="13.5" className="fill-outline text-[9px]">
                marka.com/lastik
              </text>
              <rect x="16" y="32" width="96" height="8" rx="2" className="fill-surface-highest" />
              <rect x="16" y="46" width="64" height="5" rx="2" className="fill-surface-high" />
              <rect x="16" y="114" width="52" height="32" rx="3" className="fill-surface-container" />
              <rect x="74" y="114" width="52" height="32" rx="3" className="fill-surface-container" />
              <rect x="132" y="114" width="52" height="32" rx="3" className="fill-surface-container" />
              {/* Ziyaretçinin açtığı sohbet düğmesi. */}
              <circle
                cx="184"
                cy={center.y - site.y + 8}
                r="8"
                className="s-pulse fill-primary"
                style={delay(1400)}
              />
            </g>

            {/* Kameranın izlediği ok, sitenin kenarından çiziliyor. */}
            <g
              mask={`url(#story-arrow-${L.id})`}
              className="stroke-primary"
              fill="none"
              strokeWidth="1.5"
            >
              <path d={arrow.d} strokeDasharray="5 6" />
              <path
                d={arrowhead(tip, arrow.end)}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </div>
      </div>

      {chat.map((line, index) => (
        <Piece
          key={line.text}
          L={L}
          p={L.chat[index]}
          anchor={line.from === "bot" ? "right" : "left"}
          motion="s-rise"
          d={line.d}
        >
          <p
            className={`rounded-[0.6em] px-[0.8em] py-[0.4em] whitespace-nowrap ${
              line.from === "bot"
                ? "rounded-br-[0.15em] border border-outline-variant bg-surface-lowest text-ink-muted"
                : "rounded-bl-[0.15em] bg-primary font-semibold text-white"
            }`}
          >
            {line.text}
          </p>
        </Piece>
      ))}

      {/*
        Sohbetin öbür tarafı. Bot ziyaretçinin karşısında; soruları kendi
        tarafında, ziyaretçinin yanıtları onun tarafında. Böylece etiketlerden
        oluşan bir halka değil, bir diyalog okunuyor.
      */}
      <div className="absolute" style={{ ...at(L, L.bot), width: pct(L.avatar, L.W) }}>
        <span
          className="s-pop bg-primary flex aspect-square w-full items-center justify-center rounded-full text-white"
          style={delay(3300)}
        >
          <BotIcon className="w-[48%]" />
        </span>
      </div>

      <Piece L={L} p={L.consent} d={6400}>
        <Chip icon={<Check className="size-[0.9em]" />}>İletişim izni alındı</Chip>
      </Piece>
    </>
  );
}

/* --------------------------------------------- sahne 2 · Eşleştir */

function Qualify({ L }: { L: Layout }) {
  const match = L.dealers.find((dealer) => dealer.match)!;

  return (
    <>
      <svg viewBox={`0 0 ${L.W} ${L.H}`} className="absolute inset-0 size-full overflow-visible">
        {/* Birkaç sokak; servis noktaları haritada birer yer gibi okunsun diye. */}
        <g className="s-fade stroke-surface-highest" fill="none" strokeWidth="1.5" style={delay(0)}>
          {L.streets.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>

        {/* Arama: ziyaretçiden yayılan tek bir halka. */}
        <circle
          cx={L.center.x}
          cy={L.center.y}
          r={L.scan}
          className="s-scan stroke-primary"
          fill="none"
          strokeWidth="1.5"
          style={delay(1200)}
        />

        {/* Eşleşme düz bir çizgi: karar olan tek bağlantı. */}
        <line
          {...between(L.center, L.avatar / 2 + 6, match.p, L.dealer / 2 + 8)}
          pathLength={1}
          className="s-draw stroke-primary"
          strokeWidth="1.5"
          style={delay(3500)}
        />
      </svg>

      {L.dealers.map((dealer, index) => (
        <div
          key={dealer.name}
          className="absolute"
          style={{ ...at(L, dealer.p), width: pct(L.dealer, L.W) }}
        >
          <div className="s-pop" style={delay(300 + index * 120)}>
            <div className={dealer.match ? "s-match" : "s-dim"} style={delay(dealer.d)}>
              <Badge match={dealer.match} />
            </div>
          </div>
          <div
            className="s-pop absolute top-full left-1/2 mt-[0.4em] w-max max-w-[11em] -translate-x-1/2 text-center leading-tight"
            style={delay(400 + index * 120)}
          >
            <span className={dealer.match ? "" : "s-dim block"} style={delay(dealer.d)}>
              <span className="text-ink block text-[0.92em] font-semibold">
                {dealer.name}
              </span>
            </span>
            <span
              className={`s-pop block text-[0.8em] ${dealer.match ? "font-semibold text-accent" : "text-outline"}`}
              style={delay(dealer.d)}
            >
              {dealer.note}
            </span>
          </div>
        </div>
      ))}

      <Piece L={L} p={L.qualified} d={3900}>
        <Chip icon={<Check className="size-[0.9em]" />}>Nitelikli talep</Chip>
      </Piece>
    </>
  );
}

/* --------------------------------------------- sahne 3 · Bağla */

function Connect({ L }: { L: Layout }) {
  const match = L.dealers.find((dealer) => dealer.match)!;
  const spot = L.dealerSpot;
  const path = sCurve(
    { x: L.side.x + L.avatar / 2 + 8, y: spot.y },
    { x: spot.x - L.avatar / 2 - 8, y: spot.y },
    18,
  ).d;

  return (
    <>
      <svg viewBox={`0 0 ${L.W} ${L.H}`} className="absolute inset-0 size-full overflow-visible">
        <path
          d={path}
          pathLength={1}
          className="s-draw stroke-primary"
          strokeWidth="1.5"
          fill="none"
          style={delay(1000)}
        />
        {/* Talebin kendisi, karşıya geçerken. */}
        <path
          d={path}
          pathLength={1}
          className="s-travel stroke-primary"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
          style={delay(1500)}
        />
      </svg>

      {/*
        Eşleşen servis noktası, haritada durduğu yerden yürüyerek geliyor.
        2. sahnedekinden ayrı bir öğe; onun yerinden ve boyundan başladığı
        için katmanlar arasındaki geçiş görünmüyor.
      */}
      <div
        className="s-move absolute"
        style={
          {
            ...at(L, spot),
            width: pct(L.avatar, L.W),
            "--from-x": pct(match.p.x, L.W),
            "--from-y": pct(match.p.y, L.H),
            "--from-w": pct(L.dealer, L.W),
          } as CSSProperties
        }
      >
        <Badge match />
        {/* Arama: talep ulaştıktan sonra beliriyor, sonra çalıyor. */}
        <span className="s-pop absolute -top-[0.6em] -right-[0.6em]" style={delay(2100)}>
          <span
            className="s-ring bg-accent flex size-[1.8em] items-center justify-center rounded-full text-white"
            style={delay(2500)}
          >
            <Phone className="size-[0.9em]" />
          </span>
        </span>
        <span className="text-ink absolute top-full left-1/2 mt-[0.5em] w-max -translate-x-1/2 text-center text-[0.92em] leading-tight font-semibold">
          {match.name}
        </span>
      </div>

      <Piece L={L} p={L.notified} motion="s-rise" d={1500}>
        <span className="text-[0.88em] whitespace-nowrap text-outline tabular-nums">
          Bildirim <span className="text-ink">12:04</span>
        </span>
      </Piece>

      <Piece L={L} p={L.message} motion="s-rise" d={3100}>
        <p
          className={`${L.messageWidth} rounded-[0.6em] rounded-tr-[0.15em] border border-outline-variant bg-surface-lowest px-[0.8em] py-[0.55em] leading-snug text-ink-muted`}
        >
          Merhaba, aradığınız lastik stoklarımızda var. Montaj için randevu oluşturalım mı?
        </p>
      </Piece>

      {L.received && (
        <Piece L={L} p={L.received} anchor="left" d={2300}>
          <LeadCard title="Talep alındı" />
        </Piece>
      )}

      <Piece L={L} p={L.called} d={4000}>
        <Chip icon={<Phone className="size-[0.9em]" />}>Geri arandı 12:08</Chip>
      </Piece>
    </>
  );
}

/* ------------------------------------------------------------------ sahne */

const scenes = [Engage, Qualify, Connect];

function Stage({ L, chapter, className }: { L: Layout; chapter: number; className: string }) {
  const visitor = [L.chatSeat, L.center, L.side][chapter];

  return (
    <div
      className={`@container relative mx-auto ${className}`}
      style={{ aspectRatio: `${L.W} / ${L.H}` }}
      aria-hidden
    >
      {/* Temel boy bir kat içeride: `cqw` kapsayıcının kendisinde olsaydı
          sahneyi değil kapsayıcının üst öğesini ölçerdi. */}
      <div className={`absolute inset-0 ${L.type}`}>
        {scenes.map((Scene, index) => (
          <div
            key={index}
            className={`story-scene absolute inset-0 ${index === chapter ? "is-active" : ""}`}
          >
            <Scene L={L} />
          </div>
        ))}

        {/* Ziyaretçi: her sahnede bulunan tek şey. */}
        <div
          className="story-visitor absolute"
          style={
            {
              ...at(L, visitor),
              width: pct(L.avatar, L.W),
              "--center-x": pct(L.center.x, L.W),
              "--seat-x": pct(L.chatSeat.x, L.W),
            } as CSSProperties
          }
        >
          <span className="story-visitor-dot border-primary bg-primary-fixed text-on-primary-fixed flex aspect-square w-full items-center justify-center rounded-full border-[1.5px]">
            <PersonIcon className="w-[48%]" />
          </span>
        </div>
      </div>
    </div>
  );
}

export function HeroStory() {
  const [chapter, setChapter] = useState(0);
  /** Her adım tıklamasında artıyor; tıklanan sahne baştan oynuyor. */
  const [run, setRun] = useState(0);
  const [onScreen, setOnScreen] = useState(true);
  const [pageShown, setPageShown] = useState(true);
  const root = useRef<HTMLDivElement>(null);

  // Sahne ekran dışındayken ya da sekme arka plandayken saat durur; kimse
  // kaçırdığı bir sahnenin ortasına geri dönmez.
  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), {
      threshold: 0.25,
    });
    io.observe(node);
    const onVisibility = () => setPageShown(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const paused = !onScreen || !pageShown;
  /** Üç sahneden sonra kapanış kartı sahneye gelir, sonra hikâye başa döner. */
  const ending = chapter === chapters.length;
  const scene = ending ? chapters.length - 1 : chapter;

  return (
    <div
      ref={root}
      className="story"
      data-chapter={chapter}
      data-paused={paused || undefined}
    >
      <p className="sr-only">
        Bir talebin Yeni Müşterim&apos;deki yolculuğu: ziyaretçi markanın
        sitesinde chatbot&apos;un sorularını yanıtlar ve iletişim izni verir,
        aradığı lastiğin stokta olduğu en yakın servis noktasıyla eşleşir ve o
        servis noktası bildirimden dört dakika sonra müşteriyi geri arar.
      </p>

      {/*
        Sahne ve üstünde kapanış kartı. Hikâye bitince son kare tamamen söner,
        kart ancak ondan sonra aynı alanın ortasında yükselir; çağrı hikâyenin
        altında değil, hikâyenin olduğu yerde görünür.
      */}
      <div className="relative">
        <div
          key={run}
          className={`story-stage transition-opacity duration-500 ease-out ${ending ? "opacity-0" : ""}`}
        >
          <Stage
            L={compact}
            chapter={scene}
            className="w-[min(100%,40rem,max(20rem,calc((100svh-30rem)*1.1)))] lg:hidden"
          />
          <Stage
            L={wide}
            chapter={scene}
            className="hidden w-[min(100%,calc((100svh-30rem)*2.4))] lg:block"
          />
        </div>

        {ending && (
          <div className="story-cta-in absolute inset-0 flex items-center justify-center">
            <HeroCta
              clock={
                <span
                  className="story-progress is-current absolute inset-0 -z-10 opacity-0"
                  style={{ "--chapter-ms": `${CTA_MS}ms` } as CSSProperties}
                  onAnimationEnd={(event) => {
                    if (event.target !== event.currentTarget) return;
                    // Başa yeni bir sahneyle dön. Eskisini kullanmak son sahneyi
                    // ilki belirirken söndürür, ziyaretçiyi de geri kaydırırdı;
                    // kartla açılış arasında son sahneden bir kare görünürdü.
                    setChapter(0);
                    setRun((n) => n + 1);
                  }}
                  aria-hidden
                />
              }
            />
          </div>
        )}
      </div>

      {/*
        Her sahne için bir adım ve altlarında alt yazı. Bu bant, sayfa
        ızgarasını yazının arkasında silen yumuşak bir zemin üstünde. Yalnızca
        geçerli adım çerçeveli; diğerleri düz yazı. Saat burada ama görünmüyor:
        geçerli adımın içindeki görünmez öğe sahne boyunca çalışıyor, bitince
        hikâye ilerliyor.
      */}
      <div className="story-band relative mx-auto mt-8 max-w-[44rem] pt-2 pb-1 sm:mt-10">
      <div className="flex items-center justify-center gap-1 sm:gap-6">
        {chapters.map((c, index) => {
          const current = index === chapter;
          return (
            <button
              key={c.tab}
              type="button"
              onClick={() => {
                setChapter(index);
                setRun((n) => n + 1);
              }}
              aria-pressed={current}
              className={`relative cursor-pointer rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition-colors duration-300 sm:px-4 sm:text-[12.5px] ${
                current
                  ? "border-primary/40 bg-primary-fixed/60 text-ink"
                  : "border-transparent text-outline hover:border-outline-variant hover:text-ink"
              }`}
            >
              <span
                key={current ? run : undefined}
                className={`story-progress absolute inset-0 opacity-0 ${
                  current ? "is-current" : ""
                }`}
                style={{ "--chapter-ms": `${c.ms}ms` } as CSSProperties}
                onAnimationEnd={(event) => {
                  if (event.target !== event.currentTarget) return;
                  setChapter((now) => now + 1);
                }}
                aria-hidden
              />
              <span
                className={`relative mr-1.5 tabular-nums transition-colors ${
                  current ? "text-primary" : ""
                }`}
                aria-hidden
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="relative">{c.tab}</span>
            </button>
          );
        })}
      </div>

      {/* Sahneye göre anahtarlı: her değişimde satırın girişi yeniden oynar. */}
      <p
        key={chapter}
        className="story-caption text-ink mx-auto mt-6 min-h-[3em] max-w-[34rem] text-center text-[16px] leading-[1.5] text-balance sm:mt-8 sm:text-[18px]"
      >
        {ending ? "" : chapters[chapter].caption}
      </p>
      </div>
    </div>
  );
}
