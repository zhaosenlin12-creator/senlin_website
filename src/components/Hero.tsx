import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import TypewriterLoop from "./TypewriterLoop";
import { SITE, NAV_ITEMS, KPI } from "../content";

const EASE = [0.16, 1, 0.3, 1] as const;
const CROSSFADE_MS = 1200;
const SWITCH_MS = 12000;

export default function Hero() {
  const [active, setActive] = useState(0);
  const v0 = useRef<HTMLVideoElement | null>(null);
  const v1 = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const a = v0.current;
    const b = v1.current;
    if (!a || !b) return;
    a.muted = true;
    b.muted = true;
    a.loop = false;
    b.loop = false;
    a.play().catch(() => {});
    b.pause();

    let killed = false;
    const id = window.setInterval(() => {
      if (killed) return;
      setActive((cur) => 1 - cur);
    }, SWITCH_MS);

    return () => {
      killed = true;
      window.clearInterval(id);
    };
  }, []);

  useEffect(() => {
    const a = v0.current;
    const b = v1.current;
    if (!a || !b) return;
    if (active === 0) {
      b.pause();
      a.currentTime = 0;
      a.play().catch(() => {});
    } else {
      a.pause();
      b.currentTime = 0;
      b.play().catch(() => {});
    }
  }, [active]);

  return (
    <section className="h-screen w-full p-4 md:p-6">
      <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-[2rem]">
        <video
          ref={v0}
          className="absolute inset-0 h-full w-full object-cover transition-opacity ease-in-out"
          style={{
            opacity: active === 0 ? 1 : 0,
            transitionDuration: `${CROSSFADE_MS}ms`,
          }}
          src={SITE.heroVideos[0]}
          muted
          playsInline
          preload="auto"
        />
        <video
          ref={v1}
          className="absolute inset-0 h-full w-full object-cover transition-opacity ease-in-out"
          style={{
            opacity: active === 1 ? 1 : 0,
            transitionDuration: `${CROSSFADE_MS}ms`,
          }}
          src={SITE.heroVideos[1]}
          muted
          playsInline
          preload="auto"
        />

        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/70" />

        <div className="absolute inset-x-0 top-0 z-20 flex justify-center pt-0">
          <nav
            className="flex items-center gap-3 rounded-b-2xl bg-black px-4 py-2 sm:gap-6 md:rounded-b-3xl md:px-8"
            style={{ color: "rgba(225, 224, 204, 0.8)" }}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-[10px] transition-colors duration-200 hover:text-[#E1E0CC] sm:text-xs md:text-sm"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="absolute left-5 top-1/2 z-10 -translate-y-1/2 sm:left-8 md:left-12 lg:left-16">
          <span
            className="rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.18em] backdrop-blur-md"
            style={{ color: "#DEDBC8" }}
          >
            {SITE.badge}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10 px-5 pb-6 sm:px-8 sm:pb-8 md:px-12 md:pb-10 lg:px-16">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-8">
              <p
                className="mb-4 text-[10px] uppercase tracking-[0.25em] text-primary/70 sm:text-[11px]"
                style={{ color: "rgba(222, 219, 200, 0.7)" }}
              >
                {SITE.kicker}
              </p>

              <h1
                className="block font-medium leading-[0.92] tracking-[-0.045em] text-[#E1E0CC]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(36px, 9.5vw, 124px)",
                }}
              >
                <TypewriterLoop
                  phrases={[
                    "跟森林一起学 Python。",
                    "跟森林一起学 C++。",
                    "跟森林一起造 Web。",
                    "跟森林一起玩 AI。",
                    "跟森林一起搭机器人。",
                  ]}
                  typingMs={85}
                  holdMs={1700}
                  deletingMs={40}
                  className="text-[#E1E0CC]"
                />
              </h1>

              <div className="mt-6 flex items-center gap-3">
                <span className="h-px w-10 bg-[#DEDBC8]/60" aria-hidden="true" />
                <span
                  className="text-[10px] uppercase tracking-[0.3em] text-[#DEDBC8] sm:text-[11px]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Senlin Studio · {SITE.role}
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-end gap-6 md:col-span-4 md:pb-4">
              <motion.p
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
                className="text-xs leading-[1.45] text-primary/70 sm:text-sm md:text-base"
                style={{ color: "#DEDBC8" }}
              >
                {SITE.statement}
              </motion.p>

              <motion.div
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}
                className="flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary py-2.5 pl-5 pr-2.5 text-sm font-medium text-black transition-all duration-300 hover:gap-3 sm:py-3 sm:pl-6 sm:pr-3 sm:text-base"
                >
                  <span>加入实验室</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10">
                    <ArrowRight size={16} className="text-primary" />
                  </span>
                </a>
                <a
                  href="#apps"
                  className="text-xs font-medium text-[#E1E0CC] underline-offset-4 hover:underline sm:text-sm"
                >
                  查看我的项目 →
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
                className="mt-4 grid grid-cols-4 gap-2 border-t border-white/10 pt-4 text-[10px] uppercase tracking-[0.18em] text-white/55 sm:gap-4 sm:text-[11px]"
              >
                {KPI.map((k) => (
                  <div key={k.label} className="flex flex-col">
                    <span
                      className="text-base font-medium text-[#E1E0CC] sm:text-lg"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      {k.value}
                      <span className="text-mint">{k.suffix}</span>
                    </span>
                    <span className="mt-0.5 leading-tight text-white/45">{k.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
