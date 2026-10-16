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
      <section className="wrap pb-[var(--section)]">
        {sections.map((s, i) => (
          <Reveal key={i} className="grid gap-4 border-t border-line py-9 lg:grid-cols-12 lg:gap-8 lg:py-12">
            <h2 className="t-h3 lg:col-span-4">{s.title}</h2>
            <p className="t-lead max-w-2xl text-muted lg:col-span-7 lg:col-start-6">{s.body}</p>
          </Reveal>
        ))}
      </section>
    </>
  );
}
