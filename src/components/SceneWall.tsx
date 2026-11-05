import { motion } from "framer-motion";
import { useState } from "react";
import { Maximize2 } from "lucide-react";
import WordsPullUpMultiStyle from "./WordsPullUpMultiStyle";
import ImageViewer from "./ImageViewer";
import { SCENE_PHOTOS } from "../content";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function SceneWall() {
  // 整面墙的图串成一组，放大后左右键就能一张张翻下去
  const [zoom, setZoom] = useState<number | null>(null);

  const photos = SCENE_PHOTOS;

  return (
    <section id="scene" className="relative bg-black px-4 py-24 md:py-32">
      <div className="relative mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div className="flex flex-col items-start gap-5">
            <span className="inline-block text-[10px] uppercase tracking-[0.25em] text-primary/70 sm:text-[11px]">
              真实现场
            </span>
            <WordsPullUpMultiStyle
              segments={[
                { text: "照片比简介诚实。", className: "text-primary" },
              ]}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            />
          </div>
          <p className="max-w-sm text-xs leading-[1.6] text-gray-500 sm:text-sm">
            教室里的投影、机位前的操作、研讨会上的演示——都是这两年的真实现场。点图可放大。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-6 sm:gap-4">
          {SCENE_PHOTOS.map((photo, i) => (
            <motion.figure
              key={photo.src}
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.85, ease: EASE, delay: (i % 3) * 0.1 }}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#101010] ${photo.span} ${photo.height}`}
            >
              <button
                type="button"
                onClick={() => setZoom(i)}
                aria-label={`放大查看 ${photo.title}`}
                className="absolute inset-0 h-full w-full cursor-zoom-in"
              >
                {/* 竖图 / 方图用同一张做模糊底衬，保证主体完整不被裁掉 */}
                <img
                  src={photo.src}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-2xl"
                />
                <img
                  src={photo.src}
                  alt={photo.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 group-hover:from-black/95" />
              </button>

              <span className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-[10px] tracking-[0.12em] text-white/80 backdrop-blur">
                {photo.tag}
              </span>

              <span className="pointer-events-none absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/55 text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
                <Maximize2 size={13} />
              </span>

              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <h3
                  className="text-base font-medium leading-snug text-white sm:text-lg"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {photo.title}
                </h3>
                <p className="mt-1.5 max-w-md text-[11px] leading-[1.6] text-white/65 sm:text-xs">
                  {photo.desc}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>

      <ImageViewer
        images={photos.map((p) => p.src)}
        alts={photos.map((p) => p.title)}
        index={zoom}
        onIndexChange={setZoom}
        onClose={() => setZoom(null)}
      />
    </section>
  );
}

