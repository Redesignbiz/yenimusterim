/**
 * Tek kaynak: sayfada ve gizlilik politikasında geçen bütün sabit değerler burada.
 *
 * TODO ile işaretli alanlar müşteriden gelecek gerçek bilgileri bekliyor. Metinde
 * doğrudan yazmak yerine buradan okunuyor ki yayına çıkmadan önce tek dosyada
 * değiştirilebilsinler — ve eksik kalan bir tanesi sayfada gözden kaçmasın.
 */
export const site = {
  name: 'Yeni Müşterim',
  tagline: 'Servis noktaları için talep ve randevu yönetimi uygulaması',
  description:
    'Chatbot, çağrı merkezi ve online randevu kanallarından gelen müşteri talepleri tek listede toplanır. ' +
    'Her talep tanımlı bir arama saatiyle iletilir, görüşme sonucu uygulama üzerinden kaydedilir.',

  url: 'https://yenimusterim.com',

  contact: {
    support: 'destek@yenimusterim.com',
    privacy: 'kvkk@yenimusterim.com',
    accountDeletion: 'kvkk@yenimusterim.com',
    /**
     * İşletme telefon numarası — OPSİYONEL, yayın için gerekli değil.
     * (Play Console destek e-postası ister, telefon istemez; KVKK için de
     * ulaşılabilir bir kanal yeterli ve o e-postayla karşılanıyor.)
     *
     * Boş bırakıldığında iletişim bölümünde satır HİÇ render edilmez. Numara
     * girilince satır kendiliğinden çıkar, kod değişikliği gerekmez.
     *
     * `as string` ZORUNLU: nesne `as const` olduğu için tip aksi hâlde `''`
     * literaline daralır, TypeScript de koşullu dalı ölü kod sayıp `never`
     * hatası verir. Bu daraltma değeri doldurunca kendiliğinden çözülmez.
     */
    phone: '' as string,
  },

  /**
   * Mağaza adresleri. Bir mağazanın adresi BOŞ olduğu sürece o rozet
   * tıklanabilir olmaz (bkz. StoreLinks.tsx): link vermek kullanıcıyı boş bir
   * arama sonucuna götürür. Adres girildiği anda rozet kendiliğinden bağlantıya
   * dönüşür, kod değişikliği gerekmez.
   *
   * `as string` gerekçesi `contact.phone` ile aynı: nesne `as const` olduğu için
   * tip aksi hâlde `''` literaline daralır ve koşullu dal ölü kod sayılır.
   */
  stores: {
    /** Google Play — 31 Ağustos 2026 itibarıyla yayında. */
    googlePlay:
      'https://play.google.com/store/apps/details?id=com.brisa.dealer' as string,
    /** App Store — henüz yayında değil. */
    appStore: '' as string,
  },

  controller: {
    legalName: 'Redesign Business Danışmanlık, Eğitim ve Ticaret A.Ş.',
    address:
      'Fatih Sultan Mehmet Mah. Poligon Cad. Buyaka 2 Sitesi 3 Blok ' +
      'No: 8 C İç Kapı No: 7, Ümraniye / İstanbul',
  },

  /**
   * Yayımlanmış sonuç metrikleri. Yalnızca bu dördü dışarıda kullanılabilir:
   * Redesign Business'ın Bridgestone vaka çalışmasında hâlihazırda yayımlanmış
   * olan rakamlar bunlar.
   *
   * Buraya iç kaynaklı başka bir rakam EKLENMEZ. Arşivlerde geçen ham talep
   * sayıları farklı bir şeyi farklı bir dönemde ölçüyor ve yayımlanmış oranla
   * çelişir.
   *
   * `short` hero'daki tek satırlık şerit için, `label` kanıt bölümündeki kart
   * için. İngilizce kaynakta son metrik "parties worldwide" diyor; Türkçesi de
   * o belirsizliği koruyor, tek tek servis noktası sayısına daraltmıyor.
   */
  metrics: [
    {
      value: '%32',
      short: 'talepten satışa',
      label: 'Servis noktası ağı genelinde talepten satışa dönüşüm oranı',
    },
    {
      value: '%40',
      short: 'daha hızlı yanıt',
      label: 'Dijital taleplere daha hızlı servis noktası yanıtı',
    },
    {
      value: '%50',
      short: 'nitelikli talep',
      label: 'Platform genelinde nitelikli talep oranı',
    },
    {
      value: '10.000+',
      short: 'platform kullanıcısı',
      label: 'Dünya genelinde platformu kullanan taraf sayısı',
    },
  ],

  /** Referans vaka çalışması, Redesign Business sitesinde yayında. */
  caseStudy: {
    client: 'Bridgestone',
    href: 'https://www.redesignbiz.com/work/bridgestone/',
  },

  /** TODO: hukuk tarafıyla teyit et. */
  retention: {
    /** Hesap silme talebinin sonuçlandırılma süresi (KVKK azami 30 gün). */
    deletionDays: 30,
    /** Kapatılan hesabın işlem kayıtlarının saklanma süresi. */
    logYears: 10,
    /**
     * Kabul edilmeyen veya sonuçlandırılmayan kayıt başvurularının (/app/kayit)
     * saklanma süresi. Politikada üst sınır olarak geçiyor.
     */
    applicationMonths: 12,
  },

  /** Politikanın yürürlük tarihi — metinde ve `dateModified`'da kullanılır. */
  policyUpdatedAt: '2026-09-02',
  policyUpdatedLabel: '2 Eylül 2026',
} as const;
