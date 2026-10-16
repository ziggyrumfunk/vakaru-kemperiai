export const revalidate = 30;

import { setRequestLocale, getTranslations } from "next-intl/server";
import HomeHero from "@/components/HomeHero";
import Reviews from "@/components/Reviews";
import Reveal from "@/components/Reveal";
import SplitText from "@/components/SplitText";
import ScrubText from "@/components/ScrubText";
import Rail from "@/components/Rail";
import VehicleCard from "@/components/VehicleCard";
import WhyUs from "@/components/WhyUs";
import GhostMarquee from "@/components/GhostMarquee";
import ContactBand from "@/components/ContactBand";
import { ArrowRight } from "@/components/Icons";
import { Link } from "@/i18n/navigation";
import { getAllVehicles } from "@/lib/data";
import { CONTACT } from "@/lib/contact";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tn = await getTranslations("nav");
  const vehicles = await getAllVehicles();
  const featured = vehicles.filter((v) => v.featured);
  const railVehicles = featured.length >= 4 ? featured : vehicles.slice(0, 8);
  const minibusCount = vehicles.filter((v) => v.category === "minibus").length;

  const stats = [
    { v: "20+", l: t("statExpLabel") },
    { v: String(vehicles.length), l: t("statFleetLabel") },
    { v: "B", l: t("statLicenseLabel") },
    { v: "Klaipėda", l: t("statBaseLabel") },
  ];
  const whys = [
    { title: t("why1Title"), text: t("why1Text"), image: "/images/camper-5.webp", position: "72% 50%" },
    { title: t("why2Title"), text: t("why2Text"), image: "/images/camper-1.webp", position: "34% 50%" },
    { title: t("why3Title"), text: t("why3Text"), image: "/images/camper-4.webp", position: "42% 50%" },
  ];

  const ld = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    name: "Vakarų kemperiai",
    url: "https://www.vakarukemperiai.lt",
    image: "https://www.vakarukemperiai.lt/images/camper-3.webp",
    telephone: "+37061448046",
    email: CONTACT.email,
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

      {/* About */}
      <section className="pb-[calc(var(--section)*0.75)] pt-[var(--section)]">
        <div className="wrap grid gap-y-12 gap-x-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <div className="flex items-center gap-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="Vakarų kemperiai" className="h-24 w-24 object-contain sm:h-28 sm:w-28" />
              <span className="text-[1.375rem] font-semibold leading-[1.02] tracking-[-0.02em]">
                Vakarų
                <br />
                kemperiai
              </span>
            </div>
            <p className="t-label has-dot mt-10">{t("aboutEyebrow")}</p>
          </Reveal>
          <div className="lg:col-span-8">
            <SplitText as="h2" className="t-h2">{t("aboutTitle")}</SplitText>
            <ScrubText text={t("aboutText")} className="t-statement mt-8 lg:mt-12" />
          </div>
        </div>

        <dl className="wrap mt-20 grid grid-cols-2 lg:mt-28 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 80} className="flex flex-col-reverse justify-end border-t border-line py-7 pr-4 lg:py-9">
              <dt className="mt-3 max-w-[14rem] text-[0.9375rem] text-muted">{s.l}</dt>
              <dd className="text-[clamp(2.5rem,1.6rem+2.6vw,4.25rem)] font-medium leading-none tracking-[-0.045em]">{s.v}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* Fleet */}
      <section className="border-t border-line pt-[calc(var(--section)*0.75)]">
        <Rail
          label={t("featuredTitle")}
          head={
            <>
              <p className="t-label has-dot">{t("featuredEyebrow")}</p>
              <SplitText as="h2" className="t-h2 mt-5">{t("featuredTitle")}</SplitText>
            </>
          }
        >
          {railVehicles.map((v) => (
            <VehicleCard key={v.slug} vehicle={v} sizes="(max-width: 640px) 82vw, 30rem" className="w-[82vw] sm:w-[23rem] lg:w-[28rem]" />
          ))}
        </Rail>
        <div className="wrap mt-12 flex flex-col gap-3 sm:flex-row">
          <Link href="/kemperiai" className="btn btn-dark">
            {t("viewAll")} <ArrowRight className="nudge" />
          </Link>
          {minibusCount > 0 && (
            <Link href="/mikroautobusai" className="btn btn-outline">
              {tn("minibuses")} <ArrowRight className="nudge" />
            </Link>
          )}
        </div>
      </section>

      <WhyUs eyebrow={t("whyEyebrow")} title={t("whyTitle")} items={whys} />

      <GhostMarquee text="Vakarų kemperiai · Klaipėda" />

      <Reviews />

      <ContactBand align="right" position="40% 50%" />
    </>
  );
}
