import type { ReactNode } from "react";
import Reveal from "./Reveal";
import SplitText from "./SplitText";

export default function PageHeader({
  eyebrow,
  title,
  intro,
  aside,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  aside?: ReactNode;
}) {
  return (
    <header className="wrap pb-14 pt-[calc(var(--header-h)+3rem)] sm:pb-20 lg:pt-[calc(var(--header-h)+5.5rem)]">
      {eyebrow && (
        <Reveal gate variant="fade">
          <p className="t-label has-dot">{eyebrow}</p>
        </Reveal>
      )}
      <SplitText as="h1" gate className="t-h1 mt-5 max-w-5xl">{title}</SplitText>
      {(intro || aside) && (
        <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-12 lg:items-end">
          {intro && (
            <Reveal gate delay={300} className="lg:col-span-7">
              <p className="t-lead max-w-2xl text-muted">{intro}</p>
            </Reveal>
          )}
          {aside && (
            <Reveal gate delay={400} className="lg:col-span-4 lg:col-start-9 lg:justify-self-end">
              {aside}
            </Reveal>
          )}
        </div>
      )}
    </header>
  );
}
