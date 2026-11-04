import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ImageCarouselProps = {
  images: string[];
  alt: string;
  /** 自动轮播间隔，设为 0 关闭 */
  interval?: number;
  className?: string;
  imgClassName?: string;
  showDots?: boolean;
  showArrows?: boolean;
  onOpen?: (index: number) => void;
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
  showArrows = true,
  onOpen,
}: ImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<number | null>(null);
  const count = images.length;

  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count]
  );

  useEffect(() => {
    if (count < 2 || interval <= 0 || paused) return;
    timer.current = window.setTimeout(() => go(index + 1), interval);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [index, count, interval, paused, go]);

  if (count === 0) return null;

  return (
    <div
      className={`group/carousel relative ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-full w-full overflow-hidden">
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

      {count > 1 && showArrows ? (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(index - 1);
            }}
            aria-label="上一张"
            className="absolute left-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white opacity-0 backdrop-blur transition hover:border-white/45 group-hover/carousel:opacity-100 focus-visible:opacity-100"
          >
            <ChevronLeft size={15} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(index + 1);
            }}
            aria-label="下一张"
            className="absolute right-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white opacity-0 backdrop-blur transition hover:border-white/45 group-hover/carousel:opacity-100 focus-visible:opacity-100"
          >
            <ChevronRight size={15} />
          </button>
        </>
      ) : null}

      {count > 1 && showDots ? (
        <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5">
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
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-5 bg-white" : "w-1.5 bg-white/45 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      ) : null}

      {onOpen ? (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpen(index);
          }}
          aria-label={`放大查看 ${alt}`}
          className="absolute inset-0 z-10 cursor-zoom-in"
        />
      ) : null}
    </div>
  );
}

