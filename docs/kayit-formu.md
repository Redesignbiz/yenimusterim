# Kayıt başvurusu formu — başvuruların düştüğü yer

`/app/kayit` formunun (`src/app/app/kayit/`) sunucu tarafı, başvuruyu Google
Apps Script ile yayımlanmış bir web app'e POST eder. Script başvuruyu bir Google
Sheets tablosuna yazar ve başvuru tamamlandığında bildirim e-postasını gönderir.

Bu yol, başvuruların **takip edilebilir bir liste** olarak birikmesi için
seçildi: hangi başvurunun incelendiği, hangisinin hesabı açıldığı tabloda bir
kolon olarak tutulabiliyor. Yalnızca e-posta gönderilse başvurular inbox'a
dağılırdı.

İstek **tarayıcıdan değil sunucudan** atılıyor. Web app adresi ve paylaşılan sır
istemciye hiç inmiyor; aksi hâlde tabloya dışarıdan satır yazılabilirdi.

## Form iki adımlı, kayıt iki aşamalı

| Aşama | Ne zaman | Ne olur |
|---|---|---|
| `adim1` | Kullanıcı "Devam Et"e bastığında | Satır tabloya **hemen** yazılır, durumu `Yarım`. E-posta gönderilmez. |
| `tamamlandi` | Adım 2 gönderildiğinde | Aynı satır `basvuruId` ile bulunup tamamlanır, durumu `Yeni` olur ve bildirim e-postası gider. |

Böylece ikinci adımı yarıda bırakan bir servis noktasının iletişim bilgisi de
elde kalıyor. `basvuruId`, form ilk adımı geçerken tarayıcıda üretilen ve
gönderim boyunca taşınan kimlik.

İlk aşamanın kaydı **beklenmeden** yapılıyor: başarısız olursa kullanıcı bunu
görmez, hata sunucu log'una düşer ve veri ikinci adımın gönderiminde zaten
yeniden gider.

---

## 1. Tabloyu ve script'i kur

Tablo hazır ve Drive'da **Yeni Musterim** klasöründe duruyor:
[Yeni Müşterim — kayıt başvuruları](https://docs.google.com/spreadsheets/d/1_GssHcstVee98jWWBnyhRtBHOTY5b0M0V6yppoQnprA/edit)
(`1_GssHcstVee98jWWBnyhRtBHOTY5b0M0V6yppoQnprA`). İçi boş: `Başvurular`
sayfasını ve başlık satırını script ilk çalıştığında kendisi açıyor, dosyayla
birlikte gelen boş sayfa o zaman silinebilir.

1. Tabloyu aç, **Uzantılar → Apps Script** menüsünden script editörüne geç ve
   varsayılan `Code.gs` içeriğini **[`kayit-formu.gs`](kayit-formu.gs)**
   dosyasının tamamıyla değiştir. Kod bu dokümanda tekrarlanmıyor ki iki kopya
   zamanla birbirinden ayrışmasın.
2. Dosyanın başındaki `AYARLAR.TOKEN` değerini üret ve `BURAYA_URETILEN_SIR`
   yazan yere yapıştır — tahmin edilebilir bir değer olmasın:

   ```bash
   openssl rand -hex 24
   ```

   Alıcı adresleri (`ALICI`, `BCC`) da aynı blokta; değiştirmek gerekirse
   orada.

---

## 2. Web app olarak yayımla

**Deploy → New deployment → Web app**:

| Alan | Değer |
|---|---|
| Execute as | **Me** (tabloya ve Gmail'e script'in sahibi adına erişmesi için) |
| Who has access | **Anyone** |

`Anyone` seçeneği zorunlu: isteği atan Vercel sunucusu bir Google oturumu
taşımıyor. Erişimi sınırlayan şey `AYARLAR.TOKEN`; sırrı bilmeyen istek
`{"ok":false,"hata":"yetkisiz"}` alır ve hiçbir yere kayıt gitmez.

İlk yayımda Google izin ekranı çıkar (Sheets'e yazma ve e-posta gönderme);
"Advanced → Go to … (unsafe)" adımından geçilmesi gerekiyor — uygulama
doğrulanmamış olduğu için normal.

Yayımlama sonunda verilen `https://script.google.com/macros/s/.../exec`
adresini kopyala.

> Script'te sonradan bir değişiklik yapılırsa **Manage deployments → Edit → New
> version → Deploy** adımı gerekiyor; yoksa `/exec` adresi eski sürümü
> çalıştırmaya devam eder.

---

## 3. Ortam değişkenlerini tanımla

| Değişken | Değer |
|---|---|
| `SIGNUP_WEBHOOK_URL` | 2. adımdaki `/exec` adresi |
| `SIGNUP_WEBHOOK_TOKEN` | `AYARLAR.TOKEN` ile birebir aynı sır |

- **Vercel:** Project → Settings → Environment Variables (Production +
  Preview). Ekledikten sonra yeni bir deployment gerekiyor; değişkenler
  çalışmakta olan deployment'a geçmiyor.
- **Yerelde:** `.env.local` dosyasına aynı iki satır.

İkisinden biri tanımlı değilken form, ikinci adımın sonunda kullanıcıya
"Başvuru şu anda iletilemedi" mesajı gösterir ve sunucu log'una `[kayit]
SIGNUP_WEBHOOK_URL veya SIGNUP_WEBHOOK_TOKEN tanımlı değil` satırını yazar.
Başvuru sessizce kaybolmuyor.

---

## 4. Kurulumu doğrula

Web app'i formdan bağımsız denemek için — önce ilk aşama, sonra aynı kimlikle
tamamlanma:

```bash
KIMLIK="deneme-$(date +%s)"

# 1) Adım 1 kaydı: satır 'Yarım' olarak açılır, e-posta gitmez.
curl -sS -L -X POST "$SIGNUP_WEBHOOK_URL" \
  -H 'content-type: application/json' \
  -d "{\"token\":\"$SIGNUP_WEBHOOK_TOKEN\",\"asama\":\"adim1\",\"basvuruId\":\"$KIMLIK\",
       \"gonderimZamani\":\"$(date -u +%Y-%m-%dT%H:%M:%SZ)\",
       \"sirket\":\"Deneme Oto Servis\",\"il\":\"İstanbul\",\"ilce\":\"Ümraniye\",
       \"ad\":\"Deneme\",\"soyad\":\"Kayıt\",\"email\":\"deneme@example.com\",
       \"telefon\":\"0532 000 00 00\",\"bolge\":\"\",\"kapasite\":\"\",
       \"musteriProfili\":\"\",\"hizmetler\":\"\",\"dijitalPazarlama\":\"\"}"

# 2) Tamamlanma: AYNI satır güncellenir, durum 'Yeni' olur ve e-posta gider.
curl -sS -L -X POST "$SIGNUP_WEBHOOK_URL" \
  -H 'content-type: application/json' \
  -d "{\"token\":\"$SIGNUP_WEBHOOK_TOKEN\",\"asama\":\"tamamlandi\",\"basvuruId\":\"$KIMLIK\",
       \"gonderimZamani\":\"$(date -u +%Y-%m-%dT%H:%M:%SZ)\",
       \"sirket\":\"Deneme Oto Servis\",\"il\":\"İstanbul\",\"ilce\":\"Ümraniye\",
       \"ad\":\"Deneme\",\"soyad\":\"Kayıt\",\"email\":\"deneme@example.com\",
       \"telefon\":\"0532 000 00 00\",
       \"bolge\":\"Sanayi sitesi içerisinde\",\"kapasite\":\"3–4 araç\",
       \"musteriProfili\":\"Ticari araç veya filo müşterileri\",
       \"hizmetler\":\"Lastik değişimi, Akü hizmetleri\",
       \"dijitalPazarlama\":\"Dijital kanalları sınırlı olarak kullanıyorum\"}"
```

İki istek de `{"ok":true}` döner; tabloda **tek satır** oluşur ve bu satır
ikinci istekten sonra tamamlanmış görünür. `-L` gerekli — Apps Script POST
isteğini `googleusercontent.com` adresine yönlendiriyor.

Deneme satırını tablodan silmek yeterli.

---

## Bilinmesi gerekenler

- **Yarım başvurular.** `Yarım` durumundaki satırlar için bildirim gitmez;
  bunları görmek tabloya bakmayı gerektirir. Takip edilecekse tabloda o duruma
  filtre kurmak yeterli.
- **Kota.** Workspace hesabında `MailApp.sendEmail` günlük 1.500 e-posta ile
  sınırlı. Başvuru hacmi bu sınırın çok altında.
- **Kişisel veri.** Tablo kimlik ve iletişim verisi tutuyor; erişimi başvuruyu
  değerlendiren kişilerle sınırlı kalmalı ve dosya bağlantı ile paylaşılmamalı.
  Gizlilik politikasının 12. bölümü bu işlemeyi anlatıyor
  (`src/app/gizlilik/page.tsx`); **formun alanları veya başvurunun yazıldığı yer
  değişirse o bölüm de güncellenir.**
- **Saklama.** Politika, sonuçlandırılmayan başvuruların en fazla 12 ay
  saklandığını söylüyor (`site.retention.applicationMonths`). Bu sürenin fiilen
  uygulanması tablonun elle veya bir script ile temizlenmesine bağlı — yarım
  kalan başvurular da bu süreye dahil.
- **Spam.** Formda ekran dışında bir bal küpü alanı var; dolduran istek başarı
  ekranı görür ama hiçbir yere yazılmaz. Tabloya beklenmeyen bir yoğunlukta
  satır düşerse ek önlem (oran sınırı veya CAPTCHA) gerekir.
