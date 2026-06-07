export const revalidate = 30;

import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import HomeHero from "@/components/HomeHero";
import VehicleMarquee from "@/components/VehicleMarquee";
import Reviews from "@/components/Reviews";
import FloatingCTA from "@/components/FloatingCTA";
import Reveal from "@/components/Reveal";
import { Link } from "@/i18n/navigation";
import { getAllVehicles } from "@/lib/data";
import { googleRating } from "@/data/reviews";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const vehicles = await getAllVehicles();
  const whys = [
    { t: t("why1Title"), d: t("why1Text") },
    { t: t("why2Title"), d: t("why2Text") },
    { t: t("why3Title"), d: t("why3Text") },
  ];
  const stats = [
    { v: "20+", l: t("statExpLabel") },
    { v: "23", l: t("statFleetLabel") },
    { v: googleRating, l: t("statRatingLabel") },
    { v: "Klaipėda", l: t("statBaseLabel") },
  ];
  const ld = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    name: "Vakarų kemperiai",
    url: "https://www.vakarukemperiai.lt",
    image: "https://www.vakarukemperiai.lt/images/camper-3.webp",
    telephone: "+37061448046",
    email: "vakarukemperiai@gmail.com",
    priceRange: "€€",
    address: { "@type": "PostalAddress", streetAddress: "Liepų g. 60a", addressLocality: "Klaipėda", postalCode: "92106", addressCountry: "LT" },
    geo: { "@type": "GeoCoordinates", latitude: 55.719055, longitude: 21.152318 },
    areaServed: [
      { "@type": "City", name: "Klaipėda" }, { "@type": "City", name: "Palanga" },
      { "@type": "City", name: "Kretinga" }, { "@type": "City", name: "Gargždai" },
      { "@type": "City", name: "Šilutė" }, { "@type": "AdministrativeArea", name: "Klaipėdos apskritis" },
    ],
    sameAs: ["https://www.facebook.com/pages/Vakar%C5%B3-kemperiai/1617402885191172"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <HomeHero />

      {/* About + stats */}
      <section className="container-luxe py-20 sm:py-32 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20 items-center">
        <div>
          <Reveal><p className="eyebrow mb-4">{t("aboutEyebrow")}</p></Reveal>
          <Reveal><h2 className="display text-3xl sm:text-5xl mb-7">{t("aboutTitle")}</h2></Reveal>
          <Reveal delay={80}><p className="text-muted leading-relaxed max-w-xl">{t("aboutText")}</p></Reveal>
        </div>
        <Reveal delay={120}>
          <div className="grid grid-cols-2 gap-px bg-line border border-line">
            {stats.map((s, i) => (
              <div key={i} className="bg-paper p-7 sm:p-10">
                <div className="text-3xl sm:text-4xl font-light text-champagne">{s.v}</div>
                <div className="mt-2 text-xs tracking-widest uppercase text-muted">{s.l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Featured = auto-scrolling marquee of all vehicles */}
      <section className="relative overflow-hidden border-t border-line py-20 sm:py-28">
        <div className="absolute inset-0 -z-10">
          <Image src="/images/camper-4.webp" alt="" fill className="object-cover opacity-[0.08]" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-paper via-paper/90 to-paper" />
        </div>
        <div className="container-luxe mb-10">
          <Reveal><p className="eyebrow mb-4">{t("featuredEyebrow")}</p></Reveal>
          <Reveal><h2 className="display text-4xl sm:text-5xl">{t("featuredTitle")}</h2></Reveal>
        </div>
        <VehicleMarquee vehicles={vehicles} />
        <div className="container-luxe mt-10">
          <Link href="/kemperiai" className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.2em] uppercase text-champagne hover:gap-5 transition-all">
            {t("viewAll")} <span className="text-lg leading-none">→</span>
          </Link>
        </div>
      </section>

      {/* Why us (dark photo band) */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/camper-3.webp" alt="" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-charcoal/85" />
        </div>
        <div className="relative container-luxe py-20 sm:py-28 text-paper">
          <Reveal><p className="text-champagne-soft text-xs font-semibold tracking-[0.28em] uppercase mb-4">{t("whyEyebrow")}</p></Reveal>
          <Reveal><h2 className="display text-3xl sm:text-4xl max-w-2xl mb-14">{t("whyTitle")}</h2></Reveal>
          <div className="grid gap-12 md:grid-cols-3">
            {whys.map((w, i) => (
              <Reveal key={i} delay={i * 90} className="border-t border-champagne-soft/40 pt-7">
                <span className="block text-champagne-soft text-sm tracking-widest mb-4">0{i + 1}</span>
                <h3 className="text-xl font-medium mb-3 text-paper">{w.t}</h3>
                <p className="text-sm text-paper-dim leading-relaxed">{w.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Reviews />

      <FloatingCTA />
    </>
  );
}
