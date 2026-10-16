import type { Metadata } from "next";
import { altMeta } from "@/lib/seo";
import { setRequestLocale, getTranslations } from "next-intl/server";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { Mail, Phone, Plus } from "@/components/Icons";
import { CONTACT } from "@/lib/contact";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });
  return { title: t("title"), description: t("intro"), alternates: altMeta(locale, "/duk") };
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("faq");
  const tn = await getTranslations("nav");
  const th = await getTranslations("home");
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
      <PageHeader eyebrow={tn("faq")} title={t("title")} intro={t("intro")} />

      <section className="wrap grid gap-x-8 gap-y-14 pb-[var(--section)] lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Reveal className="border-t border-line">
            {items.map((it, i) => (
              <details key={i} name="faq" className="acc group border-b border-line" open={i === 0}>
                <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 sm:py-7">
                  <span className="text-[clamp(1.125rem,1rem+.5vw,1.4rem)] font-medium tracking-[-0.015em]">{it.q}</span>
                  <span className="acc-icon inline-grid h-10 w-10 shrink-0 place-items-center rounded-[2px] border border-line transition-colors group-hover:border-ink">
                    <Plus size={18} />
                  </span>
                </summary>
                <p className="max-w-2xl pb-8 pr-14 text-muted">{it.a}</p>
              </details>
            ))}
          </Reveal>
        </div>

        <aside className="lg:col-span-4">
          <Reveal className="bg-paper-2 p-7 sm:p-8 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
            <p className="t-label has-dot">{tn("contact")}</p>
            <p className="t-h3 mt-5">{th("ctaBandTitle")}</p>
            <p className="mt-3 text-muted">{th("ctaBandText")}</p>
            <div className="mt-7 grid gap-3">
              <a href={CONTACT.phoneHref} className="btn btn-primary">
                <Phone size={17} /> {CONTACT.phone}
              </a>
              <a href={`mailto:${CONTACT.email}`} className="btn btn-outline">
                <Mail size={17} /> {th("ctaEmail")}
              </a>
            </div>
          </Reveal>
        </aside>
      </section>
    </>
  );
}
