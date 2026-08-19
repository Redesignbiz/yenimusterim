# Görsel dosyaları

Bütün statik görseller **`public/images/`** klasörüne konur. Bu klasördeki bir dosya,
site üzerinde `/images/<dosya-adı>` adresinden servis edilir.

> Dosyayı klasöre bırakmak tek başına yeterli değildir — hangi dosyanın nerede kullanılacağı
> koda yazılır. Aşağıdaki tabloda hangi dosyanın hangi bileşene bağlanacağı belirtilmiştir.

## Beklenen dosyalar

| Dosya adı | Ölçü | Nerede kullanılıyor | Durum |
|---|---|---|---|
| `hero.webp` | 1125×2250 (1:2) | Hero bölümündeki telefon görseli | ✅ yerinde |
| `app-icon.svg` | 450×450 | Yayın duyurusu bölümündeki uygulama simgesi | ✅ yerinde |
| `Favicon.svg` | 54×39 | Favicon kaynağı — `src/app/icon.svg`'ye kopyalandı | ✅ yerinde |
| `og.png` | 1200×630 | Sosyal medya paylaşım görseli (WhatsApp, LinkedIn, X) | ⬜ bekleniyor |

> `app-icon.svg` PNG ile değiştirilecekse: dosyayı `app-icon.png` olarak bu klasöre koyun,
> `src/components/ComingSoon.tsx` içindeki `src` yolunu güncelleyin ve `unoptimized`
> bayrağını **kaldırın** — o bayrak yalnızca SVG için gerekli.

## Kurallar

- **Format:** Şeffaf zemin gerekiyorsa PNG, gerekmiyorsa JPG (daha küçük dosya).
  Logo ve simge gibi düz renkli işler için SVG her zaman tercih edilir.
- **Ad:** Küçük harf, Türkçe karakter yok, boşluk yerine tire (`app-icon.png`).
  Türkçe karakterli dosya adları bazı sunucularda URL kodlaması sorunları çıkarır.
- **Boyut:** Yükleme öncesi sıkıştırın. 1024×1024 bir PNG 200 KB'ın altında olmalı.
- **Retina:** Ekranda 100 px gösterilecek bir görsel en az 200 px genişliğinde olmalı.

## Şu an kodla çizilen görseller

Aşağıdakiler dosya değil, SVG olarak koda gömülü. PNG ile değiştirilmeleri **gerekmez**;
her ekran yoğunluğunda keskin kalırlar ve ağ isteği doğurmazlar.

| Bileşen | Ne çizer |
|---|---|
| `src/components/Logo.tsx` | Yeni Müşterim logosu (header + footer) |
| `src/app/icon.svg` | Tarayıcı sekmesi simgesi (favicon) |

> **Favicon notu:** `src/app/icon.svg`, `public/images/Favicon.svg` ile aynı çizimi taşır;
> tek fark `viewBox`'ın kareye çevrilmiş olması. Favicon kare bir alana yerleştirildiği için
> orijinal yatay `viewBox` işareti gereksiz yere küçültüyordu. Çizim değişirse **iki dosya da**
> güncellenmeli.

## Mağaza görselleri buraya konmaz

App Store ve Google Play'in istediği ekran görüntüleri, öne çıkan görsel (1024×500) ve
1024×1024 mağaza simgesi bu sitenin değil, mağaza başvurusunun parçasıdır. Onlar
`brisa-frontend` deposundaki `docs/magaza/` altında takip edilir.
