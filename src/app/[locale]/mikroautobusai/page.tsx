export const revalidate = 30;

import type { Metadata } from "next";
import { altMeta } from "@/lib/seo";
import { setRequestLocale, getTranslations } from "next-intl/server";
import PageHeader from "@/components/PageHeader";
import VehicleGrid from "@/components/VehicleGrid";
import ContactBand from "@/components/ContactBand";
import { getMinibuses } from "@/lib/data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "listing" });
  return { title: t("minibusesTitle"), description: t("minibusesIntro"), alternates: altMeta(locale, "/mikroautobusai") };
}

export default async function ListingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("listing");
  const minibuses = await getMinibuses();
  return (
    <>
      <PageHeader eyebrow={t("vehiclesCount", { count: minibuses.length })} title={t("minibusesTitle")} intro={t("minibusesIntro")} />
      <VehicleGrid vehicles={minibuses} />
      <ContactBand image="/images/camper-3.webp" align="right" position="30% 50%" />
    </>
  );
}
