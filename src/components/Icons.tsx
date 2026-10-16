import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 18, children, ...rest }: P) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (p: P) => (
  <Svg {...p}><path d="M4 12h15M13 6l6 6-6 6" /></Svg>
);
export const ArrowLeft = (p: P) => (
  <Svg {...p}><path d="M20 12H5M11 6l-6 6 6 6" /></Svg>
);
export const ArrowUpRight = (p: P) => (
  <Svg {...p}><path d="M7 17 17 7M8 7h9v9" /></Svg>
);
export const Phone = (p: P) => (
  <Svg {...p}>
    <path d="M5 4h3.5l1.8 4.4-2.3 1.4a11 11 0 0 0 6.2 6.2l1.4-2.3L20 15.5V19a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z" />
  </Svg>
);
export const Mail = (p: P) => (
  <Svg {...p}><rect x="3" y="5" width="18" height="14" rx="1" /><path d="m4 7 8 6 8-6" /></Svg>
);
export const Pin = (p: P) => (
  <Svg {...p}><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" /><circle cx="12" cy="10" r="2.3" /></Svg>
);
export const Plus = (p: P) => (
  <Svg {...p}><path d="M12 5v14M5 12h14" /></Svg>
);
export const Close = (p: P) => (
  <Svg {...p}><path d="M6 6l12 12M18 6 6 18" /></Svg>
);
export const Check = (p: P) => (
  <Svg {...p}><path d="m5 12.5 4.2 4.2L19 7" /></Svg>
);
export const Copy = (p: P) => (
  <Svg {...p}><rect x="8" y="8" width="12" height="12" rx="1" /><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" /></Svg>
);
export const Play = (p: P) => (
  <Svg {...p}><path d="M8 5.5v13l10.5-6.5L8 5.5Z" fill="currentColor" stroke="none" /></Svg>
);
export const Pause = (p: P) => (
  <Svg {...p}><path d="M8 5v14M16 5v14" strokeWidth={2.2} /></Svg>
);
export const Expand = (p: P) => (
  <Svg {...p}><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></Svg>
);
