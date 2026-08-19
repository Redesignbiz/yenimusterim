import Image from "next/image";

/**
 * Yeni Müşterim logosu — public/images/Yeni_Musterim_logo.svg dosyasından okunur.
 *
 * Önceden SVG bu dosyanın içine gömülüydü. Tasarım tarafı logoyu güncellediğinde
 * kimse bu kopyayı güncellemediği için site sessizce eski logoyu göstermeye devam
 * ediyordu; aynı sorun favicon'da da yaşandı. Tek kaynak dosyanın kendisi.
 *
 * `unoptimized`: Next'in görsel iyileştiricisi SVG'yi güvenlik gerekçesiyle
 * varsayılan olarak işlemez; bayrak olmadan istek 400 döner.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/images/Yeni_Musterim_logo.svg"
      alt="Yeni Müşterim"
      width={242}
      height={39}
      unoptimized
      priority
      className={className}
    />
  );
}
