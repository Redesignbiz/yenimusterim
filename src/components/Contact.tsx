import { Section, SectionHeading } from "./Section";
import { site } from "@/lib/site";

/**
 * Header'daki "Bize ulaşın" butonunun hedefi (`/#iletisim`).
 *
 * Buton eskiden doğrudan `mailto:` idi; tarayıcıda tanımlı posta istemcisi
 * olmayan kullanıcıda tıklama SESSİZCE hiçbir şey yapmıyordu. Bu bölüm adresleri
 * ekranda gösterir, `mailto` yalnızca kolaylık olarak üstüne binen bir bağlantı.
 */
export function Contact() {
  const rows = [
    {
      label: "E-posta",
      value: site.contact.support,
      href: `mailto:${site.contact.support}`,
      icon: (
        <>
          <path d="M4 5h16v14H4z" />
          <path d="m4 7 8 6 8-6" />
        </>
      ),
    },
    // Numara tanımlı değilse satır hiç basılmaz — bkz. site.ts yorumu.
    ...(site.contact.phone
      ? [
          {
            label: "Telefon",
            value: site.contact.phone,
            href: `tel:${site.contact.phone.replace(/\s/g, "")}`,
            icon: (
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
            ),
          },
        ]
      : []),
    {
      label: "Adres",
      value: site.controller.address,
      href: null,
      icon: (
        <>
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </>
      ),
    },
  ];

  return (
    <Section id="iletisim" className="border-t border-outline-variant">
      <SectionHeading
        eyebrow="İletişim"
        title="Bize ulaşın"
        lead="Uygulama, katılım koşulları ve yayın takvimi hakkındaki sorular aşağıdaki kanallardan iletilebilir."
      />

      {/*
        Sütun sayısı satır sayısını izler. Sabit 3 sütun olduğunda, telefon
        tanımlı değilken son hücre boş kalıyor ve `gap-px` tekniğinin arka plan
        rengi (bg-outline-variant) gri bir blok olarak görünüyordu.
      */}
      <dl
        className={`mt-10 grid gap-px overflow-hidden rounded-lg border border-outline-variant bg-outline-variant sm:grid-cols-2 ${
          rows.length === 3 ? "lg:grid-cols-3" : ""
        }`}
      >
        {rows.map((row) => (
          <div key={row.label} className="bg-surface-lowest p-6">
            <span className="flex size-9 items-center justify-center rounded-DEFAULT bg-primary-fixed">
              <svg
                viewBox="0 0 24 24"
                className="size-[18px] text-primary"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                {row.icon}
              </svg>
            </span>
            <dt className="mt-4 text-[13px] font-semibold text-ink-muted">
              {row.label}
            </dt>
            <dd className="mt-1 text-[15px] leading-6 text-ink">
              {row.href ? (
                <a
                  href={row.href}
                  className="font-medium text-primary underline underline-offset-4 transition-colors hover:text-primary-bright"
                >
                  {row.value}
                </a>
              ) : (
                row.value
              )}
            </dd>
          </div>
        ))}
      </dl>

    </Section>
  );
}
