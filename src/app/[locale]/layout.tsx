import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { altMeta } from "@/lib/seo";
import HtmlLang from "@/components/HtmlLang";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Loader from "@/components/Loader";
import SmoothScroll from "@/components/SmoothScroll";
import RevealObserver from "@/components/RevealObserver";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: { default: t("homeTitle"), template: `%s · ${t("brand")}` },
    description: t("description"),
    alternates: altMeta(locale, ""),
    openGraph: {
      title: t("homeTitle"),
      description: t("description"),
      type: "website",
      locale,
      siteName: t("brand"),
      images: [{ url: "/media/hero2-poster.jpg", width: 1600, height: 900 }],
    },
    twitter: { card: "summary_large_image", title: t("homeTitle"), description: t("description"), images: ["/media/hero2-poster.jpg"] },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("ui");

  return (
    <NextIntlClientProvider>
      <HtmlLang locale={locale} />
      <SmoothScroll />
      <RevealObserver />
      <a href="#main" className="skip-link">{t("skip")}</a>
      <Loader />
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
    </NextIntlClientProvider>
  );
}
