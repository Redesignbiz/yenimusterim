import Link from "next/link";
import { Logo } from "./Logo";

/**
 * Bağlantılar MUTLAK yol kullanır ("/#sss"), sayfa-içi çapa ("#sss") değil.
 *
 * Header her sayfada render ediliyor; salt çapa kullanıldığında /gizlilik
 * üzerinde üç bağlantı da ölüydü (o çapalar yalnızca ana sayfada var) ve
 * logo tıklanınca hiçbir şey olmuyordu. Mutlak yol her iki sayfada da çalışır:
 * ana sayfada kaydırır, politika sayfasında ana sayfaya götürür.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-outline-variant bg-surface/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <Link href="/" className="shrink-0">
          <Logo className="h-6 w-auto sm:h-7" />
        </Link>

        {/*
          `Link` DEĞİL, düz `a` — bilinçli.

          Header her sayfada render ediliyor. Ana sayfadayken `Link` hedefi
          mevcut route ile aynı olur (yalnızca hash farklıdır) ve router bunu
          gezinme saymadığı için kaydırma hiç tetiklenmiyor — buton ölü görünüyor.

          Düz `a` router'a hiç uğramaz: ana sayfada tarayıcının kendi çapa
          kaydırması çalışır, alt sayfalardan ise ana sayfayı çapayla açar.
          Alt sayfalardan tam sayfa yüklemesi olur; dört sayfalık statik bir
          sitede bu bedel, ölü bir butondan iyidir.
        */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          href="/#iletisim"
          className="shrink-0 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-bright sm:px-5"
        >
          Bize ulaşın
        </a>
      </div>
    </header>
  );
}
