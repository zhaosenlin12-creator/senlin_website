import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import KpiStrip from "./KpiStrip";
import ShinyText from "./motion/ShinyText";
import { HEAD_LINES, STORY, TRACKS } from "../content";
import { accent } from "../lib/accent";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function About() {
  return (
    <section id="story" className="relative overflow-hidden bg-black px-4 py-20 md:py-28">
      <div
        className="pointer-events-none absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(222,219,200,0.18) 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-[360px] w-[360px] rounded-full opacity-20 blur-[110px]"
        style={{ background: "radial-gradient(circle, rgba(94,210,156,0.18) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-[1200px]">
        <div className="mb-10 flex items-center justify-center gap-3 md:mb-14">
          <span className="h-px w-8 bg-white/20" />
          <span
            className="text-[10px] uppercase tracking-[0.3em] sm:text-[11px]"
            style={{ color: "#DEDBC8" }}
          >
            关于我
          </span>
          <span className="h-px w-8 bg-white/20" />
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 1, x: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="md:col-span-4"
          >
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#101010]">
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <img
                  src="/media/photo-wrcc.jpg"
                  loading="lazy"
                  decoding="async"
                  alt="森林 · WRCC2025 世界机器人大赛宜昌锦标赛领奖台"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-white/10 p-5">
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-primary/70">
                    WRCC2025 · 宜昌锦标赛
                  </div>
                  <div className="mt-1 text-sm font-medium text-[#E1E0CC] sm:text-base">
                    森林 · 乐启享合伙人 / 副校长
                  </div>
                  <div className="text-[11px] text-white/45 sm:text-xs">
                    湖北宜昌 · 07 年一线教学
                  </div>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/40 backdrop-blur transition group-hover:border-white/30">
                  <ArrowRight size={14} className="text-[#E1E0CC] transition group-hover:translate-x-0.5" />
                </span>
              </div>

              <div
                className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full opacity-30 blur-3xl"
                style={{ background: "rgba(94,210,156,0.25)" }}
              />
            </div>
          </motion.div>

          <div className="md:col-span-8 md:py-2">
            <h2
              className="text-[clamp(30px,5.2vw,60px)] font-medium leading-[1.08] tracking-[-0.02em] text-[#E1E0CC]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {HEAD_LINES.map((l, i) => (
                <span key={i} className="block">
                  <motion.span
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: EASE, delay: i * 0.12 }}
                    className={
                      "block " + (l.italic ? "italic text-primary" : "text-[#E1E0CC]")
                    }
                  >
                    {l.italic ? (
                      <ShinyText from="#DEDBC8" to="#5ED29C">{l.text}</ShinyText>
                    ) : (
                      l.text
                    )}
                  </motion.span>
                </span>
              ))}
            </h2>

            <div className="mt-6 max-w-xl space-y-5 text-[15px] leading-[1.85] text-gray-300 sm:text-base md:text-[17px]">
              {STORY.map((p, i) => (
                <p key={i} className={i === 1 ? "italic text-primary/80" : ""}>
                  {p}
                </p>
              ))}
            </div>

            <KpiStrip className="mt-10" />
          </div>
        </div>

        {/* 两条赛道：全站只在这里分流一次 */}
        <div className="mt-14 grid grid-cols-1 gap-4 md:mt-20 md:grid-cols-2">
          {TRACKS.map((track, i) => {
            const c = accent(track.accent);
            return (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#101010] p-6 transition duration-500 hover:border-white/25 sm:p-7"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-70"
                  style={{
                    background: `radial-gradient(80% 70% at 100% 0%, ${c.glow}, transparent 65%)`,
                  }}
                />
                <div className="relative flex flex-wrap items-center gap-3">
                  <span
                    className="rounded-full px-2.5 py-1 text-[10px] font-medium tracking-[0.14em]"
                    style={{ color: c.text, background: c.glow }}
                  >
                    {track.label}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-white/40">
                    {track.note}
                  </span>
                </div>
                <h3
                  className="relative mt-4 text-xl font-medium leading-snug tracking-tight text-[#E1E0CC] sm:text-2xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {track.headline}
                </h3>
                <p className="relative mt-2.5 text-xs leading-[1.75] text-gray-400 sm:text-[13.5px]">
                  {track.desc}
                </p>
                <ul className="relative mt-5 flex flex-wrap gap-1.5">
                  {track.points.map((p) => (
                    <li
                      key={p}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/70"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
                <a
                  href={track.id === "k12" ? "#course-k12" : "#course-adult"}
                  className="relative mt-6 inline-flex items-center gap-2 text-xs font-medium text-[#E1E0CC] transition hover:gap-3 sm:text-sm"
                >
                  {track.id === "k12" ? "看少儿 4 门课" : "看成人 2 门课"}
                  <ArrowDown size={14} className="transition-transform" />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
