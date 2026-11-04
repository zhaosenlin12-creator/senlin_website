// 各板块共用的强调色。跟 Apps.tsx 里已有的 accent 色系保持一致。
export const ACCENTS = {
  cream: { text: "#DEDBC8", glow: "rgba(222,219,200,0.20)", edge: "rgba(222,219,200,0.30)" },
  mint: { text: "#5ED29C", glow: "rgba(94,210,156,0.22)", edge: "rgba(94,210,156,0.32)" },
  cyan: { text: "#5ED2D2", glow: "rgba(94,210,210,0.22)", edge: "rgba(94,210,210,0.32)" },
  amber: { text: "#DEB478", glow: "rgba(222,180,120,0.22)", edge: "rgba(222,180,120,0.32)" },
  violet: { text: "#AA8CDE", glow: "rgba(170,140,222,0.24)", edge: "rgba(170,140,222,0.34)" },
  rose: { text: "#DE8CAA", glow: "rgba(222,140,170,0.22)", edge: "rgba(222,140,170,0.32)" },
} as const;

export type AccentKey = keyof typeof ACCENTS;

export function accent(key: string) {
  return ACCENTS[(key as AccentKey) in ACCENTS ? (key as AccentKey) : "cream"];
}
