import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type ImageViewerProps = {
  /** 整组图；长度为 1 时不显示切换控件 */
  images: string[];
  /** 当前图下标，null 表示不打开 */
  index: number | null;
  /** 每张图的可选说明，缺省用统一 alt */
  alts?: string[];
  alt?: string;
  onClose: () => void;
  /** 切换图片；不传则只有关闭功能 */
  onIndexChange?: (index: number) => void;
};

/**
 * 全屏预览。Esc 关闭，← / → 或左右按钮切换图组，触摸可左右滑动。
 *
 * 键盘监听走捕获阶段（capture: true）并 stopImmediatePropagation：
 * 全屏预览永远是最上层，它先吃掉 Esc / 方向键，底下的课程弹窗不会被一起关掉。
 */
export default function ImageViewer({
  images,
  index,
  alts,
  alt = "",
  onClose,
  onIndexChange,
}: ImageViewerProps) {
  // 回调与状态都放进 ref，监听器只注册一次，
  // 父组件每次重渲染换掉 onClose 也不会漏掉 Esc。
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  const navRef = useRef(onIndexChange);
  navRef.current = onIndexChange;
  const stateRef = useRef({ images, index });
  stateRef.current = { images, index };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const { images: imgs, index: i } = stateRef.current;
      if (i === null || imgs.length === 0) return;

      if (e.key === "Escape") {
        // 预览是最上层，Esc 由它消费掉，
        // 底下的课程弹窗不该跟着一起关。
        e.preventDefault();
        e.stopImmediatePropagation();
        closeRef.current();
        return;
      }

      if (imgs.length < 2) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        e.stopImmediatePropagation();
        navRef.current?.((i + 1) % imgs.length);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        e.stopImmediatePropagation();
        navRef.current?.((i - 1 + imgs.length) % imgs.length);
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => {
      window.removeEventListener("keydown", onKey, true);
    };
  }, []);

  useEffect(() => {
    if (index === null) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [index]);

  const current = index === null ? null : images[index];
  const currentAlt = current ? alts?.[index ?? 0] || alt : "";
  const total = images.length;

  const go = (delta: number) => {
    if (index === null || total < 2) return;
    navRef.current?.((index + delta + total) % total);
  };

  // 触摸左右滑动
  const touchStart = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const end = e.changedTouches[0]?.clientX ?? null;
    const delta = end === null ? 0 : end - touchStart.current;
    touchStart.current = null;
    if (Math.abs(delta) > 48) go(delta < 0 ? 1 : -1);
  };

  return (
    <AnimatePresence>
      {current ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="fixed inset-0 z-[140] flex items-center justify-center bg-black/95 p-3 backdrop-blur-xl sm:p-8"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="关闭预览"
            className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white backdrop-blur-md transition hover:border-white/35"
          >
            <X size={18} />
          </button>

          {total > 1 ? (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                aria-label="上一张"
                className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur transition hover:border-white/35 sm:left-5"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                aria-label="下一张"
                className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur transition hover:border-white/35 sm:right-5"
              >
                <ChevronRight size={20} />
              </button>
              <span className="pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/12 bg-black/60 px-3 py-1 text-[11px] tabular-nums tracking-[0.15em] text-white/70 backdrop-blur">
                {(index ?? 0) + 1} / {total}
              </span>
            </>
          ) : null}

          <motion.img
            key={current}
            src={current}
            alt={currentAlt}
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[88vh] max-w-full rounded-xl object-contain shadow-2xl"
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
