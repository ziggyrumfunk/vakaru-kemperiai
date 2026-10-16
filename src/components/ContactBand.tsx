import { useTranslations } from "next-intl";
import ParallaxImage from "./ParallaxImage";
import Reveal from "./Reveal";
import SplitText from "./SplitText";
import { ArrowRight, Phone } from "./Icons";
import { CONTACT } from "@/lib/contact";

/** Full-bleed photo at its own brightness, with the call to action on a paper panel. */
export default function ContactBand({
  image = "/images/camper-2.webp",
  align = "left",
  position = "50% 50%",
}: {
  image?: string;
  /** focal point of the photo, so phones (tall crop) still show the camper */
  position?: string;
  /** which side the panel sits on; pick the side without the camper */
  align?: "left" | "right";
}) {
  const t = useTranslations("home");

  return (
    <section className="relative pb-[var(--section)]">
      <ParallaxImage src={image} position={position} amount={12} className="h-[72svh] min-h-[26rem] w-full lg:h-[92svh]" />
      <div className="wrap relative -mt-24 sm:-mt-40 lg:-mt-72">
        <Reveal className={`max-w-3xl bg-paper p-7 sm:p-12 lg:p-16 ${align === "right" ? "lg:ml-auto" : ""}`}>
          <p className="t-label has-dot">Vakarų kemperiai</p>
          <SplitText as="h2" className="t-h2 mt-5">{t("ctaBandTitle")}</SplitText>
          <p className="t-lead mt-6 max-w-xl text-muted">{t("ctaBandText")}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={CONTACT.phoneHref} className="btn btn-primary">
              <Phone size={17} /> {t("ctaCall")} {CONTACT.phone}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="btn btn-outline">
              {t("ctaEmail")} <ArrowRight className="nudge" />
            </a>
          </div>
          <p className="mt-6 text-[0.9375rem] text-muted">
            {CONTACT.phone2Name}:{" "}
            <a href={CONTACT.phone2Href} className="link text-ink">{CONTACT.phone2}</a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
