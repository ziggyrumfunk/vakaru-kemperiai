import { routing } from "@/i18n/routing";

export const SITE_URL = "https://www.vakarukemperiai.lt";

// Correct hreflang + canonical for a given page path (path like "" or "/kemperiai" or "/kemperiai/slug")
export function altMeta(locale: string, path: string) {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = `/${l}${path}`;
  languages["x-default"] = `/${routing.defaultLocale}${path}`;
  return { canonical: `/${locale}${path}`, languages };
}
