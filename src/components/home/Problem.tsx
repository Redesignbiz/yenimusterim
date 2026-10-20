import type { CSSProperties } from "react";
import { Highlight, Section, SectionHeading } from "@/components/Section";

/**
 * Çerçeve CLAUDE.md'nin "Değer önerisi" bölümünden geliyor: trafiğin parası
 * ödenmiş, kayıp ziyaretçi siteye girdikten sonra başlıyor. Üç kart bu kaybın
 * üç biçimi — ziyaretçi tarafı, marka tarafı, ölçüm tarafı.
 *
 * Üçü tek bir zincir: her adım, bir öncekinin bedelini ödediği şeyi
 * kaybediyor. Bu yüzden tek bir eğri üzerinde, alçalarak duruyorlar
 * (LeadHanger landing'indeki tasarımın aynısı). `lg`'den itibaren kutular
 * içerik genişliği boyunca, her biri bir öncekinden biraz daha aşağıda; her
 * kutunun üstündeki duraktan geçen çizgi ilerledikçe soluyor ve son kutudan
 * sonra da inmeye devam ediyor. `lg` altında kutular alt alta, çizgi solda
 * aşağı iniyor. Kaydırdıkça sırayla geliyorlar (globals.css, `.decline`).
 */
const failures = [
  {
    title: "Ziyaretçi kendi başına kalıyor",
    body: "Aradığı ürünü sitede bulur; o ürünün hangi servis noktasından bulabileceğini kendisi araştırmak zorunda kalır.",
  },
  {
    title: "Talebin gerçek sahibi olmuyor",
    body: "Müşterinin doldurduğu iletişim formu ortak bir gelen kutusuna düşer. Müşteriyi kimin ne zaman arayacağı belli değildir.",
  },
  {
    title: "Sonuç görünür değil",
    body: "Kaç talep geldiği, bunlardan kaçının satışa döndüğü hiçbir zaman bilinmiyor.",
  },
];

/**
 * `lg`'den itibaren her kutunun ilkine göre ne kadar aşağıda durduğu:
 * yumuşayan bir düşüş, önce küçük, sonra daha büyük adımlarla.
 */
const DROPS = [0, 44, 120];

/**
 * Düşüş eğrisi, her kutunun üst ortasından geçiyor: üç duraktan geçen tek
 * yumuşak eğri (Catmull-Rom, kübik Bézier'e çevrilmiş). İçeriğin sol
 * kenarından başlıyor, son duraktan sonra sağ kenara kadar iniyor. Kutu 1000
 * birim genişliğinde ve piksel olarak ne kadar yüksekse birim olarak da o
 * kadar; düşüş değerleri olduğu gibi kullanılıyor, yalnızca genişlik
 * esniyor ve kontur onunla birlikte esnemiyor.
 */
function DeclineCurve() {
  const pts = DROPS.map((y, i) => ({ x: ((i + 0.5) / DROPS.length) * 1000, y: y + 1 }));
  const all = [{ x: 0, y: -4 }, ...pts, { x: 1000, y: 210 }];
  let d = `M ${all[0].x} ${all[0].y}`;
  for (let i = 0; i < all.length - 1; i++) {
    const p0 = all[Math.max(i - 1, 0)];
    const p1 = all[i];
    const p2 = all[i + 1];
    const p3 = all[Math.min(i + 2, all.length - 1)];
    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
    d += ` C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${p2.x} ${p2.y}`;
  }

  return (
    <>
      <svg
        viewBox="0 0 1000 240"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-0 hidden h-[240px] w-full overflow-visible lg:block"
        fill="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="decline-fade" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="var(--color-primary)" />
            <stop offset="1" stopColor="var(--color-primary)" stopOpacity="0.12" />
          </linearGradient>
        </defs>
        <path
          d={d}
          pathLength={1}
          className="decline-curve"
          stroke="url(#decline-fade)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {/* Alt alta dizildiğinde aynı çizgi, düz, solda aşağı. */}
      <span
        className="decline-track-y pointer-events-none absolute top-6 bottom-6 left-[5px] w-px lg:hidden"
        aria-hidden
      />
    </>
  );
}

export function Problem() {
  return (
    <Section id="sorun">
      <SectionHeading
        title={
          <>
            Ziyaretçiler web sitenize karar vermeye hazır geliyor, ancak ürünü
            hangi servis noktasından alacağını bulamadan{" "}
            <Highlight>siteden ayrılıyor.</Highlight>
          </>
        }
      />

      <div className="decline relative mt-12">
        <DeclineCurve />
        <ol className="relative grid gap-4 lg:grid-cols-3 lg:gap-5">
          {failures.map((failure, index) => (
            <li
              key={failure.title}
              className="decline-step relative pl-7 lg:pl-0"
              style={{ "--drop": `${DROPS[index]}px`, "--i": index } as CSSProperties}
            >
              {/* Eğrinin üstündeki durak. */}
              <span
                className="absolute top-5 left-0 z-10 block size-[11px] rounded-full border-[1.5px] border-primary bg-surface lg:top-[var(--drop)] lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2"
                style={{ opacity: 1 - index * 0.2 }}
                aria-hidden
              />
              <div className="h-full rounded-lg border border-outline-variant bg-surface-lowest p-6 lg:mt-[var(--drop)] lg:h-auto">
                <span
                  className="text-[13px] font-bold text-primary tabular-nums"
                  aria-hidden
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-[17px] font-semibold leading-snug tracking-[-0.01em] text-balance text-ink">
                  {failure.title}
                </h3>
                <p className="mt-2 text-[15px] leading-6 text-ink-muted">
                  {failure.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
