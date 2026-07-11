import DomeGallery from "./DomeGalleryWrap";
import { GALLERY_IMAGES } from "../content";

// 球体自转:每秒 3 度。组件内部已实现暂停(放大/拖拽)。
export default function DomeGallerySection() {
  return (
    <section
      id="gallery"
      className="relative bg-black"
      style={{ height: "100vh" }}
    >
      <div className="absolute inset-0">
        <DomeGallery
          images={GALLERY_IMAGES}
          fit={0.85}
          minRadius={900}
          segments={18}
          grayscale={false}
          autoRotateDegPerSec={3}
          overlayBlurColor="#070707"
          imageBorderRadius="18px"
          openedImageWidth="min(92vw, 720px)"
          openedImageHeight="min(86vh, 720px)"
          openedImageBorderRadius="24px"
        />
      </div>

      <div className="pointer-events-none absolute left-5 top-5 z-10 sm:left-8 sm:top-8">
        <span
          className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.2em] backdrop-blur-md"
          style={{ color: "#DEDBC8" }}
        >
          穹顶画廊 · 自动播放 · 可拖拽
        </span>
      </div>

      <div className="pointer-events-none absolute bottom-5 left-5 z-10 sm:bottom-8 sm:left-8">
        <h2
          className="text-3xl font-medium leading-[0.95] tracking-tight text-[#E1E0CC] sm:text-5xl md:text-6xl"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          教学<span
            className="italic text-primary"
            style={{ fontFamily: "var(--font-serif)", fontWeight: 400 }}
          >掠影</span>
        </h2>
        <p className="mt-3 max-w-xs text-xs text-white/55 sm:text-sm">
          点击图片放大,拖拽画布在穹顶中旋转浏览。
        </p>
      </div>
    </section>
  );
}

