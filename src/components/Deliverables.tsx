import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, Maximize2 } from "lucide-react";
import WordsPullUpMultiStyle from "./WordsPullUpMultiStyle";
import ImageViewer from "./ImageViewer";
import LazyVideo from "./LazyVideo";
import { DELIVERABLE_GROUPS } from "../content";
import type { DeliverableItem } from "../content";
import { accent } from "../lib/accent";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Deliverables() {
  // 放大预览按「交付项」分组：同一个交付项的多张界面图可以左右翻。
  const [zoom, setZoom] = useState<{
    item: DeliverableItem;
    index: number;
  } | null>(null);

  const openShot = (item: DeliverableItem, src: string) => {
    const index = item.shots.findIndex((s) => s.src === src);
    if (index >= 0) setZoom({ item, index });
  };

  return (
    <section id="deliver" className="relative bg-black px-4 py-24 md:py-32">
      {/* 网格底纹 + 顶部辉光，给这一屏一点仪表盘的秩序感 */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(90% 60% at 50% 20%, black 0%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(90% 60% at 50% 20%, black 0%, transparent 78%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-72 opacity-60"
        style={{
          background:
            "radial-gradient(55% 100% at 20% 0%, rgba(94,210,210,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div className="flex flex-col items-start gap-5">
            <span className="inline-block text-[10px] uppercase tracking-[0.25em] text-primary/70 sm:text-[11px]">
              交付成果
            </span>
            <WordsPullUpMultiStyle
              segments={[
                { text: "交出去的系统，现在还在跑。", className: "text-primary" },
              ]}
              className="max-w-3xl text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] lg:leading-[1.08]"
            />
          </div>
          <p className="max-w-sm text-xs leading-[1.7] text-gray-500 sm:text-sm">
            演示会散场，系统不会。这一屏摆的是交付之后的样子：模块、状态、跑通了哪几步。点界面图可放大。
          </p>
        </div>

        <div className="space-y-16 md:space-y-24">
          {DELIVERABLE_GROUPS.map((group, gi) => (
            <div key={group.id}>
              <div className="mb-7 flex flex-col gap-3 border-b border-white/10 pb-5 md:mb-9 md:flex-row md:items-end md:justify-between">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <span className="text-[11px] font-medium tracking-[0.2em] text-white/35">
                    {group.index}
                  </span>
                  <h3
                    className="text-xl font-medium tracking-tight text-[#E1E0CC] sm:text-2xl md:text-3xl"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {group.title}
                  </h3>
                  <span className="rounded-full border border-white/12 px-2.5 py-0.5 text-[10px] tracking-[0.1em] text-white/55">
                    {group.label}
                  </span>
                </div>
                <p className="max-w-xl text-xs leading-[1.7] text-gray-500 sm:text-[13px]">
                  {group.intro}
                </p>
              </div>

              <div className="space-y-5">
                {group.items.map((item, i) => (
                  <Console
                    key={item.id}
                    item={item}
                    delay={(gi * 2 + i) * 0.08}
                    flip={i % 2 === 1}
                    onOpen={(src) => openShot(item, src)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ImageViewer
        images={zoom?.item.shots.map((s) => s.src) ?? []}
        alts={zoom?.item.shots.map((s) => s.alt)}
        index={zoom ? zoom.index : null}
        onIndexChange={(i) => setZoom((z) => (z ? { ...z, index: i } : z))}
        onClose={() => setZoom(null)}
      />
    </section>
  );
}

/** 一个交付项 = 一个终端窗口：状态条 + 真实界面 + 流程节点 + 指标 */
function Console({
  item,
  delay = 0,
  flip = false,
  onOpen,
}: {
  item: DeliverableItem;
  delay?: number;
  flip?: boolean;
  onOpen: (src: string) => void;
}) {
  const c = accent(item.accent);
  // 0 = 运行画面（Remotion 循环），之后是实拍细节截图
  const [shot, setShot] = useState(0);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.85, ease: EASE, delay }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b]"
    >
      {/* 顶部状态条 */}
      <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.02] px-4 py-2.5 sm:px-5">
        <span className="flex shrink-0 gap-1.5" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
        </span>
        <span className="min-w-0 flex-1 truncate font-mono text-[10px] tracking-[0.12em] text-white/45 sm:text-[11px]">
          {item.code}
        </span>
        <span
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] tracking-[0.1em]"
          style={{ color: c.text, borderColor: c.edge, background: c.glow }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
              style={{ background: c.text }}
            />
            <span
              className="relative inline-flex h-1.5 w-1.5 rounded-full"
              style={{ background: c.text }}
            />
          </span>
          {item.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* 屏幕：真实界面截图 */}
        <div
          className={
            "relative lg:col-span-7 " + (flip ? "lg:order-2" : "lg:order-1")
          }
        >
          <div className="relative w-full bg-[#080808]">
            {/* 画面区：运行中的系统（Remotion 循环）+ 实拍细节 */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#070707]">
              {item.video && shot === 0 ? (
                <>
                  <LazyVideo
                    className="absolute inset-0 h-full w-full object-cover"
                    src={item.video.src}
                    poster={item.video.poster}
                  />
                  <span className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/65 px-2.5 py-1 text-[10px] tracking-[0.16em] text-white/85 backdrop-blur">
                    <span className="relative flex h-1.5 w-1.5">
                      <span
                        className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                        style={{ background: c.text }}
                      />
                      <span
                        className="relative inline-flex h-1.5 w-1.5 rounded-full"
                        style={{ background: c.text }}
                      />
                    </span>
                    LIVE · 运行中
                  </span>
                </>
              ) : (
                item.shots.map((s, i) => (
                  <button
                    key={s.src}
                    type="button"
                    onClick={() => onOpen(s.src)}
                    aria-label={`放大查看 ${s.label}`}
                    className={
                      "absolute inset-0 h-full w-full cursor-zoom-in transition-opacity duration-500 " +
                      (i === shot - 1 ? "opacity-100" : "pointer-events-none opacity-0")
                    }
                  >
                    <img
                      src={s.src}
                      alt={s.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-contain"
                    />
                  </button>
                ))
              )}

              {/* 扫描线 */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <motion.div
                  className="absolute inset-x-0 h-24"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 0%, rgba(94,210,210,0.10) 50%, transparent 100%)",
                  }}
                  animate={{ y: ["-6rem", "26rem"] }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 1.5,
                  }}
                />
              </div>

              <span className="pointer-events-none absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
                <Maximize2 size={14} />
              </span>
            </div>

            {/* 画面切换：运行中 + 实拍细节 */}
            <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 py-3 sm:px-5">
              {item.video ? (
                <button
                  type="button"
                  onClick={() => setShot(0)}
                  className={
                    "flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-left transition " +
                    (shot === 0
                      ? "border-white/25 bg-white/[0.06]"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20")
                  }
                >
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full transition"
                    style={{
                      background: shot === 0 ? c.text : "rgba(255,255,255,0.2)",
                    }}
                  />
                  <span
                    className={
                      "text-[10px] tracking-[0.1em] transition sm:text-[11px] " +
                      (shot === 0 ? "text-white/85" : "text-white/40")
                    }
                  >
                    运行画面
                  </span>
                </button>
              ) : null}
              {item.shots.map((s, i) => (
                <button
                  key={s.src}
                  type="button"
                  onClick={() => setShot(i + 1)}
                  className={
                    "flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-left transition " +
                    (shot === i + 1
                      ? "border-white/25 bg-white/[0.06]"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20")
                  }
                >
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full transition"
                    style={{
                      background: shot === i + 1 ? c.text : "rgba(255,255,255,0.2)",
                    }}
                  />
                  <span
                    className={
                      "text-[10px] tracking-[0.1em] transition sm:text-[11px] " +
                      (shot === i + 1 ? "text-white/85" : "text-white/40")
                    }
                  >
                    {s.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 文字 + 流程 + 指标 */}
        <div
          className={
            "flex flex-col p-5 sm:p-7 lg:col-span-5 lg:p-9 " +
            (flip ? "lg:order-1" : "lg:order-2")
          }
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
            {item.name}
          </span>
          <h4
            className="mt-2.5 text-xl font-medium leading-snug tracking-tight text-[#E1E0CC] transition-colors group-hover:text-white sm:text-2xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {item.headline}
          </h4>
          <p className="mt-3 text-xs leading-[1.8] text-gray-400 sm:text-[13.5px]">
            {item.desc}
          </p>

          {/* 流程节点 */}
          <div className="mt-7">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/35">
              交付流程
            </p>
            <ol className="mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-2">
              {item.steps.map((s, i) => (
                <li key={s} className="flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] px-2 py-1.5 text-[11px] text-white/75">
                    <span
                      className="font-mono text-[10px]"
                      style={{ color: c.text }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s}
                  </span>
                  {i < item.steps.length - 1 ? (
                    <span className="text-[10px] text-white/20">›</span>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>

          {/* 指标 */}
          <div className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/[0.06]">
            {item.metrics.map((m) => (
              <div key={m.label} className="bg-[#0b0b0b] px-3.5 py-3">
                <span className="block text-[10px] uppercase tracking-[0.16em] text-white/35">
                  {m.label}
                </span>
                <span
                  className="mt-1 block text-sm font-medium tracking-tight sm:text-[15px]"
                  style={{ color: c.text }}
                >
                  {m.value}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-7">
            {item.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] text-white/70 sm:text-[11px]"
              >
                {t}
              </span>
            ))}
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto inline-flex items-center gap-1.5 text-xs font-medium text-[#E1E0CC] transition hover:text-white"
              >
                看源码与说明
                <ArrowUpRight size={13} />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
