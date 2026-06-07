import type { Metadata } from "next";
import { altMeta } from "@/lib/seo";
import { setRequestLocale, getTranslations } from "next-intl/server";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "terms" });
  return { title: t("title"), description: t("intro"), alternates: altMeta(locale, "/nuomos-salygos") };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("terms");
  const sections = t.raw("sections") as { title: string; body: string }[];
  return (
    <>
      <PageHeader eyebrow="Vakarų kemperiai" title={t("title")} intro={t("intro")} />
      <section className="container-luxe pb-28 max-w-3xl">
        <div className="space-y-10">
          {sections.map((s, i) => (
            <Reveal key={i} className="border-l border-champagne/40 pl-6">
              <h3 className="text-lg font-medium mb-2">{s.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
