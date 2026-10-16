import type { Metadata } from "next";
import { altMeta } from "@/lib/seo";
import { setRequestLocale, getTranslations } from "next-intl/server";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ParallaxImage from "@/components/ParallaxImage";
import ContactBand from "@/components/ContactBand";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tips" });
  return { title: t("title"), description: t("intro"), alternates: altMeta(locale, "/patarimai") };
}

export default async function TipsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("tips");
  const tn = await getTranslations("nav");
  const items = t.raw("items") as { title: string; text: string }[];

  return (
    <>
      <PageHeader eyebrow={tn("tips")} title={t("title")} intro={t("intro")} />

      <Reveal variant="clip" className="w-full">
        <ParallaxImage src="/images/camper-4.webp" amount={12} priority className="h-[56svh] min-h-[22rem] w-full lg:h-[78svh]" />
      </Reveal>

      <section className="wrap grid gap-x-12 py-[var(--section)] md:grid-cols-2 lg:gap-x-20">
        {items.map((it, i) => (
          <Reveal key={i} delay={(i % 2) * 90} className="border-t border-line py-9 lg:py-12">
            <h2 className="t-h3">{it.title}</h2>
            <p className="mt-4 max-w-xl text-muted">{it.text}</p>
          </Reveal>
        ))}
      </section>

      <ContactBand image="/images/camper-1.webp" align="right" position="30% 50%" />
    </>
  );
}
