import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Maximize2, X } from "lucide-react";
import WordsPullUpMultiStyle from "./WordsPullUpMultiStyle";
import { COURSES } from "../content";
import { accent } from "../lib/accent";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Courses() {
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    document.body.style.overflow = openId ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openId]);

  const active = COURSES.find((c) => c.id === openId) ?? null;

  return (
    <section id="courses" className="relative bg-black px-4 py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-72 opacity-50"
        style={{
          background:
            "radial-gradient(60% 100% at 80% 0%, rgba(222,180,120,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div className="flex flex-col items-start gap-5">
            <span className="inline-block text-[10px] uppercase tracking-[0.25em] text-primary/70 sm:text-[11px]">
              课程体系
            </span>
            <WordsPullUpMultiStyle
              segments={[
                { text: "三门课，两个年龄段，一条主线。", className: "text-primary" },
              ]}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            />
          </div>
          <p className="max-w-sm text-xs leading-[1.6] text-gray-500 sm:text-sm">
            少儿两阶营打通启蒙到进阶，成人实战课打通工具到交付。点击课程海报看完整介绍。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((course, i) => {
            const c = accent(course.accent);
            return (
              <motion.article
                key={course.id}
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.9, ease: EASE, delay: i * 0.12 }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#101010] transition duration-500 hover:border-white/25"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(course.id)}
                  className="relative block aspect-[3/4] w-full overflow-hidden bg-[#0a0a0a] text-left"
                  aria-label={`查看 ${course.title} 完整介绍`}
                >
                  <img
                    src={course.poster}
                    alt={`${course.title} 课程海报`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-transparent to-transparent" />
                  <span
                    className="absolute left-4 top-4 rounded-full px-2.5 py-1 text-[10px] font-medium tracking-[0.12em] backdrop-blur"
                    style={{ color: c.text, background: "rgba(0,0,0,0.6)" }}
                  >
                    {course.stage}
                  </span>
                  <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition group-hover:bg-white group-hover:text-black">
                    <Maximize2 size={14} />
                  </span>
                </button>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] uppercase tracking-[0.14em] text-white/45">
                    <span style={{ color: c.text }}>{course.audience}</span>
                    <span>· {course.lessons}</span>
                  </div>
                  <h3
                    className="mt-2 text-xl font-medium tracking-tight text-[#E1E0CC] sm:text-2xl"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {course.title}
                  </h3>
                  <p className="mt-3 text-xs leading-[1.7] text-gray-400 sm:text-[13.5px]">
                    {course.summary}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-1.5 border-t border-white/10 pt-4">
                    {course.modules.map((m) => (
                      <span
                        key={m}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] text-white/70 sm:text-[11px]"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col items-start gap-5 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h3 className="text-base font-medium text-[#E1E0CC] sm:text-lg">
              想报名、想给公司做内训，或者想先聊聊？
            </h3>
            <p className="mt-2 text-xs leading-[1.6] text-gray-500 sm:text-sm">
              课程按班级推进，企业内训按岗位定制。告诉我你的场景，我给你一个能落地的方案。
            </p>
          </div>
          <a
            href="#contact"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-black transition hover:gap-3"
          >
            咨询课程
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      <AnimatePresence>
        {active ? (
          <PosterLightbox course={active} onClose={() => setOpenId(null)} />
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function PosterLightbox({
  course,
  onClose,
}: {
  course: (typeof COURSES)[number];
  onClose: () => void;
}) {
  const c = accent(course.accent);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl sm:p-8"
    >
      <motion.div
        initial={{ scale: 0.94, y: 24, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.94, y: 24, opacity: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0c] md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="关闭"
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white backdrop-blur-md transition hover:border-white/30"
        >
          <X size={16} />
        </button>
        <div className="flex max-h-[52vh] items-center justify-center overflow-hidden bg-black md:max-h-[90vh] md:w-[46%]">
          <img
            src={course.poster}
            alt={`${course.title} 课程海报`}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="flex flex-col overflow-y-auto p-6 sm:p-8 md:w-[54%]">
          <span
            className="text-[10px] uppercase tracking-[0.22em]"
            style={{ color: c.text }}
          >
            {course.stage} · {course.audience}
          </span>
          <h3
            className="mt-3 text-2xl font-medium leading-tight tracking-tight text-[#E1E0CC] sm:text-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {course.title}
          </h3>
          <p className="mt-4 text-sm leading-[1.8] text-gray-300">{course.summary}</p>
          <div className="mt-6 flex flex-wrap gap-1.5">
            {course.modules.map((m) => (
              <span
                key={m}
                className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[11px] text-white/75"
              >
                {m}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-xs text-white/45">{course.lessons}</span>
            <a
              href="#contact"
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-black"
            >
              咨询这门课
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
