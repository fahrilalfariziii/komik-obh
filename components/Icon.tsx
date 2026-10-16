import type { SVGProps } from "react";

// Satu set ikon, digambar sendiri dengan berat garis seragam 1.75.
// Dipakai bersama oleh semua komponen supaya bahasa visual ikon konsisten.
export const PATHS = {
  home: "M3 11.2 12 4l9 7.2M5.4 9.6V19a1 1 0 0 0 1 1H10v-5.2h4V20h3.6a1 1 0 0 0 1-1V9.6",
  trophy: "M7 4h10v5.2a5 5 0 0 1-10 0V4ZM7 5.6H4.6v1.9A3 3 0 0 0 7 10.4M17 5.6h2.4v1.9a3 3 0 0 1-2.4 2.9M12 14.2V18M8.6 21h6.8M9.4 18h5.2",
  search: "M11 4.6a6.4 6.4 0 1 1 0 12.8 6.4 6.4 0 0 1 0-12.8ZM20 20l-4.9-4.9",
  clock: "M12 4a8 8 0 1 1 0 16 8 8 0 0 1 0-16ZM12 7.6V12l2.9 2",
  fire: "M12 3s4.8 3.7 4.8 8.2a4.8 4.8 0 0 1-9.6 0c0-1.4.6-2.6 1.5-3.6.3 1.2 1 2 2 2.4 0-1.8.4-4.4 1.3-7Z",
  grid: "M4.6 4.6h6v6h-6zM13.4 4.6h6v6h-6zM4.6 13.4h6v6h-6zM13.4 13.4h6v6h-6z",
  menu: "M4 7h16M4 12h16M4 17h16",
  book: "M4 5.4A1.4 1.4 0 0 1 5.4 4H10v15.2H5.4A1.4 1.4 0 0 1 4 17.8ZM20 5.4A1.4 1.4 0 0 0 18.6 4H14v15.2h4.6A1.4 1.4 0 0 0 20 17.8Z",
  play: "M8 5.5v13l11-6.5Z",
  film: "M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5ZM8 4v16M16 4v16M4 9.5h4M4 14.5h4M16 9.5h4M16 14.5h4",
  clapper:
    "M4 9.4h16V18a1.6 1.6 0 0 1-1.6 1.6H5.6A1.6 1.6 0 0 1 4 18ZM4 9.4l1.3-4.1A1.6 1.6 0 0 1 6.8 4h11.6a1.6 1.6 0 0 1 1.5 2l-.9 3.4M8.9 4.1 7.6 9.4M12.9 4.1 11.8 9.4M16.9 4.1 15.9 9.4",
  chevronRight: "m9.5 5.5 6.5 6.5-6.5 6.5",
  chevronLeft: "m14.5 5.5-6.5 6.5 6.5 6.5",
  caretRightFilled: "M9 5.5 17 12l-8 6.5Z",
  caretLeftFilled: "M15 5.5 7 12l8 6.5Z",
  eyeOff:
    "M4 4.6l15.4 15.4M9.9 5.3A9.8 9.8 0 0 1 12 5c5 0 8 5.5 8 7 0 .6-.6 1.9-1.7 3.1M6.3 7C4.4 8.4 3.4 10.6 4 12c1.2 2.4 4 5 8 5 1 0 1.9-.2 2.7-.6M10.1 10.1a2.7 2.7 0 0 0 3.8 3.8",
  shieldOn:
    "M12 4l7 2.6v5.6c0 3.6-2.4 6.9-7 8-4.6-1.1-7-4.4-7-8V6.6ZM9.4 12l1.9 1.9 3.4-3.8",
  close: "M6 6l12 12M18 6L6 18",
  check: "m5 12.5 4.4 4.4L19 6.5",
  arrowUp: "M12 19V5.4M6 11.4 12 5.4l6 6",
  refresh: "M20 5.5v5h-5M4 18.5v-5h5M19.2 10.5A7.4 7.4 0 0 0 6.2 6.9M4.8 13.5a7.4 7.4 0 0 0 13 3.6",
  shieldOff:
    "M12 4l7 2.6v5.6c0 3.6-2.4 6.9-7 8-4.6-1.1-7-4.4-7-8V6.6ZM9.6 9.6l4.8 4.8M14.4 9.6l-4.8 4.8",
  info: "M12 4a8 8 0 1 1 0 16 8 8 0 0 1 0-16ZM12 10.6V16M12 7.6h.01",
  alert: "M12 4.5 3.6 19h16.8ZM12 10v4M12 16.6h.01",
  trending: "M4 16.2 9 11l3.2 3.2L20 6.5M15.8 6.5H20v4.2",
  list: "M8 6.5h12M8 12h12M8 17.5h12M3.6 6.5h.01M3.6 12h.01M3.6 17.5h.01",
  layers: "M12 4 3.5 8.6 12 13.2l8.5-4.6ZM4.6 12.4 12 16.4l7.4-4M4.6 16 12 20l7.4-4",
  sparkles: "M12 4.5 13.6 9 18 10.5 13.6 12 12 16.5 10.4 12 6 10.5 10.4 9ZM18.5 4v3M20 5.5h-3M6 17v2.5M7.25 18.25h-2.5",
  user: "M12 4.8a3.6 3.6 0 1 1 0 7.2 3.6 3.6 0 0 1 0-7.2ZM5 19.4c.5-3 3.2-4.7 7-4.7s6.5 1.7 7 4.7",
  logout: "M14.5 4.5h-7A1.5 1.5 0 0 0 6 6v12a1.5 1.5 0 0 0 1.5 1.5h7M17 8.5 20.5 12 17 15.5M10 12h10.4",
} as const;

export type IconName = keyof typeof PATHS;

// Ikon ini berupa bidang penuh (bukan garis), jadi diisi bukan digaris.
const FILLED = new Set<IconName>(["caretLeftFilled", "caretRightFilled", "fire"]);

type Props = {
  name: IconName;
  size?: number;
  className?: string;
} & Omit<SVGProps<SVGSVGElement>, "name" | "width" | "height">;

export default function Icon({ name, size = 20, className, ...rest }: Props) {
  const filled = FILLED.has(name);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
