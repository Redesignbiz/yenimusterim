import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hesap Silme Talebi",
  description: `${site.name} hesabınızın ve kişisel verilerinizin silinmesini talep etme adımları, silinen ve saklanan veriler, sonuçlandırma süresi.`,
  alternates: { canonical: "/hesap-silme" },
};

function Step({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="rounded-lg border border-outline-variant bg-surface-lowest p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-[13px] font-bold text-white tabular-nums">
          {number}
        </span>
        <h2 className="text-[18px] font-semibold tracking-[-0.01em] text-ink">
          {title}
        </h2>
      </div>
      <div className="mt-4 pl-0 sm:pl-10">{children}</div>
    </li>
  );
}

export default function AccountDeletion() {
  return (
    <>
      <Header />

      <main className="flex-1 px-4 py-14 sm:px-6 sm:py-20">
        <article className="mx-auto w-full max-w-3xl">
          <p className="eyebrow text-sm text-primary">Hesap yönetimi</p>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-[-0.03em] text-ink sm:text-4xl">
            Hesap silme talebi
          </h1>
          <p className="mt-5 text-[16px] leading-7 text-ink-muted">
            {site.name} hesabınızın ve hesabınıza bağlı kişisel verilerinizin
            silinmesini, aşağıdaki adımları izleyerek talep edebilirsiniz. Talep
            oluşturmak için uygulamayı kullanmanız gerekmez.
          </p>

          {/* Neden uygulama içinde bir silme düğmesi yok */}
          <div className="mt-8 rounded-lg border border-outline-variant bg-surface-low p-5">
            <h2 className="text-[15px] font-semibold text-ink">
              Neden uygulama içinden silinmiyor?
            </h2>
            <p className="mt-2 text-[15px] leading-7 text-ink-muted">
              {site.name} işletme kullanımına yönelik bir uygulamadır ve
              hesaplar self-servis kayıt yoluyla değil, yetkili yönetici
              tarafından oluşturulur. Bir hesabın silinmesi, bağlı olduğu servis
              noktasının operasyonunu ve devredilmemiş talepleri de etkilediği
              için işlem, kimlik doğrulaması yapılarak talep üzerine yürütülür.
            </p>
          </div>

          {/* Adımlar */}
          <h2 className="mt-14 text-xl font-bold tracking-[-0.02em] text-ink sm:text-2xl">
            Silme adımları
          </h2>

          <ol className="mt-6 space-y-4">
            <Step number={1} title="Talep bilgilerinizi hazırlayın">
              <p className="text-[15px] leading-7 text-ink-muted">
                Talebinizin işleme alınabilmesi için e-postanızda aşağıdaki
                bilgilerin eksiksiz yer alması gerekir:
              </p>
              <ul className="mt-4 space-y-2">
                {[
                  "Ad ve soyadınız",
                  "Uygulamada kullandığınız kullanıcı adı",
                  "Bağlı olduğunuz servis noktasının adı",
                  "Talebinizin açık ifadesi: “Hesabımın ve kişisel verilerimin silinmesini talep ediyorum.”",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      className="mt-3 size-1.5 shrink-0 rounded-full bg-outline-variant"
                      aria-hidden
                    />
                    <span className="text-[15px] leading-7 text-ink-muted">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Step>

            <Step number={2} title="Talebinizi gönderin">
              <p className="text-[15px] leading-7 text-ink-muted">
                E-postanızı, konu satırına{" "}
                <strong className="font-semibold text-ink">
                  “Hesap silme talebi”
                </strong>{" "}
                yazarak aşağıdaki adrese iletin:
              </p>
              <p className="mt-4">
                <a
                  href={`mailto:${site.contact.accountDeletion}?subject=Hesap%20silme%20talebi`}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-primary-bright"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="size-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M4 4h16v16H4z" />
                    <path d="m4 6 8 6 8-6" />
                  </svg>
                  {site.contact.accountDeletion}
                </a>
              </p>
            </Step>

            <Step number={3} title="Kimlik doğrulaması yapılır">
              <p className="text-[15px] leading-7 text-ink-muted">
                Başvurunuz, talebin hesabın gerçek sahibinden geldiğinin
                doğrulanması amacıyla incelenir; gerekli görülmesi hâlinde ek
                bilgi talep edilebilir. Bu adım, üçüncü kişilerin sizin adınıza
                silme talebi oluşturmasını engellemek için zorunludur.
              </p>
            </Step>

            <Step number={4} title="Silme işlemi gerçekleştirilir">
              <p className="text-[15px] leading-7 text-ink-muted">
                Doğrulamanın tamamlanmasının ardından hesabınız kapatılır ve
                aşağıdaki tabloda belirtilen veriler silinir.
              </p>
            </Step>

            <Step number={5} title="Sonuç tarafınıza bildirilir">
              <p className="text-[15px] leading-7 text-ink-muted">
                Talebiniz en geç{" "}
                <strong className="font-semibold text-ink">
                  {site.retention.deletionDays} gün
                </strong>{" "}
                içinde sonuçlandırılır ve işlemin tamamlandığı başvurunuzu
                gönderdiğiniz e-posta adresine bildirilir.
              </p>
            </Step>
          </ol>

          {/* Veri tablosu */}
          <h2
            id="veriler"
            className="mt-14 scroll-mt-24 text-xl font-bold tracking-[-0.02em] text-ink sm:text-2xl"
          >
            Hangi veriler silinir, hangileri saklanır?
          </h2>
          <p className="mt-4 text-[15px] leading-7 text-ink-muted">
            Hesabınıza bağlı kimlik verileri silinir. Servis noktasına ait
            ticari kayıtlar ise yasal saklama yükümlülüğü nedeniyle muhafaza
            edilir; bu kayıtlarda kimliğinizi gösteren alanlar anonim hâle
            getirilir.
          </p>

          <div className="mt-6 overflow-x-auto rounded-lg border border-outline-variant">
            <table className="w-full min-w-[560px] border-collapse bg-surface-lowest text-left text-[14px]">
              <thead>
                <tr className="border-b border-outline-variant bg-surface-low">
                  <th className="px-4 py-3 font-semibold text-ink">Veri</th>
                  <th className="px-4 py-3 font-semibold text-ink">İşlem</th>
                  <th className="px-4 py-3 font-semibold text-ink">Gerekçe</th>
                </tr>
              </thead>
              <tbody className="text-ink-muted">
                {[
                  ["Hesap kaydı, ad ve soyad", "Silinir", "—"],
                  ["Kullanıcı adı ve şifre", "Silinir", "—"],
                  ["Cihaz bildirim jetonları", "Silinir", "—"],
                  ["Servis noktası üyelik kayıtları", "Silinir", "—"],
                  [
                    "Müşteri talepleri ve randevular",
                    "Anonimleştirilir",
                    `Servis noktasına ait ticari kayıt · ${site.retention.logYears} yıl`,
                  ],
                  [
                    "İşlem geçmişi ve erişim kayıtları",
                    "Anonimleştirilir",
                    `Yasal saklama yükümlülüğü · ${site.retention.logYears} yıl`,
                  ],
                ].map(([data, action, reason]) => (
                  <tr key={data} className="border-b border-outline-variant last:border-0">
                    <td className="px-4 py-3">{data}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-sm px-2 py-0.5 text-[12px] font-semibold ${
                          action === "Silinir"
                            ? "bg-danger-fixed text-on-danger-fixed"
                            : "bg-surface-container text-ink-muted"
                        }`}
                      >
                        {action}
                      </span>
                    </td>
                    <td className="px-4 py-3">{reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Sonrası */}
          <h2 className="mt-14 text-xl font-bold tracking-[-0.02em] text-ink sm:text-2xl">
            Silme işleminden sonra
          </h2>
          <ul className="mt-4 space-y-2.5">
            {[
              "Uygulamaya giriş yapamazsınız ve bildirim almazsınız.",
              "Silme işlemi geri alınamaz; silinen kimlik verileri yeniden oluşturulamaz.",
              "Uygulamaya yeniden erişmeniz gerekirse yönetici tarafından yeni bir hesap tanımlanması gerekir. Önceki hesaba ait veriler bu hesaba aktarılmaz.",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span
                  className="mt-3 size-1.5 shrink-0 rounded-full bg-outline-variant"
                  aria-hidden
                />
                <span className="text-[15px] leading-7 text-ink-muted">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          {/* İletişim */}
          <h2 className="mt-14 text-xl font-bold tracking-[-0.02em] text-ink sm:text-2xl">
            Sorularınız için
          </h2>
          <p className="mt-4 text-[15px] leading-7 text-ink-muted">
            Silme süreci veya kişisel verilerinizle ilgili sorularınızı{" "}
            <a
              className="text-primary underline underline-offset-4"
              href={`mailto:${site.contact.privacy}`}
            >
              {site.contact.privacy}
            </a>{" "}
            adresine iletebilirsiniz. Verilerinizin işlenmesine ilişkin ayrıntılı
            bilgi için{" "}
            <Link
              href="/gizlilik"
              className="text-primary underline underline-offset-4"
            >
              Gizlilik Politikası
            </Link>{" "}
            sayfasını inceleyebilirsiniz.
          </p>

          <div className="mt-16 flex flex-wrap gap-6 border-t border-outline-variant pt-8">
            <Link
              href="/gizlilik"
              className="inline-flex items-center gap-2 text-[15px] font-semibold text-ink-muted transition-colors hover:text-ink"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Gizlilik Politikası
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[15px] font-semibold text-ink-muted transition-colors hover:text-ink"
            >
              Ana sayfa
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
