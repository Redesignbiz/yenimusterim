'use client';

import Link from 'next/link';
import { useActionState, useId, useState } from 'react';
import { iller } from '@/lib/iller';
import { site } from '@/lib/site';
import {
  ADIM1_ALANLARI,
  BOLGE_SECENEKLERI,
  DIGER,
  DIJITAL_PAZARLAMA_SECENEKLERI,
  HIZMET_SECENEKLERI,
  KAPASITE_SECENEKLERI,
  KAYIT_BASLANGIC,
  MUSTERI_PROFILI_SECENEKLERI,
  ONAY_MESAJI,
  adim1Hatalari,
  adim2Hatalari,
  formuOku,
  type Alan,
  type Hatalar,
  type KayitState,
} from '@/lib/kayit';
import { adim1Kaydet, kayitBasvurusuGonder } from '@/app/app/kayit/actions';

/**
 * Servis noktası kayıt başvurusu formu — /app/kayit sayfasının içeriği.
 *
 * İKİ ADIM, TEK FORM. Adımlar ayrı `<form>` değil: adım 1'in alanları ikinci
 * adımda CSS ile gizleniyor ama DOM'da kalıyor, böylece gönderimde tek
 * FormData'da toplanıyorlar.
 *
 * İkinci adımdan birinciye DÖNÜLEMİYOR: ilk adımın verisi kaydedilip
 * bildirimi gönderildiği için sonradan değiştirilmesi, haber verilen bilgiyle
 * tablodaki kaydı ayrıştırırdı. Tek istisna, sunucudan ilk adımın bir alanına
 * hata dönmesi — o zaman düzeltilecek yer orası olduğu için form kullanıcıyı
 * geri götürüyor.
 *
 * Adım 1 tamamlandığında veri BEKLENMEDEN kaydediliyor (`adim1Kaydet`):
 * kullanıcı ikinci adımı yarıda bıraksa bile iletişim bilgisi tabloya düşmüş
 * oluyor. Bu yüzden KVKK onayı da adım 1'de — veri o adımda gönderiliyor.
 *
 * Doğrulama kuralları sunucuyla ORTAK (`@/lib/kayit`), iki yerde ayrı ayrı
 * yazılmıyor; sunucu aynı kontrolleri kabul kararı için yeniden çalıştırıyor.
 */

/** Adım 2 sorularının form sırası — eksik alana odaklanırken kullanılıyor. */
const ADIM2_SIRASI: readonly Alan[] = [
  'bolge',
  'kapasite',
  'musteriProfili',
  'hizmetler',
  'dijitalPazarlama',
];

/**
 * React'in tuttuğu seçim değerleri. Metin alanları uncontrolled kalıyor —
 * onların `value` attribute'u DOM'da duruyor ve sıfırlamaya dayanıyor.
 */
type Secimler = {
  il: string;
  bolge: string;
  kapasite: string;
  musteriProfili: string;
  dijitalPazarlama: string;
  hizmetler: string[];
};

function secimleriKur(values: KayitState['values']): Secimler {
  return {
    il: values?.il ?? '',
    bolge: values?.bolge ?? '',
    kapasite: values?.kapasite ?? '',
    musteriProfili: values?.musteriProfili ?? '',
    dijitalPazarlama: values?.dijitalPazarlama ?? '',
    hizmetler: [...(values?.hizmetler ?? [])],
  };
}

const ALAN_SINIFI =
  'w-full rounded-DEFAULT border bg-surface-lowest px-3.5 py-2.5 text-[15px] text-ink ' +
  'transition-colors placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/25';

function alanSinifi(hataVarMi: boolean) {
  return `${ALAN_SINIFI} ${
    hataVarMi
      ? 'border-danger focus:border-danger focus:ring-danger/20'
      : 'border-outline-variant focus:border-primary'
  }`;
}

/** `crypto.randomUUID` güvenli bağlam istiyor; olmadığı yerde yedek kimlik. */
function kimlikUret(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `b-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Formun dış kabuğu. Tek işi, "Formu yeniden doldurun" seçildiğinde `key`
 * değiştirip asıl formu sıfırdan monte etmek: `useActionState` durumunu
 * temizlemenin başka yolu yok, elle sıfırlansa gönderim durumu ile alanlar
 * ayrışabilirdi.
 */
export function SignupForm() {
  const [anahtar, setAnahtar] = useState(0);

  /* Kimlik kabukta duruyor, formda değil: yeniden doldurma aynı başvuruyu
     sürdürsün, tabloda ikinci bir yarım satır açmasın. */
  const [basvuruId, setBasvuruId] = useState('');

  return (
    <KayitFormu
      key={anahtar}
      basvuruId={basvuruId}
      setBasvuruId={setBasvuruId}
      yenidenBasla={() => setAnahtar((n) => n + 1)}
    />
  );
}

function KayitFormu({
  basvuruId,
  setBasvuruId,
  yenidenBasla,
}: {
  basvuruId: string;
  setBasvuruId: (id: string) => void;
  yenidenBasla: () => void;
}) {
  const [state, formAction, pending] = useActionState<KayitState, FormData>(
    kayitBasvurusuGonder,
    KAYIT_BASLANGIC,
  );

  const [adim, setAdim] = useState<1 | 2>(1);

  /*
   * Eksik alanlar, sunucuya gidilmeden işaretleniyor. İstemci hatası sunucudan
   * geleni EZİYOR; kullanıcı bir alana dokununca o alanın anahtarı `undefined`
   * yapılıyor, böylece mesaj yazı yazılırken ekranda kalmıyor.
   */
  const [istemciHatalari, setIstemciHatalari] = useState<Hatalar>({});
  const hatalar: Hatalar = { ...state.errors, ...istemciHatalari };
  const hataVar = Object.values(hatalar).some(Boolean);

  /*
   * SEÇİM ALANLARI CONTROLLED. React, `defaultValue` ve `defaultChecked`
   * değerlerini `select` ile radio/checkbox'ta DOM attribute'u olarak yazmıyor;
   * metin alanları gibi `value="…"` taşımadıkları için gönderim sonrası formun
   * sıfırlanması onları boşaltıyordu (il alanının "Seçin"e dönmesi buydu).
   * Değeri React tuttuğu sürece sıfırlama sonrasında da yerinde kalıyorlar.
   */
  const [secimler, setSecimler] = useState(() => secimleriKur(state.values));

  /*
   * Sunucu yeni değerlerle dönerse seçimler onlarla eşitleniyor. Render
   * sırasında yapılan bu düzeltme, React'in `useEffect`e tercih ettiği kalıp:
   * ekrana bir kez eski değerle basılıp sonra düzeltilmiyor.
   */
  const [oncekiValues, setOncekiValues] = useState(state.values);
  if (state.values !== oncekiValues) {
    setOncekiValues(state.values);
    setSecimler(secimleriKur(state.values));
  }

  const bolgeDigerAcik = secimler.bolge === DIGER;
  const hizmetDigerAcik = secimler.hizmetler.includes(DIGER);

  /**
   * Eksik alana odaklanır. Gizli bir adımdan görünür adıma geçildiğinde element
   * o an hâlâ gizli olduğu için odak bir sonraki döngüye bırakılıyor.
   */
  function eksigeOdaklan(
    form: HTMLFormElement,
    bulunan: Hatalar,
    sira: readonly Alan[],
  ) {
    const ilk = sira.find((alan) => bulunan[alan]);
    if (!ilk) return;

    setTimeout(() => {
      const dugum = form.elements.namedItem(ilk);
      /* Radio ve checkbox grupları RadioNodeList döner; ilk düğmeye odaklanılır. */
      const hedef =
        dugum instanceof RadioNodeList ? (dugum[0] as HTMLElement | undefined) : dugum;
      if (hedef instanceof HTMLElement) hedef.focus();
    }, 0);
  }

  /** Adım 1 → adım 2. Eksik varsa geçilmiyor; yoksa veri kaydedilip ilerleniyor. */
  function adim1denGec(form: HTMLFormElement) {
    const veri = new FormData(form);
    const bulunan = adim1Hatalari(formuOku(veri), iller);
    if (veri.get('onay') !== 'evet') bulunan.onay = ONAY_MESAJI;

    if (Object.keys(bulunan).length > 0) {
      setIstemciHatalari(bulunan);
      eksigeOdaklan(form, bulunan, [...ADIM1_ALANLARI, 'onay']);
      return;
    }

    setIstemciHatalari({});

    const id = basvuruId || kimlikUret();
    if (!basvuruId) setBasvuruId(id);
    veri.set('basvuruId', id);

    /* Yanıt BEKLENMİYOR: kayıt bir yan etki, ikinci adıma geçişi
       geciktirmemeli. Başarısızlık sunucu log'una düşer ve veri, ikinci adımın
       gönderiminde zaten yeniden gider. */
    void adim1Kaydet(veri);

    setAdim(2);
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function devamEt(olay: React.MouseEvent<HTMLButtonElement>) {
    const form = olay.currentTarget.form;
    if (form) adim1denGec(form);
  }

  function gonderimiDenetle(olay: React.SyntheticEvent<HTMLFormElement>) {
    const form = olay.currentTarget;

    /* Adım 1'de Enter'a basılması gönderim değil, "Devam Et" demektir:
       aksi hâlde form ikinci adımın eksikleriyle reddedilir ve kullanıcı
       hataları gizli adımda göremez. */
    if (adim === 1) {
      olay.preventDefault();
      adim1denGec(form);
      return;
    }

    const veri = new FormData(form);
    const degerler = formuOku(veri);
    const bulunan: Hatalar = {
      ...adim1Hatalari(degerler, iller),
      ...adim2Hatalari(degerler),
    };
    if (veri.get('onay') !== 'evet') bulunan.onay = ONAY_MESAJI;

    if (Object.keys(bulunan).length === 0) {
      /* Formun gönderilmesine karışılmıyor; kalan hatalar sunucudan gelir. */
      setIstemciHatalari({});
      return;
    }

    olay.preventDefault();
    setIstemciHatalari(bulunan);

    /* Hata adım 1'deyse kullanıcı onu göremez — önce o adıma dönülüyor. */
    const adim1Sirasi: readonly Alan[] = [...ADIM1_ALANLARI, 'onay'];
    if (adim1Sirasi.some((alan) => bulunan[alan])) {
      setAdim(1);
      eksigeOdaklan(form, bulunan, adim1Sirasi);
      return;
    }
    eksigeOdaklan(form, bulunan, ADIM2_SIRASI);
  }

  /** Kullanıcı bir alana dokunduğu anda o alanın hata işareti kalkar. */
  function alanDegisti(olay: React.SyntheticEvent<HTMLFormElement>) {
    const hedef = olay.target;
    if (
      !(hedef instanceof HTMLInputElement) &&
      !(hedef instanceof HTMLSelectElement)
    ) {
      return;
    }

    /* Seçim alanlarının değeri React'te tutuluyor; "Diğer" kutularının açılıp
       kapanması da buradan türüyor. */
    if (hedef.name === 'hizmetler' && hedef instanceof HTMLInputElement) {
      const secildi = hedef.checked;
      const deger = hedef.value;
      setSecimler((onceki) => ({
        ...onceki,
        hizmetler: secildi
          ? [...onceki.hizmetler, deger]
          : onceki.hizmetler.filter((h) => h !== deger),
      }));
    } else if (hedef.name in secimler) {
      const ad = hedef.name as keyof Secimler;
      const deger = hedef.value;
      setSecimler((onceki) => ({ ...onceki, [ad]: deger }));
    }

    const ad = hedef.name as Alan;
    setIstemciHatalari((onceki) =>
      hatalar[ad] ? { ...onceki, [ad]: undefined } : onceki,
    );
  }

  if (state.status === 'success') {
    return <BasvuruAlindi email={state.gonderilenEmail} />;
  }

  /*
   * Başvuru iletilemediğinde forma dönülmüyor. Gönderim sonrası form
   * sıfırlandığı için kullanıcı yarısı boşalmış bir formla karşılaşıyor, üstelik
   * hata alanlardan birine ait olmadığından düzeltilecek bir şey de yok:
   * yapabileceği tek şey tekrar denemek ya da yazmak, ekran da bu ikisini
   * veriyor.
   */
  if (state.message) {
    return <BasvuruIletilemedi mesaj={state.message} yenidenBasla={yenidenBasla} />;
  }

  return (
    <form
      action={formAction}
      onSubmit={gonderimiDenetle}
      /* Tek dinleyici formda: React'te `change` bubble ettiği için her alan
         için ayrı prop geçmeye gerek yok. */
      onChange={alanDegisti}
      noValidate
      className="relative mt-10 scroll-mt-24"
    >
      <input type="hidden" name="basvuruId" value={basvuruId} />

      <AdimGostergesi adim={adim} />

      {/* ADIM 1 — gizlendiğinde de DOM'da kalıyor, bkz. bileşen başındaki not. */}
      <div className={adim === 1 ? 'block' : 'hidden'}>
        <div className="grid gap-5 sm:grid-cols-2">
          <FormAlani
            className="sm:col-span-2"
            name="sirket"
            label="Şirket adı"
            yardim="Servis noktanızın ticari unvanı ya da tabelada geçen adı."
            autoComplete="organization"
            defaultValue={state.values?.sirket}
            hata={hatalar.sirket}
          />

          <FormAlani
            name="il"
            label="İl"
            autoComplete="address-level1"
            deger={secimler.il}
            hata={hatalar.il}
            secenekler={iller}
          />

          <FormAlani
            name="ilce"
            label="İlçe"
            autoComplete="address-level2"
            defaultValue={state.values?.ilce}
            hata={hatalar.ilce}
          />

          <div className="sm:col-span-2">
            <p className="text-[13px] font-semibold text-ink-muted">
              Şirket sorumlusu bilgileri:
            </p>
            <div className="mt-3 grid gap-5 sm:grid-cols-2">
              <FormAlani
                name="ad"
                label="Ad"
                autoComplete="given-name"
                defaultValue={state.values?.ad}
                hata={hatalar.ad}
              />
              <FormAlani
                /* `name` sunucu tarafıyla sözleşme (bkz. lib/kayit.ts); görünen
                   etiket ayrı. */
                name="soyad"
                label="Soyadı"
                autoComplete="family-name"
                defaultValue={state.values?.soyad}
                hata={hatalar.soyad}
              />
            </div>
          </div>

          <FormAlani
            name="email"
            label="E-posta"
            type="email"
            inputMode="email"
            autoComplete="email"
            defaultValue={state.values?.email}
            hata={hatalar.email}
          />

          <FormAlani
            name="telefon"
            label="Telefon"
            type="tel"
            inputMode="tel"
            placeholder="0532 123 45 67"
            autoComplete="tel"
            defaultValue={state.values?.telefon}
            hata={hatalar.telefon}
          />
        </div>

        {/* Bal küpü: ekran dışında duruyor, insan kullanıcı görmüyor ve
            `tabIndex={-1}` ile sekmeyle de ulaşamıyor. `hidden` veya
            `display:none` yerine ekran dışına alınıyor — bot'ların çoğu gizli
            alanları atlıyor, ekran dışındakini dolduruyor. */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden"
        >
          <label htmlFor="websitesi">Web siteniz</label>
          <input
            id="websitesi"
            name="websitesi"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Onay ADIM 1'de: veri bu adımın sonunda kaydediliyor. */}
        <Onay hata={hatalar.onay} />

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={devamEt}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-primary-bright"
          >
            Devam Et
            <svg
              viewBox="0 0 24 24"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>

          {/* Bu adımın bilgileri devam edildiği anda kaydedilip bildiriliyor;
              sonrasında düzeltme imkânı olmadığı için önceden söyleniyor. */}
          <p className="text-[13px] text-ink-muted">
            Devam ettikten sonra bu bilgiler değiştirilemez.
          </p>
        </div>
      </div>

      {/* ADIM 2 */}
      <div className={adim === 2 ? 'block' : 'hidden'}>
        <div className="space-y-14">
          <SecimGrubu
            name="bolge"
            soru="İşletmeniz hangi tür bölgede konumlanıyor?"
            secenekler={BOLGE_SECENEKLERI}
            secili={secimler.bolge}
            hata={hatalar.bolge}
            digerAcik={bolgeDigerAcik}
            digerAlani="bolgeDiger"
            digerDegeri={state.values?.bolgeDiger}
          />

          <SecimGrubu
            name="kapasite"
            soru="Aynı anda kaç araca hizmet verebiliyorsunuz?"
            secenekler={KAPASITE_SECENEKLERI}
            secili={secimler.kapasite}
            hata={hatalar.kapasite}
          />

          <SecimGrubu
            name="musteriProfili"
            soru="Müşteri profilinizi en iyi hangisi tanımlar?"
            secenekler={MUSTERI_PROFILI_SECENEKLERI}
            secili={secimler.musteriProfili}
            hata={hatalar.musteriProfili}
          />

          <SecimGrubu
            coklu
            name="hizmetler"
            soru="İşletmenizde hangi hizmetleri sunuyorsunuz?"
            yardim="Birden fazla seçenek işaretleyebilirsiniz."
            secenekler={HIZMET_SECENEKLERI}
            seciliCoklu={secimler.hizmetler}
            hata={hatalar.hizmetler}
            digerAcik={hizmetDigerAcik}
            digerAlani="hizmetlerDiger"
            digerDegeri={state.values?.hizmetlerDiger}
          />

          <SecimGrubu
            istegeBagli
            name="dijitalPazarlama"
            soru="Dijital pazarlama faaliyetlerinizi nasıl tanımlarsınız?"
            secenekler={DIJITAL_PAZARLAMA_SECENEKLERI}
            secili={secimler.dijitalPazarlama}
            hata={hatalar.dijitalPazarlama}
          />
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-primary-bright disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? 'Gönderiliyor…' : 'Gönder'}
          </button>

          {/* Boşken de DOM'da duruyor: `aria-live` yalnızca var olan bir bölgeye
              sonradan giren metni duyurabiliyor. Ekranda ise sadece söyleyecek
              bir şey olduğunda görünüyor. */}
          <p
            aria-live="polite"
            className={`text-[13px] ${hataVar ? 'font-medium text-danger' : 'text-ink-muted'}`}
          >
            {pending
              ? 'Başvurunuz iletiliyor.'
              : hataVar
                ? 'Eksik veya hatalı alanlar işaretlendi.'
                : ''}
          </p>
        </div>
      </div>
    </form>
  );
}

/** İki segmentli ilerleme çubuğu ve adımın adı. */
function AdimGostergesi({ adim }: { adim: 1 | 2 }) {
  return (
    <div className="mb-9">
      <p className="eyebrow text-[13px] text-primary">
        Adım {adim} / 2 ·{' '}
        {adim === 1 ? 'Servis noktası bilgileri' : 'İşletme profili'}
      </p>
      <div className="mt-3 flex gap-2" aria-hidden>
        <span className="h-1 flex-1 rounded-full bg-primary" />
        <span
          className={`h-1 flex-1 rounded-full ${
            adim === 2 ? 'bg-primary' : 'bg-outline-variant'
          }`}
        />
      </div>
    </div>
  );
}

/**
 * Etiket, alan, yardım metni ve hata mesajını birlikte kuran tek bileşen:
 * `secenekler` verildiğinde `select`, verilmediğinde `input` basıyor. Yardım ve
 * hata metinleri `aria-describedby` ile alana bağlanıyor ki ekran okuyucu
 * odaklandığında ikisini de okusun.
 */
function FormAlani({
  name,
  label,
  hata,
  yardim,
  secenekler,
  deger,
  className = '',
  type = 'text',
  ...rest
}: {
  name: string;
  label: string;
  hata?: string;
  yardim?: string;
  secenekler?: readonly string[];
  /** Yalnızca `select` için: değeri React tutuyor, bkz. Secimler. */
  deger?: string;
  className?: string;
  type?: 'text' | 'email' | 'tel';
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name' | 'type' | 'className'>) {
  const id = useId();
  const yardimId = `${id}-yardim`;
  const hataId = `${id}-hata`;
  const aciklamalar = [yardim && yardimId, hata && hataId].filter(Boolean).join(' ');

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-[14px] font-semibold text-ink">
        {label}
      </label>

      {secenekler ? (
        <select
          id={id}
          name={name}
          value={deger ?? ''}
          /* Değişim formun ortak `onChange` dinleyicisinde işleniyor; React'in
             controlled alan için kendi prop'unu görmesi gerektiğinden burada
             boş bir el kalıyor. */
          onChange={() => {}}
          aria-invalid={hata ? true : undefined}
          aria-describedby={aciklamalar || undefined}
          className={`${alanSinifi(Boolean(hata))} mt-2 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23727786%22%20stroke-width%3D%222.2%22%20stroke-linecap%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:18px_18px] bg-[right_0.875rem_center] bg-no-repeat pr-11`}
        >
          <option value="" disabled>
            Seçin
          </option>
          {secenekler.map((secenek) => (
            <option key={secenek} value={secenek}>
              {secenek}
            </option>
          ))}
        </select>
      ) : (
        <input
          {...rest}
          id={id}
          name={name}
          type={type}
          aria-invalid={hata ? true : undefined}
          aria-describedby={aciklamalar || undefined}
          className={`${alanSinifi(Boolean(hata))} mt-2`}
        />
      )}

      {yardim && (
        <p id={yardimId} className="mt-2 text-[13px] leading-5 text-ink-muted">
          {yardim}
        </p>
      )}
      {hata && (
        <p id={hataId} className="mt-2 text-[13px] font-medium leading-5 text-danger">
          {hata}
        </p>
      )}
    </div>
  );
}

/**
 * Adım 2'nin soruları. `coklu` verildiğinde checkbox, verilmediğinde radio
 * basıyor; iki hâlde de seçenekler tıklanabilir kutular olarak duruyor —
 * mobilde uzun seçenek metinlerinin `select` içinde okunması zor.
 *
 * Seçili görünüm `has-[:checked]` ile CSS tarafında: seçim durumu için ayrıca
 * React state'i tutmaya gerek kalmıyor.
 */
function SecimGrubu({
  name,
  soru,
  secenekler,
  hata,
  yardim,
  coklu = false,
  istegeBagli = false,
  secili,
  seciliCoklu,
  digerAcik = false,
  digerAlani,
  digerDegeri,
}: {
  name: string;
  soru: string;
  secenekler: readonly string[];
  hata?: string;
  yardim?: string;
  coklu?: boolean;
  istegeBagli?: boolean;
  secili?: string;
  seciliCoklu?: readonly string[];
  digerAcik?: boolean;
  digerAlani?: string;
  digerDegeri?: string;
}) {
  const id = useId();
  const hataId = `${id}-hata`;
  const yardimId = `${id}-yardim`;
  const aciklamalar = [yardim && yardimId, hata && hataId].filter(Boolean).join(' ');

  return (
    <fieldset aria-describedby={aciklamalar || undefined}>
      <legend className="text-[17px] font-semibold leading-snug text-ink sm:text-[19px]">
        {soru}
        {istegeBagli && (
          <span className="ml-2 font-normal text-ink-muted">(isteğe bağlı)</span>
        )}
      </legend>

      {yardim && (
        <p id={yardimId} className="mt-2 text-[14px] leading-5 text-ink-muted">
          {yardim}
        </p>
      )}

      <div className="mt-5 space-y-2.5">
        {secenekler.map((secenek) => (
          <label
            key={secenek}
            className={`flex cursor-pointer items-start gap-3 rounded-DEFAULT border bg-surface-lowest p-4 transition-colors hover:bg-surface-low has-[:checked]:border-primary has-[:checked]:bg-primary-fixed ${
              hata ? 'border-danger' : 'border-outline-variant'
            }`}
          >
            <input
              type={coklu ? 'checkbox' : 'radio'}
              name={name}
              value={secenek}
              checked={
                coklu ? (seciliCoklu ?? []).includes(secenek) : secili === secenek
              }
              /* Bkz. FormAlani'ndaki not: değişim formun ortak dinleyicisinde. */
              onChange={() => {}}
              aria-invalid={hata ? true : undefined}
              className="mt-0.5 size-[18px] shrink-0 accent-primary"
            />
            <span className="text-[15px] leading-6 text-ink">{secenek}</span>
          </label>
        ))}
      </div>

      {/* "Diğer" işaretlenmeden alan basılmıyor: kapalıyken DOM'da olmaması,
          gönderimde boş bir kolon oluşmasını da engelliyor. */}
      {digerAlani && digerAcik && (
        <div className="mt-3">
          <label
            htmlFor={`${id}-diger`}
            className="block text-[13px] font-semibold text-ink-muted"
          >
            Kısaca yazın
          </label>
          <input
            id={`${id}-diger`}
            name={digerAlani}
            type="text"
            defaultValue={digerDegeri}
            className={`${alanSinifi(false)} mt-2`}
          />
        </div>
      )}

      {hata && (
        <p id={hataId} className="mt-3 text-[13px] font-medium leading-5 text-danger">
          {hata}
        </p>
      )}
    </fieldset>
  );
}

/**
 * KVKK onayı. Metin, verinin hangi kategoride ve hangi amaçla işlendiğini
 * söylüyor; ayrıntı gizlilik politikasında (bkz. /gizlilik, bölüm 12).
 * Onay olmadan başvuru sunucuda da kabul edilmiyor.
 */
function Onay({ hata }: { hata?: string }) {
  const id = useId();
  const hataId = `${id}-hata`;

  return (
    <div
      className={`mt-8 rounded-lg border bg-surface-lowest p-5 ${
        hata ? 'border-danger' : 'border-outline-variant'
      }`}
    >
      <div className="flex gap-3">
        <input
          id={id}
          name="onay"
          type="checkbox"
          value="evet"
          aria-invalid={hata ? true : undefined}
          aria-describedby={hata ? hataId : undefined}
          className="mt-0.5 size-[18px] shrink-0 accent-primary"
        />
        <label htmlFor={id} className="text-[14px] leading-6 text-ink-muted">
          Formda paylaştığım kimlik ve iletişim verilerinin, kayıt başvurumun
          değerlendirilmesi ve tarafımla iletişim kurulması amacıyla{' '}
          {site.controller.legalName} tarafından işlenmesini kabul ediyorum.{' '}
          {/* Doğrudan başvuru bölümüne: politika 13 bölüm, ilgili yeri kullanıcı
              aramak zorunda kalmasın. */}
          <Link
            href="/gizlilik#basvuru"
            className="font-semibold text-primary underline underline-offset-4"
          >
            Gizlilik Politikası
          </Link>
        </label>
      </div>
      {hata && (
        <p id={hataId} className="mt-3 text-[13px] font-medium leading-5 text-danger">
          {hata}
        </p>
      )}
    </div>
  );
}

/**
 * Başvuru kaydedilemediğinde formun yerini alan blok. İki çıkış sunuyor:
 * formu sıfırdan doldurmak veya siteye dönmek. Destek adresi de burada, çünkü
 * sorun sürerse başvurunun ulaşabileceği tek yol o.
 */
function BasvuruIletilemedi({
  mesaj,
  yenidenBasla,
}: {
  mesaj: string;
  yenidenBasla: () => void;
}) {
  return (
    <div
      role="alert"
      className="mt-10 rounded-lg border border-danger bg-surface-lowest p-7 sm:p-10"
    >
      <span className="flex size-11 items-center justify-center rounded-full bg-danger-fixed">
        <svg
          viewBox="0 0 24 24"
          className="size-5 text-danger"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
        </svg>
      </span>

      <h2 className="mt-5 text-xl font-bold tracking-[-0.02em] text-ink sm:text-2xl">
        Başvuru iletilemedi
      </h2>

      <p className="mt-4 text-[15px] leading-7 text-ink-muted">{mesaj}</p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={yenidenBasla}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-primary-bright"
        >
          Formu yeniden doldur
        </button>
        <Link
          href="/"
          className="rounded-full border border-outline-variant bg-surface-lowest px-6 py-3 text-[15px] font-semibold text-ink transition-colors hover:bg-surface-low"
        >
          Ana sayfaya dön
        </Link>
      </div>
    </div>
  );
}

/** Gönderim başarılı olduğunda formun yerini alan blok. */
function BasvuruAlindi({ email }: { email?: string }) {
  return (
    <div
      role="status"
      className="mt-10 rounded-lg border border-outline-variant bg-surface-lowest p-7 sm:p-10"
    >
      <span className="flex size-11 items-center justify-center rounded-full bg-primary-fixed">
        <svg
          viewBox="0 0 24 24"
          className="size-5 text-primary"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="m5 13 4 4L19 7" />
        </svg>
      </span>

      <h2 className="mt-5 text-xl font-bold tracking-[-0.02em] text-ink sm:text-2xl">
        Başvurunuz alındı
      </h2>

      <p className="mt-4 text-[15px] leading-7 text-ink-muted">
        Bilgileriniz merkez ekibine iletildi. Başvurunuz değerlendirildikten
        sonra uygulamaya giriş bilgileri{' '}
        {email ? (
          <strong className="font-semibold text-ink">{email}</strong>
        ) : (
          'bıraktığınız e-posta'
        )}{' '}
        adresine gönderilir.
      </p>

      <p className="mt-4 text-[15px] leading-7 text-ink-muted">
        Başvurunuzla ilgili sorularınızı{' '}
        <a
          href={`mailto:${site.contact.support}`}
          className="font-medium text-primary underline underline-offset-4"
        >
          {site.contact.support}
        </a>{' '}
        adresine iletebilirsiniz.
      </p>

      <Link
        href="/app"
        className="mt-8 inline-flex items-center gap-2 text-[15px] font-semibold text-ink-muted transition-colors hover:text-ink"
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
        Uygulama sayfasına dön
      </Link>
    </div>
  );
}
