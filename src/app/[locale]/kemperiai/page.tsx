export const revalidate = 30;

import type { Metadata } from "next";
import { altMeta } from "@/lib/seo";
import { setRequestLocale, getTranslations } from "next-intl/server";
import PageHeader from "@/components/PageHeader";
import VehicleGrid from "@/components/VehicleGrid";
import ContactBand from "@/components/ContactBand";
import { getCampers } from "@/lib/data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "listing" });
  return { title: t("campersTitle"), description: t("campersIntro"), alternates: altMeta(locale, "/kemperiai") };
}

export default async function ListingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("listing");
  const campers = await getCampers();
  return (
    <>
      <PageHeader eyebrow={t("vehiclesCount", { count: campers.length })} title={t("campersTitle")} intro={t("campersIntro")} />
      <VehicleGrid vehicles={campers} />
      <ContactBand image="/images/camper-5.webp" position="72% 50%" />
    </>
  );
}
