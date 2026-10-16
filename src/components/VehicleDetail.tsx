import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import VehicleGallery from "./VehicleGallery";
import VehicleCard from "./VehicleCard";
import Rail from "./Rail";
import Reveal from "./Reveal";
import SplitText from "./SplitText";
import MobileEnquiryBar from "./MobileEnquiryBar";
import { ArrowLeft, ArrowRight, Check, Mail, Phone } from "./Icons";
import { CONTACT } from "@/lib/contact";
import type { Vehicle } from "@/data/vehicles";

export default function VehicleDetail({ vehicle, others }: { vehicle: Vehicle; others: Vehicle[] }) {
  const t = useTranslations("vehicle");
  const locale = useLocale() as "lt" | "ru" | "lv" | "en";
  const isCamper = vehicle.category === "camper";
  const backHref = isCamper ? "/kemperiai" : "/mikroautobusai";
  const description = vehicle.descriptions?.[locale] ?? vehicle.descriptionLt;

  const m = (cm?: number) => (cm ? `${(cm / 100).toFixed(1)} m` : undefined);
  const power = vehicle.powerKw ? `${vehicle.powerKw} kW${vehicle.powerHp ? ` · ${vehicle.powerHp} AG` : ""}` : undefined;
  const transmission = vehicle.transmission
    ? t(vehicle.transmission === "automatic" ? "transmissionAutomatic" : "transmissionManual")
    : undefined;

  const facts: [string, string | undefined][] = [
    [t("specs.chassis"), vehicle.chassis],
    [t("specs.seats"), vehicle.seats ? String(vehicle.seats) : undefined],
    [t("specs.berths"), vehicle.berths ? String(vehicle.berths) : undefined],
    [t("specs.transmission"), transmission],
  ];
  const rows: [string, string | undefined][] = [
    [t("specs.chassis"), vehicle.chassis],
    [t("specs.engine"), vehicle.engine],
    [t("specs.power"), power],
    [t("specs.year"), vehicle.year ? String(vehicle.year) : undefined],
    [t("specs.transmission"), transmission],
    [t("specs.seats"), vehicle.seats ? String(vehicle.seats) : undefined],
    [t("specs.berths"), vehicle.berths ? String(vehicle.berths) : undefined],
    [t("specs.length"), m(vehicle.lengthCm)],
    [t("specs.height"), m(vehicle.heightCm)],
    [t("specs.width"), m(vehicle.widthCm)],
    [t("specs.weight"), vehicle.weightKg ? `${vehicle.weightKg} kg` : undefined],
    [t("specs.water"), vehicle.waterL ? `${vehicle.waterL} l` : undefined],
    [t("specs.fuelTank"), vehicle.fuelTankL ? `${vehicle.fuelTankL} l` : undefined],
    [t("specs.consumption"), vehicle.consumption],
  ];
  const keyFacts = facts.filter(([, v]) => v);
  const specRows = rows.filter(([, v]) => v);

  const mailHref = `mailto:${CONTACT.email}?subject=${encodeURIComponent(vehicle.name)}&body=${encodeURIComponent(
    t("mailBody", { name: vehicle.name })
  )}`;

  return (
    <>
      <div className="wrap pt-[calc(var(--header-h)+2rem)] lg:pt-[calc(var(--header-h)+3.5rem)]">
        <Link href={backHref} className="arrow-link text-[0.9375rem] text-muted transition-colors hover:text-ink">
          <ArrowLeft size={17} /> {t("back")}
        </Link>

        <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            {vehicle.vip && (
              <Reveal gate variant="fade">
                <p className="t-label has-dot">VIP</p>
              </Reveal>
            )}
            <SplitText as="h1" gate className={`t-h1 ${vehicle.vip ? "mt-4" : ""}`}>{vehicle.name}</SplitText>
          </div>
          {keyFacts.length > 0 && (
            <Reveal gate delay={300} className="lg:col-span-5">
              <dl className="grid grid-cols-2 border-t border-line sm:grid-cols-4">
                {keyFacts.map(([label, value]) => (
                  <div key={label} className="flex flex-col-reverse justify-end border-b border-line py-4 pr-3 sm:border-b-0">
                    <dt className="mt-1 text-[0.875rem] text-muted">{label}</dt>
                    <dd className="text-[1.125rem] font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          )}
        </div>

        <Reveal gate delay={200} className="mt-8 lg:mt-12">
          <VehicleGallery images={vehicle.images} name={vehicle.name} />
        </Reveal>

        <div className="mt-16 grid gap-x-8 gap-y-16 pb-[var(--section)] lg:mt-24 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {description && <p className="t-statement">{description}</p>}

            {specRows.length > 0 && (
              <section className={description ? "mt-16 lg:mt-20" : ""}>
                <h2 className="t-label has-dot">{t("specsTitle")}</h2>
                <dl className="mt-6 grid border-t border-line sm:grid-cols-2 sm:gap-x-10">
                  {specRows.map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-4 border-b border-line py-4">
                      <dt className="text-muted">{label}</dt>
                      <dd className="text-right font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            {vehicle.features.length > 0 && (
              <section className="mt-16 lg:mt-20">
                <h2 className="t-label has-dot">{t("featuresTitle")}</h2>
                <ul className="mt-6 grid gap-x-10 sm:grid-cols-2">
                  {vehicle.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 border-b border-line py-4">
                      <span className="inline-grid h-7 w-7 shrink-0 place-items-center rounded-[2px] bg-paper-2 text-accent">
                        <Check size={15} />
                      </span>
                      {t(`features.${f}`)}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <aside className="lg:col-span-4 lg:col-start-9" id="enquire">
            <div className="border border-line bg-paper p-6 sm:p-8 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
              <p className="t-label">{t("priceOnRequest")}</p>
              <p className="mt-2 text-[0.9375rem] text-muted">{t("priceNote")}</p>
              <h2 className="t-h3 mt-8">{t("inquireTitle")}</h2>
              <p className="mt-3 text-muted">{t("inquireText")}</p>
              <div className="mt-7 grid gap-3">
                <a href={mailHref} className="btn btn-primary">
                  <Mail size={17} /> {t("emailCta")}
                </a>
                <a href={CONTACT.phoneHref} className="btn btn-outline">
                  <Phone size={17} /> {CONTACT.phone}
                </a>
              </div>
              <p className="mt-5 text-[0.9375rem] text-muted">
                {CONTACT.phone2Name}:{" "}
                <a href={CONTACT.phone2Href} className="link text-ink">{CONTACT.phone2}</a>
              </p>
            </div>
          </aside>
        </div>
      </div>

      {others.length > 0 && (
        <section className="section border-t border-line bg-paper-2">
          <Rail
            label={isCamper ? t("moreCampers") : t("moreMinibuses")}
            head={<SplitText as="h2" className="t-h2">{isCamper ? t("moreCampers") : t("moreMinibuses")}</SplitText>}
          >
            {others.map((v) => (
              <VehicleCard key={v.slug} vehicle={v} sizes="(max-width: 640px) 82vw, 26rem" className="w-[82vw] sm:w-[22rem] lg:w-[25rem]" />
            ))}
          </Rail>
          <div className="wrap mt-12">
            <Link href={backHref} className="arrow-link">
              {isCamper ? t("moreCampers") : t("moreMinibuses")} <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      )}

      <MobileEnquiryBar mailHref={mailHref} callLabel={t("callCta")} emailLabel={t("emailShort")} />
    </>
  );
}
