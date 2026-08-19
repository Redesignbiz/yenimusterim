import type { ReactNode } from "react";

/** Sayfa boyunca tek bir ölçü: içerik genişliği ve dikey ritim burada tanımlı. */
export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`px-4 py-16 sm:px-6 sm:py-24 ${className}`}>
      <div className="mx-auto w-full max-w-5xl">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow && (
        <p className="eyebrow mb-3 text-sm text-primary">{eyebrow}</p>
      )}
      <h2 className="text-2xl font-bold leading-tight tracking-[-0.02em] text-ink sm:text-3xl">
        {title}
      </h2>
      {lead && (
        <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
          {lead}
        </p>
      )}
    </div>
  );
}
