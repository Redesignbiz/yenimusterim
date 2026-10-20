/**
 * Hero hikâyesinin eşleşme sahnesindeki sokak haritası, 960 × 400'lük bir
 * kutuda. Kanıt bölümü ve kapanış kutusu da aynı çizgileri doku olarak
 * taşıyor; tek kaynakta durduğu için kopyalar birbirinden kaymıyor.
 */
export const STREETS = {
  width: 960,
  height: 400,
  paths: [
    "M -10 132 C 260 100 660 178 970 134",
    "M 262 -10 C 288 120 232 262 282 410",
    "M 742 -10 C 718 140 780 262 748 410",
    "M -10 338 C 300 302 660 372 970 322",
  ],
};

/** `STREETS.paths` içindeki alt yatay sokağın sırası. */
export const LOWER_STREET = 3;
