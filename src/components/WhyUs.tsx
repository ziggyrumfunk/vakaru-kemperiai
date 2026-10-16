"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SplitText from "./SplitText";

type Item = { title: string; text: string; image: string; position?: string };

/**
 * Desktop: the photo column stays put (plain position: sticky) while the reasons
 * scroll past; the photo changes with the reason in the middle of the screen.
 * Mobile: each reason simply has its own photo.
 */
export default function WhyUs({ eyebrow, title, items }: { eyebrow: string; title: string; items: Item[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.idx));
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="section">
      <div className="wrap grid gap-x-8 lg:grid-cols-12">
        <div className="hidden lg:col-span-6 lg:block">
          <div className="sticky top-[calc(var(--header-h)+2rem)] h-[calc(100svh-var(--header-h)-4rem)] overflow-hidden bg-paper-3">
            {items.map((it, i) => (
              <div
                key={i}
                className="absolute inset-0 transition-opacity duration-1000 ease-out-expo"
                style={{ opacity: active === i ? 1 : 0 }}
              >
                <Image
                  src={it.image}
                  alt=""
                  fill
                  sizes="50vw"
                  className="object-cover transition-transform duration-[2200ms] ease-out-expo"
                  style={{ transform: active === i ? "scale(1)" : "scale(1.08)", objectPosition: it.position }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <p className="t-label has-dot">{eyebrow}</p>
          <SplitText as="h2" className="t-h2 mt-5">{title}</SplitText>
          <div className="mt-12 lg:mt-16">
            {items.map((it, i) => (
              <div
                key={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                data-idx={i}
                className={`border-t border-line py-10 transition-opacity duration-700 lg:flex lg:min-h-[64svh] lg:flex-col lg:justify-center lg:py-16 ${
                  active === i ? "" : "lg:opacity-30"
                }`}
              >
                <div className="relative mb-7 aspect-[4/3] overflow-hidden bg-paper-3 lg:hidden">
                  <Image src={it.image} alt="" fill sizes="100vw" className="object-cover" />
                </div>
                <h3 className="t-h3">{it.title}</h3>
                <p className="t-lead mt-4 max-w-md text-muted">{it.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
