import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      // Mobil uygulama landing'i.
      url: `${site.url}/app`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      // Servis noktası kayıt başvurusu formu.
      url: `${site.url}/app/kayit`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${site.url}/sss`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${site.url}/iletisim`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${site.url}/gizlilik`,
      // Politikanın kendi yürürlük tarihi — sayfada yazan tarihle aynı kaynaktan.
      lastModified: new Date(site.policyUpdatedAt),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      // Play Console'a ayrı bir URL olarak verilecek sayfa.
      url: `${site.url}/hesap-silme`,
      lastModified: new Date(site.policyUpdatedAt),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
