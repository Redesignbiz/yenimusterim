import Link from "next/link";
import { Logo } from "./Logo";

/**
 * Header her sayfada render ediliyor, bu yüzden iki bağlantı da MUTLAK yol
 * kullanır: logo ana sayfaya ("/"), buton iletişim sayfasına ("/iletisim").
 *
 * Buton eskiden düz `a` + çapa idi (`/app#iletisim`); iletişim kendi sayfası
 * olduğundan artık normal bir `Link`. Aynı route üzerinde yalnızca hash değişince
 * router'ın gezinme saymaması sorunu da böylece ortadan kalktı.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-outline-variant bg-surface/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <Link href="/" className="shrink-0">
          <Logo className="h-6 w-auto sm:h-7" />
        </Link>

        <Link
          href="/iletisim"
          className="shrink-0 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-bright sm:px-5"
        >
          Bize ulaşın
        </Link>
      </div>
    </header>
  );
}
