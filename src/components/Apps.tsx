import { motion } from "framer-motion";
import type { MouseEvent } from "react";
import { ArrowUpRight, GitBranch } from "lucide-react";
import WordsPullUpMultiStyle from "./WordsPullUpMultiStyle";
import LazyVideo from "./LazyVideo";
import { APPS, GITHUB_PROFILE, MORE_APPS } from "../content";

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
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx = ((e.clientX - r.left) / r.width) * 100;
    my = ((e.clientY - r.top) / r.height) * 100;
  };

  return (
    <motion.div
      onMouseMove={onMove}
      initial={{ opacity: 1, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.9, ease: EASE, delay: (index % 3) * 0.1 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#101010] transition duration-500 hover:-translate-y-1 hover:border-white/25 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.8)]"
    >
      <a
        href={app.href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block aspect-[16/10] w-full overflow-hidden bg-[#0a0a0a]"
        aria-label={`${app.name}（${app.action ?? "查看项目"}）`}
      >
        {app.kind === "video" ? (
          <LazyVideo
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            src={app.media}
            poster={app.screenshot}
          />
        ) : (
          <img
            src={app.media}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
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

        <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
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
      </a>

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-primary/70 sm:text-[11px]">
            {app.kicker}
          </span>
          <h3
            className="mt-2 text-xl font-medium tracking-tight text-[#E1E0CC] transition-colors group-hover:text-white sm:text-2xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <a href={app.href} target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
              {app.name}
            </a>
          </h3>
          <p className="mt-2 text-xs leading-[1.65] text-gray-400 sm:text-sm">
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
          {app.badges?.map((b) => (
            <span
              key={b}
              className="rounded-full border border-primary/25 bg-primary/[0.08] px-2.5 py-1 text-[10px] text-primary sm:text-[11px]"
            >
              {b}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <a
            href={app.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#E1E0CC] transition hover:text-white sm:text-sm"
          >
            {app.action ?? "查看项目"}
            <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          {app.links?.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/50 underline-offset-4 transition hover:text-white hover:underline"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </motion.div>
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
            三件学生作品，三件开源项目。悬停查看高光，点击任意卡片进入对应仓库或演示。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {APPS.map((a, i) => (
            <AppCard key={a.id} app={a} index={i} />
          ))}
        </div>

        <div className="mt-14 border-t border-white/10 pt-8 md:mt-20 md:pt-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-md">
              <span className="mb-3 inline-block text-[10px] uppercase tracking-[0.25em] text-primary/70 sm:text-[11px]">
                其他上线应用
              </span>
              <p className="text-xs leading-[1.7] text-gray-500 sm:text-sm">
                乐启享平台上的常驻应用，日常教学直接用。
              </p>
            </div>
            <div className="flex flex-1 flex-wrap gap-2 lg:max-w-2xl">
              {MORE_APPS.map((app) => (
                <a
                  key={app.id}
                  href={app.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs text-white/70 transition hover:border-white/25 hover:bg-white/[0.07] hover:text-white"
                >
                  <span className="text-[10px] uppercase tracking-[0.12em] text-white/35">{app.tag}</span>
                  <span>{app.name}</span>
                  <ArrowUpRight size={12} className="text-white/35 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/70" />
                </a>
              ))}
            </div>
          </div>

          <a
            href={GITHUB_PROFILE.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 transition hover:border-white/25 hover:bg-white/[0.05]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] text-[#E1E0CC]">
              <GitBranch size={18} />
            </span>
            <span className="flex flex-col">
              <span className="text-sm font-medium text-[#E1E0CC]">{GITHUB_PROFILE.handle}</span>
              <span className="text-[11px] text-white/40">GitHub · {GITHUB_PROFILE.note}</span>
            </span>
            <ArrowUpRight size={16} className="text-white/40 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
          </a>
        </div>
      </div>
    </section>
  );
}
