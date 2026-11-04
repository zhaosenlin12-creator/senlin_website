import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Play, X, ArrowRight, Heart, Users, Bookmark } from "lucide-react";
import { DOUYIN_CHANNELS, DOUYIN_WORKS, VIDEOS } from "../content";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function VideoRow() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen]);

  const openWith = (i: number) => {
    setActiveIdx(i);
    setModalOpen(true);
  };

  const ai4k = DOUYIN_CHANNELS.find((c) => c.id === "ai4k") ?? DOUYIN_CHANNELS[0];

  return (
    <section id="video" className="relative bg-black px-4 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div>
            <span className="mb-5 inline-block text-[10px] uppercase tracking-[0.25em] text-primary/70 sm:text-[11px]">作品视频</span>
            <h2 className="text-3xl font-medium leading-[0.95] tracking-tight text-[#E1E0CC] sm:text-5xl md:text-6xl">课堂<span className="italic text-primary" style={{ fontFamily: "var(--font-serif)", fontWeight: 400 }}>现场</span></h2>
          </div>
          <p className="max-w-sm text-xs leading-[1.55] text-gray-500 sm:text-sm">两个抖音账号持续更新，这里看完整作品视频。点击任意缩略图全屏播放。</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5">
          {DOUYIN_CHANNELS.map((ch, i) => (
            <motion.a
              key={ch.id}
              href={ch.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.1 }}
              className="group relative order-2 flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#101010] p-5 text-left transition hover:border-white/20 sm:col-span-1 sm:p-7 lg:col-span-3"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="truncate text-[10px] uppercase tracking-[0.2em] text-primary/70">抖音 · {ch.alias}</span>
                <span className="shrink-0 text-[10px] uppercase tracking-[0.2em] text-white/40">channel 0{i + 1}</span>
              </div>
              <div className="flex flex-1 items-center justify-center py-6">
                <div className="relative aspect-square w-28 shrink-0 overflow-hidden rounded-2xl bg-white p-2 sm:w-36 lg:w-40">
                  <img src={ch.qrSrc} alt={`${ch.name} 抖音码`} className="h-full w-full object-contain" loading="eager" decoding="async" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-medium text-[#E1E0CC] sm:text-2xl">{ch.name}</span>
                <p className="mt-1 text-xs leading-[1.5] text-gray-400 sm:text-sm">{ch.subtitle}</p>
                <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-3 text-[10px] uppercase tracking-[0.18em] text-white/45 sm:text-[11px]">
                  <span className="inline-flex items-center gap-1.5"><Users size={12} /> {ch.followers} 粉丝</span>
                  <span className="inline-flex items-center gap-1.5"><Heart size={12} /> {ch.likes} 获赞</span>
                </div>
                <div className="mt-1 text-[10px] tracking-[0.12em] text-white/30">抖音号 {ch.douyinId}</div>
              </div>
              <span className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-[#E1E0CC] sm:text-sm">打开抖音主页<ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></span>
              <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full opacity-25 blur-3xl" style={{ background: ch.accent === "mint" ? "rgba(94,210,156,0.22)" : "rgba(222,219,200,0.15)" }} />
            </motion.a>
          ))}

          {VIDEOS.slice(0, 3).map((v, i) => (
            <motion.button
              key={v.id}
              type="button"
              onClick={() => openWith(i)}
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.9, ease: EASE, delay: (i + 1) * 0.1 }}
              className="group relative order-1 flex aspect-square flex-col justify-end overflow-hidden rounded-2xl border border-white/10 bg-[#101010] text-left transition hover:border-white/20 sm:col-span-1 lg:col-span-2"
            >
              <div className="absolute inset-0">
                <img src={v.poster} alt={v.title} loading="lazy" decoding="async" fetchPriority="low" className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
              </div>
              <div className="relative z-10 flex h-full flex-col justify-between p-4 sm:p-5">
                <div className="flex items-start justify-between">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/65">0{i + 1}</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/45">{v.duration}</span>
                </div>
                <div className="flex items-end justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-primary/80">{v.tag ?? "视频"}</div>
                    <div className="mt-1 line-clamp-2 text-sm font-medium text-[#E1E0CC] sm:text-base">{v.title}</div>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/85 text-black transition group-hover:scale-110 group-hover:bg-white"><Play size={14} fill="currentColor" /></span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 md:mt-16 md:pt-10">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="mb-3 inline-block text-[10px] uppercase tracking-[0.25em] text-primary/70 sm:text-[11px]">抖音作品</span>
              <h3 className="text-xl font-medium text-[#E1E0CC] sm:text-2xl">
                {ai4k.name} · 最新与高互动
              </h3>
            </div>
            <a
              href={ai4k.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-xs font-medium text-[#E1E0CC] transition hover:text-white sm:text-sm"
            >
              进入主页<ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {DOUYIN_WORKS.map((w) => (
              <a
                key={w.id}
                href={`https://www.douyin.com/video/${w.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-white/25 hover:bg-white/[0.05]"
              >
                <span className="mt-0.5 shrink-0 rounded-full border border-white/10 px-2 py-0.5 text-[10px] tracking-[0.08em] text-white/55">{w.tag}</span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium leading-[1.5] text-[#E1E0CC] transition-colors group-hover:text-white">{w.title}</div>
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-white/40">
                    <span>{w.date}</span>
                    <span className="inline-flex items-center gap-1"><Heart size={11} /> {w.likes}</span>
                    <span className="inline-flex items-center gap-1"><Bookmark size={11} /> {w.favorites}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && <VideoModal videos={VIDEOS} activeIdx={activeIdx} setActiveIdx={setActiveIdx} onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </section>
  );
}

function VideoModal({ videos, activeIdx, setActiveIdx, onClose }: { videos: typeof VIDEOS; activeIdx: number; setActiveIdx: (n: number) => void; onClose: () => void; }) {
  const mainRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const v = mainRef.current;
    if (!v) return;
    v.muted = false;
    v.currentTime = 0;
    v.play().catch(() => {});
  }, [activeIdx]);

  const requestFullscreen = () => {
    const v = mainRef.current;
    if (!v) return;
    const el = v as HTMLVideoElement & { webkitRequestFullscreen?: () => void; msRequestFullscreen?: () => void; };
    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    else if (el.msRequestFullscreen) el.msRequestFullscreen();
  };

  const active = videos[activeIdx];
  const cls = (i: number) => i === activeIdx ? "bg-white/[0.08]" : "bg-white/[0.03] hover:bg-white/[0.06]";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl sm:p-8" onClick={onClose}>
      <motion.div initial={{ scale: 0.94, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.94, y: 20, opacity: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="relative flex h-full max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={onClose} className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-md transition hover:border-white/30" aria-label="关闭"><X size={16} /></button>
        <div className="grid h-full grid-cols-1 md:grid-cols-[1fr_300px]">
          <div className="relative flex items-center justify-center bg-black p-4 sm:p-6">
            <video ref={mainRef} key={active.id} controls autoPlay playsInline className="max-h-full max-w-full rounded-lg" src={active.src} poster={active.poster} />
            <button type="button" onClick={requestFullscreen} className="absolute bottom-5 right-5 z-10 rounded-full border border-white/20 bg-black/60 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white backdrop-blur-md transition hover:border-white/40">全屏</button>
          </div>
          <aside className="flex flex-col gap-2 overflow-y-auto border-l border-white/10 bg-[#101010] p-3 sm:p-4">
            <span className="px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-white/45">播放列表</span>
            {videos.map((v, i) => (
              <button key={v.id} onClick={() => setActiveIdx(i)} className={"flex items-center gap-3 rounded-xl p-2 text-left transition " + cls(i)}>
                <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-black">
                  <img src={v.poster} alt={v.title} className="h-full w-full object-cover" loading="lazy" decoding="async" />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/30"><Play size={12} fill="currentColor" className="text-white" /></span>
                </div>
                <div className="flex min-w-0 flex-col">
                  <span className="text-[10px] uppercase tracking-[0.15em] text-white/40">0{i + 1}</span>
                  <span className="truncate text-xs font-medium text-[#E1E0CC] sm:text-sm">{v.title}</span>
                  <span className="text-[10px] text-white/45">{v.duration}</span>
                </div>
              </button>
            ))}
          </aside>
        </div>
      </motion.div>
    </motion.div>
  );
}
