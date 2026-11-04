import { motion } from "framer-motion";
import WordsPullUpMultiStyle from "./WordsPullUpMultiStyle";
import { SCENE_PHOTOS } from "../content";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function SceneWall() {
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
            教室里的投影、机位前的操作、研讨会上的演示——都是这两年的真实现场。
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
              className={`group relative h-[240px] overflow-hidden rounded-2xl border border-white/10 bg-[#101010] sm:h-[300px] md:h-[340px] ${photo.span}`}
            >
              <img
                src={photo.src}
                alt={photo.title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 group-hover:from-black/95" />

              <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-[10px] tracking-[0.12em] text-white/80 backdrop-blur">
                {photo.tag}
              </span>

              <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
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
    </section>
  );
}
