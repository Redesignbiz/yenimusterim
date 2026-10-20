import Link from "next/link";
import { Section } from "@/components/Section";
import { STREETS } from "@/lib/streets";
import { MapBackdrop } from "./MapBackdrop";
import { StorePaths } from "./StageIcons";

/**
 * Kapanış: sayfanın sonundaki tek çağrı (LeadHanger landing'indeki kutunun
 * aynısı). Form yok: bu projede backend de form uç noktası da yok, sessizce
 * düşen bir form ise adresten kötüdür. Düğme iletişim sayfasına gidiyor.
 *
 * Tam genişlik bir bant değil, bir kutu; sayfada ayrı bir bölüm değil bir
 * duraklama gibi okunuyor. Kanıt bölümüyle aynı lacivertte (`primary-deep`).
 *
 * Derinlik gölgeden değil laciverde çizilenden geliyor: ince bir ızgara,
 * üstünde hero hikâyesinin sokak haritası ve uzak köşede yumuşak bir ışık.
 * Üçü de sola doğru soluyor; başlık ve düğme temiz lacivert üstünde, doku
 * kutunun boş sağ yarısında toplanıyor.
 *
 * Haritanın üstünde, önde, birkaç servis noktası mağaza işareti olarak; harita
 * ile aynı sakin tonda, desen olarak kalsınlar diye. Arka plan ve ön plan
 * sağ kenara sabitlenmiş tek bir viewBox paylaşıyor (`xMaxYMid slice`):
 * işaretler her kutu genişliğinde sokaklarının üstünde kalıyor, daralan kutu
 * işaretleri değil boş sol tarafı kırpıyor.
 */

/**
 * İşaretler, sokak haritasının 960 × 400'lük alanında; biri diğerlerinden
 * büyük. Hepsi y 100 ile 300 arasında: geniş bir masaüstü kutusunda kırpma
 * haritanın üstünü ve altını kesiyor, kalan bant kabaca 70 ile 330 arası.
 */
const PINS = [
  { x: 815, y: 165, size: 48 },
  { x: 735, y: 292, size: 34 },
  { x: 905, y: 270, size: 34 },
  { x: 690, y: 118, size: 34 },
];

/**
 * Orijinde ortalanmış, `size` boyunda bir mağaza. Kontur kalınlığı ızgara
 * üzerinde verildiği için ikonla birlikte ölçekleniyor: her ikon kendi
 * boyuna göre aynı ağırlıkta.
 */
function Store({ size }: { size: number }) {
  return (
    <g
      transform={`translate(${-size / 2} ${-size / 2}) scale(${size / 24})`}
      fill="none"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <StorePaths />
    </g>
  );
}

/** Üstünde mağaza olan bir plaka; ikon plakanın yarısından biraz büyük. */
function Pin({ x, y, size }: { x: number; y: number; size: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        x={-size / 2}
        y={-size / 2}
        width={size}
        height={size}
        rx="2"
        className="fill-white/10 stroke-white/20"
      />
      <g className="stroke-on-deep-muted opacity-70">
        <Store size={Math.round(size * 0.53)} />
      </g>
    </g>
  );
}

export function Closing() {
  return (
    <Section id="sonraki-adim" className="border-t border-outline-variant">
      <div className="relative isolate overflow-hidden rounded-lg bg-primary-deep px-7 py-12 sm:px-12 sm:py-16">
        <MapBackdrop className="closing-backdrop" anchor="xMaxYMid" />

        <svg
          viewBox={`0 0 ${STREETS.width} ${STREETS.height}`}
          preserveAspectRatio="xMaxYMid slice"
          className="absolute inset-0 -z-10 hidden size-full md:block"
          aria-hidden
        >
          {PINS.map((pin) => (
            <Pin key={`${pin.x}-${pin.y}`} {...pin} />
          ))}
        </svg>

        <h2 className="max-w-xl text-[26px] font-bold leading-[1.15] tracking-[-0.025em] text-balance text-on-deep sm:text-[34px]">
          Markanızın satış ağında nasıl çalışacağını birlikte kurgulayalım.
        </h2>
        <p className="mt-5 max-w-xl text-[16px] leading-[1.65] text-on-deep-muted sm:text-[17px]">
          Yeni Müşterim&apos;in müşteri edinimi ve talep sürecinizi nasıl daha
          verimli hale getirebileceğini size özel bir demo üzerinden görün.
        </p>
        <Link
          href="/iletisim"
          className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-[15px] font-semibold text-primary-deep transition-colors hover:bg-on-deep-muted"
        >
          Demo talep edin
        </Link>
      </div>
    </Section>
  );
}
