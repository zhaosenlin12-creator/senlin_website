import { motion } from "framer-motion";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import WordsPullUpMultiStyle from "./WordsPullUpMultiStyle";
import { DELIVERABLE_GROUPS } from "../content";
import { accent } from "../lib/accent";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Deliverables() {
  return (
    <section id="deliver" className="relative bg-black px-4 py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-72 opacity-60"
        style={{
          background:
            "radial-gradient(55% 100% at 20% 0%, rgba(94,210,210,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px]">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:mb-20 md:flex-row md:items-end">
          <div className="flex flex-col items-start gap-5">
            <span className="inline-block text-[10px] uppercase tracking-[0.25em] text-primary/70 sm:text-[11px]">
              交付成果
            </span>
            <WordsPullUpMultiStyle
              segments={[
                { text: "我交付过什么，可以查证。", className: "text-primary" },
              ]}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            />
          </div>
          <p className="max-w-sm text-xs leading-[1.6] text-gray-500 sm:text-sm">
            下面每一项都不是 PPT 里的构想，而是签过、跑起来、有人在用的东西。自主产品三件在下一屏「我的产品」。
          </p>
        </div>

        <div className="space-y-16 md:space-y-24">
          {DELIVERABLE_GROUPS.map((group, gi) => {
            const c = accent(group.accent);
            return (
              <div key={group.id}>
                <div className="mb-6 flex flex-col gap-3 border-b border-white/10 pb-5 sm:mb-8 md:flex-row md:items-end md:justify-between">
                  <div className="flex items-baseline gap-4">
                    <span
                      className="text-[11px] font-medium tracking-[0.2em]"
                      style={{ color: c.text }}
                    >
                      {group.index}
                    </span>
                    <h3
                      className="text-xl font-medium tracking-tight text-[#E1E0CC] sm:text-2xl md:text-3xl"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {group.title}
                    </h3>
                    <span
                      className="rounded-full border px-2.5 py-0.5 text-[10px] tracking-[0.1em]"
                      style={{
                        color: c.text,
                        borderColor: c.edge,
                        background: c.glow,
                      }}
                    >
                      {group.label}
                    </span>
                  </div>
                  <p className="max-w-xl text-xs leading-[1.7] text-gray-500 sm:text-sm">
                    {group.intro}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">
                  {group.items.map((item, i) => {
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 1, y: 0 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.8, ease: EASE, delay: (gi * 2 + i) * 0.08 }}
                        className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#101010] p-6 transition duration-500 hover:border-white/25 sm:p-7"
                      >
                        <span
                          className="absolute inset-y-0 left-0 w-[3px] transition-all duration-500 group-hover:w-[4px]"
                          style={{ background: c.text }}
                        />
                        <div
                          className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-70"
                          style={{ background: c.glow }}
                        />

                        <div className="relative flex items-start justify-between gap-4">
                          <div className="flex flex-wrap items-center gap-2">
                            {item.meta ? (
                              <span
                                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] tracking-[0.12em]"
                                style={{ color: c.text, background: c.glow }}
                              >
                                <BadgeCheck size={11} />
                                {item.meta}
                              </span>
                            ) : null}
                          </div>
                          {item.href ? (
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70 transition group-hover:rotate-45 group-hover:border-white/30 group-hover:text-white">
                              <ArrowUpRight size={13} />
                            </span>
                          ) : null}
                        </div>

                        <h4
                          className="relative mt-4 text-lg font-medium leading-snug text-[#E1E0CC] transition-colors group-hover:text-white sm:text-xl md:text-[22px]"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {item.href ? (
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="transition hover:text-white"
                            >
                              {item.name}
                            </a>
                          ) : (
                            item.name
                          )}
                        </h4>

                        <p className="relative mt-3 text-xs leading-[1.75] text-gray-400 sm:text-[13.5px]">
                          {item.desc}
                        </p>

                        <div className="relative mt-auto flex flex-wrap gap-1.5 pt-5">
                          {item.tags.map((t) => (
                            <span
                              key={t}
                              className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] text-white/70 transition group-hover:border-white/20 sm:text-[11px]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        {item.href ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-[#E1E0CC] transition hover:text-white sm:text-sm"
                          >
                            看源码与说明
                            <ArrowUpRight
                              size={13}
                              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                          </a>
                        ) : null}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
