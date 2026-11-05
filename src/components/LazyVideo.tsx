import { useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { canAutoplayVideo } from "../lib/media";

interface LazyVideoProps {
  src: string;
  poster?: string;
  className?: string;
  rootMargin?: string;
}

/**
 * 滚到跟前才挂 src，滚走立刻暂停 —— 省流量、省电、不占解码。
 * video 元素本身常驻（IntersectionObserver 要观察它），但没进视口时 src 为空，
 * 浏览器不会下载任何字节。
 * 省流量 / 弱网 / 减少动态效果：一个字节视频都不下，只给静态封面。
 * 加载失败：退回封面并给重试入口，不留黑框。
 */
export default function LazyVideo({
  src,
  poster,
  className,
  rootMargin = "200px",
}: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [started, setStarted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          setVisible(e.isIntersecting);
          // 进过视口才给 src，否则浏览器会顺手把 preload="none" 的资源也拉下来
          if (e.isIntersecting && canAutoplayVideo()) setStarted(true);
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  // 离开视口就暂停，回来了再播
  useEffect(() => {
    const v = ref.current;
    if (!v || !started) return;
    if (visible) v.play().catch(() => {});
    else v.pause();
  }, [visible, started]);

  const showPoster = !started || failed;
  const videoSrc = started && !failed ? src : undefined;

  return (
    <>
      {poster && (
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className={
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-500 " +
            (showPoster ? "opacity-100" : "opacity-0")
          }
        />
      )}

      <video
        ref={ref}
        className={className}
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        onCanPlay={(e) => {
          const v = e.currentTarget;
          if (visible && v.paused) v.play().catch(() => {});
        }}
        onError={() => setFailed(true)}
      />

      {failed && (
        <button
          type="button"
          onClick={() => {
            setFailed(false);
            setStarted(false);
            requestAnimationFrame(() => setStarted(true));
          }}
          className="absolute inset-0 flex items-center justify-center gap-2 bg-black/45 text-[11px] tracking-[0.12em] text-white/75 backdrop-blur-sm transition hover:bg-black/60"
        >
          <RotateCcw size={13} />
          视频加载失败，点此重试
        </button>
      )}
    </>
  );
}
