import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const HEAD = "text-champagne-soft text-xs font-semibold tracking-[0.28em] uppercase";

export default function SiteFooter() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-paper-dim">
      <div className="container-luxe py-16 grid gap-12 md:grid-cols-[1.4fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-3 mb-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="Vakarų kemperiai" className="h-10 w-10 object-contain invert opacity-90" />
            <span className="text-sm font-semibold tracking-[0.22em] uppercase text-paper">
              Vakarų <span className="text-champagne-soft">kemperiai</span>
            </span>
          </div>
          <p className="text-sm text-muted-dark max-w-xs leading-relaxed">{t("tagline")}</p>
        </div>

        <div>
          <h3 className={`${HEAD} mb-5`}>{t("navTitle")}</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/kemperiai" className="hover:text-champagne-soft transition-colors">{tn("campers")}</Link></li>
            <li><Link href="/mikroautobusai" className="hover:text-champagne-soft transition-colors">{tn("minibuses")}</Link></li>
            <li><Link href="/patarimai" className="hover:text-champagne-soft transition-colors">{tn("tips")}</Link></li>
            <li><Link href="/duk" className="hover:text-champagne-soft transition-colors">{tn("faq")}</Link></li>
            <li><Link href="/nuomos-salygos" className="hover:text-champagne-soft transition-colors">{t("termsLink")}</Link></li>
            <li><Link href="/kontaktai" className="hover:text-champagne-soft transition-colors">{tn("contact")}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className={`${HEAD} mb-5`}>{t("contactTitle")}</h3>
          <ul className="space-y-3 text-sm">
            <li>Liepų g. 60a, Klaipėda</li>
            <li><a href="tel:+37061448046" className="hover:text-champagne-soft transition-colors">+370 614 48046 — Audrius</a></li>
            <li><a href="tel:+37065944888" className="hover:text-champagne-soft transition-colors">+370 659 44888 — Gintautas</a></li>
            <li><a href="mailto:vakarukemperiai@gmail.com" className="hover:text-champagne-soft transition-colors">vakarukemperiai@gmail.com</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line-dark">
        <div className="container-luxe py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-dark">
          <span>© {year} MB „Vakarų kemperiai". {t("rights")}</span>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
            <span>Site by <a href="https://www.rumfunk.nl" target="_blank" rel="noopener" className="text-champagne-soft hover:text-champagne transition-colors">rumfunk.nl</a></span>
            <Link href="/admin" className="tracking-widest uppercase hover:text-champagne-soft transition-colors">Admin</Link>
            <span className="tracking-widest uppercase">Klaipėda · Lietuva</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
