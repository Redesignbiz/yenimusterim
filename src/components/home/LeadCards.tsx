"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hero'nun sağ kolonu: gelen talep kartlarından bir deste.
 *
 * Marka tarafının (dashboard) ekran görüntüsü bu depoda yok; temsilî bir mockup
 * ürünün ne yaptığını bu karttan daha az anlatırdı. Kart tek bir şeyi
 * gösteriyor: izni alınmış, ihtiyacı netleşmiş bir talebin dakikalar içinde
 * belirli bir servis noktasına ulaşması. Gerçek bir dashboard görüntüsü
 * çıktığında yerini alabilir (bkz. docs/gorseller.md).
 *
 * Dört sektörden dört talep var; ürünün lastikle sınırlı olmadığı, listeyle
 * anlatmak yerine en kısa yoldan böyle görünüyor.
 *
 * Karttaki değerler temsilî. Servis noktalarının adı bilinçli olarak tarif
 * edici: gerçek bir işletme adı yazmak, olmayan bir referansı ima eder.
 */
const talepler = [
  {
    alanlar: [
      { etiket: "İhtiyaç", deger: "4 × 205/55R16, yazlık" },
      { etiket: "Araç", deger: "2019 binek" },
      { etiket: "Bölge", deger: "Kadıköy, İstanbul" },
      { etiket: "Alım zamanı", deger: "Bu hafta içinde" },
    ],
    nokta: {
      kisaltma: "KD",
      ad: "Kadıköy lastik ve oto servis noktası",
      gerekce: "2,1 km · konum ve ebat uyumuna göre",
    },
    yonlendirme: "12:04",
    arama: "12:08",
  },
  {
    alanlar: [
      { etiket: "İhtiyaç", deger: "12.000 BTU split klima" },
      { etiket: "Mekân", deger: "85 m² daire" },
      { etiket: "Bölge", deger: "Üsküdar, İstanbul" },
      { etiket: "Kurulum zamanı", deger: "Önümüzdeki hafta" },
    ],
    nokta: {
      kisaltma: "ÜS",
      ad: "Üsküdar klima servis noktası",
      gerekce: "1,4 km · konum ve kapasite uyumuna göre",
    },
    yonlendirme: "10:21",
    arama: "10:24",
  },
  {
    alanlar: [
      { etiket: "İhtiyaç", deger: "Ankastre set montajı" },
      { etiket: "Konut", deger: "3+1 daire" },
      { etiket: "Bölge", deger: "Şişli, İstanbul" },
      { etiket: "Montaj zamanı", deger: "Bu hafta içinde" },
    ],
    nokta: {
      kisaltma: "Şİ",
      ad: "Şişli mutfak-banyo servis noktası",
      gerekce: "3,2 km · konum ve montaj yetkisine göre",
    },
    yonlendirme: "15:47",
    arama: "15:52",
  },
  {
    alanlar: [
      { etiket: "İhtiyaç", deger: "60 Ah akü değişimi" },
      { etiket: "Araç", deger: "2017 model binek" },
      { etiket: "Bölge", deger: "Ataşehir, İstanbul" },
      { etiket: "Değişim zamanı", deger: "Bugün" },
    ],
    nokta: {
      kisaltma: "AT",
      ad: "Ataşehir akü ve oto elektrik servis noktası",
      gerekce: "1,8 km · konum ve stok durumuna göre",
    },
    yonlendirme: "09:12",
    arama: "09:15",
  },
];

/**
 * Bir kartın önde kalma süresi. Dört kart × 4 saniye = 16 saniyelik tur; hero'yu
 * okuyup geçen ziyaretçinin bir sektörden fazlasını görmesi buna bağlı. Fare
 * destenin üzerindeyken tur duruyor, o yüzden süre okuma hızına göre değil
 * dikkat süresine göre seçildi.
 */
const BEKLEME_MS = 4000;

/**
 * Kartın destedeki yerine göre görünümü. Sıra: önde, bir arkada, iki arkada,
 * çıkmış.
 *
 * `origin-bottom` şart: kart küçülürken alt kenarı yerinde kalıyor, aşağı
 * kaydırma da o kenarı öndeki kartın altından çıkarıyor — destenin görünen
 * tarafı bu. Üstten küçültülseydi arka kartlar öndekinin arkasında tamamen
 * kaybolurdu.
 *
 * Son durum hem çıkışı hem girişi taşıyor: öne çıkmış kart yukarı süzülüp
 * kayboluyor, bir sonraki adımda aynı yerden inip destenin arkasına katılıyor.
 *
 * Çıkış 300ms, destenin kayması 500ms. Sebep devir anındaki sıralama: `z-index`
 * integer olarak animasyonlanıyor, yani öndeki kart geri çekilirken sıralama ara
 * değerlerden geçiyor ve iki kart kısa süre iç içe duruyor. Çıkan kart daha
 * çabuk saydamlaşınca bu geçiş görünmüyor. Süre konum sınıfının içinde, temel
 * sınıfta değil: iki `duration-*` yan yana geldiğinde hangisinin kazandığı
 * sınıfların yazılış sırasına değil üretilen CSS'in sırasına bağlı.
 */
const konumlar = [
  "z-40 translate-y-0 scale-100 opacity-100 duration-500",
  "z-30 translate-y-2.5 scale-[0.97] opacity-75 duration-500",
  "z-20 translate-y-5 scale-[0.94] opacity-50 duration-500",
  "z-10 -translate-y-3 scale-[1.01] opacity-0 duration-300",
];

export function LeadCards() {
  const [aktif, setAktif] = useState(0);
  const [durdu, setDurdu] = useState(false);
  const [gorunur, setGorunur] = useState(false);
  const kapsayici = useRef<HTMLDivElement>(null);

  /*
   * Tur, deste ekranda değilken dönmüyor.
   *
   * Telefonda hero tek kolona düşüyor ve kart metnin altında, ilk ekranın
   * dışında kalıyor. Tur sayfa açılırken başlasa ziyaretçi kaydırıp kartı
   * gördüğünde turun ortasına düşerdi: gösterge rastgele bir noktada, ilk kart
   * çoktan geçmiş. Gözlemci sayesinde deste hangi cihazda olursa olsun
   * görüldüğü anda ilk karttan başlıyor.
   */
  useEffect(() => {
    const dugum = kapsayici.current;
    if (!dugum) {
      return;
    }

    const gozlemci = new IntersectionObserver(
      ([kayit]) => setGorunur(kayit.isIntersecting),
      { threshold: 0.4 },
    );
    gozlemci.observe(dugum);

    return () => gozlemci.disconnect();
  }, []);

  /*
   * Turu üç şey durduruyor:
   *
   * `gorunur` — yukarıdaki gözlemci.
   *
   * `durdu` — fare destenin üzerinde. Kartı okumak için duran ziyaretçinin
   * altından kart çekilmiyor; imleç ayrıldığında sayaç sıfırdan başlıyor, yani
   * öndeki kart tam süre kadar daha kalıyor.
   *
   * Hareketi azaltılmış ayar — deste hiç dönmüyor, ilk kart açılıştaki hâliyle
   * kalıyor. Kartın taşıdığı bilgi hareketin kendisinde değil.
   */
  useEffect(() => {
    if (
      durdu ||
      !gorunur ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const sayac = setInterval(() => {
      setAktif((onceki) => (onceki + 1) % talepler.length);
    }, BEKLEME_MS);

    return () => clearInterval(sayac);
  }, [durdu, gorunur]);

  /*
   * Duraklatma yalnızca fareye bağlı, `pointerType` bu yüzden süzülüyor:
   * dokunmatikte tek dokunuş `pointerenter` üretiyor ama `pointerleave`
   * çoğunlukla gelmiyor — filtre olmasa karta bir kez dokunan ziyaretçide tur
   * kalıcı olarak duruyordu. Parmakla okuyan ziyaretçinin duraklatmaya
   * ihtiyacı da yok: sayfayı kaydırdığında deste ekrandan çıkıyor ve tur
   * kendiliğinden duruyor.
   */
  return (
    <div
      ref={kapsayici}
      onPointerEnter={(olay) => {
        if (olay.pointerType === "mouse") setDurdu(true);
      }}
      onPointerLeave={(olay) => {
        if (olay.pointerType === "mouse") setDurdu(false);
      }}
    >
      {/* `pb-6`: arkadaki kartlar 20px aşağı taşıyor, alt kenarları kırpılmasın. */}
      <div className="grid pb-6">
        {talepler.map((talep, sira) => (
          <LeadCard
            key={talep.nokta.ad}
            talep={talep}
            konum={(sira - aktif + talepler.length) % talepler.length}
          />
        ))}
      </div>

      {/*
        Gösterge, destenin döndüğünü kartın kendisi değişmeden de belli ediyor:
        kısa süre bakan ziyaretçi tek bir kart görüp bunu statik bir görsel
        sanmıyor, dört örnek olduğunu ve hangisinde olduğunu görüyor.

        Tıklanabilir değil ve `aria-hidden`: hero'nun iki gerçek düğmesiyle
        (bkz. home/Hero.tsx) yarışan dört ek durak açmaya değmiyor, gösterge de
        kartın içeriğine bir şey eklemiyor.
      */}
      <div className="mt-2 flex items-center justify-center gap-1.5" aria-hidden>
        {talepler.map((talep, sira) => (
          <span
            key={talep.nokta.ad}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              sira === aktif ? "w-5 bg-primary" : "w-1.5 bg-outline-variant"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Kartlar aynı grid gözünde üst üste duruyor (`col-start-1 row-start-1`);
 * konteyner en uzun karta göre boyutlanıyor, deste dönerken yükseklik oynamıyor.
 *
 * Ekran okuyucuya yalnızca öndeki kart açık: dördü aynı şeyin farklı örneği.
 */
function LeadCard({
  talep,
  konum,
}: {
  talep: (typeof talepler)[number];
  konum: number;
}) {
  return (
    <div
      className={`col-start-1 row-start-1 origin-bottom rounded-lg border border-outline-variant bg-surface-lowest p-5 transition-all ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none ${konumlar[konum]}`}
      aria-hidden={konum > 0 || undefined}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-[13px] font-bold text-ink">Gelen talep</span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-fixed px-2.5 py-1 text-[11px] font-bold text-on-accent-fixed">
          <svg
            viewBox="0 0 24 24"
            className="size-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="m5 12 5 5L20 7" />
          </svg>
          İzin alındı
        </span>
      </div>

      {/* Etiket sütunu `w-28`: en uzun etiket "Kurulum zamanı" ve `w-24`
          içinde sarıyordu. */}
      <dl className="mt-4 space-y-2.5">
        {talep.alanlar.map((alan) => (
          <div key={alan.etiket} className="flex items-baseline gap-3">
            <dt className="w-28 shrink-0 text-[12px] text-outline">
              {alan.etiket}
            </dt>
            <dd className="text-[13px] font-medium text-ink">{alan.deger}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 border-t border-outline-variant pt-4">
        {/* Türkçede `uppercase` yok — etiket ağırlık ve harf aralığıyla ayrışıyor
            (bkz. globals.css, `.eyebrow`). */}
        <p className="eyebrow text-[11px] text-outline">Yönlendirildi</p>
        <div className="mt-2.5 flex items-center gap-3">
          <span
            className="flex size-9 shrink-0 items-center justify-center rounded-DEFAULT bg-primary text-[12px] font-bold text-white"
            aria-hidden
          >
            {talep.nokta.kisaltma}
          </span>
          <div className="min-w-0">
            <p className="truncate text-[14px] font-semibold text-ink">
              {talep.nokta.ad}
            </p>
            <p className="text-[12px] text-ink-muted">{talep.nokta.gerekce}</p>
          </div>
        </div>

        <div className="mt-4 space-y-1.5">
          <div className="flex items-center justify-between gap-3 text-[12px]">
            <span className="text-ink-muted">Müşteri yönlendirildi</span>
            <span className="font-semibold text-ink tabular-nums">
              {talep.yonlendirme}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3 text-[12px]">
            <span className="text-ink-muted">Servis noktası aradı</span>
            <span className="font-semibold text-accent tabular-nums">
              {talep.arama}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
