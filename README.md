# Yeni Müşterim — tanıtım sitesi ve servis noktası kayıt formu

Next.js 16 (App Router) + Tailwind. **Ayrı bir git reposu**: kök `redesignbiz-brisa`
onu izlemez, npm workspace'e de dahil değil (Expo'nun sabitlediği React sürümüyle
çakışırdı). Bağımlılıklar bu klasörden kurulur.

## Çalıştırma

```bash
npm install
npm run dev -- --port 8902     # http://localhost:8902
```

⚠ **Port belirtmek gerekiyor:** Next'in varsayılanı `3000` ve bu makinede dolu.
Projenin port ailesi: backend `8900` · mobil `8901` · **bu site `8902`** · dashboard `5173`.

## Yapılandırma

`.env.example`'ı `.env.local`'e kopyala.

| Değişken | Ne için | Zorunlu mu |
|---|---|---|
| `BRISA_API_BASE` | Kayıt formundaki başvurunun POST edildiği backend adresi | **Evet** — yoksa form "iletilemedi" ekranı basar |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics | Hayır |
| `NEXT_PUBLIC_CLARITY_PROJECT_ID` | Microsoft Clarity | Hayır |

⛔ `BRISA_API_BASE`'in `NEXT_PUBLIC_` öneki **YOK ve olmamalı**: istek Next.js
sunucusundan çıkıyor (`src/app/app/kayit/actions.ts` bir `'use server'` dosyası),
tarayıcıdan değil. Önek eklenirse backend adresi istemci paketine gömülür — ve o
zaman backend'in `CORS_ORIGINS` listesine bu sitenin domainini eklemek de gerekir.
Bugün **gerekmiyor**.

## Kayıt formu

`/app/kayit` → başvuru `POST /api/dealer-applications` ile Brisa backend'ine gider,
`dealer_applications` tablosuna `PENDING` olarak yazılır ve admin dashboard'daki
**Bayi Başvuruları** ekranında incelenip onaylanır. Onay, aynı transaction içinde bir
`dealers` (servis noktası) kaydı açar.

- Alan adları, seçenekler ve doğrulama: `src/lib/kayit.ts` (istemci ve sunucu **ortak**)
- Türkçe seçenek → backend enum eşlemesi: `src/lib/brisa.ts`
- Sunucu tarafı: `src/app/app/kayit/actions.ts`

⚠ Eşleme sözlükleri seçenek dizilerinden **türetilmiş anahtarlara** sahip, yani bir
seçeneğin metni değişirse **build kırılır**. Elle yazılmış bir eşleme o değişikliği
sessizce `undefined`'a çevirip başvuruyu 422'ye düşürürdü.

⚠ Devreye alınmayan Sheets + Apps Script kurgusunun tarihsel kaydı:
`docs/kayit-formu.md`.

---

<details>
<summary>create-next-app şablonundan kalan notlar</summary>

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

</details>
