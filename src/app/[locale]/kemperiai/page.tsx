export const revalidate = 30;

import type { Metadata } from "next";
import { altMeta } from "@/lib/seo";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import PageHeader from "@/components/PageHeader";
import VehicleCard from "@/components/VehicleCard";
import Reveal from "@/components/Reveal";
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
      <PageHeader eyebrow={`${campers.length} ${t("vehiclesCount")}`} title={t("campersTitle")} intro={t("campersIntro")} image="/images/camper-2.webp" />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image src="/images/camper-1.webp" alt="" fill className="object-cover opacity-[0.07]" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-paper via-paper/92 to-paper" />
        </div>
        <div className="container-luxe pb-28">
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {campers.map((v, i) => (
              <Reveal key={v.slug} delay={(i % 3) * 70}>
                <VehicleCard vehicle={v} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
