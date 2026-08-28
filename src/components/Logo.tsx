import Image from "next/image";
/* Static import — gerekçesi home/Hero.tsx'in başında. */
import logo from "@/assets/Yeni_Musterim_logo.svg";

/**
 * Yeni Müşterim logosu — src/assets/Yeni_Musterim_logo.svg dosyasından okunur.
 *
 * Önceden SVG bu dosyanın içine gömülüydü. Tasarım tarafı logoyu güncellediğinde
 * kimse bu kopyayı güncellemediği için site sessizce eski logoyu göstermeye devam
 * ediyordu; aynı sorun favicon'da da yaşandı. Tek kaynak dosyanın kendisi.
 *
 * Static import aynı sorunun önbellek üzerinden tekrarlamasını da engelliyor:
 * dosya değiştiğinde URL'deki içerik hash'i de değişiyor.
 *
 * `unoptimized`: Next'in görsel iyileştiricisi SVG'yi güvenlik gerekçesiyle
 * varsayılan olarak işlemez; bayrak olmadan istek 400 döner. Static import
 * bunu değiştirmiyor — bayrak hâlâ gerekli.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Image
      src={logo}
      alt="Yeni Müşterim"
      width={242}
      height={39}
      unoptimized
      priority
      className={className}
    />
  );
}
