import { STREETS } from "@/lib/streets";

/**
 * Lacivert yüzeylerin sokak haritası dokusu: ince bir ızgara, üstünde hero
 * hikâyesinin sokakları ve arama halkasının kenarı. Laciverdin üstündeki ince
 * çizgi renginde; bir resim değil, laciverde derinlik olarak okunuyor.
 *
 * Çağıran onu içeriğinin arkasına yerleştiriyor ve `className` ile nerede
 * solacağına, ışığın nereye düşeceğine karar veriyor; doku hiçbir yerde
 * yazının arkasında tam güçte durmuyor.
 *
 * Harita her zaman kutusunu kaplıyor; büyük bir yüzey onu daha büyük çiziyor.
 * Sabit kalan, onu bu harita yapan şey: eğriler biçimini koruyor (ölçek
 * tekdüze) ve çizgiler kalınlığını koruyor, çünkü kontur çizimle birlikte
 * ölçeklenmiyor (`non-scaling-stroke`).
 */
export function MapBackdrop({
  className = "",
  anchor = "xMidYMid",
  grid = true,
  omit = [],
}: {
  className?: string;
  /** Haritanın kutu tarafından kırpıldığında nereye sabitleneceği. */
  anchor?: "xMidYMid" | "xMaxYMid";
  /** Kendi hizalı ızgarasını çizen bir yüzey için ızgarayı dışarıda bırakır. */
  grid?: boolean;
  /** Sokakları kendisi yerleştiren bir yüzey için dışarıda bırakılanlar. */
  omit?: number[];
}) {
  const { width: w, height: h, paths } = STREETS;

  return (
    <div className={`pointer-events-none absolute inset-0 -z-10 ${className}`} aria-hidden>
      {grid && <div className="map-grid absolute inset-0" />}
      <svg
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio={`${anchor} slice`}
        className="absolute inset-0 size-full"
        fill="none"
      >
        <g className="stroke-on-deep-line" strokeWidth="1.65">
          {paths.map((d, index) =>
            omit.includes(index) ? null : (
              <path key={d} d={d} vectorEffect="non-scaling-stroke" />
            ),
          )}
        </g>
        {/* Arama halkasının, son geçtiği hâliyle kenarı. */}
        <circle
          cx="480"
          cy="200"
          r="430"
          className="stroke-on-deep-line"
          strokeWidth="1.1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
