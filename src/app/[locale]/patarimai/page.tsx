import type { Metadata } from "next";
import { altMeta } from "@/lib/seo";
import { setRequestLocale, getTranslations } from "next-intl/server";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tips" });
  return { title: t("title"), description: t("intro"), alternates: altMeta(locale, "/patarimai") };
}

export default async function TipsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("tips");
  const items = t.raw("items") as { title: string; text: string }[];
  return (
    <>
      <PageHeader eyebrow="Vakarų kemperiai" title={t("title")} intro={t("intro")} image="/images/camper-4.webp" />
      <section className="container-luxe pb-28 max-w-3xl">
        <div className="border-t border-line">
          {items.map((it, i) => (
            <Reveal key={i} className="flex gap-6 py-7 border-b border-line">
              <span className="text-champagne text-sm tracking-widest pt-1 shrink-0">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-lg font-medium mb-2">{it.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{it.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
