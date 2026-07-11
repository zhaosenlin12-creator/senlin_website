import { motion } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";
import WordsPullUpMultiStyle from "./WordsPullUpMultiStyle";
import { KPI } from "../content";

const EASE = [0.16, 1, 0.3, 1] as const;

const HEAD_LINES = [
  { text: "我叫森林。", italic: false },
  { text: "六年来,", italic: false },
  { text: "我和学生一起写代码。", italic: true },
];

const STORY = [
  "我教 Python、C++、网页与人工智能,也教机器人。",
  "课堂像一棵树,每片叶子都是孩子自己长出来的;我能做的是浇水、点灯、让他们相信自己的手可以造出东西。",
  "他们带走的,不是一摞笔记,是一个能站上舞台的、属于他们自己的作品。",
];

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
            className="md:col-span-5"
          >
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#101010]">
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <img
                  src="/media/photo-wrcc.jpg"
                  loading="eager"
                  decoding="async"
                  alt="森林 · 教学现场"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-white/10 p-5">
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-primary/70">
                    现场 / V I D E O
                  </div>
                  <div className="mt-1 text-sm font-medium text-[#E1E0CC] sm:text-base">
                    森林 · 教学现场
                  </div>
                  <div className="text-[11px] text-white/45 sm:text-xs">
                    湖北宜昌 · 乐启享合伙人 / 副校长
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

          <div className="md:col-span-7 md:py-2">
            <h2
              className="text-[clamp(32px,5.6vw,64px)] font-medium leading-[1.05] tracking-[-0.02em] text-[#E1E0CC]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <WordsPullUpMultiStyle
                className="flex flex-col gap-1"
                segments={HEAD_LINES.map((l) => ({
                  text: l.text,
                  className: l.italic ? "italic text-primary" : "text-[#E1E0CC]",
                }))}
              />
            </h2>

            <div className="mt-6 max-w-xl space-y-5 text-[15px] leading-[1.85] text-gray-300 sm:text-base md:text-[17px]">
              {STORY.map((p, i) => (
                <p key={i} className={i === 1 ? "italic text-primary/80" : ""}>
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-10 flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-sm sm:gap-5 sm:p-6">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                style={{ background: "rgba(222,219,200,0.08)", color: "#DEDBC8" }}
              >
                <Quote size={16} />
              </span>
              <p className="text-[15px] leading-[1.7] text-white/75 sm:text-base">
                <span className="text-primary">「</span>
                教育的本质,是一棵树摇动另一棵树,一朵云推动另一朵云。
                <span className="text-primary">」</span>
              </p>
            </div>

            <div className="mt-10 grid grid-cols-4 gap-3 sm:gap-5">
              {KPI.map((k) => (
                <div key={k.label} className="flex flex-col gap-1 border-l border-white/15 pl-3 sm:pl-4">
                  <span
                    className="text-xl font-medium tracking-tight text-[#E1E0CC] sm:text-2xl"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {k.value}
                    <span className="text-mint">{k.suffix}</span>
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-white/45 sm:text-[11px]">
                    {k.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
