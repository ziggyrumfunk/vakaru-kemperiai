import type { Metadata } from "next";
import { altMeta } from "@/lib/seo";
import { setRequestLocale, getTranslations } from "next-intl/server";
import PageHeader from "@/components/PageHeader";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title"), description: t("intro"), alternates: altMeta(locale, "/kontaktai") };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  return (
    <>
      <PageHeader eyebrow="Vakarų kemperiai" title={t("title")} intro={t("intro")} />
      <section className="container-luxe pb-28 grid gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-10">
          <div>
            <h2 className="eyebrow mb-4">{t("addressLabel")}</h2>
            <p className="text-ink">Liepų g. 60a, Klaipėda 92106</p>
          </div>
          <div>
            <h2 className="eyebrow mb-4">{t("phoneLabel")}</h2>
            <ul className="space-y-2 text-ink">
              <li><a href="tel:+37061448046" className="hover:text-champagne transition-colors">+370 614 48046 — Audrius</a></li>
              <li><a href="tel:+37065944888" className="hover:text-champagne transition-colors">+370 659 44888 — Gintautas</a></li>
            </ul>
          </div>
          <div>
            <h2 className="eyebrow mb-4">{t("emailLabel")}</h2>
            <a href="mailto:vakarukemperiai@gmail.com" className="text-ink hover:text-champagne transition-colors">vakarukemperiai@gmail.com</a>
            <div className="mt-5">
              <a href="mailto:vakarukemperiai@gmail.com" className="inline-block bg-champagne text-charcoal px-7 py-3 text-xs font-semibold tracking-[0.16em] uppercase hover:bg-champagne-soft transition-colors">
                {t("writeEmail")}
              </a>
            </div>
          </div>
          <div className="border-t border-line pt-7 text-xs text-muted leading-relaxed">
            <p className="mb-1">MB „Vakarų kemperiai"</p>
            <p>Įm. k. 303075840 · AB SEB bankas</p>
            <p>LT22 7044 0600 0794 4196</p>
          </div>
        </div>
        <div>
          <h2 className="eyebrow mb-4">{t("mapTitle")}</h2>
          <div className="relative w-full aspect-[4/3] border border-line overflow-hidden">
            <iframe
              title="Vakarų kemperiai"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1123.6351383741962!2d21.152317999999987!3d55.719055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e4d955715d2d07%3A0x58be3544ca55b6c6!2sMB+Vakar%C5%B3+Kemperiai!5e0!3m2!1slt!2slt!4v1440873984818"
              className="absolute inset-0 h-full w-full grayscale-[0.3]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
