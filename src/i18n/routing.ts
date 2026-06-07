import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["lt", "ru", "lv", "en"],
  defaultLocale: "lt",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
