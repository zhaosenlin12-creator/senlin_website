import { useEffect, useRef, useState } from "react";

interface LazyVideoProps {
  src: string;
  poster?: string;
  className?: string;
  rootMargin?: string;
}

/**
 * 仅当进入视口时才挂载并播放视频;离开视口暂停。
 * 这样首屏不会同时下载 7 个 app 预览视频。
 */
export default function LazyVideo({
  src,
  poster,
  className,
  rootMargin = "200px",
}: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShouldLoad(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <video
      ref={ref}
      className={className}
      src={shouldLoad ? src : undefined}
      poster={poster}
      autoPlay={shouldLoad}
      loop
      muted
      playsInline
      preload="none"
      // 视频需要主动 play() 才能保证跨浏览器
      onCanPlay={(e) => {
        const v = e.currentTarget;
        if (shouldLoad && v.paused) v.play().catch(() => {});
      }}
    />
  );
}
