import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
} from "lucide-react";
import WordsPullUpMultiStyle from "./WordsPullUpMultiStyle";
import ImageCarousel from "./ImageCarousel";
import ImageViewer from "./ImageViewer";
import Marquee from "./motion/Marquee";
import Reveal from "./motion/Reveal";
import Tilt from "./motion/Tilt";
import { COURSES, COURSE_LINES } from "../content";
import type { Course } from "../content";
import { accent } from "../lib/accent";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Courses() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [zoom, setZoom] = useState<{
    images: string[];
    index: number;
    alts?: string[];
  } | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // 放大预览自己会吃掉 Esc（见 ImageViewer），到这里的 Esc 一定属于课程弹窗
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
  const k12 = useMemo(() => COURSES.filter((c) => c.line === "k12"), []);
  const adult = useMemo(() => COURSES.filter((c) => c.line === "adult"), []);
  const featuredAdult = adult.find((c) => c.featured) ?? adult[0];
  const otherAdult = adult.filter((c) => c.id !== featuredAdult?.id);

  return (
    <section id="courses" className="relative bg-black px-4 py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-80 opacity-60"
        style={{
          background:
            "radial-gradient(60% 100% at 80% 0%, rgba(222,180,120,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px]">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:mb-14 md:flex-row md:items-end">
          <div className="flex flex-col items-start gap-5">
            <span className="inline-block text-[10px] uppercase tracking-[0.25em] text-primary/70 sm:text-[11px]">
              课程体系
            </span>
            <WordsPullUpMultiStyle
              segments={[
                {
                  text: "六门课，从孩子的启蒙到成人的交付。",
                  className: "text-primary",
                },
              ]}
              className="max-w-2xl text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
            />
          </div>
          <p className="max-w-sm text-xs leading-[1.6] text-gray-500 sm:text-sm">
            少儿 4 门，成人 2 门。海报点开看完整介绍，图点开放大。
          </p>
        </div>

        {/* 跑马灯：课程名不断掠过，给这一段一点节奏 */}
        <Reveal className="mb-14 md:mb-20">
          <div className="relative flex overflow-hidden rounded-full border border-white/10 bg-white/[0.03] py-2.5">
            <Marquee duration={46}>
              {COURSES.map((c) => (
                <span
                  key={c.id}
                  className="flex items-center gap-3 whitespace-nowrap px-3 text-xs uppercase tracking-[0.16em] text-white/55 sm:text-[13px]"
                >
                  <img
                    src={c.gallery[0]}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    decoding="async"
                    className="h-8 w-8 shrink-0 rounded-full object-cover opacity-70 ring-1 ring-white/15 transition-opacity sm:h-9 sm:w-9"
                  />
                  <span style={{ color: accent(c.accent).text }}>{c.title}</span>
                  <span className="text-white/20">/</span>
                </span>
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent" />
          </div>
        </Reveal>

        <div className="space-y-16 md:space-y-24">
          {COURSE_LINES.map((line) => {
            const list = line.id === "k12" ? k12 : adult;
            return (
              <div key={line.id} id={`course-${line.id}`} className="scroll-mt-24">
                <Reveal className="mb-6 md:mb-8">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 border-b border-white/10 pb-4">
                    <h3
                      className="text-lg font-medium tracking-tight text-[#E1E0CC] sm:text-xl"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {line.label}
                    </h3>
                    <span className="text-[11px] uppercase tracking-[0.18em] text-white/40">
                      {line.note}
                    </span>
                    <p className="w-full max-w-2xl text-xs leading-[1.7] text-gray-500 sm:text-[13px]">
                      {line.intro}
                    </p>
                  </div>
                </Reveal>

                {line.id === "k12" ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {list.map((course, i) => (
                      <CourseCard
                        key={course.id}
                        course={course}
                        delay={i * 0.08}
                        onOpen={() => setOpenId(course.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.15fr_1fr]">
                    {featuredAdult ? (
                      <FeaturedCourse
                        course={featuredAdult}
                        onOpen={() => setOpenId(featuredAdult.id)}
                        onZoom={(images, index, alts) =>
                          setZoom({ images, index, alts })
                        }
                      />
                    ) : null}
                    <div className="flex flex-col gap-5">
                      {otherAdult.map((course) => (
                        <AdultCard
                          key={course.id}
                          course={course}
                          delay={0.1}
                          onOpen={() => setOpenId(course.id)}
                        />
                      ))}
                      <div className="flex flex-1 flex-col justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-6 sm:p-7">
                        <p className="text-[10px] uppercase tracking-[0.22em] text-white/40">
                          怎么报名
                        </p>
                        <p className="mt-3 text-sm leading-[1.75] text-gray-300">
                          课程按班级推进，企业内训与高阶定制课按场景单独排期。
                          带上你手上那件一直靠手工的活，我们先聊 15 分钟，看清卡在哪一步。
                        </p>
                        <a
                          href="#contact"
                          className="group mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-black transition hover:gap-3"
                        >
                          先聊 15 分钟
                          <ArrowRight
                            size={15}
                            className="transition-transform group-hover:translate-x-0.5"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {active ? (
          <CourseLightbox
            course={active}
            onClose={() => setOpenId(null)}
            onZoom={(images, index, alts) => setZoom({ images, index, alts })}
          />
        ) : null}
      </AnimatePresence>
      <ImageViewer
        images={zoom?.images ?? []}
        alts={zoom?.alts}
        index={zoom ? zoom.index : null}
        onIndexChange={(i) => setZoom((z) => (z ? { ...z, index: i } : z))}
        onClose={() => setZoom(null)}
      />
    </section>
  );
}

function CourseCard({
  course,
  delay = 0,
  onOpen,
}: {
  course: Course;
  delay?: number;
  onOpen: () => void;
}) {
  const c = accent(course.accent);
  return (
    <Reveal delay={delay} className="h-full">
      <Tilt max={5} scale={1.02} className="h-full">
        <motion.article
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#101010] transition duration-500 hover:border-white/25"
        >
          <div
            role="button"
            tabIndex={0}
            onClick={onOpen}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onOpen();
              }
            }}
            className="relative block aspect-[4/5] w-full overflow-hidden bg-[#0a0a0a] text-left sm:aspect-[3/4]"
            aria-label={`查看 ${course.title} 完整介绍`}
          >
            <ImageCarousel
              images={course.covers?.length ? course.covers : course.gallery}
              alt={course.title}
              interval={5200}
              showDots
              showArrows={false}
              className="absolute inset-0 h-full w-full"
              imgClassName="object-contain"
              backdrop
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#101010] via-transparent to-transparent" />
            <span
              className="pointer-events-none absolute left-4 top-4 z-20 rounded-full px-2.5 py-1 text-[10px] font-medium tracking-[0.12em] backdrop-blur"
              style={{ color: c.text, background: "rgba(0,0,0,0.62)" }}
            >
              {course.stage}
            </span>
            <span className="pointer-events-none absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition group-hover:bg-white group-hover:text-black">
              <Maximize2 size={14} />
            </span>
          </div>

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
            {course.subtitle ? (
              <p className="mt-1.5 text-[13px] text-white/50">{course.subtitle}</p>
            ) : null}
            <p className="mt-3 text-xs leading-[1.7] text-gray-400 sm:text-[13.5px]">
              {course.summary}
            </p>
            <div className="mt-auto flex flex-wrap gap-1.5 border-t border-white/10 pt-4">
              {course.modules.slice(0, 4).map((m) => (
                <span
                  key={m}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] text-white/70 sm:text-[11px]"
                >
                  {m}
                </span>
              ))}
              {course.modules.length > 4 ? (
                <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] text-white/45 sm:text-[11px]">
                  +{course.modules.length - 4}
                </span>
              ) : null}
            </div>
          </div>
        </motion.article>
      </Tilt>
    </Reveal>
  );
}

function FeaturedCourse({
  course,
  onOpen,
  onZoom,
}: {
  course: Course;
  onOpen: () => void;
  onZoom: (images: string[], index: number, alts?: string[]) => void;
}) {
  const c = accent(course.accent);
  const slides = course.slides?.length ? course.slides : course.gallery;
  const [page, setPage] = useState(0);
  const go = (d: number) =>
    setPage((v) => (v + d + slides.length) % slides.length);

  return (
    <Reveal>
      <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#101010]">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background: `radial-gradient(90% 60% at 15% 0%, ${c.glow}, transparent 62%)`,
          }}
        />
        <div className="relative flex flex-col">
          {/* 课件预览器：整页显示，不裁切 */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#05080f]">
            <AnimatePresence mode="wait">
              <motion.img
                key={slides[page]}
                src={slides[page]}
                alt={`${course.title} 课件页 ${page + 1}`}
                initial={{ opacity: 0, scale: 1.015 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
                onClick={() =>
                  onZoom(
                    slides,
                    page,
                    slides.map((_, i) => `${course.title} 课件 ${i + 1}`)
                  )
                }
                className="h-full w-full cursor-zoom-in object-contain"
              />
            </AnimatePresence>

            <span className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/12 bg-black/60 px-2.5 py-1 text-[10px] tracking-[0.14em] text-white/70 backdrop-blur">
              课件页 {page + 1} / {slides.length}
            </span>

            {slides.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="上一页课件"
                  className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/65 text-white backdrop-blur transition hover:border-white/45"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="下一页课件"
                  className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/65 text-white backdrop-blur transition hover:border-white/45"
                >
                  <ChevronRight size={16} />
                </button>
              </>
            ) : null}
          </div>

          {/* 胶片条：一眼看全部课件 */}
          {slides.length > 1 ? (
            <div className="flex gap-2 overflow-x-auto border-b border-white/10 px-4 py-3 [scrollbar-width:none] sm:px-5">
              {slides.map((s, k) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setPage(k)}
                  aria-label={`第 ${k + 1} 页课件`}
                  className={
                    "relative h-14 w-24 shrink-0 overflow-hidden rounded-md border transition " +
                    (k === page
                      ? "border-white/35"
                      : "border-white/10 opacity-60 hover:opacity-100")
                  }
                >
                  <img
                    src={s}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  {k === page ? (
                    <span
                      className="absolute inset-0"
                      style={{ boxShadow: `inset 0 0 0 2px ${c.text}` }}
                    />
                  ) : null}
                </button>
              ))}
            </div>
          ) : null}

          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="rounded-full px-2.5 py-1 text-[10px] font-medium tracking-[0.14em] backdrop-blur"
                style={{ color: c.text, background: "rgba(0,0,0,0.5)" }}
              >
                {course.stage}
              </span>
              <span className="rounded-full border border-white/12 px-2.5 py-1 text-[10px] tracking-[0.12em] text-white/55">
                {course.audience}
              </span>
            </div>

            <h3
              className="mt-4 text-2xl font-medium leading-[1.15] tracking-tight text-[#E1E0CC] sm:text-3xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {course.title}
            </h3>
            {course.subtitle ? (
              <p
                className="mt-1.5 text-base sm:text-lg"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span style={{ color: c.text }}>{course.subtitle}</span>
              </p>
            ) : null}
            <p className="mt-3 text-[13px] leading-[1.8] text-gray-300 sm:text-sm">
              {course.summary}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {course.modules.map((m) => (
                <span
                  key={m}
                  className="rounded-full border border-white/12 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/70"
                >
                  {m}
                </span>
              ))}
            </div>

            {course.price ? (
              <p className="mt-4 text-xs text-white/55">
                <span className="text-white/35">学费 </span>
                {course.price}
              </p>
            ) : null}

            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
              <button
                type="button"
                onClick={onOpen}
                aria-label={`查看 ${course.title} 完整介绍`}
                className="group/btn inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-black transition hover:gap-3"
                style={{ background: c.text }}
              >
                看完整介绍
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover/btn:translate-x-0.5"
                />
              </button>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm text-white/80 transition hover:border-white/35"
              >
                咨询这门课
              </a>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/** 成人线第二张卡：海报纸完整显示 + 文字在右 */
function AdultCard({
  course,
  delay = 0,
  onOpen,
}: {
  course: Course;
  delay?: number;
  onOpen: () => void;
}) {
  const c = accent(course.accent);
  return (
    <Reveal delay={delay}>
      <motion.article
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#101010] transition duration-500 hover:border-white/25 sm:flex-row"
      >
        <div
          role="button"
          tabIndex={0}
          onClick={onOpen}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onOpen();
            }
          }}
          className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-[#070707] text-left sm:aspect-auto sm:w-[42%]"
          aria-label={`查看 ${course.title} 完整介绍`}
        >
          <img
            src={course.poster}
            alt=""
            aria-hidden
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-2xl"
          />
          <img
            src={course.poster}
            alt={`${course.title} 课程海报`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-contain"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] uppercase tracking-[0.14em] text-white/45">
            <span style={{ color: c.text }}>{course.audience}</span>
            <span>· {course.lessons}</span>
          </div>
          <h3
            className="mt-2 text-xl font-medium leading-snug tracking-tight text-[#E1E0CC] sm:text-2xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {course.title}
          </h3>
          <p className="mt-2.5 text-xs leading-[1.75] text-gray-400 sm:text-[13.5px]">
            {course.summary}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {course.modules.slice(0, 5).map((m) => (
              <span
                key={m}
                className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] text-white/70 sm:text-[11px]"
              >
                {m}
              </span>
            ))}
            {course.modules.length > 5 ? (
              <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] text-white/45">
                +{course.modules.length - 5}
              </span>
            ) : null}
          </div>
          <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
            <button
              type="button"
              onClick={onOpen}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-black transition hover:gap-3"
              style={{ background: c.text }}
            >
              看完整介绍
              <ArrowRight size={14} />
            </button>
            <a
              href="#contact"
              className="text-xs text-white/55 underline-offset-4 transition hover:text-white hover:underline"
            >
              咨询
            </a>
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}

function CourseLightbox({
  course,
  onClose,
  onZoom,
}: {
  course: Course;
  onClose: () => void;
  onZoom: (images: string[], index: number, alts?: string[]) => void;
}) {
  const c = accent(course.accent);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight")
        setIndex((i) => (i + 1) % course.gallery.length);
      if (e.key === "ArrowLeft")
        setIndex((i) => (i - 1 + course.gallery.length) % course.gallery.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [course.gallery.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-3 backdrop-blur-xl sm:p-8"
    >
      <motion.div
        initial={{ scale: 0.95, y: 22, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 22, opacity: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0c] lg:max-h-[88vh] lg:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="关闭"
          className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white backdrop-blur-md transition hover:border-white/30"
        >
          <X size={16} />
        </button>

        <div className="relative flex max-h-[46vh] items-center justify-center overflow-hidden bg-black lg:max-h-[88vh] lg:w-[46%]">
          <AnimatePresence mode="wait">
            <motion.img
              key={course.gallery[index]}
              src={course.gallery[index]}
              alt={`${course.title}（${index + 1}/${course.gallery.length}）`}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.32 }}
              onClick={() =>
                onZoom(
                  course.gallery,
                  index,
                  course.gallery.map(() => course.title)
                )
              }
              className="h-full w-full cursor-zoom-in object-contain"
            />
          </AnimatePresence>

          {course.gallery.length > 1 ? (
            <>
              <button
                type="button"
                onClick={() =>
                  setIndex(
                    (i) => (i - 1 + course.gallery.length) % course.gallery.length
                  )
                }
                aria-label="上一张"
                className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur transition hover:border-white/45"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => setIndex((i) => (i + 1) % course.gallery.length)}
                aria-label="下一张"
                className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur transition hover:border-white/45"
              >
                <ChevronRight size={16} />
              </button>
              <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5">
                {course.gallery.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`第 ${i + 1} 张`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === index ? "w-5 bg-white" : "w-1.5 bg-white/45 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </>
          ) : null}
        </div>

        <div className="flex flex-col overflow-y-auto p-6 sm:p-8 lg:w-[54%]">
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
          {course.subtitle ? (
            <p className="mt-1.5 text-base" style={{ color: c.text }}>
              {course.subtitle}
            </p>
          ) : null}
          <p className="mt-4 text-sm leading-[1.8] text-gray-300">{course.summary}</p>

          {course.highlights.length > 0 ? (
            <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-5">
              {course.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5">
                  <span
                    className="mt-[7px] h-1 w-1 shrink-0 rounded-full"
                    style={{ background: c.text }}
                  />
                  <span className="text-[13px] leading-[1.6] text-gray-300">{h}</span>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-6">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">
              课程内容
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {course.modules.map((m) => (
                <span
                  key={m}
                  className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[11px] text-white/75"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>

          {course.outline?.map((block) => (
            <div key={block.title} className="mt-7">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                {block.title}
              </p>
              <ul className="mt-3 space-y-2.5">
                {block.items.map((it) => (
                  <li
                    key={it}
                    className="flex items-start gap-2.5 text-[13px] leading-[1.65] text-gray-300"
                  >
                    <span
                      className="mt-[7px] h-1 w-1 shrink-0 rounded-full"
                      style={{ background: c.text }}
                    />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-xs text-white/45">
              {course.lessons}
              {course.price ? ` · ${course.price}` : ""}
            </span>
            <a
              href="#contact"
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-black transition hover:gap-3"
              style={{ background: c.text }}
            >
              咨询这门课
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

