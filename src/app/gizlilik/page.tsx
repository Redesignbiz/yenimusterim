import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: `${site.name} mobil uygulamasının kişisel verileri nasıl işlediğini, sakladığını ve hesap silme talebinin nasıl yapılacağını açıklar.`,
  alternates: { canonical: "/gizlilik" },
};

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="mt-14 scroll-mt-24 text-xl font-bold tracking-[-0.02em] text-ink sm:text-2xl"
    >
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 text-[15px] leading-7 text-ink-muted">{children}</p>;
}

function UL({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-[15px] leading-7 text-ink-muted">
          <span
            className="mt-3 size-1.5 shrink-0 rounded-full bg-outline-variant"
            aria-hidden
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PrivacyPolicy() {
  return (
    <>
      <Header />

      <main className="flex-1 px-4 py-14 sm:px-6 sm:py-20">
        <article className="mx-auto w-full max-w-3xl">
          <p className="eyebrow text-sm text-primary">Yasal</p>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-[-0.03em] text-ink sm:text-4xl">
            Gizlilik Politikası
          </h1>
          <p className="mt-4 text-[15px] text-ink-muted">
            Yürürlük tarihi:{" "}
            <time dateTime={site.policyUpdatedAt}>{site.policyUpdatedLabel}</time>
          </p>

          <P>
            Bu politika, <strong className="font-semibold text-ink">{site.name}</strong>{" "}
            mobil uygulamasının hangi kişisel verileri işlediğini, bu verileri
            neden ve ne kadar süreyle sakladığını, kimlerle paylaştığını ve
            hesabınızın nasıl silineceğini açıklar.
          </P>

          <P>
            {site.name}, servis noktalarının kendilerine iletilen müşteri
            taleplerini ve randevularını takip etmesi için geliştirilmiş bir
            işletme uygulamasıdır. Halka açık bir tüketici uygulaması değildir:{" "}
            <strong className="font-semibold text-ink">
              uygulamada kayıt (üye olma) adımı yoktur
            </strong>
            , hesaplar yalnızca yetkili yönetici tarafından tanımlanır.
          </P>

          {/* İçindekiler — 12 bölümlük bir metinde hesap silme başlığının
              kaydırarak aranmaması için; bulunabilirlik Play Console gerekliliği. */}
          <nav
            aria-label="Bölümler"
            className="mt-10 rounded-lg border border-outline-variant bg-surface-lowest p-5"
          >
            <h2 className="text-[13px] font-semibold text-ink-muted">
              Bölümler
            </h2>
            <ol className="mt-3 space-y-2">
              {[
                { id: "veri-sorumlusu", label: "1. Veri sorumlusu" },
                { id: "islenen-veriler", label: "2. İşlenen kişisel veriler" },
                { id: "toplanmayanlar", label: "3. Toplamadığımız veriler" },
                { id: "amac", label: "4. İşleme amaçları ve hukuki sebep" },
                { id: "paylasim", label: "5. Paylaşım ve yurt dışına aktarım" },
                { id: "saklama", label: "6. Saklama süresi" },
                { id: "guvenlik", label: "7. Veri güvenliği" },
                { id: "hesap-silme", label: "8. Hesabınızı ve verilerinizi silme" },
                { id: "haklar", label: "9. KVKK kapsamındaki haklarınız" },
                { id: "cocuklar", label: "10. Çocukların verileri" },
                { id: "degisiklikler", label: "11. Politikadaki değişiklikler" },
                { id: "iletisim", label: "12. İletişim" },
              ].map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-[14px] text-ink-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* 1 */}
          <H2 id="veri-sorumlusu">1. Veri sorumlusu</H2>
          <P>
            Kişisel verileriniz, 6698 sayılı Kişisel Verilerin Korunması Kanunu
            (KVKK) kapsamında veri sorumlusu sıfatıyla{" "}
            <strong className="font-semibold text-ink">
              {site.controller.legalName}
            </strong>{" "}
            tarafından işlenmektedir.
          </P>
          <div className="mt-5 rounded-lg border border-outline-variant bg-surface-lowest p-5">
            <dl className="space-y-3 text-[15px]">
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                <dt className="w-32 shrink-0 font-semibold text-ink">Ünvan</dt>
                <dd className="text-ink-muted">{site.controller.legalName}</dd>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                <dt className="w-32 shrink-0 font-semibold text-ink">Adres</dt>
                <dd className="text-ink-muted">{site.controller.address}</dd>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                <dt className="w-32 shrink-0 font-semibold text-ink">E-posta</dt>
                <dd>
                  <a
                    className="text-primary underline underline-offset-4"
                    href={`mailto:${site.contact.privacy}`}
                  >
                    {site.contact.privacy}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          {/* 2 */}
          <H2 id="islenen-veriler">2. İşlenen kişisel veriler</H2>
          <P>
            Uygulama iki farklı kişi grubuna ait veri işler: uygulamayı kullanan{" "}
            <strong className="font-semibold text-ink">servis noktası çalışanı</strong>{" "}
            ve hakkında talep/randevu kaydı bulunan{" "}
            <strong className="font-semibold text-ink">son müşteri</strong>.
          </P>

          <h3 className="mt-8 text-[17px] font-semibold text-ink">
            a) Uygulama kullanıcısına ait veriler
          </h3>
          <UL
            items={[
              <>
                <strong className="font-semibold text-ink">Kimlik ve hesap:</strong>{" "}
                ad soyad, kullanıcı adı, şifre (geri döndürülemez şekilde
                şifrelenmiş olarak saklanır), hesap rolü ve bağlı olduğunuz
                servis noktaları.
              </>,
              <>
                <strong className="font-semibold text-ink">
                  Cihaz bildirim kimliği:
                </strong>{" "}
                bildirim gönderebilmek için cihazınıza ait bildirim jetonu
                (push token) ve son görülme zamanı. Bu jeton cihazı tanımlar,
                kişiyi değil; bildirim izni vermezseniz hiç oluşturulmaz.
              </>,
              <>
                <strong className="font-semibold text-ink">İşlem kayıtları:</strong>{" "}
                giriş zamanları ve uygulama üzerinden yaptığınız işlemler (arama,
                sonuç işaretleme, not ekleme) ile bu işlemlerin zamanı.
              </>,
            ]}
          />

          <h3 className="mt-8 text-[17px] font-semibold text-ink">
            b) Son müşteriye ait veriler
          </h3>
          <P>
            Bu veriler size uygulama üzerinden{" "}
            <em>işinizi yapabilmeniz için</em> gösterilir; uygulama tarafından
            sizden toplanmaz.
          </P>
          <UL
            items={[
              <>
                <strong className="font-semibold text-ink">İletişim:</strong> ad
                soyad ve telefon numarası.
              </>,
              <>
                <strong className="font-semibold text-ink">Talep içeriği:</strong>{" "}
                lastik tipi, ölçüsü ve adedi, tercih edilen aranma saati,
                görüşme sonucu ve varsa notlar.
              </>,
              <>
                <strong className="font-semibold text-ink">Randevu içeriği:</strong>{" "}
                randevu saati, araç bilgisi, yapılacak işlemler ve tutar.
              </>,
            ]}
          />

          <h3 className="mt-8 text-[17px] font-semibold text-ink">
            c) Erişim izleri
          </h3>
          <P>
            Müşteri telefon numarası uygulamada maskeli görünür. Numaranın tamamı
            görüntülendiğinde veya arama/WhatsApp bağlantısı açıldığında{" "}
            <strong className="font-semibold text-ink">
              bu erişim kim tarafından, hangi kayıt için ve ne zaman yapıldığı
              bilgisiyle kayıt altına alınır.
            </strong>{" "}
            Bu kayıt, kişisel verinin korunması yükümlülüğümüzün bir gereğidir ve
            denetim amacıyla tutulur.
          </P>

          {/* 3 */}
          <H2 id="toplanmayanlar">3. Toplamadığımız veriler</H2>
          <P>
            Uygulama aşağıdaki verilere{" "}
            <strong className="font-semibold text-ink">erişmez ve bunları toplamaz</strong>:
          </P>
          <UL
            items={[
              "Konum bilgisi (GPS veya yaklaşık konum)",
              "Kamera, mikrofon, fotoğraflar veya cihazdaki dosyalar",
              "Cihaz rehberi ve kişi listesi",
              "Reklam kimliği (Advertising ID) veya reklam amaçlı izleme",
              "Üçüncü taraf reklam ve analitik yazılımları — uygulamada hiçbiri kullanılmamaktadır",
            ]}
          />
          <P>
            Uygulama içi satın alma bulunmaz ve verileriniz hiçbir koşulda
            reklam, pazarlama veya satış amacıyla üçüncü taraflara aktarılmaz
            veya satılmaz.
          </P>

          {/* 4 */}
          <H2 id="amac">4. İşleme amaçları ve hukuki sebep</H2>
          <UL
            items={[
              "Size atanan müşteri taleplerinin ve randevuların iletilmesi, takibi ve sonuçlandırılması",
              "Aranma saati geldiğinde bildirim gönderilmesi",
              "Hesabınızın oluşturulması, kimliğinizin doğrulanması ve yetki sınırlarınızın uygulanması",
              "Hizmet kalitesinin ve performansın ölçülmesi (tamamlanma, zamanında arama, dönüşüm)",
              "Kişisel veriye erişimin denetlenebilir olması ve bilgi güvenliğinin sağlanması",
              "Hukuki yükümlülüklerin yerine getirilmesi",
            ]}
          />
          <P>
            İşleme faaliyeti KVKK m.5/2 uyarınca{" "}
            <em>sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması</em>,{" "}
            <em>hukuki yükümlülüğün yerine getirilmesi</em> ve{" "}
            <em>veri sorumlusunun meşru menfaati</em> hukuki sebeplerine
            dayanmaktadır.
          </P>

          {/* 5 */}
          <H2 id="paylasim">5. Paylaşım ve yurt dışına aktarım</H2>
          <P>
            Veriler yalnızca hizmetin çalışması için zorunlu olan altyapı
            sağlayıcılarıyla paylaşılır:
          </P>
          <div className="mt-5 overflow-x-auto rounded-lg border border-outline-variant">
            <table className="w-full min-w-[520px] border-collapse bg-surface-lowest text-left text-[14px]">
              <thead>
                <tr className="border-b border-outline-variant bg-surface-low">
                  <th className="px-4 py-3 font-semibold text-ink">Alıcı</th>
                  <th className="px-4 py-3 font-semibold text-ink">
                    Paylaşılan veri
                  </th>
                  <th className="px-4 py-3 font-semibold text-ink">Amaç</th>
                </tr>
              </thead>
              <tbody className="text-ink-muted">
                <tr className="border-b border-outline-variant">
                  <td className="px-4 py-3">Google Cloud (Almanya)</td>
                  <td className="px-4 py-3">Tüm uygulama verisi</td>
                  <td className="px-4 py-3">Barındırma ve veritabanı</td>
                </tr>
                <tr className="border-b border-outline-variant">
                  <td className="px-4 py-3">Google Firebase (FCM)</td>
                  <td className="px-4 py-3">Cihaz bildirim jetonu, bildirim metni</td>
                  <td className="px-4 py-3">Android bildirim iletimi</td>
                </tr>
                <tr className="border-b border-outline-variant">
                  <td className="px-4 py-3">Apple (APNs)</td>
                  <td className="px-4 py-3">Cihaz bildirim jetonu, bildirim metni</td>
                  <td className="px-4 py-3">iOS bildirim iletimi</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Expo</td>
                  <td className="px-4 py-3">Cihaz bildirim jetonu, bildirim metni</td>
                  <td className="px-4 py-3">Bildirimlerin iletilmesi</td>
                </tr>
              </tbody>
            </table>
          </div>
          <P>
            Uygulama verisi Avrupa Birliği içindeki (Almanya, Frankfurt)
            sunucularda barındırılır. Bildirim iletimi sırasında cihaz jetonu ve
            bildirim metni, ilgili sağlayıcıların altyapısı üzerinden geçtiği
            için yurt dışına aktarılabilir. Bildirim metinlerinde müşteri telefon
            numarası yer almaz.
          </P>

          {/* 6 */}
          <H2 id="saklama">6. Saklama süresi</H2>
          <UL
            items={[
              <>
                <strong className="font-semibold text-ink">Hesap bilgileri:</strong>{" "}
                hesabınız aktif olduğu sürece saklanır. Hesap kapatıldığında
                bölüm 8&apos;deki süreç işletilir.
              </>,
              <>
                <strong className="font-semibold text-ink">
                  Cihaz bildirim jetonu:
                </strong>{" "}
                çıkış yaptığınızda veya cihaz bildirimleri kabul etmemeye
                başladığında silinir.
              </>,
              <>
                <strong className="font-semibold text-ink">
                  Talep, randevu ve işlem kayıtları:
                </strong>{" "}
                ilgili ticari ilişkinin sona ermesinden itibaren yasal saklama
                süresi olan {site.retention.logYears} yıl boyunca saklanır.
              </>,
            ]}
          />

          {/* 7 */}
          <H2 id="guvenlik">7. Veri güvenliği</H2>
          <UL
            items={[
              "Cihaz ile sunucu arasındaki tüm iletişim TLS ile şifrelenir.",
              "Şifreler geri döndürülemez şekilde şifrelenerek saklanır; hiç kimse tarafından görüntülenemez.",
              "Her kullanıcı yalnızca üyesi olduğu servis noktasının kayıtlarını görebilir. Bu sınır ekranda değil sunucuda uygulanır.",
              "Müşteri telefon numarasına erişim kayıt altına alınır ve denetlenebilir.",
              "Başka bir servis noktasına devredilen talebin telefon numarası, önceki kullanıcıya kalıcı olarak kapatılır.",
              "Uygulamada kayıt (self-servis üyelik) yoktur; hesaplar yalnızca yetkili yönetici tarafından açılır.",
            ]}
          />

          {/* 8 — Play Store zorunlu başlığı */}
          <H2 id="hesap-silme">8. Hesabınızı ve verilerinizi silme</H2>
          <P>
            {site.name} işletme kullanımına yönelik olduğu ve hesaplar merkezî
            olarak tanımlandığı için uygulama içinde kendi hesabınızı silen bir
            düğme bulunmaz. Hesabınızın ve hesabınıza bağlı kişisel verilerinizin
            silinmesi için{" "}
            <Link
              href="/hesap-silme"
              className="font-semibold text-primary underline underline-offset-4"
            >
              hesap silme adımlarını
            </Link>{" "}
            izlemeniz gerekir. Talep oluşturmak için uygulamayı kullanmanız
            gerekmez.
          </P>

          {/* 9 */}
          <H2 id="haklar">9. KVKK kapsamındaki haklarınız</H2>
          <P>KVKK m.11 uyarınca veri sorumlusuna başvurarak:</P>
          <UL
            items={[
              "Kişisel verinizin işlenip işlenmediğini öğrenme ve işlenmişse buna ilişkin bilgi talep etme",
              "İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme",
              "Yurt içinde veya yurt dışında verilerin aktarıldığı üçüncü kişileri bilme",
              "Eksik veya yanlış işlenmiş verinin düzeltilmesini isteme",
              "Verilerinizin silinmesini veya yok edilmesini isteme",
              "Düzeltme, silme ve yok etme işlemlerinin verinin aktarıldığı üçüncü kişilere bildirilmesini isteme",
              "İşlenen verilerin münhasıran otomatik sistemler ile analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme",
              "Kanuna aykırı işleme sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme",
            ]}
          />
          <P>
            Başvurularınızı{" "}
            <a
              className="text-primary underline underline-offset-4"
              href={`mailto:${site.contact.privacy}`}
            >
              {site.contact.privacy}
            </a>{" "}
            adresine iletebilirsiniz. Talepler en geç 30 gün içinde
            sonuçlandırılır.
          </P>

          {/* 10 */}
          <H2 id="cocuklar">10. Çocukların verileri</H2>
          <P>
            {site.name} bir işletme uygulamasıdır ve 18 yaşın altındaki kişilere
            yönelik değildir. Bilerek çocuklara ait kişisel veri toplamayız.
          </P>
          <P>
            Bir çocuğa ait kişisel verinin bilgimiz dışında tarafımıza
            iletildiğini düşünüyorsanız, ebeveyn veya yasal temsilci sıfatıyla{" "}
            <a
              className="text-primary underline underline-offset-4"
              href={`mailto:${site.contact.privacy}?subject=Cocuga%20ait%20veri%20silme%20talebi`}
            >
              {site.contact.privacy}
            </a>{" "}
            adresine başvurarak silme talebi oluşturabilirsiniz. Bu yöndeki
            başvurular öncelikli olarak incelenir; doğrulanması hâlinde ilgili
            veriler gecikmeksizin silinir ve işlemin sonucu başvuru sahibine
            bildirilir.
          </P>

          {/* 11 */}
          <H2 id="degisiklikler">11. Politikadaki değişiklikler</H2>
          <P>
            Bu politika güncellenebilir. Güncel sürüm her zaman bu sayfada
            yayımlanır ve sayfanın başındaki yürürlük tarihi değiştirilir. Önemli
            değişikliklerde uygulama üzerinden ayrıca bilgilendirme yapılır.
          </P>

          {/* 12 */}
          <H2 id="iletisim">12. İletişim</H2>
          <P>
            Bu politikayla veya kişisel verilerinizle ilgili her türlü soru ve
            talebiniz için:
          </P>
          <UL
            items={[
              <>
                Gizlilik ve KVKK:{" "}
                <a
                  className="text-primary underline underline-offset-4"
                  href={`mailto:${site.contact.privacy}`}
                >
                  {site.contact.privacy}
                </a>
              </>,
              <>
                Uygulama desteği:{" "}
                <a
                  className="text-primary underline underline-offset-4"
                  href={`mailto:${site.contact.support}`}
                >
                  {site.contact.support}
                </a>
              </>,
            ]}
          />

          <div className="mt-16 border-t border-outline-variant pt-8">
            <Link
              href="/"
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
              Ana sayfaya dön
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
