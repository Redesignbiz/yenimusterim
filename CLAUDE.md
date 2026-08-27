@AGENTS.md

# CLAUDE.md

Bu dosya, yenimusterim.com sitesinin geliştirilmesi sırasında Claude Code için proje kılavuzudur. Kod yazmadan önce bu dosyayı esas al.

# Yeni Müşterim — proje kuralları

## Ürün ne

Yeni Müşterim, ürününü kendi satış kanalından değil bir servis noktası ağı
üzerinden satan markalar için kurulmuş bir talep yönetimi platformu. Üç parçadan
oluşuyor ve landing bu üçünü tek ekosistem olarak anlatır:

1. **Chatbot** — markanın web sitesinde çalışır. Ziyaretçinin ürün ve servis ihtiyaçlarını konuşma içinde netleştirir; servis noktasının kendisine ulaşabilmesi için iletişim
   izni alır.
2. **Servis noktası mobil uygulaması** — talep il/ilçe, ölçü ve marka detayları ile
   birlikte doğru servis noktasına atanır ve servis noktasına bildirim gider,
   servis noktası müşteri ile görüştükten sonra görüşme sonucu işaretlenir.
3. **Marka dashboard'u** — talep hacmi, servis noktası bazında yanıt süresi ve
   dönüşüm, bölge ve kanal kırılımları gibi metriklerin marka tarafından raporlanması sağlanır.

Sepetten satın alınamayan ürünlerde (takılan, monte edilen, servis
gerektiren) satış servis noktasında gerçekleştiği için Yeni Müşterim müşterinin ihtiyacından başlayıp servis noktasında sonlanan bu yolculuğu yönetmek ve ölçmek üzerine kurulu.

## Terminoloji — zorunlu

Markanın çalıştığı paydaş **her zaman "servis noktası"** diye anılır.

Önyüzde geçmez: bayi · nokta · satış noktası · dealer.

Ürünün İngilizce adı **LeadHanger**. İngilizce kaynaklarda geçen LeadHanger,
Yeni Müşterim'dir; oradaki "dealer" da servis noktasıdır.

Prompt'ta "bayi" veya "satış noktası" yazıldığında kastedilen "servis noktası"dır; metne
"servis noktası" olarak geçer. Ağın tamamından söz edilirken "servis noktası
ağı" kullanılır.

## Sayfa rolleri

| Route | Kime hitap eder | Ne anlatır |
|---|---|---|
| `/` | Markaya | Chatbot + mobil uygulama + dashboard'un oluşturduğu ekosistem |
| `/app` | Servis noktasına | Mobil uygulamanın faydası ve özellikleri |
| `/iletisim` · `/sss` | Her ikisine | İletişim ve sık sorulanlar |
| `/gizlilik` · `/hesap-silme` | Mağaza ve KVKK zorunluluğu | Hukuki metin, ayrı kurallara tabi |

Bir bölüm yazılırken hangi sayfada durduğuna bakılır: `/` markanın merkez
ekibiyle konuşur, `/app` telefonla iş yapan servis noktası personeliyle.

## Metin yazarken

Önyüzde herhangi bir metin yazılacaksa **`urun-metinleri` skill'i okunur.** Buton, hata mesajı, bölüm başlığı ve meta description dahil tüm metinler bu skill ile yazılır.

Hukuki metinlerde (`/gizlilik`, `/hesap-silme`) skill'in `references/hukuki.md`
dosyası da okunur. Bu metinler ürünün bugün fiilen ne yaptığını anlatır;
planlananı anlatmaz.

Başlık ve etiketlerde `uppercase` kullanılmaz — Türkçede `i` → `I` dönüşümü
noktasız `ı` ile karışıyor. Ayrışma harf aralığı ve ağırlıkla sağlanıyor
(bkz. `globals.css`, `.eyebrow`).

## Rakamlar ve iddialar

Sayfada geçen bütün sabit değerler `src/lib/site.ts` içinde. Metne elle rakam
yazılmaz, oradan okunur.

Yayımlanabilir metrik yalnızca `site.metrics` içindeki dört tanedir; bunlar
Redesign Business'ın Bridgestone vaka çalışmasında zaten yayımlanmış rakamlar.
Buraya iç kaynaklı başka rakam eklenmez.

## Hedef kitle

Yeni Müşterim'in asıl hedef kitlesi, markanın içindeki **pazarlama, dijital veya satış yöneticisi**dir.

Teknolojiye yatkın, ölçümle çalışıyor:
GA4, Hotjar, HubSpot gibi araçları kullanıyor, SEO ve sosyal medya reklamına
bütçe ayırıyor. Bu yüzden ölçülebilirlik dili (yanıt süresi, dönüşüm, bölge
kırılımı) bu kitlede karşılık buluyor; soyut fayda anlatısı bulmuyor.

Markanın iş partneri olan ikinci kitle servis noktası sahibi ve personeli.

## Değer önerisi

Kaynak: ürünün İngilizce sürümü LeadHanger'ın landing metinleri.

**Çerçeve.** Ziyaretçiyi siteye getirmek maliyetlidir. Kayıp bundan sonra
başlar: ziyaretçi siteye girer, ancak seçtiği ürünle ilgili nasıl hizmet alacağına dair bilgi yoktur. Karar vermeye hazır gelen ziyaretçi ya eski bir iletişim
formuna yönlendirilir ya da kendi başına servis noktası aramaya bırakılır. Yeni Müşterim satın alma niyeti olan müşterileri servis noktası ile eşleştirir.

Üç aşama var ve sırası önemli. Sayfa faydayı iddia etmez; bu üç aşamada ne
olduğunu gösterir.

1. **Konuşma, niteleme ve izin.** Ziyaretçi bir formla karşılaşmaz. İhtiyacı ve
   satın alma niyeti, önceden kurulmuş dinamik konuşma akışlarında netleşir.
   Veri servis noktasıyla paylaşılmadan önce KVKK uyumlu izin alınır.
2. **Eşleştirme ve aktarım.** Talep, konum, uzmanlık ve müsaitliğe göre doğru
   servis noktasına eşleştirilir ve elle dağıtım beklemeden aktarılır. Servis noktasının müşteriye yanıt süresi kısalır, dönüşüm artar.
3. **Takip ve ölçüm.** Her talebin hangi servis noktasına gittiği ve son durumu görünür.
   Huninin işleyişi ve servis noktalarının performansı ölçülür.


