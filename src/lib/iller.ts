/**
 * 81 il, Türkçe alfabetik sırayla.
 *
 * Sıralama derleme zamanında sabit: `localeCompare('tr')` çalıştırılmıyor ki
 * liste her render'da yeniden sıralanmasın ve sunucu ile tarayıcı arasında
 * `Intl` farkından doğan bir tutarsızlık çıkmasın. Türkçe alfabede `ı` harfi
 * `i`den önce geldiği için Iğdır ve Isparta, İstanbul'dan önce duruyor.
 *
 * Sunucu tarafındaki doğrulama da bu listeyi kullanıyor (bkz. app/kayit/actions.ts):
 * forma elle gönderilen bir il adı listede yoksa başvuru kabul edilmiyor.
 *
 * ⛔ İLÇE LİSTESİ ARTIK VAR: `ilceler.ts` (3 Eyl 2026). Buradaki not bir süre "ilçe
 * bilinçli olarak serbest metin, güvenilir bir kaynak bulunursa `select`e çevrilir"
 * diyordu — o kaynak bulundu (Brisa monorepo'sundaki `shared/src/locations.ts`, NVİ
 * tabanlı 2025 veri seti) ve alan `select`e çevrildi. İlçe adları ELLE YAZILMADI,
 * o kaynaktan üretildi.
 *
 * ⚠ İki dosyanın il adları BİREBİR AYNI olmak zorunda (sıra dahil ölçüldü): `ilceler.ts`
 * bu adları anahtar olarak kullanıyor, eşleşmezse il seçilince ilçe listesi boş kalır.
 */
export const iller = [
  'Adana',
  'Adıyaman',
  'Afyonkarahisar',
  'Ağrı',
  'Aksaray',
  'Amasya',
  'Ankara',
  'Antalya',
  'Ardahan',
  'Artvin',
  'Aydın',
  'Balıkesir',
  'Bartın',
  'Batman',
  'Bayburt',
  'Bilecik',
  'Bingöl',
  'Bitlis',
  'Bolu',
  'Burdur',
  'Bursa',
  'Çanakkale',
  'Çankırı',
  'Çorum',
  'Denizli',
  'Diyarbakır',
  'Düzce',
  'Edirne',
  'Elazığ',
  'Erzincan',
  'Erzurum',
  'Eskişehir',
  'Gaziantep',
  'Giresun',
  'Gümüşhane',
  'Hakkari',
  'Hatay',
  'Iğdır',
  'Isparta',
  'İstanbul',
  'İzmir',
  'Kahramanmaraş',
  'Karabük',
  'Karaman',
  'Kars',
  'Kastamonu',
  'Kayseri',
  'Kırıkkale',
  'Kırklareli',
  'Kırşehir',
  'Kilis',
  'Kocaeli',
  'Konya',
  'Kütahya',
  'Malatya',
  'Manisa',
  'Mardin',
  'Mersin',
  'Muğla',
  'Muş',
  'Nevşehir',
  'Niğde',
  'Ordu',
  'Osmaniye',
  'Rize',
  'Sakarya',
  'Samsun',
  'Siirt',
  'Sinop',
  'Sivas',
  'Şanlıurfa',
  'Şırnak',
  'Tekirdağ',
  'Tokat',
  'Trabzon',
  'Tunceli',
  'Uşak',
  'Van',
  'Yalova',
  'Yozgat',
  'Zonguldak',
] as const;
