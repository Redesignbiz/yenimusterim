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
