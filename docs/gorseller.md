# Görsel dosyaları

Bütün statik görseller **`public/images/`** klasörüne konur. Bu klasördeki bir dosya,
site üzerinde `/images/<dosya-adı>` adresinden servis edilir.

> Dosyayı klasöre bırakmak tek başına yeterli değildir — hangi dosyanın nerede kullanılacağı
> koda yazılır. Aşağıdaki tabloda hangi dosyanın hangi bileşene bağlanacağı belirtilmiştir.

## Beklenen dosyalar

| Dosya adı | Ölçü | Nerede kullanılıyor | Durum |
|---|---|---|---|
| `hero.webp` | 1125×2250 (1:2) | Hero bölümündeki telefon görseli | ✅ yerinde |
| `Yeni_Musterim_logo.svg` | 242×39 | Header ve footer logosu (`src/components/Logo.tsx`) | ✅ yerinde |
| `Favicon.svg` | 54×41 | Favicon — `src/app/icon.svg`'ye **birebir** kopyalanır | ✅ yerinde |
| `app-icon.svg` | 450×450 | Yayın duyurusu bölümündeki uygulama simgesi | ✅ yerinde |
| `og.png` | 1200×630 | Sosyal medya paylaşım görseli (WhatsApp, LinkedIn, X) | ⬜ bekleniyor |

> `app-icon.svg` PNG ile değiştirilecekse: dosyayı `app-icon.png` olarak bu klasöre koyun,
> `src/components/ComingSoon.tsx` içindeki `src` yolunu güncelleyin ve `unoptimized`
> bayrağını **kaldırın** — o bayrak yalnızca SVG için gerekli.

## Ana sayfa görselleri (`src/assets/`)

Ana sayfadaki görseller, sitenin görsel kuralına göre (`src/components/home/Hero.tsx`
başındaki açıklama) `src/assets/` altında durur ve static import ile verilir.

| Dosya | Nerede kullanılıyor | Kaynak |
|---|---|---|
| `case-study/bridgestone-cover.webp` | Kanıt bölümünün kapağı (`home/Proof.tsx`) | Redesign Business portfolyosundaki Bridgestone kartı |
| `case-study/bridgestone-logo.svg` | Kapağın sol üstündeki logo | Aynı kart |
| `industries/tires.webp` | Sektörler: Lastik ve oto servis | Unsplash, Robert Laursoo (`WHPOFFzY9gU`) |
| `industries/hvac.webp` | Sektörler: İklimlendirme | Unsplash, alpha innotec (`VsjNRXO_c2w`) |
| `industries/kitchen-bath.webp` | Sektörler: Mutfak ve banyo | Unsplash, Aaron Huber (`G7sE2S4Lab4`) |
| `industries/insurance.webp` | Sektörler: Sigorta ve acente ağları | Unsplash, Igor Lolatto (`TdwYsTmA2Bc`) |
| `industries/batteries.webp` | Sektörler: Akü ve enerji | Unsplash, Wesley Tingey (`E4Oz0TZUDe8`) |
| `industries/appliances.webp` | Sektörler: Beyaz eşya ve yapı marketi | Unsplash, Josh Lemmon (`0t6fkXvg9hs`) |

Sektör fotoğrafları LeadHanger landing'iyle aynı; 1200 px genişliğe küçültülüp WebP'ye
çevrildi (15–80 KB). Unsplash lisansı kaynak gösterilmesini zorunlu tutmuyor. İki
fotoğrafta marka görünüyor: ısı pompalarında alpha innotec, akünün üstünde Energizer.

`Hero_BG.webp` ana sayfada artık kullanılmıyor; hero'nun zemini ızgara ve ışık katmanı.

## Kurallar

- **Format:** Şeffaf zemin gerekiyorsa PNG, gerekmiyorsa JPG (daha küçük dosya).
  Logo ve simge gibi düz renkli işler için SVG her zaman tercih edilir.
- **Ad:** Küçük harf, Türkçe karakter yok, boşluk yerine tire (`app-icon.png`).
  Türkçe karakterli dosya adları bazı sunucularda URL kodlaması sorunları çıkarır.
- **Boyut:** Yükleme öncesi sıkıştırın. 1024×1024 bir PNG 200 KB'ın altında olmalı.
- **Retina:** Ekranda 100 px gösterilecek bir görsel en az 200 px genişliğinde olmalı.

## Favicon — iki dosya, biri kopya

Next.js favicon'u **`app/` dizininden** okur; `public/` altındaki bir dosyayı favicon olarak
kullanamaz. Bu yüzden `public/images/Favicon.svg`, `src/app/icon.svg`'ye kopyalanır.

> ⚠ **Çizim değişince kopyayı yenilemek ZORUNLU.** Yalnızca `Favicon.svg`'yi güncellemek
> sitede sessizce eski favicon bırakır — hata vermez, fark edilmesi zordur. Bu tuzağa bir
> kez düşüldü: beyaz kontur eklendi, sekmede görünmedi.
>
> Yenileme ve doğrulama:
> ```bash
> cp public/images/Favicon.svg src/app/icon.svg
> diff -q public/images/Favicon.svg src/app/icon.svg   # çıktı yoksa senkron
> ```

Kalan tek gömülü görsel `src/components/PhoneMockup.tsx` değil — o kaldırıldı. Logo artık
dosyadan okunuyor; koda gömülü SVG bırakılmadı, çünkü tasarım güncellemeleri kopyaya
yansımıyordu.

## Mağaza görselleri buraya konmaz

App Store ve Google Play'in istediği ekran görüntüleri, öne çıkan görsel (1024×500) ve
1024×1024 mağaza simgesi bu sitenin değil, mağaza başvurusunun parçasıdır. Onlar
`brisa-frontend` deposundaki `docs/magaza/` altında takip edilir.
