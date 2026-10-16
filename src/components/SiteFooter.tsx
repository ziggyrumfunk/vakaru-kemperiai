import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CONTACT } from "@/lib/contact";
import { ArrowRight } from "./Icons";

export default function SiteFooter() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const th = useTranslations("header");
  const year = new Date().getFullYear();

  const links = [
    { href: "/kemperiai", label: tn("campers") },
    { href: "/mikroautobusai", label: tn("minibuses") },
    { href: "/patarimai", label: tn("tips") },
    { href: "/duk", label: tn("faq") },
    { href: "/nuomos-salygos", label: t("termsLink") },
    { href: "/kontaktai", label: tn("contact") },
  ];

  return (
    <footer className="on-dark overflow-hidden bg-ink text-paper" data-footer>
      <div className="wrap pt-20 sm:pt-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="" className="h-14 w-14 object-contain invert" />
            <p className="mt-6 max-w-sm text-paper-dim">{t("tagline")}</p>
            <Link href="/kontaktai" className="btn btn-light mt-8">
              {th("bookCta")} <ArrowRight className="nudge" />
            </Link>
          </div>

          <nav className="lg:col-span-3" aria-label={t("navTitle")}>
            <h2 className="t-label">{t("navTitle")}</h2>
            <ul className="mt-6 space-y-3">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link">{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h2 className="t-label">{t("contactTitle")}</h2>
            <ul className="mt-6 space-y-3">
              <li>
                <a href={CONTACT.phoneHref} className="link">{CONTACT.phone}</a>
                <span className="text-muted-dark"> · {CONTACT.phoneName}</span>
              </li>
              <li>
                <a href={CONTACT.phone2Href} className="link">{CONTACT.phone2}</a>
                <span className="text-muted-dark"> · {CONTACT.phone2Name}</span>
              </li>
              <li><a href={`mailto:${CONTACT.email}`} className="link">{CONTACT.email}</a></li>
              <li className="text-paper-dim">{CONTACT.address}</li>
            </ul>
          </div>
        </div>

        <p
          className="mt-20 select-none whitespace-nowrap text-[min(11.2vw,10.2rem)] font-medium leading-[0.8] tracking-[-0.055em] text-paper sm:mt-28"
          aria-hidden="true"
        >
          Vakarų kemperiai
        </p>

        <div className="mt-8 flex flex-col gap-3 border-t border-line-dark py-6 text-[0.875rem] text-muted-dark sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} MB „Vakarų kemperiai“. {t("rights")}</span>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>
              Site by{" "}
              <a href="https://www.rumfunk.nl" target="_blank" rel="noopener" className="link text-paper-dim">rumfunk.nl</a>
            </span>
            <Link href="/admin" className="link">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
