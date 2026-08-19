import { Section, SectionHeading } from "./Section";

export function TeamLocations() {
  return (
    <Section id="ekip" className="border-t border-outline-variant">
      <SectionHeading
        eyebrow="Lokasyon ve yetkilendirme"
        title="Tek hesap, birden fazla servis noktası"
        lead="Birden fazla servis noktası işleten kullanıcılarda tüm lokasyonlar aynı hesaba tanımlanır; lokasyon değişimi uygulama içinden yapılır."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <div className="rounded-lg border border-outline-variant bg-surface-lowest p-6">
          <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-ink">
            İşletme sahibi
          </h3>
          <p className="mt-2 text-[15px] leading-6 text-ink-muted">
            Hesaba tanımlı tüm servis noktalarına erişim sağlar. Personel
            hesaplarını oluşturur ve her hesabın erişebileceği lokasyonları
            belirler.
          </p>
          <ul className="mt-5 space-y-2.5 border-t border-outline-variant pt-5">
            {[
              "Lokasyonlar arası geçiş",
              "Personel hesabı oluşturma ve yetkilendirme",
              "Tüm lokasyonların performans verileri",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 text-[14px] text-ink-muted"
              >
                <span className="size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-outline-variant bg-surface-lowest p-6">
          <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-ink">
            Personel
          </h3>
          <p className="mt-2 text-[15px] leading-6 text-ink-muted">
            Yalnızca kendisine tanımlanan lokasyonların görev ve randevularına
            erişir. Yetki sınırı arayüzde değil, sunucu tarafında uygulanır.
          </p>
          <ul className="mt-5 space-y-2.5 border-t border-outline-variant pt-5">
            {[
              "Tanımlı lokasyonun talep listesi",
              "Arama ve görüşme sonucu kaydı",
              "Randevu takibi",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 text-[14px] text-ink-muted"
              >
                <span className="size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
