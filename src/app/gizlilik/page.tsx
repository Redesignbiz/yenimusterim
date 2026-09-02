import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsentButton } from "@/components/CookieConsent";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: `${site.name} mobil uygulamasının ve web sitesinin kişisel verileri nasıl işlediğini, sakladığını, hangi çerezleri kullandığını ve hesap silme talebinin nasıl yapılacağını açıklar.`,
  alternates: { canonical: "/gizlilik" },
};

/*
 * Google Analytics'in oturum çerezinin adı ölçüm kimliğinden türüyor: `G-`
 * öneki atılıp `_ga_` ile birleşiyor (bkz. lib/consent.ts, aynı türetme çerez
 * silinirken de yapılıyor). Ziyaretçi tarayıcısının çerez listesinde adın tam
 * hâlini göreceği için politikada da türetilmiş ad yazıyor. Ölçüm kimliği
 * tanımsızsa gtag.js hiç yüklenmiyor; o hâlde jenerik biçim gösteriliyor.
 */
const GA_SESSION_COOKIE = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  ? `_ga_${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID.replace(/^G-/, "")}`
  : "_ga_ ile başlayan çerez";

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
            hesabınızın nasıl silineceğini açıklar. Web sitesi üzerinden
            iletilen kayıt başvuruları bölüm 12&apos;de, web sitesinde
            kullanılan çerezler ve ziyaret analizi bölüm 13&apos;te ele
            alınmıştır.
          </P>

          <P>
            {site.name}, servis noktalarının kendilerine iletilen müşteri
            taleplerini ve randevularını takip etmesi için geliştirilmiş bir
            işletme uygulamasıdır. Halka açık bir tüketici uygulaması değildir:{" "}
            <strong className="font-semibold text-ink">
              uygulama içinde kendi kendine hesap oluşturma adımı yoktur.
            </strong>{" "}
            Kayıt olmak isteyen kullanıcı web sitesindeki kayıt formuna
            yönlendirilir; başvurunun incelenmesi sonucunda hesap yetkili
            yönetici tarafından tanımlanır. Bu formda işlenen veriler bölüm
            12&apos;de açıklanmıştır.
          </P>

          {/* İçindekiler — 14 bölümlük bir metinde hesap silme başlığının
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
                {
                  id: "basvuru",
                  label: "12. Web sitesi üzerinden iletilen kayıt başvuruları",
                },
                {
                  id: "cerezler",
                  label:
                    "13. Web sitesinde kullanılan çerezler ve ziyaret analizi",
                },
                { id: "iletisim", label: "14. İletişim" },
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
                ad soyad, kullanıcı adı, şifre (tek yönlü kriptografik
                özetleme/hash yöntemiyle korunarak saklanır ve açık metin olarak
                tutulmaz), hesap rolü ve bağlı olduğunuz servis noktaları.
              </>,
              <>
                <strong className="font-semibold text-ink">
                  Cihaz bildirim kimliği:
                </strong>{" "}
                bildirim gönderebilmek için cihazınıza veya uygulama kurulumuna
                ait bildirim jetonu (push token) ve son görülme zamanı. Uygulama
                bu jetonu cihazdan alır ve kendi sunucumuza kaydeder.
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
            Bu veriler, servis noktası çalışanına işini yapabilmesi için uygulama
            üzerinden gösterilir; uygulama kullanıcısından toplanmaz. Veriler,
            müşteri talebinin oluşturulması sırasında sistemimize iletilir.
          </P>
          <UL
            items={[
              <>
                <strong className="font-semibold text-ink">İletişim:</strong> ad
                soyad ve telefon numarası.
              </>,
              <>
                <strong className="font-semibold text-ink">Talep içeriği:</strong>{" "}
                lastik tipi, ölçüsü ve adedi, aranma saati,
                görüşme sonucu ve varsa notlar.
              </>,
              <>
                <strong className="font-semibold text-ink">Randevu içeriği:</strong>{" "}
                randevu saati, araç bilgisi, yapılacak işlemler ve tutar.
              </>,
            ]}
          />
          <P>
            Bu veriler, müşteri talebinin oluşturulması sırasında müşteriye
            gerekli bilgilendirme yapılarak ve{" "}
            <strong className="font-semibold text-ink">
              açık rızası alınarak
            </strong>{" "}
            toplanır. Verilerinin bir servis noktasıyla paylaşılmasına onay
            vermeyen müşteri için talep oluşturulmaz; dolayısıyla rıza verilmemiş
            bir müşterinin verisi uygulamaya aktarılmaz.
          </P>

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

          {/*
            Bu bölüm ve 3–11 arası MOBİL UYGULAMAYI anlatır; analitik yok.
            Web sitesindeki ziyaret analizi bölüm 13'te, ayrı başlık altında.

            Ayrı tutulmalarının nedeni: analitik araçlar yalnızca bu web
            sitesinde çalışıyor (src/instrumentation-client.ts), uygulamanın kod
            tabanında karşılığı yok. Buraya bir analitik alt başlığı eklemek,
            uygulamada olmayan bir işlemeyi beyan etmek olurdu.
          */}

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
              "Üçüncü taraf reklam yazılımları — uygulamada hiçbiri kullanılmamaktadır",
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
          <P>
            Son müşteriye ait veriler bakımından hukuki sebep, müşterinin talebini
            oluşturduğu aşamada alınan <em>açık rızasıdır</em> (KVKK m.5/1). Bu
            rıza, verilerin talebin yönlendirildiği servis noktasıyla
            paylaşılmasını da kapsar.
          </P>

          {/* 5 */}
          <H2 id="paylasim">5. Paylaşım ve yurt dışına aktarım</H2>
          <P>
            Veriler yalnızca hizmetin çalışması için zorunlu olan altyapı
            sağlayıcılarıyla paylaşılır. Reklam, pazarlama veya satış amacıyla
            hiçbir üçüncü tarafla paylaşılmaz.
          </P>

          {/*
            Alıcı listesi bilinçli olarak katlanmış bir blokta.

            İçerik SAYFADAN KALDIRILMADI, yalnızca gizlendi: `details` içeriği DOM'da
            durur, arama motorları ve sayfa içi arama bulur, JavaScript gerekmez.
            Böylece KVKK m.10/m.11 beyanı ve Play Data safety tutarlılığı korunur,
            ama teknik alıcı adları politikanın okuma akışını kesmez.
          */}
          <details className="group mt-5 overflow-hidden rounded-lg border border-outline-variant bg-surface-lowest">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-[15px] font-semibold text-ink transition-colors hover:bg-surface-low">
              Verilerin paylaşıldığı altyapı sağlayıcıları
              <svg
                viewBox="0 0 24 24"
                className="size-4 shrink-0 text-outline transition-transform group-open:rotate-45"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                aria-hidden
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </summary>

            <div className="overflow-x-auto border-t border-outline-variant">
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
              {/* Üç bildirim sağlayıcısı tek satırda: aynı veriyi aynı amaçla
                  alıyorlar. Alıcı adları KALMALI — Play Data safety formu onları
                  ayrı ayrı beyan ettiriyor ve iki beyan tutarlı olmak zorunda. */}
              <tbody className="text-ink-muted">
                <tr className="border-b border-outline-variant">
                  <td className="px-4 py-3">Google Cloud (Almanya)</td>
                  <td className="px-4 py-3">Tüm uygulama verisi</td>
                  <td className="px-4 py-3">Barındırma ve veritabanı</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">
                    Bildirim sağlayıcıları — Expo Push, Google (FCM, Android),
                    Apple (APNs, iOS)
                  </td>
                  <td className="px-4 py-3">
                    Cihaz bildirim jetonu ve bildirim metni (müşteri adı,
                    il/ilçe, lastik ölçüsü, adet, aranma saati)
                  </td>
                  <td className="px-4 py-3">Bildirimin cihaza iletilmesi</td>
                </tr>
              </tbody>
            </table>
            </div>
          </details>

          <P>
            Uygulama verisi Avrupa Birliği içindeki (Almanya, Frankfurt)
            sunucularda barındırılır.
          </P>
          <P>
            Bildirimler sunucumuzdan Expo Push ve Android tarafında Firebase
            Cloud Messaging (Google), iOS tarafında Apple Push Notification
            service üzerinden cihaza iletilir. Bildirim metni yeni talebin özetini
            içerir:{" "}
            <strong className="font-semibold text-ink">
              müşteri adı, il/ilçe, lastik ölçüsü, adet ve aranma saati.
            </strong>{" "}
            Müşterinin telefon numarası bildirim metninde{" "}
            <strong className="font-semibold text-ink">yer almaz.</strong> Bu
            veriler yalnızca bildirimin ilgili servis noktasına ulaştırılması
            amacıyla, Expo, Google ve Apple tarafından{" "}
            <em>aktarım aracısı</em> olarak işlenir ve bu aktarım sırasında yurt
            dışına çıkar.
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
                  Talep ve randevu kayıtları:
                </strong>{" "}
                ilgili mevzuattan doğan saklama yükümlülükleri ve hukuki
                taleplerin kurulması, kullanılması veya savunulması için gerekli
                süre boyunca; uygulanabilir olduğu durumlarda ilgili ticari
                ilişkinin sona ermesinden itibaren {site.retention.logYears} yıla
                kadar saklanabilir.
              </>,
              <>
                <strong className="font-semibold text-ink">
                  Güvenlik ve erişim kayıtları:
                </strong>{" "}
                bilgi güvenliği, denetim ve hukuki yükümlülükler için gerekli
                olan süre boyunca saklanır ve sürenin sonunda silinir veya anonim
                hâle getirilir.
              </>,
            ]}
          />

          {/* 7 */}
          <H2 id="guvenlik">7. Veri güvenliği</H2>
          <UL
            items={[
              "Cihaz ile sunucu arasındaki tüm iletişim TLS ile şifrelenir.",
              "Şifreler güvenli tek yönlü hash yöntemleri kullanılarak korunur ve açık metin olarak saklanmaz.",
              "Her kullanıcı yalnızca üyesi olduğu servis noktasının kayıtlarını görebilir. Bu sınır ekranda değil sunucuda uygulanır.",
              "Müşteri telefon numarasına erişim kayıt altına alınır ve denetlenebilir.",
              "Başka bir servis noktasına devredilen talebin telefon numarası, önceki kullanıcıya kalıcı olarak kapatılır.",
              "Uygulama içinde kendi kendine hesap oluşturma yoktur; kayıt olmak isteyen kullanıcı başvuru formuna yönlendirilir ve hesap, başvurunun incelenmesi sonucunda yalnızca yetkili yönetici tarafından açılır.",
            ]}
          />

          {/* 8 — Play Store zorunlu başlığı */}
          <H2 id="hesap-silme">8. Hesabınızı ve verilerinizi silme</H2>
          <P>
            {site.name} işletme kullanımına yönelik olduğu ve hesaplar merkezî
            olarak tanımlandığı için uygulama içinde kendi hesabınızı silen bir
            düğme bulunmaz. Hesabınızın silinmesi ve hesabınızla ilişkili,
            saklanması hukuken zorunlu olmayan kişisel verilerin silinmesi için{" "}
            <Link
              href="/hesap-silme"
              className="font-semibold text-primary underline underline-offset-4"
            >
              hesap silme adımlarını
            </Link>{" "}
            izleyebilirsiniz.
          </P>
          <P>
            Yasal yükümlülükler nedeniyle saklanması gereken kayıtlar, ilgili
            saklama süresi boyunca tutulabilir ve bu sürenin sonunda silinir veya
            anonim hâle getirilir.
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

          {/*
            12 — /app/kayit formu eklendiğinde yazıldı.

            Bu bölüm formun ALANLARIYLA BİRLİKTE değişir: forma yeni bir alan
            eklendiğinde veya başvurunun yazıldığı yer değiştiğinde (bugün
            Google Workspace hesap tablosu — bkz. docs/kayit-formu.md) aşağıdaki
            veri kategorileri, alıcı ve amaç listesi de güncellenir. Politika
            ürünün bugün fiilen yaptığı işlemeyi anlatır.
          */}
          <H2 id="basvuru">
            12. Web sitesi üzerinden iletilen kayıt başvuruları
          </H2>
          <P>
            {site.url.replace("https://", "")}/app/kayit adresindeki kayıt
            başvurusu formu, uygulamaya dahil olmak isteyen servis noktalarının
            başvurusunu almak için kullanılır. Kayıt olmak isteyen kullanıcı,
            uygulama içinden veya web sitesinden bu forma yönlendirilir; form
            doldurulduktan sonra başvuru incelenir ve uygun bulunması hâlinde
            hesap tanımlanır. Form aracılığıyla aşağıdaki kişisel veriler
            işlenir:
          </P>
          <UL
            items={[
              <>
                <strong className="font-semibold text-ink">Kimlik verisi:</strong>{" "}
                başvuruda belirtilen şirket sorumlusunun adı ve soyadı.
              </>,
              <>
                <strong className="font-semibold text-ink">İletişim verisi:</strong>{" "}
                e-posta adresi ve telefon numarası.
              </>,
              <>
                <strong className="font-semibold text-ink">
                  Mesleki deneyim verisi:
                </strong>{" "}
                temsil edilen şirketin adı ile faaliyet gösterilen il ve ilçe.
              </>,
              <>
                <strong className="font-semibold text-ink">
                  İşletme profiline ilişkin beyanlar:
                </strong>{" "}
                işletmenin konumlandığı bölge türü, aynı anda hizmet
                verilebilen araç sayısı, ağırlıklı müşteri profili, sunulan
                hizmetler ve dijital pazarlama faaliyetlerinin durumu.
              </>,
            ]}
          />
          <P>
            Bu veriler; kayıt başvurusunun değerlendirilmesi, başvuru sahibiyle
            iletişim kurulması ve başvurunun uygun bulunması hâlinde uygulama
            hesabının tanımlanması amaçlarıyla, bu amaçlarla sınırlı olarak
            işlenir. İşleme, formun gönderilmesinden önce alınan{" "}
            <em>açık rızaya</em> (KVKK m.5/1) ve başvurunun kabulü hâlinde{" "}
            <em>
              sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması
            </em>{" "}
            (KVKK m.5/2) hukuki sebebine dayanır. Başvuru verileri reklam,
            pazarlama veya satış amacıyla kullanılmaz.
          </P>
          <P>
            Form iki adımdan oluşur. Birinci adımda yer alan kimlik, iletişim ve
            mesleki deneyim verileri, bu adım tamamlanıp{" "}
            <strong className="font-semibold text-ink">
              açık rıza verildiği anda kaydedilir
            </strong>
            ; ikinci adımdaki işletme profili soruları yanıtlanmasa dahi bu
            kayıt, yukarıdaki amaçlarla ve aşağıdaki saklama süresi boyunca
            saklanır.
          </P>
          <P>
            Başvurunun kabul edilmesi hâlinde kayıt, hesap bilgilerine dönüşür ve
            bölüm 6&apos;daki saklama süreleri uygulanır. Kabul edilmeyen veya
            sonuçlandırılmayan başvurulara ait kayıtlar, başvurunun
            sonuçlandırıldığı tarihten itibaren en fazla{" "}
            {site.retention.applicationMonths} ay boyunca saklanır ve sürenin
            sonunda silinir veya anonim hâle getirilir. Başvuru sahibi verdiği
            açık rızayı her zaman geri alabilir; bu hâlde başvuru kaydı silinir
            ve süreç sona erer. Talepler{" "}
            <a
              className="text-primary underline underline-offset-4"
              href={`mailto:${site.contact.privacy}`}
            >
              {site.contact.privacy}
            </a>{" "}
            adresine iletilir.
          </P>

          {/*
            13 — Microsoft Clarity devreye alındığında yazıldı, Google Analytics
            4 eklendiğinde genişletildi (src/instrumentation-client.ts,
            src/lib/consent.ts).

            Bu bölüm ARAÇLARIN YAPILANDIRMASIYLA BİRLİKTE değişir: bir analitik
            aracı eklendiğinde veya çıkarıldığında, Clarity'nin maskeleme kipi
            değiştirildiğinde, GA4 mülkünde saklama süresi ya da reklam
            özellikleri ayarı değiştirildiğinde veya rıza modeli opt-in'e
            çevrildiğinde aşağıdaki veri kategorileri, çerez listesi, hukuki
            sebep, süreler ve tercih değiştirme anlatısı da güncellenir.

            Çerez listesindeki adlar ve amaçlar sağlayıcıların yayımladığı çerez
            listelerinden alındı; ömür sütunu YOK, çünkü Microsoft'un listesi
            süre vermiyor ve doğrulanmamış bir süre yazmak politikayı
            savunulamaz hâle getirir.

            GA4'ün 14 aylık saklama süresi ve reklam özelliklerinin kapalı
            olduğu bilgisi mülk ayarlarından alındı; panelde değişirse buradaki
            ifadeler de değişir.
          */}
          <H2 id="cerezler">
            13. Web sitesinde kullanılan çerezler ve ziyaret analizi
          </H2>
          <P>
            Bu bölüm yalnızca {site.url.replace("https://", "")} adresindeki web
            sitesi bakımından geçerlidir. Mobil uygulamada işlenen veriler bölüm
            2&apos;de, uygulamanın erişmediği veriler bölüm 3&apos;te
            açıklanmıştır.
          </P>
          <P>
            Web sitesinin kullanımının ölçülmesi amacıyla iki hizmetten
            yararlanılır: Microsoft Corporation tarafından sağlanan{" "}
            <strong className="font-semibold text-ink">Microsoft Clarity</strong>{" "}
            ve Google Ireland Limited tarafından sağlanan{" "}
            <strong className="font-semibold text-ink">
              Google Analytics 4
            </strong>
            . Clarity, ziyaret sırasında sayfa üzerinde gerçekleşen etkileşimleri
            kaydeder ve bu kayıtlardan ısı haritası ile oturum tekrarı üretir.
            Google Analytics 4 ise ziyaretin siteye hangi kaynaktan geldiğini,
            hangi sayfaların görüntülendiğini ve sayfa üzerinde hangi adımların
            tamamlandığını ölçer. Her iki hizmet kapsamında aşağıdaki kişisel
            veriler işlenir:
          </P>
          <UL
            items={[
              <>
                <strong className="font-semibold text-ink">
                  İşlem güvenliği verisi:
                </strong>{" "}
                IP adresi ve bu adres üzerinden belirlenen ülke, bölge ve şehir
                bilgisi; ziyaret edilen sayfaların adresleri ile siteye giriş ve
                çıkış sayfası; ziyaretin ve her sayfa görüntülemesinin süresi;
                siteye yönlendiren bağlantının adresi ile bu bağlantıda yer alan
                kampanya parametreleri; tarayıcı, işletim sistemi, cihaz türü,
                tarayıcı dili ve ekran çözünürlüğü bilgileri.
              </>,
              <>
                <strong className="font-semibold text-ink">
                  Etkileşim verisi:
                </strong>{" "}
                tıklama, kaydırma, imleç hareketi, metin seçimi, pencere
                boyutlandırma ve sayfa yenileme gibi etkileşimlerin zamanı ve
                sayfa üzerindeki konumu; sayfa görüntülemesi, sayfanın belirli
                bir oranına kadar kaydırılması, site dışına açılan bağlantıların
                tıklanması ve dosya indirilmesi gibi olayların kaydı; sayfada
                oluşan betik hataları ve sayfa yüklenme performansına ilişkin
                ölçümler.
              </>,
              <>
                <strong className="font-semibold text-ink">
                  Çerez kayıtları:
                </strong>{" "}
                ziyaretçiyi ve oturumu birbirinden ayırt etmek amacıyla
                tarayıcıya yazılan, kimliğinizi doğrudan göstermeyen takma adlı
                kimlikler.
              </>,
            ]}
          />
          <P>
            Google Analytics 4 bakımından IP adresi, hizmet sağlayıcının
            beyanına göre kayıt altına alınmaz; yalnızca ziyaretin geldiği ülke,
            bölge ve şehir bilgisinin belirlenmesi amacıyla işlenir.
          </P>
          <P>
            Form alanlarına ve açılır listelere girilen içerik, Clarity&apos;nin
            maskeleme uygulaması gereği{" "}
            <strong className="font-semibold text-ink">
              kayda alınmaz ve sağlayıcının sunucularına hiç gönderilmez.
            </strong>{" "}
            Google Analytics 4 kapsamında da form alanlarının içeriği toplanmaz;
            yalnızca formla etkileşime girildiği olay olarak kaydedilir. Buna
            göre bölüm 12&apos;de açıklanan kayıt başvurusu formuna girilen ad
            soyad, e-posta adresi ve telefon numarası bu hizmetlerin
            kayıtlarında yer almaz.
          </P>
          <P>
            Bu veriler; web sitesinin performansının ve kullanılabilirliğinin
            ölçülmesi, ziyaretçilerin sayfa içeriğiyle nasıl etkileşime girdiğinin
            anlaşılması ve site yapısının bu ölçüme göre geliştirilmesi
            amaçlarıyla, bu amaçlarla sınırlı olarak işlenir. İşleme, KVKK m.5/2
            uyarınca <em>veri sorumlusunun meşru menfaati</em> hukuki sebebine
            dayanır. Veriler tarafımızca reklam veya pazarlama amacıyla
            kullanılmaz ve üçüncü kişilere satılmaz; her iki hizmet sağlayıcıya
            da reklam amaçlı veri saklamanın reddedildiğini ve yalnızca analitik
            amaçlı saklamaya izin verildiğini bildiren bir rıza sinyali iletilir.
            Google Analytics 4 mülkünde reklam kişiselleştirme ve Google
            sinyalleri özellikleri kapalıdır.
          </P>

          <h3 className="mt-8 text-[17px] font-semibold text-ink">
            a) Kullanılan çerezler
          </h3>

          {/*
            Katlanmış blok gerekçesi bölüm 5'teki tabloyla aynı: içerik DOM'da
            durur, arama motorları ve sayfa içi arama bulur, JavaScript
            gerekmez; ama teknik çerez adları politikanın okuma akışını kesmez.
          */}
          <details className="group mt-4 overflow-hidden rounded-lg border border-outline-variant bg-surface-lowest">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-[15px] font-semibold text-ink transition-colors hover:bg-surface-low">
              Çerez adları ve amaçları
              <svg
                viewBox="0 0 24 24"
                className="size-4 shrink-0 text-outline transition-transform group-open:rotate-45"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                aria-hidden
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </summary>

            <div className="overflow-x-auto border-t border-outline-variant">
              <table className="w-full min-w-[640px] border-collapse bg-surface-lowest text-left text-[14px]">
                <thead>
                  <tr className="border-b border-outline-variant bg-surface-low">
                    <th className="px-4 py-3 font-semibold text-ink">Çerez</th>
                    <th className="px-4 py-3 font-semibold text-ink">Hizmet</th>
                    <th className="px-4 py-3 font-semibold text-ink">
                      Tanımlandığı alan adı
                    </th>
                    <th className="px-4 py-3 font-semibold text-ink">Amaç</th>
                  </tr>
                </thead>
                <tbody className="text-ink-muted">
                  <tr className="border-b border-outline-variant">
                    <td className="px-4 py-3">_clck</td>
                    <td className="px-4 py-3">Microsoft Clarity</td>
                    <td className="px-4 py-3">
                      {site.url.replace("https://", "")} (birinci taraf)
                    </td>
                    <td className="px-4 py-3">
                      Ziyaretçiye ait takma adlı kimliği ve tercihleri saklar
                    </td>
                  </tr>
                  <tr className="border-b border-outline-variant">
                    <td className="px-4 py-3">_clsk</td>
                    <td className="px-4 py-3">Microsoft Clarity</td>
                    <td className="px-4 py-3">
                      {site.url.replace("https://", "")} (birinci taraf)
                    </td>
                    <td className="px-4 py-3">
                      Aynı ziyaretçinin farklı sayfa görüntülemelerini tek bir
                      oturum kaydında birleştirir
                    </td>
                  </tr>
                  <tr className="border-b border-outline-variant">
                    <td className="px-4 py-3">CLID</td>
                    <td className="px-4 py-3">Microsoft Clarity</td>
                    <td className="px-4 py-3">clarity.ms (üçüncü taraf)</td>
                    <td className="px-4 py-3">
                      Ziyaretçinin, bu hizmeti kullanan bir siteye ilk kez ne
                      zaman girdiğini belirler
                    </td>
                  </tr>
                  <tr className="border-b border-outline-variant">
                    <td className="px-4 py-3">MUID</td>
                    <td className="px-4 py-3">Microsoft Clarity</td>
                    <td className="px-4 py-3">clarity.ms (üçüncü taraf)</td>
                    <td className="px-4 py-3">
                      Microsoft sitelerini ziyaret eden tarayıcıları ayırt eder;
                      hizmet sağlayıcının beyanına göre reklam, site analizi ve
                      işletimsel amaçlarla kullanılır
                    </td>
                  </tr>
                  <tr className="border-b border-outline-variant">
                    <td className="px-4 py-3">ANONCHK, MR, SM</td>
                    <td className="px-4 py-3">Microsoft Clarity</td>
                    <td className="px-4 py-3">clarity.ms (üçüncü taraf)</td>
                    <td className="px-4 py-3">
                      MUID çerezinin yenilenmesine ve Microsoft alan adları
                      arasında eşlenmesine ilişkin teknik değerleri taşır
                    </td>
                  </tr>
                  <tr className="border-b border-outline-variant">
                    <td className="px-4 py-3">_ga</td>
                    <td className="px-4 py-3">Google Analytics 4</td>
                    <td className="px-4 py-3">
                      {site.url.replace("https://", "")} (birinci taraf)
                    </td>
                    <td className="px-4 py-3">
                      Ziyaretçiyi ayırt etmek için kullanılan takma adlı istemci
                      kimliğini saklar
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">{GA_SESSION_COOKIE}</td>
                    <td className="px-4 py-3">Google Analytics 4</td>
                    <td className="px-4 py-3">
                      {site.url.replace("https://", "")} (birinci taraf)
                    </td>
                    <td className="px-4 py-3">
                      Oturumun durumunu saklar ve aynı oturumda ölçülen olayları
                      birbirine bağlar
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </details>

          <P>
            Analitik tercihiniz, tarayıcınızın yerel depolama alanında{" "}
            <strong className="font-semibold text-ink">ym-cerez-rizasi</strong>{" "}
            anahtarıyla saklanır. Bu kayıt, tercihin sonraki ziyaretlerde de
            geçerli olması için zorunludur; sunucumuza gönderilmez ve başka bir
            amaçla kullanılmaz.
          </P>

          <h3 className="mt-8 text-[17px] font-semibold text-ink">
            b) Yurt dışına aktarım
          </h3>
          <P>
            Microsoft Clarity, Microsoft Corporation tarafından Türkiye dışında
            bulunan sunucular üzerinden sunulmaktadır. Bu hizmet kapsamında
            sayılan veriler, Microsoft Corporation&apos;a <em>veri işleyen</em>{" "}
            sıfatıyla aktarılır ve aktarım sırasında yurt dışına çıkar.
          </P>
          <P>
            Google Analytics 4 kapsamında işlenen veriler, Google Ireland
            Limited&apos;a <em>veri işleyen</em> sıfatıyla aktarılır; hizmetin
            işletilmesinde Google LLC&apos;nin de yer aldığı altyapı
            kullanıldığından veriler Türkiye dışına çıkar.
          </P>
          <P>
            Her iki aktarım da KVKK m.9&apos;da öngörülen şartlar çerçevesinde
            gerçekleştirilir.
          </P>

          <h3 className="mt-8 text-[17px] font-semibold text-ink">
            c) Saklama süresi
          </h3>
          <P>
            Microsoft Clarity&apos;de oturum kayıtları, hizmet sağlayıcı
            tarafından kayıt tarihinden itibaren 30 gün boyunca saklanır. Bu
            kayıtlar arasından işaretlenen veya örnekleme yoluyla seçilen
            kayıtlar ile ısı haritası verileri en fazla 9 ay boyunca saklanır.
            Sürelerin sonunda ilgili kayıtlara erişim sona erer.
          </P>
          <P>
            Google Analytics 4&apos;te olay ve kullanıcı düzeyindeki kayıtlar,
            mülk ayarında tanımlı süre olan 14 ay boyunca saklanır ve sürenin
            sonunda hizmet sağlayıcı tarafından silinir. Bu kayıtlardan üretilen
            ve tek bir ziyaretçiyle ilişkilendirilemeyen toplu raporlama
            verileri, bu sürenin ardından da erişilebilir kalır.
          </P>

          <h3 className="mt-8 text-[17px] font-semibold text-ink">
            d) Tercihinizi değiştirme
          </h3>
          <P>
            Ziyaret analizi, sitenin sol alt köşesinde açılan çerez
            bildirimindeki <strong className="font-semibold text-ink">Reddet</strong>{" "}
            düğmesiyle kapatılır. Bildirimi her sayfadan yeniden açabilirsiniz:
          </P>
          <div className="mt-5 rounded-lg border border-outline-variant bg-surface-lowest p-5">
            <CookieConsentButton className="rounded-full bg-primary px-4 py-1.5 text-[14px] font-semibold text-white transition-colors hover:bg-primary-bright" />
            <p className="mt-4 text-[14px] leading-6 text-ink-muted">
              Ret verildiğinde sayfa yeniden yüklenir, ölçüm betikleri bir daha
              çalıştırılmaz ve bu alan adında yazılmış _clck, _clsk, _ga ile{" "}
              {GA_SESSION_COOKIE} çerezleri silinir. clarity.ms alan adında
              tanımlanmış çerezler site üzerinden silinemez; bunlar
              tarayıcınızın çerez ayarlarından temizlenebilir. Tarayıcınızın
              çerezleri tümüyle engelleyen ayarı kullanıldığında hizmetler çerez
              yazmaz.
            </p>
          </div>
          <P>
            Bu bölümde açıklanan işleme faaliyetine ilişkin taleplerinizi de,
            bölüm 9&apos;da belirtilen usulle{" "}
            <a
              className="text-primary underline underline-offset-4"
              href={`mailto:${site.contact.privacy}`}
            >
              {site.contact.privacy}
            </a>{" "}
            adresine iletebilirsiniz.
          </P>

          {/* 14 */}
          <H2 id="iletisim">14. İletişim</H2>
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
