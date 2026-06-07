import type { Metadata } from "next";
import { altMeta } from "@/lib/seo";
import { setRequestLocale, getTranslations } from "next-intl/server";
import PageHeader from "@/components/PageHeader";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });
  return { title: t("title"), description: t("intro"), alternates: altMeta(locale, "/duk") };
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("faq");
  const items = t.raw("items") as { q: string; a: string }[];
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHeader eyebrow="FAQ" title={t("title")} intro={t("intro")} />
      <section className="container-luxe pb-28 max-w-3xl">
        <div className="border-t border-line">
          {items.map((it, i) => (
            <details key={i} className="group border-b border-line">
              <summary className="flex items-center justify-between gap-6 cursor-pointer list-none py-6">
                <span className="text-base sm:text-lg font-medium pr-4">{it.q}</span>
                <span className="text-champagne text-2xl leading-none transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <p className="text-sm text-muted leading-relaxed pb-6 max-w-2xl">{it.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
