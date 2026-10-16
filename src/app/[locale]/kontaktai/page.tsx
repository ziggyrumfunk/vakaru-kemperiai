import type { Metadata } from "next";
import { altMeta } from "@/lib/seo";
import { setRequestLocale, getTranslations } from "next-intl/server";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import CopyButton from "@/components/CopyButton";
import MapEmbed from "@/components/MapEmbed";
import { ArrowUpRight, Mail, Phone } from "@/components/Icons";
import { CONTACT } from "@/lib/contact";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title"), description: t("intro"), alternates: altMeta(locale, "/kontaktai") };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const th = await getTranslations("home");

  const phones = [
    { number: CONTACT.phone, href: CONTACT.phoneHref, name: CONTACT.phoneName },
    { number: CONTACT.phone2, href: CONTACT.phone2Href, name: CONTACT.phone2Name },
  ];

  return (
    <>
      <PageHeader eyebrow="Vakarų kemperiai" title={t("title")} intro={t("intro")} />

      <section className="wrap grid gap-x-8 gap-y-16 pb-[var(--section)] lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal className="border-t border-line py-8">
            <h2 className="t-label">{t("phoneLabel")}</h2>
            <ul className="mt-5 space-y-5">
              {phones.map((p) => (
                <li key={p.href} className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
                  <div>
                    <a href={p.href} className="link text-[clamp(1.5rem,1.1rem+1.2vw,2.1rem)] font-medium tracking-[-0.025em]">
                      {p.number}
                    </a>
                    <p className="mt-1 text-muted">{p.name}</p>
                  </div>
                  <a href={p.href} className="btn btn-outline btn-sm">
                    <Phone size={16} /> {th("ctaCall")}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="border-t border-line py-8">
            <h2 className="t-label">{t("emailLabel")}</h2>
            <a href={`mailto:${CONTACT.email}`} className="link mt-5 inline-block break-all text-[clamp(1.25rem,1rem+.9vw,1.6rem)] font-medium tracking-[-0.02em]">
              {CONTACT.email}
            </a>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href={`mailto:${CONTACT.email}`} className="btn btn-primary btn-sm">
                <Mail size={16} /> {t("writeEmail")}
              </a>
              <CopyButton value={CONTACT.email} />
            </div>
          </Reveal>

          <Reveal className="border-t border-line py-8">
            <h2 className="t-label">{t("addressLabel")}</h2>
            <p className="mt-5 text-[1.25rem] font-medium">
              {CONTACT.address} {CONTACT.postcode}
            </p>
            <a href={CONTACT.mapsUrl} target="_blank" rel="noopener noreferrer" className="arrow-link mt-4">
              {t("openMaps")} <ArrowUpRight size={16} />
            </a>
          </Reveal>

          <div className="border-t border-line pt-8 text-[0.9375rem] leading-relaxed text-muted">
            <h2 className="t-label mb-3">{t("companyTitle")}</h2>
            <p>MB „Vakarų kemperiai“</p>
            <p>Įm. k. 303075840 · AB SEB bankas</p>
            <p>LT22 7044 0600 0794 4196</p>
          </div>
        </div>

        <Reveal variant="fade" className="lg:col-span-7">
          <h2 className="t-label mb-5 lg:sr-only">{t("mapTitle")}</h2>
          <MapEmbed />
        </Reveal>
      </section>
    </>
  );
}
