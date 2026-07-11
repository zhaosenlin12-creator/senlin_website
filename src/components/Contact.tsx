import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, X, Maximize2 } from "lucide-react";
import { CONTACT } from "../content";

const EASE = [0.16, 1, 0.3, 1] as const;

type Channel = (typeof CONTACT)[keyof typeof CONTACT] & { sub: string; label: string };

const cAlt = (label: string) => label + " 二维码";

export default function Contact() {
  const [active, setActive] = useState<Channel | null>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [active]);
  const channels: Channel[] = [CONTACT.wechat as Channel, CONTACT.douyin as Channel];

  const yr = new Date().getFullYear();

  return (
    <section id="contact" className="relative bg-black px-4 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 opacity-50" style={{ background: "radial-gradient(60% 100% at 50% 0%, rgba(222,219,200,0.08) 0%, transparent 70%)" }} />
      <div className="relative mx-auto max-w-[1100px]">
        <div className="mb-12 text-center md:mb-16">
          <span className="mb-5 inline-block text-[10px] uppercase tracking-[0.25em] text-primary/70 sm:text-[11px]">联系我</span>
          <h2 className="mx-auto max-w-2xl text-3xl font-medium leading-[0.95] tracking-tight text-[#E1E0CC] sm:text-4xl md:text-5xl lg:text-6xl">想聊一个班级、工作坊,或学生作品展示?</h2>
          <p className="mx-auto mt-5 max-w-md text-xs leading-[1.55] text-gray-400 sm:text-sm md:text-base">点击二维码查看大图,通过任意渠道留言——每一条消息我都会在两个工作日内回复。</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
          {channels.map((c, i) => (
            <motion.button key={c.label} type="button" onClick={() => setActive(c)} initial={{ opacity: 1, y: 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.05 }} transition={{ duration: 0.9, ease: EASE, delay: i * 0.15 }} className="group relative flex items-center gap-5 overflow-hidden rounded-2xl border border-white/10 bg-[#101010] p-5 text-left transition hover:-translate-y-0.5 hover:border-white/25 hover:shadow-[0_18px_50px_-20px_rgba(0,0,0,0.7)] sm:p-7">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-white p-2 transition group-hover:scale-[1.04] sm:h-32 sm:w-32">
                <img src={c.src} alt={cAlt(c.label)} className="h-full w-full object-contain" loading="eager" decoding="async" />
                <span className="pointer-events-none absolute inset-0 hidden items-center justify-center bg-black/55 text-white/90 backdrop-blur-sm transition group-hover:flex"><Maximize2 size={20} /></span>
              </div>
              <div className="flex flex-1 flex-col">
                <span className="text-[10px] uppercase tracking-[0.2em] text-primary/70 sm:text-[11px]">渠道 0{i + 1}</span>
                <span className="mt-1 text-xl font-medium text-[#E1E0CC] sm:text-2xl">{c.label}</span>
                <span className="mt-1 text-xs text-gray-400 sm:text-sm">{c.sub}</span>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-[#E1E0CC] sm:text-sm">点击放大<ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></span>
              </div>
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-30 blur-3xl transition group-hover:opacity-50" style={{ background: "rgba(222,219,200,0.18)" }} />
            </motion.button>
          ))}
        </div>
        <div className="mt-16 flex flex-col items-center gap-3 border-t border-white/10 pt-8 text-center text-[11px] uppercase tracking-[0.2em] text-white/40 sm:flex-row sm:justify-between sm:text-left">
          <span>© {yr} 森林工作室 · 乐启享</span>
          <span>用心打造 · 湖北宜昌</span>
        </div>
      </div>
      <AnimatePresence>
        {active && <QrLightbox channel={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}

function QrLightbox({ channel, onClose }: { channel: Channel; onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} onClick={onClose} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl sm:p-8">
      <motion.div initial={{ scale: 0.92, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.92, y: 20, opacity: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#0c0c0c] p-6 sm:p-8" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={onClose} aria-label="关闭" className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-md transition hover:border-white/30"><X size={16} /></button>
        <div className="text-[10px] uppercase tracking-[0.25em] text-primary/70">渠道</div>
        <div className="mt-1 text-xl font-medium text-[#E1E0CC] sm:text-2xl">{channel.label}</div>
        <p className="mt-1 text-xs text-white/55 sm:text-sm">{channel.sub}。长按或截图保存二维码。</p>
        <div className="mt-6 flex items-center justify-center rounded-2xl border border-white/10 bg-white p-5 sm:p-7">
          <img src={channel.src} alt={cAlt(channel.label)} className="h-72 w-72 max-w-full object-contain sm:h-80 sm:w-80" loading="eager" decoding="async" />
        </div>
      </motion.div>
    </motion.div>
  );
}
