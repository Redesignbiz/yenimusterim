# Yeni Müşterim — Landing Page Brief

Kaynak: `Redesignbiz/brisa-frontend` deposu incelenerek çıkarıldı (18 Ağustos 2026).
Doğrulanmamış / kullanıcıdan teyit bekleyen noktalar **[AÇIK]** ile işaretli.

---

## 1. Ürün ne yapıyor

Brisa'nın servis noktaları (Lassa · Bridgestone · Dayton bayileri) için üç parçalı bir sistem var:
**mobil uygulama** (servis noktası), **admin dashboard** (Brisa merkez) ve **backend API**.
Landing page bunlardan **mobil uygulamayı** tanıtacak.

Servis noktasının uygulamada gördüğü iş, iki farklı kayıt tipinden oluşuyor:

| | **Talep** (lead) | **Servis randevusu** |
|---|---|---|
| Nereden gelir | Brisa chatbot'u · Brisa Çağrı Merkezi | otopratik.com.tr randevu akışı |
| Nedir | Aranıp satışa dönüştürülecek müşteri | Onaylı, ödemesi konuşulmuş bakım randevusu |
| Servis noktası ne yapar | Belirlenen saatte arar, sonucu işaretler | Müşteri gelir, iş biter, sonucu işaretler |

### Uygulamanın somut yetenekleri

- **Talep otomatik olarak doğru noktaya düşer** — il/ilçe + marka kurallarıyla atanır, kimse elle dağıtmaz.
- **Aranma saati müşterinin seçtiği saattir** — o saat gelince telefona push bildirim gider ("Şimdi aranmalı").
- **Tek dokunuşla arama / WhatsApp** — numara uygulamada maskeli, açıldığında erişim kayda geçer (KVKK izi).
- **Görüşme sonucu tek ekrandan işaretlenir:** Randevu verildi · Fiyat verildi · Ulaşılamadı · Yanlış numara · Stok yok · Uzak lokasyon · Vazgeçmiş.
- **Ulaşılamadıysa görev kapanmaz** — ertesi gün aynı saate otomatik ötelenir; toplam 2 deneme.
- **Geciken talep kaybolmaz** — arama penceresi kapandıktan 120 dk sonra sistem talebi sıradaki servis noktasına devreder.
- **Randevular tek listede** — lastik randevusu da otopratik bakım randevusu da saate göre aynı sekmede ("bugün dükkâna kim geliyor").
- **Çoklu lokasyon** — bir hesap birden fazla servis noktasına bağlanabilir, uygulama içinde geçiş yapılır.
- **Ekip yönetimi** — OWNER kendi personelini (STAFF) açar, hangi lokasyonları göreceğini belirler.
- **Performans görünürlüğü** — tamamlanma oranı, zamanında arama, dönüşüm.

### Landing'in anlatacağı tek cümle (öneri)

> Chatbot'tan, çağrı merkezinden ve otopratik'ten gelen her talep, doğru servis noktasına,
> müşterinin istediği saatte düşer — ve takip edilir.

---

## 2. Hedef kitle

Brisa servis noktası sahipleri ve personeli. Teknik olmayan, sahada çalışan, telefonla iş yapan kullanıcı.
**Halka açık bir tüketici ürünü değil** — uygulamada kayıt (signup) yok, hesaplar Brisa tarafından açılıyor.
Landing bu yüzden "indir ve kaydol" değil, **"bu nedir, ne işine yarar, yakında mağazada"** anlatır.

---

## 3. Sayfanın hedefi

Tek sayfalık bilgilendirme + yayın öncesi farkındalık. **Hiçbir mağaza linki verilmeyecek**
(uygulama henüz yayında değil). İkincil hedef: mağazaların zorunlu tuttuğu **gizlilik politikası URL'ini**
yayında tutmak.

---

## 4. Sayfa yapısı

| # | Bölüm | İçerik |
|---|---|---|
| 1 | Header | Logo + tek metin bağlantısı ("Yakında") · sticky, sade |
| 2 | Hero | Ana başlık + alt metin + telefon mockup'ı · CTA yok, "Çok yakında mağazalarda" rozeti |
| 3 | Sorun → Çözüm | Talep dağıtımının bugünkü hâli vs. uygulama |
| 4 | Özellikler | 6 kart: otomatik atama · saatinde bildirim · tek dokunuş arama · sonuç işaretleme · otomatik yeniden deneme · devir güvencesi |
| 5 | Nasıl çalışır | 4 adım: talep gelir → noktaya atanır → saatinde bildirim → sonuç işaretlenir |
| 6 | Randevular | Lastik + otopratik randevularının tek listede toplanması |
| 7 | Çoklu lokasyon & ekip | Birden fazla nokta, OWNER/STAFF |
| 8 | **Yakında yayında** | Play Store + App Store rozetleri **pasif/linksiz**, "çok yakında" notu |
| 9 | SSS | 5–6 soru (nasıl hesap alınır, ücretli mi, hangi telefonlarda çalışır, veri güvenliği) |
| 10 | Footer | Telif · **Gizlilik Politikası** linki · iletişim |

---

## 5. Tasarım dili

**Clear Professional** — uygulamanın gerçekte kullandığı sistem
(`stitch_clear_design_system/clear_professional/DESIGN.md` + `dealer-mobile/constants/theme.ts`).

> ⚠ `CLAUDE.md`'nin "Varsayımlar" bölümü tasarım dilini *Monolith Light* diye listeliyor, ama
> gönderilen uygulamanın `theme.ts`'i Clear Professional tokenlarını yüklüyor ve `app.json`'daki
> bildirim rengi de `#0056c9`. O bölüm zaten "yanlışsa güncelle" notuyla işaretli — landing,
> dokümanı değil kullanıcının telefonunda gördüğü şeyi takip ediyor.

- **Font:** Nunito Sans (`latin-ext` alt kümesiyle — ğ ş ı İ Ç Ö Ü). *DESIGN.md Inter diyor,
  uygulama Nunito Sans yüklüyor; uygulama esas alındı.*
- **Palet:** arka plan `#faf8ff`, kart `#ffffff`, metin `#191b23`, ikincil metin `#424654`,
  kenarlık `#c2c6d7`, primary `#0056c9`, primary-fixed `#d9e2ff`, koyu yüzey `#2e3039`
- **Gölge yok** — derinlik yalnızca 1px kenarlık ve tonal katmanlarla kuruluyor (sistemin
  taşıyıcı kuralı; `theme.ts` bilinçli olarak `elevation` dışa aktarmıyor)
- **Radius:** 4 / 8 / 12 / 16 / 24 px
- **Spacing:** 4px tabanlı katı ölçek (4 / 8 / 16 / 24 / 32)
- **Türkçe kuralı:** arayüzde `uppercase` kullanılmaz — `i` → `I` dönüşümü noktasız `ı` ile
  karışıyor. Etiketlerde ayrışma harf aralığı ve ağırlıkla sağlanıyor.

---

## 6. Gizlilik Politikası sayfası (`/gizlilik`)

Ayrı route, footer'dan linklenir. Google Play **Data safety** ve Apple **App Privacy** ile uyumlu olacak şekilde
şu başlıkları içerecek:

1. Veri sorumlusu ve iletişim **[AÇIK — tüzel kişi kim?]**
2. İşlenen veriler:
   - **Servis noktası kullanıcısı:** ad, kullanıcı adı, rol, bağlı lokasyonlar, cihaz bildirim token'ı (`dealer_push_tokens`)
   - **Son müşteri:** ad, telefon numarası, talep içeriği (lastik tipi/ölçü/adet), randevu bilgileri, araç ve hizmet bilgileri
   - **Kullanım izleri:** telefon numarası görüntüleme kaydı (`phone_view_logs`), işlem geçmişi
3. İşleme amacı ve hukuki sebep (KVKK m.5 — sözleşmenin ifası / meşru menfaat)
4. **Toplanmayanlar:** konum, kamera, rehber, reklam kimliği, analytics/üçüncü taraf reklam SDK'sı yok
5. Paylaşım: Google (FCM — yalnız bildirim iletimi) · barındırma Google Cloud (europe-west3, Frankfurt) · reklam amaçlı paylaşım yok
6. Saklama süresi **[AÇIK]**
7. Güvenlik: aktarımda TLS, JWT ile kimlik doğrulama, rol ve lokasyon bazlı erişim sınırı, telefon erişiminin loglanması
8. **Hesap silme** — Play'in zorunlu tuttuğu başlık, ayrı ve bulunur olacak (aşağıya bkz.)
9. KVKK m.11 hakları ve başvuru yolu
10. Çocukların verisi (uygulama 18 yaş altına yönelik değil)
11. Değişiklikler ve yürürlük tarihi

### Hesap silme — sistemin bugünkü gerçeği

Kodda **kullanıcının kendi hesabını silebileceği bir ekran yok**; uygulamada yalnızca "Çıkış yap" var.
Hesaplar Brisa yöneticisi tarafından açılıyor, silinmiyor — `active=false` yapılıyor.
Google Play, hesap silmenin **uygulama dışından da (web üzerinden) talep edilebilmesini** zorunlu tutuyor.

Bu yüzden politika sayfasında **talep yoluyla silme** anlatılacak: hangi adrese, hangi bilgilerle
başvurulacağı, hangi verinin silineceği, hangisinin (yasal saklama gereği) kalacağı ve süresi.
Gerekli adres ve süreler **[AÇIK]**.

---

## 7. Teknik

- Next.js 16.3 · React 19 · Tailwind v4 · TypeScript · App Router · `src/` · `@/*` alias
- Tek dil: **Türkçe** (`<html lang="tr">`)
- Route'lar: `/` (landing) · `/gizlilik` (politika)
- SEO: title, description, OG görseli, `robots`, sitemap
- Deploy hedefi: Vercel **[AÇIK — doğrula]**

---

## 8. Açık sorular

1. **Uygulamanın adı.** Kodda `app.json` → `name: "Brisa Bayi"`, bundle `com.brisa.dealer`.
   Landing "Yeni Müşterim" diyecek. Bu bir yeniden adlandırma mı, yoksa iki ayrı isim mi?
2. **Veri sorumlusu.** Politikada geçecek tüzel kişi ünvanı, adres, KVKK başvuru e-postası/KEP.
3. **Hesap silme adresi ve süresi.** Talepler hangi e-postaya gidecek, kaç günde sonuçlanacak,
   silinmeyecek veriler ne kadar saklanacak?
4. **Alan adı.** Politika URL'i mağaza formuna girilecek — domain ne olacak?
5. **Marka kullanımı.** Brisa / Lassa / Bridgestone / Dayton logoları sayfada kullanılacak mı,
   yoksa "Yeni Müşterim" tek başına mı duracak? Logo dosyası var mı?
6. **Görsel.** Hero'da gerçek uygulama ekran görüntüsü kullanılabilir mi? (Mağaza dokümanına göre
   ekran görüntüleri henüz üretilmemiş.) Yoksa soyut mockup mu çizilecek?
7. **İletişim / destek.** Footer'da ve mağaza formunda görünecek destek e-postası.

> ⚠ **Hukuki not:** Proje dokümanı (`docs/magaza/README.md`) gizlilik politikasını
> **"Brisa hukuk yazacak"** kalemi olarak listeliyor. Burada üretilecek metin, sistemin gerçek
> veri akışına dayanan **taslaktır** ve yayına alınmadan önce hukuk onayından geçmelidir.
