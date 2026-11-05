import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

type ImageCarouselProps = {
  images: string[];
  alt: string;
  /** 自动轮播间隔，设为 0 关闭 */
  interval?: number;
  className?: string;
  imgClassName?: string;
  showDots?: boolean;
  /** 图不铺满时，用同一张图做一层模糊底衬，避免出现突兀的空白边 */
  backdrop?: boolean;
};

/**
 * 自动轮播的图片组。悬停暂停，点图放大（由 onOpen 交给上层 lightbox）。
 */
export default function ImageCarousel({
  images,
  alt,
  interval = 4200,
  className = "",
  imgClassName = "object-cover",
  showDots = true,
  backdrop = false,
}: ImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [near, setNear] = useState(false);
  const timer = useRef<number | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const count = images.length;

  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count]
  );

  // 只有滚到附近才自动轮播 / 预加载，避免首屏一次性把下面所有卡片整组图都拉下来
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => setNear(entries.some((e) => e.isIntersecting)),
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (count < 2 || interval <= 0 || paused || !near) return;
    timer.current = window.setTimeout(() => go(index + 1), interval);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [index, count, interval, paused, near, go]);

  // 只预加载下一张（当前张由 <img> 自己拉），切页时不会闪出空白
  useEffect(() => {
    if (!near || count < 2) return;
    const next = images[(index + 1) % count];
    if (!next) return;
    const img = new Image();
    img.decoding = "async";
    img.src = next;
  }, [images, index, count, near]);

  if (count === 0) return null;

  return (
    <div
      ref={boxRef}
      className={`relative ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-full w-full overflow-hidden">
        {backdrop ? (
          <img
            src={images[index]}
            alt=""
            aria-hidden
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full scale-110 object-cover opacity-45 blur-2xl"
          />
        ) : null}
        <AnimatePresence initial={false} mode="sync">
          <motion.img
            key={images[index]}
            src={images[index]}
            alt={`${alt}（${index + 1}/${count}）`}
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute inset-0 h-full w-full ${imgClassName}`}
          />
        </AnimatePresence>
      </div>

      {count > 1 && showDots ? (
        <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(i);
              }}
              aria-label={`第 ${i + 1} 张`}
              aria-current={i === index}
              className="grid h-6 w-4 place-items-center"
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  i === index ? "h-1.5 w-4 bg-white" : "h-1.5 w-1.5 bg-white/45"
                }`}
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

