import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

/**
 * Nunito Sans — uygulamanın kendi yazı tipi (dealer-mobile/constants/theme.ts).
 * DESIGN.md Inter diyor ama gönderilen uygulama Nunito Sans kullanıyor; landing
 * dokümanı değil, kullanıcının telefonunda gördüğü şeyi takip ediyor.
 */
const nunitoSans = Nunito_Sans({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"], // latin-ext: ğ ş ı İ Ç Ö Ü
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    /*
     * `data-scroll-behavior="smooth"` ZORUNLU — süs değil.
     *
     * globals.css'te `html { scroll-behavior: smooth }` var (çapa bağlantıları
     * için). Next 16'ya kadar Next, sayfa geçişlerinde bunu geçici olarak `auto`
     * yapıp anında en üste kaydırıyordu; 16'da bu otomatik geçersiz kılma
     * kaldırıldı. Bu öznitelik olmadan yeni sayfa, önceki sayfanın kaydırma
     * konumunda (çoğunlukla en altta) açılıyor.
     * Kaynak: node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md
     */
    <html
      lang="tr"
      data-scroll-behavior="smooth"
      className={`${nunitoSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface text-ink font-[family-name:var(--font-sans)]">
        {children}
      </body>
    </html>
  );
}
