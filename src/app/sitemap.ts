import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/seo";
import { getAllVehicles } from "@/lib/data";

const PATHS = ["", "/kemperiai", "/mikroautobusai", "/patarimai", "/duk", "/nuomos-salygos", "/kontaktai"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const vehicles = await getAllVehicles();
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of routing.locales) {
    for (const p of PATHS) {
      entries.push({ url: `${SITE_URL}/${locale}${p}`, changeFrequency: "weekly", priority: p === "" ? 1 : 0.7 });
    }
    for (const v of vehicles) {
      const base = v.category === "camper" ? "/kemperiai" : "/mikroautobusai";
      entries.push({ url: `${SITE_URL}/${locale}${base}/${v.slug}`, changeFrequency: "monthly", priority: 0.6 });
    }
  }
  return entries;
}
