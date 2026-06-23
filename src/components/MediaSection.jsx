import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import ImageLightbox from "./ImageLightbox.jsx";
import { GALLERY_ITEMS } from "../galleryAssets.js";
import { APP_SHOWCASE_ITEMS, DOUYIN_PROFILE, FEATURED_VIDEOS, STAGE_APPS } from "../mediaData.js";

const VIDEO_POSTERS = {
  "personal-site": "/media/video-posters/personal-site.webp",
  "interactive-knowledge": "/media/video-posters/interactive-knowledge.webp",
  "color-english": "/media/video-posters/color-english.webp",
};

function primeAndPlayVideo(video) {
  if (!video) return;

  video.muted = true;
  video.defaultMuted = true;

  try {
    const playPromise = video.play?.();
    if (playPromise?.catch) {
      playPromise.catch(() => {});
    }
  } catch {
    // Ignore autoplay rejections and keep the poster visible.
  }
}

function ExternalArrow() {
  return (
    <span aria-hidden="true" className="external-arrow">
      ↗
    </span>
  );
}

function handleCardPointerMove(event) {
  const rect = event.currentTarget.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;
  event.currentTarget.style.setProperty("--tilt-x", `${(-y * 10).toFixed(2)}deg`);
  event.currentTarget.style.setProperty("--tilt-y", `${(x * 12).toFixed(2)}deg`);
  event.currentTarget.style.setProperty("--glow-x", `${((x + 0.5) * 100).toFixed(2)}%`);
  event.currentTarget.style.setProperty("--glow-y", `${((y + 0.5) * 100).toFixed(2)}%`);
}

function handleCardPointerLeave(event) {
  event.currentTarget.style.setProperty("--tilt-x", "0deg");
  event.currentTarget.style.setProperty("--tilt-y", "0deg");
  event.currentTarget.style.setProperty("--glow-x", "50%");
  event.currentTarget.style.setProperty("--glow-y", "50%");
}

function useDeferredMedia({
  rootMargin = "180px 0px",
  autoLoadOnIntersect = true,
  autoActivate = false,
  autoActivateDelay = 600,
} = {}) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [active, setActive] = useState(false);
  const ref = useRef(null);
  const autoTimerRef = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || shouldLoad) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      if (autoActivate) {
        if (autoTimerRef.current) window.clearTimeout(autoTimerRef.current);
        autoTimerRef.current = window.setTimeout(() => setActive(true), autoActivateDelay);
      }
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!autoLoadOnIntersect) return;
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          if (autoActivate) {
            if (autoTimerRef.current) window.clearTimeout(autoTimerRef.current);
            autoTimerRef.current = window.setTimeout(() => setActive(true), autoActivateDelay);
          }
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (autoTimerRef.current) {
        window.clearTimeout(autoTimerRef.current);
        autoTimerRef.current = null;
      }
    };
  }, [autoActivate, autoActivateDelay, autoLoadOnIntersect, rootMargin, shouldLoad]);

  return {
    ref,
    shouldLoad,
    active,
    loadNow: () => {
      if (autoTimerRef.current) {
        window.clearTimeout(autoTimerRef.current);
        autoTimerRef.current = null;
      }
      setShouldLoad(true);
      setActive(true);
    },
    activate: () => {
      if (autoTimerRef.current) {
        window.clearTimeout(autoTimerRef.current);
        autoTimerRef.current = null;
      }
      setActive(true);
    },
  };
}

function StageAppCard({ app, index }) {
  return (
    <a
      href={app.href}
      target="_blank"
      rel="noreferrer"
      data-testid={`app-card-${app.id}`}
      className={`case-panel motion-product-card case-panel-${app.accent}`}
      style={{ "--app-screenshot": `url(${app.screenshot})`, "--float-delay": `${index * -1.2}s` }}
      onPointerMove={handleCardPointerMove}
      onPointerLeave={handleCardPointerLeave}
    >
      <div className="product-card-bg" aria-hidden="true" />
      <div className="case-panel-copy">
        <p className="section-kicker">{app.category}</p>
        <h3>{app.name}</h3>
        <p>{app.description}</p>
        <ul>
          {app.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <span className="product-open-link">
          打开真实应用
          <ExternalArrow />
        </span>
      </div>
      <div className={`case-poster case-poster-${app.accent}`}>
        <span>{app.kicker}</span>
        <strong>{app.posterTitle}</strong>
        <p>{app.posterSubtitle}</p>
        <div>
          {app.posterStats.map((item) => (
            <em key={item}>{item}</em>
          ))}
        </div>
      </div>
    </a>
  );
}

function ShowcaseRailCard({ app, clone = false }) {
  const testId = clone ? undefined : `app-showcase-card-${app.id}`;

  return (
    <a
      href={app.href}
      target="_blank"
      rel="noreferrer"
      data-testid={testId}
      className={`showcase-card motion-product-card showcase-card-${app.palette}`}
      style={{ "--app-screenshot": `url(${app.screenshot})` }}
      onPointerMove={handleCardPointerMove}
      onPointerLeave={handleCardPointerLeave}
      aria-hidden={clone ? "true" : undefined}
      tabIndex={clone ? -1 : undefined}
    >
      <div className="showcase-screenshot" aria-hidden="true" />
      <div className="showcase-card-poster">
        <span>{app.poster.eyebrow}</span>
        <strong>{app.poster.title}</strong>
        <p>{app.poster.subtitle}</p>
        <div>
          {app.poster.metrics.map((metric) => (
            <em key={metric}>{metric}</em>
          ))}
        </div>
      </div>
      <div className="showcase-card-copy">
        <p className="section-kicker">{app.category}</p>
        <h4>{app.name}</h4>
        <p>{app.summary}</p>
        <ExternalArrow />
      </div>
    </a>
  );
}

function VideoLightbox({ video, onClose }) {
  const playerRef = useRef(null);
  const poster = video ? VIDEO_POSTERS[video.id] ?? "/media/video-posters/personal-site.webp" : undefined;

  useEffect(() => {
    if (!video) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [video, onClose]);

  useEffect(() => {
    if (!video) return undefined;
    const player = playerRef.current;
    if (!player) return undefined;

    player.currentTime = 0;
    player.muted = false;
    player.defaultMuted = false;
    player.load?.();

    const handleCanPlay = () => {
      const playPromise = player.play?.();
      if (playPromise?.catch) {
        playPromise.catch(() => {});
      }
    };

    handleCanPlay();
    player.addEventListener("canplay", handleCanPlay);

    return () => {
      player.removeEventListener("canplay", handleCanPlay);
    };
  }, [video]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {video ? (
        <motion.div
          key={video.id}
          className="image-lightbox-backdrop video-lightbox-backdrop"
          data-testid="video-lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="image-lightbox-card video-lightbox-card"
            initial={{ opacity: 0, scale: 0.92, y: 16, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.94, y: 16, filter: "blur(10px)" }}
            transition={{ type: "spring", stiffness: 210, damping: 24 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="image-lightbox-header">
              <div>
                <p className="image-lightbox-category">{video.badge}</p>
                <h3 className="image-lightbox-title">{video.title}</h3>
              </div>
              <button type="button" data-testid="btn-close-video" className="image-lightbox-close" onClick={onClose} aria-label="关闭">
                ×
              </button>
            </div>
            <video
              ref={playerRef}
              className="video-lightbox-player"
              data-testid="video-lightbox-player"
              src={video.src}
              poster={poster}
              controls
              autoPlay
              playsInline
              preload="metadata"
            />
            <p className="image-lightbox-description">{video.summary}</p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

function VideoCard({ video, onSelect }) {
  const preview = useDeferredMedia({ autoLoadOnIntersect: true, autoActivate: false });
  const previewVideoRef = useRef(null);
  const poster = VIDEO_POSTERS[video.id] ?? "/media/hero-background.webp";
  const previewSrc = video.previewSrc ?? video.src;

  useEffect(() => {
    if (!preview.shouldLoad || !preview.active) return undefined;
    const node = previewVideoRef.current;
    if (!node) return undefined;

    const handleLoadedData = () => primeAndPlayVideo(node);
    primeAndPlayVideo(node);
    node.addEventListener("loadeddata", handleLoadedData);

    return () => {
      node.removeEventListener("loadeddata", handleLoadedData);
    };
  }, [preview.active, preview.shouldLoad, previewSrc]);

  return (
    <button
      type="button"
      data-testid={`video-card-${video.id}`}
      className="video-card motion-product-card"
      onClick={() => {
        preview.loadNow();
        onSelect(video);
      }}
      onPointerEnter={preview.activate}
      onFocus={preview.activate}
      onPointerMove={handleCardPointerMove}
      onPointerLeave={handleCardPointerLeave}
    >
      <div ref={preview.ref} className="video-preview-shell">
        <img
          src={poster}
          alt=""
          data-testid={`video-poster-${video.id}`}
          className="video-preview video-preview-poster"
          loading="lazy"
          decoding="async"
        />
        {preview.shouldLoad ? (
          <video
            ref={previewVideoRef}
            data-testid={`video-preview-${video.id}`}
            src={previewSrc}
            poster={poster}
            className="video-preview video-preview-live"
            muted
            loop
            autoPlay
            playsInline
            preload="metadata"
          />
        ) : (
          <div data-testid={`video-preview-${video.id}`} className="video-preview video-preview-placeholder" aria-hidden="true" />
        )}
        <span className="video-play-pulse">播放</span>
      </div>
      <div className="video-card-copy">
        <p className="section-kicker">{video.badge}</p>
        <h3>{video.title}</h3>
        <p>{video.summary}</p>
        <div className="chip-row">
          {video.chips.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </button>
  );
}

export default function MediaSection({ sectionId = "media" }) {
  const [activeImage, setActiveImage] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const douyinPreview = useDeferredMedia({ autoLoadOnIntersect: true, autoActivate: true, autoActivateDelay: 700 });
  const douyinPreviewVideoRef = useRef(null);
  const featuredGallery = useMemo(() => GALLERY_ITEMS.filter((item) => item.src), []);
  const categories = ["师生合影", "学生团队", "教学现场", "竞赛成果", "活动出行", "项目展示"];
  const railItems = useMemo(() => [...APP_SHOWCASE_ITEMS, ...APP_SHOWCASE_ITEMS], []);

  useEffect(() => {
    if (!douyinPreview.shouldLoad || !douyinPreview.active) return undefined;
    const node = douyinPreviewVideoRef.current;
    if (!node) return undefined;

    const handleLoadedData = () => primeAndPlayVideo(node);
    primeAndPlayVideo(node);
    node.addEventListener("loadeddata", handleLoadedData);

    return () => {
      node.removeEventListener("loadeddata", handleLoadedData);
    };
  }, [douyinPreview.active, douyinPreview.shouldLoad]);

  return (
    <section id={sectionId} className="media-section-shell">
      <div className="section-shell media-section-stack" data-testid="section-media">
        <div className="media-section-intro">
          <p className="section-kicker">作品与现场 / Portfolio</p>
          <h2 className="media-section-title">
            <span>作品、课程与内容的</span>
            <span className="media-title-keyword">成长展厅</span>
          </h2>
          <p className="media-section-description">每个入口都对应真实应用、课堂图片和视频内容，让学习成果一眼可见。</p>
        </div>

        <section className="media-stage-panel">
          <div className="media-stage-head">
            <div>
              <p className="section-kicker">学习工具</p>
              <h3 className="media-block-title">核心项目入口</h3>
            </div>
            <p>学生从闯关学习进入编程，老师用课程系统完成组织、反馈和服务。</p>
          </div>
          <div className="stage-app-grid">
            {STAGE_APPS.map((app, index) => (
              <StageAppCard key={app.id} app={app} index={index} />
            ))}
          </div>
        </section>

        <section className="media-showcase-panel">
          <div className="media-stage-head">
            <div>
              <p className="section-kicker">工具集合</p>
              <h3 className="media-block-title">个人项目集合</h3>
            </div>
            <p>自动轮播展示更多工具入口，鼠标停留时可查看细节，点击即可打开体验。</p>
          </div>
          <div className="showcase-rail" data-testid="app-showcase-rail">
            <div className="showcase-rail-track">
              {railItems.map((app, index) => (
                <ShowcaseRailCard key={`${app.id}-${index}`} app={app} clone={index >= APP_SHOWCASE_ITEMS.length} />
              ))}
            </div>
          </div>
        </section>

        <section className="gallery-stage-panel">
          <div className="media-stage-head">
            <div>
              <p className="section-kicker">教学现场</p>
              <h3 className="media-block-title">教学现场</h3>
            </div>
            <p>更多课堂、比赛、合影和项目现场会以流动照片墙呈现，点击后可查看大图。</p>
          </div>

          <div className="archive-gallery" data-testid="gallery-ring">
            {featuredGallery.map((item, index) => (
              <button
                key={item.slug}
                type="button"
                data-testid={`gallery-card-${item.slug}`}
                className={`archive-card archive-card-${index + 1} depth-card-${(index % 6) + 1} is-loaded`}
                style={{ "--float-delay": `${index * -0.55}s`, "--wave-index": index }}
                onClick={() => setActiveImage(item)}
              >
                <img src={item.src} alt={item.title} loading="lazy" />
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.category}</small>
                </span>
              </button>
            ))}
          </div>

          <div className="media-category-grid">
            {categories.map((label) => (
              <div key={label} className="media-category-chip">
                {label}
              </div>
            ))}
          </div>
        </section>

        <section className="douyin-stage-panel">
          <a href={DOUYIN_PROFILE.href} target="_blank" rel="noreferrer" className="douyin-profile-card" data-testid="douyin-home-link">
            <div ref={douyinPreview.ref} className="douyin-profile-visual" data-testid="douyin-profile-visual" aria-hidden="true">
              <img
                src={VIDEO_POSTERS["personal-site"]}
                alt=""
                data-testid="douyin-profile-poster"
                className="douyin-profile-poster"
                loading="lazy"
                decoding="async"
              />
              {douyinPreview.shouldLoad ? (
                <video
                  ref={douyinPreviewVideoRef}
                  data-testid="douyin-profile-video"
                  src={FEATURED_VIDEOS[0]?.previewSrc ?? FEATURED_VIDEOS[0]?.src}
                  poster={VIDEO_POSTERS["personal-site"]}
                  muted
                  loop
                  autoPlay
                  playsInline
                  preload="metadata"
                />
              ) : null}
              <span />
            </div>
            <p className="section-kicker">Douyin Profile</p>
            <h3>{DOUYIN_PROFILE.name}</h3>
            <p>{DOUYIN_PROFILE.subtitle}</p>
            <div>
              {DOUYIN_PROFILE.stats.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <strong className="product-open-link">
              进入主页继续了解
              <ExternalArrow />
            </strong>
          </a>

          <div className="douyin-content-panel">
            <div className="media-stage-head">
              <div>
                <p className="section-kicker">视频精选</p>
                <h3 className="media-block-title">短视频内容入口</h3>
              </div>
              <p>精选课堂工具、作品演示和学习资源，先快速预览，再进入主页继续了解。</p>
            </div>
            <div className="douyin-video-grid">
              {FEATURED_VIDEOS.map((video) => (
                <VideoCard key={video.id} video={video} onSelect={setActiveVideo} />
              ))}
            </div>
          </div>
        </section>
      </div>

      <ImageLightbox item={activeImage} onClose={() => setActiveImage(null)} />
      <VideoLightbox video={activeVideo} onClose={() => setActiveVideo(null)} />
    </section>
  );
}














