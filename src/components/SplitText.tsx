import { Fragment, type CSSProperties, type ElementType } from "react";

/**
 * Heading whose words rise out of masks when it scrolls into view.
 * Plain server markup: RevealObserver flips data-in, globals.css animates.
 */
export default function SplitText({
  children,
  as: Tag = "span",
  className = "",
  gate = false,
  delay = 0,
  id,
}: {
  children: string;
  as?: ElementType;
  className?: string;
  /** wait for the intro loader before revealing */
  gate?: boolean;
  delay?: number;
  id?: string;
}) {
  const words = children.split(/\s+/).filter(Boolean);
  const style = delay ? ({ "--d": `${delay}ms` } as CSSProperties) : undefined;
  const Comp = Tag as "span";
  return (
    <Comp id={id} className={`split ${className}`} data-reveal="split" data-gate={gate ? "" : undefined} style={style}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="wm">
            <span className="w" style={{ "--i": i } as CSSProperties}>{word}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Comp>
  );
}
