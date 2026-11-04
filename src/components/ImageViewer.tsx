import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";

type ImageViewerProps = {
  src: string | null;
  alt: string;
  onClose: () => void;
};

/** 单图全屏预览。Esc / 点击背景关闭。 */
export default function ImageViewer({ src, alt, onClose }: ImageViewerProps) {
  // 回调与图片地址都放进 ref，监听器只注册一次。
  // 否则父组件每次重渲染都会换掉 onClose，监听器被摘掉重挂，
  // 而 React 在冒泡到 window 之前就同步刷新了状态，Esc 会漏掉这一层。
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  const srcRef = useRef(src);
  srcRef.current = src;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || !srcRef.current) return;
      // 预览是画面最上层，Esc 由它消费掉，
      // 底下的课程弹窗不该跟着一起关。
      e.stopImmediatePropagation();
      closeRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (!src) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [src]);

  return (
    <AnimatePresence>
      {src ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[140] flex items-center justify-center bg-black/95 p-3 backdrop-blur-xl sm:p-8"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="关闭预览"
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white backdrop-blur-md transition hover:border-white/35"
          >
            <X size={18} />
          </button>
          <motion.img
            key={src}
            src={src}
            alt={alt}
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92vh] max-w-full rounded-xl object-contain shadow-2xl"
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

