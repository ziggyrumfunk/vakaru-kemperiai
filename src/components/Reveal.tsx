import type { CSSProperties, ElementType, ReactNode } from "react";

/**
 * Wrapper that animates in when scrolled into view.
 * "up" rises and fades, "fade" only fades, "clip" wipes open from the top
 * (put a .settle element inside it for the slow image settle).
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  variant = "up",
  as: Tag = "div",
  gate = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: "up" | "fade" | "clip";
  as?: ElementType;
  gate?: boolean;
}) {
  const style = delay ? ({ "--d": `${delay}ms` } as CSSProperties) : undefined;
  const Comp = Tag as "div";
  return (
    <Comp data-reveal={variant} data-gate={gate ? "" : undefined} className={className} style={style}>
      {children}
    </Comp>
  );
}
