import { motion } from "framer-motion";
import type { MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import WordsPullUpMultiStyle from "./WordsPullUpMultiStyle";
import LazyVideo from "./LazyVideo";
import { APPS } from "../content";

const EASE = [0.22, 1, 0.36, 1] as const;

const ACCENT_BG: Record<string, string> = {
  cyan: "rgba(94,210,210,0.22)",
  amber: "rgba(222,180,120,0.22)",
  mint: "rgba(94,210,156,0.22)",
  violet: "rgba(170,140,222,0.24)",
  rose: "rgba(222,140,170,0.22)",
  blue: "rgba(120,170,222,0.22)",
  teal: "rgba(120,210,200,0.22)",
};

function AppCard({
  app,
  index,
}: {
  app: (typeof APPS)[number];
  index: number;
}) {
  const accentBg = ACCENT_BG[app.accent] ?? "rgba(255,255,255,0.06)";
  let mx = 50;
  let my = 50;
  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx = ((e.clientX - r.left) / r.width) * 100;
    my = ((e.clientY - r.top) / r.height) * 100;
  };

  return (
    <motion.a
      href={app.href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={onMove}
      initial={{ opacity: 1, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.9, ease: EASE, delay: (index % 4) * 0.12 + Math.floor(index / 4) * 0.05 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#101010] transition duration-500 hover:-translate-y-1 hover:border-white/25 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.8)]"
      style={{ opacity: 1 }}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0a0a0a]">
        {app.kind === "video" ? (
          <LazyVideo
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            src={app.media}
            poster={app.screenshot}
          />
        ) : (
          <img
            src={app.media}
            loading="eager"
            decoding="async"
            alt={app.name}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-[#101010]/15 to-transparent" />

        <motion.div
          className="pointer-events-none absolute h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
          style={{
            background: accentBg,
            left: `calc(${mx}% - 5rem)`,
            top: `calc(${my}% - 5rem)`,
          }}
          aria-hidden
        />

        <div
          className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-70"
          style={{ background: accentBg }}
        />

        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-white/80 backdrop-blur">
            {app.category}
          </span>
          {app.kind === "video" && (
            <span className="rounded-full bg-white/85 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-black">
              ● 动态预览
            </span>
          )}
        </div>
        <div className="absolute right-4 top-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition-all duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-black">
            <ArrowUpRight size={14} />
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-primary/70 sm:text-[11px]">
            {app.kicker}
          </span>
          <h3
            className="mt-2 text-xl font-medium tracking-tight text-[#E1E0CC] transition-colors group-hover:text-white sm:text-2xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {app.name}
          </h3>
          <p className="mt-2 text-xs leading-[1.6] text-gray-400 sm:text-sm">
            {app.description}
          </p>
        </div>

        <div className="mt-auto flex flex-wrap gap-1.5 border-t border-white/10 pt-4">
          {app.highlights.map((h) => (
            <span
              key={h}
              className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] text-white/70 transition group-hover:border-white/20 group-hover:bg-white/[0.07] sm:text-[11px]"
            >
              {h}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

export default function Apps() {
  return (
    <section id="apps" className="relative bg-black px-4 py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-x-0 -top-20 h-72 opacity-40"
        style={{
          background:
            "radial-gradient(60% 80% at 50% 0%, rgba(222,219,200,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div>
            <span className="mb-5 inline-block text-[10px] uppercase tracking-[0.25em] text-primary/70 sm:text-[11px]">
              项目应用
            </span>
            <WordsPullUpMultiStyle
              segments={[
                {
                  text: "把每一节课都做成可以上线的产品。",
                  className: "text-primary",
                },
              ]}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            />
          </div>
          <p className="max-w-sm text-xs leading-[1.55] text-gray-500 sm:text-sm">
            我和学生们一起把课堂沉淀成真实可用的应用。悬停查看高光,点击任意卡片进入对应站点。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
          {APPS.map((a, i) => (
            <AppCard key={a.id} app={a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
