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

1. Google Drive'da yeni bir Sheets dosyası aç: **Yeni Müşterim — kayıt
   başvuruları**.
2. **Uzantılar → Apps Script** menüsünden script editörünü aç, varsayılan
   `Code.gs` içeriğini aşağıdaki kodla değiştir.
3. `AYARLAR.TOKEN` değerini üret ve yapıştır — tahmin edilebilir bir değer
   olmasın:

   ```bash
   openssl rand -hex 24
   ```

```js
/**
 * Yeni Müşterim — kayıt başvurusu alıcısı.
 *
 * İki aşama alır: 'adim1' satırı açar, 'tamamlandi' aynı satırı basvuruId ile
 * bulup tamamlar ve bildirim e-postasını gönderir. İstek yalnızca
 * yenimusterim.com sunucusundan geliyor; kimlik doğrulama paylaşılan sır
 * (AYARLAR.TOKEN) ile yapılıyor.
 */
const AYARLAR = {
  // Vercel'deki SIGNUP_WEBHOOK_TOKEN ile BİREBİR aynı olmalı.
  TOKEN: 'BURAYA_URETILEN_SIR',
  SAYFA: 'Başvurular',
  ALICI: 'destek@yenimusterim.com',
  BCC: 'selen@redesignbiz.com',
};

const BASLIKLAR = [
  'Başvuru kimliği',
  'Gönderim zamanı',
  'Şirket',
  'İl',
  'İlçe',
  'Ad',
  'Soyad',
  'E-posta',
  'Telefon',
  'Bölge',
  'Kapasite',
  'Müşteri profili',
  'Hizmetler',
  'Dijital pazarlama',
  'Durum',
  'Tamamlanma zamanı',
];

function doPost(e) {
  // Adım 1 ve tamamlanma istekleri arka arkaya gelebiliyor; aynı satıra iki
  // yazma çakışmasın diye script kilidi alınıyor.
  const kilit = LockService.getScriptLock();
  kilit.waitLock(20000);

  try {
    const veri = JSON.parse(e.postData.contents);

    if (!veri.token || veri.token !== AYARLAR.TOKEN) {
      return yanit({ ok: false, hata: 'yetkisiz' });
    }

    const sayfa = sayfayiHazirla();
    const tamamlandi = veri.asama === 'tamamlandi';
    const simdi = veri.gonderimZamani ? new Date(veri.gonderimZamani) : new Date();

    const satirNo = satiriBul(sayfa, veri.basvuruId);
    const mevcut =
      satirNo > 0
        ? sayfa.getRange(satirNo, 1, 1, BASLIKLAR.length).getValues()[0]
        : null;

    const satir = [
      veri.basvuruId,
      // İlk gönderim zamanı korunur; tamamlanma ayrı kolonda.
      mevcut && mevcut[1] ? mevcut[1] : simdi,
      veri.sirket,
      veri.il,
      veri.ilce,
      veri.ad,
      veri.soyad,
      veri.email,
      veri.telefon,
      veri.bolge,
      veri.kapasite,
      veri.musteriProfili,
      veri.hizmetler,
      veri.dijitalPazarlama,
      tamamlandi ? 'Yeni' : 'Yarım',
      tamamlandi ? simdi : '',
    ];

    if (satirNo > 0) {
      sayfa.getRange(satirNo, 1, 1, BASLIKLAR.length).setValues([satir]);
    } else {
      sayfa.appendRow(satir);
    }

    // Bildirim yalnızca tamamlanmış başvuruda: her yarım form için e-posta
    // göndermek gelen kutusunu gürültüye boğardı, yarım kalanlar tabloda
    // 'Yarım' durumuyla zaten görünüyor.
    if (tamamlandi) {
      bildirimGonder(veri);
    }

    return yanit({ ok: true });
  } catch (hata) {
    console.error(hata);
    return yanit({ ok: false, hata: String(hata) });
  } finally {
    kilit.releaseLock();
  }
}

/** Kimliğe ait satırın numarası; yoksa 0. */
function satiriBul(sayfa, basvuruId) {
  if (!basvuruId) return 0;
  const sonSatir = sayfa.getLastRow();
  if (sonSatir < 2) return 0;

  const kimlikler = sayfa.getRange(2, 1, sonSatir - 1, 1).getValues();
  for (let i = 0; i < kimlikler.length; i++) {
    if (String(kimlikler[i][0]) === String(basvuruId)) return i + 2;
  }
  return 0;
}

function bildirimGonder(veri) {
  MailApp.sendEmail({
    to: AYARLAR.ALICI,
    bcc: AYARLAR.BCC,
    // Yanıt doğrudan başvurana gitsin.
    replyTo: veri.email,
    subject:
      'Yeni kayıt başvurusu: ' + veri.sirket + ' (' + veri.il + '/' + veri.ilce + ')',
    body: [
      'Servis noktası kayıt başvurusu tamamlandı.',
      '',
      'Şirket: ' + veri.sirket,
      'İl / ilçe: ' + veri.il + ' / ' + veri.ilce,
      'Sorumlu: ' + veri.ad + ' ' + veri.soyad,
      'E-posta: ' + veri.email,
      'Telefon: ' + veri.telefon,
      '',
      'Bölge: ' + veri.bolge,
      'Kapasite: ' + veri.kapasite,
      'Müşteri profili: ' + veri.musteriProfili,
      'Hizmetler: ' + veri.hizmetler,
      'Dijital pazarlama: ' + (veri.dijitalPazarlama || '—'),
      '',
      'Başvuru listesi: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl(),
    ].join('\n'),
  });
}

/** Sayfa yoksa oluşturur, başlık satırını bir kez yazar. */
function sayfayiHazirla() {
  const dosya = SpreadsheetApp.getActiveSpreadsheet();
  let sayfa = dosya.getSheetByName(AYARLAR.SAYFA);

  if (!sayfa) {
    sayfa = dosya.insertSheet(AYARLAR.SAYFA);
  }
  if (sayfa.getLastRow() === 0) {
    sayfa.appendRow(BASLIKLAR);
    sayfa.getRange(1, 1, 1, BASLIKLAR.length).setFontWeight('bold');
    sayfa.setFrozenRows(1);
  }
  return sayfa;
}

function yanit(govde) {
  return ContentService.createTextOutput(JSON.stringify(govde)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
```

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
