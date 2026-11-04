import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import WordsPullUpMultiStyle from "./WordsPullUpMultiStyle";
import KpiStrip from "./KpiStrip";
import { CONTACT, MENTORSHIP } from "../content";
import { accent } from "../lib/accent";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Mentorship() {
  return (
    <section id="mentor" className="relative overflow-hidden bg-black px-4 py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-x-0 top-1/4 h-[420px] opacity-50"
        style={{
          background:
            "radial-gradient(50% 100% at 50% 50%, rgba(94,210,156,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px]">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:mb-20 md:flex-row md:items-end">
          <div className="flex flex-col items-start gap-5">
            <span className="inline-block text-[10px] uppercase tracking-[0.25em] text-primary/70 sm:text-[11px]">
              收徒
            </span>
            <WordsPullUpMultiStyle
              segments={[
                { text: MENTORSHIP.title, className: "text-primary" },
              ]}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            />
          </div>
          <div className="max-w-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-mint/30 bg-mint/10 px-3 py-1 text-[11px] tracking-[0.12em] text-mint">
              <Sparkles size={12} />
              {MENTORSHIP.badge}
            </span>
            <p className="mt-4 text-xs leading-[1.7] text-gray-500 sm:text-sm">
              {MENTORSHIP.intro}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3">
          {MENTORSHIP.paths.map((path, i) => {
            const c = accent(path.accent);
            return (
              <motion.div
                key={path.id}
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.85, ease: EASE, delay: i * 0.12 }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#101010] p-6 transition duration-500 hover:border-white/25 sm:p-7"
              >
                <span
                  className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: c.text }}
                />
                <div
                  className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-70"
                  style={{ background: c.glow }}
                />

                <span
                  className="relative text-[10px] uppercase tracking-[0.2em]"
                  style={{ color: c.text }}
                >
                  {path.audience}
                </span>
                <h3
                  className="relative mt-3 text-xl font-medium leading-snug tracking-tight text-[#E1E0CC] sm:text-2xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {path.title}
                </h3>
                <p className="relative mt-3 text-xs leading-[1.75] text-gray-400 sm:text-[13.5px]">
                  {path.desc}
                </p>
                <ul className="relative mt-5 space-y-2.5">
                  {path.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5">
                      <Check size={13} className="mt-0.5 shrink-0" style={{ color: c.text }} />
                      <span className="text-xs leading-[1.5] text-white/70 sm:text-[13px]">{p}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="relative mt-auto inline-flex items-center gap-2 pt-6 text-xs font-medium text-[#E1E0CC] transition hover:text-white sm:text-sm"
                >
                  问我这条路径
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-14 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent p-7 sm:p-10 md:mt-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h3
                className="text-2xl font-medium leading-tight tracking-tight text-[#E1E0CC] sm:text-3xl md:text-4xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                不知道从哪条开始？
                <br />
                先聊聊你想做的事。
              </h3>
              <p className="mt-4 text-xs leading-[1.75] text-gray-400 sm:text-sm">
                加微信或直接打电话，说清楚你现在遇到什么，我会告诉你更适合的路径和大概需要多久。常年招生，企业内训与个人带教都做。
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-black transition hover:gap-3"
                >
                  {MENTORSHIP.cta}
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-[#E1E0CC] transition hover:border-white/30"
                >
                  {CONTACT.phone}
                </a>
              </div>
            </div>

            <KpiStrip columns="two" className="lg:w-[360px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
