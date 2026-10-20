import type { CSSProperties, ReactNode } from "react";

/**
 * Talebin yolu, adımların kendisi olarak çizilmiş (LeadHanger landing'indeki
 * rayın aynısı): tek ray, dört durak, her durağın üstünde bir ikon ve her
 * durakta adımın tamamı.
 *
 * SVG değil CSS, tek bir sebeple: `lg` altında ray dönüp dikey akıyor; SVG'de
 * bunun için çizimin ikinci bir kopyası gerekirdi ve iki kopya zamanla
 * birbirinden kayardı.
 *
 * Parıltı sabit hızla akmıyor: her durakta bekliyor, sonra bir sonrakine
 * geçiyor. Beklediği durağın ikonu aynı renkte yanıyor ve büyüyor. Duraklar
 * ve parıltı tek saati paylaşıyor (globals.css, `.route-pulse`, `.route-icon`).
 */
export type RouteStep = { title: string; points: string[]; icon: ReactNode };

export function RouteLine({ steps }: { steps: RouteStep[] }) {
  return (
    <div className="relative">
      {/*
        Her yön için bir ray; her biri yalnızca kendi düzeninde görünüyor.
        Duraklar sayfa zeminini taşıyor; ray onların arkasından temiz geçiyor.
      */}
      <div
        className="route-rail route-rail-y top-[5px] bottom-0 left-[5px] w-px lg:hidden"
        aria-hidden
      >
        <span className="route-pulse route-pulse-y" />
      </div>
      <div
        className="route-rail top-[45px] right-0 left-0 hidden h-px lg:block"
        aria-hidden
      >
        <span className="route-pulse" />
      </div>

      <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-8">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="flex gap-5 lg:block"
            style={{ "--i": index } as CSSProperties}
          >
            {/* `lg`'den itibaren ikon durağın üstünde; altında numaranın yanında. */}
            <span className="route-icon mb-4 hidden size-6 lg:block" aria-hidden>
              {step.icon}
            </span>
            <span
              className="size-2.5 shrink-0 rounded-full border border-primary bg-surface"
              aria-hidden
            />
            <div className="-mt-1 lg:mt-6">
              <span className="flex items-center gap-3">
                <span className="route-icon block size-5 lg:hidden" aria-hidden>
                  {step.icon}
                </span>
                <span
                  className="text-[12px] font-bold tracking-[0.04em] text-primary tabular-nums"
                  aria-hidden
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </span>
              <h3 className="mt-1.5 text-[17px] font-semibold leading-snug tracking-[-0.01em] text-ink">
                {step.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {step.points.map((point) => (
                  <li key={point} className="text-[15px] leading-6 text-ink-muted">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
