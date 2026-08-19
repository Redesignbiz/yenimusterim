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
     * TODO: işletme telefon numarası.
     *
     * Boş bırakıldığında iletişim bölümünde satır HİÇ render edilmez — yayında
     * "[Telefon]" gibi bir yer tutucu görünmesin diye bilinçli olarak koşullu.
     * Numara girilince satır kendiliğinden çıkar, kod değişikliği gerekmez.
     *
     * `as string` ZORUNLU: nesne `as const` olduğu için tip aksi hâlde `''`
     * literaline daralır, TypeScript de koşullu dalı ölü kod sayıp `never`
     * hatası verir. Bu daraltma değeri doldurunca kendiliğinden çözülmez.
     */
    phone: '' as string,
  },

  controller: {
    legalName: 'Redesign Business Danışmanlık, Eğitim ve Ticaret A.Ş.',
    address:
      'Fatih Sultan Mehmet Mah. Poligon Cad. Buyaka 2 Sitesi 3 Blok ' +
      'No: 8 C İç Kapı No: 7, Ümraniye / İstanbul',
  },

  /** TODO: hukuk tarafıyla teyit et. */
  retention: {
    /** Hesap silme talebinin sonuçlandırılma süresi (KVKK azami 30 gün). */
    deletionDays: 30,
    /** Kapatılan hesabın işlem kayıtlarının saklanma süresi. */
    logYears: 10,
  },

  /** Politikanın yürürlük tarihi — metinde ve `dateModified`'da kullanılır. */
  policyUpdatedAt: '2026-08-18',
  policyUpdatedLabel: '18 Ağustos 2026',
} as const;
