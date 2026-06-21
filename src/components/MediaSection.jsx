import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import ImageLightbox from "./ImageLightbox.jsx";
import { GALLERY_ITEMS } from "../galleryAssets.js";
import { APP_SHOWCASE_ITEMS, DOUYIN_PROFILE, FEATURED_VIDEOS, STAGE_APPS } from "../mediaData.js";

function ExternalArrow() {
  return (
    <span aria-hidden="true" className="external-arrow">
      →
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
  useEffect(() => {
    if (!video) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [video, onClose]);

  return (
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
          <div className="smoke-burst" aria-hidden="true">
            {Array.from({ length: 18 }, (_, index) => (
              <span key={index} style={{ "--smoke-index": index }} />
            ))}
          </div>
          <motion.div
            className="image-lightbox-card video-lightbox-card"
            initial={{ opacity: 0, scale: 0.92, y: 22, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.94, y: 18, filter: "blur(10px)" }}
            transition={{ type: "spring", stiffness: 210, damping: 24 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="image-lightbox-header">
              <div>
                <p className="image-lightbox-category">{video.badge}</p>
                <h3 className="image-lightbox-title">{video.title}</h3>
              </div>
              <button type="button" data-testid="btn-close-video" className="image-lightbox-close" onClick={onClose}>
                关闭
              </button>
            </div>
            <video
              className="video-lightbox-player"
              data-testid="video-lightbox-player"
              src={video.src}
              controls
              autoPlay
              playsInline
            />
            <p className="image-lightbox-description">{video.summary}</p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function VideoCard({ video, onSelect }) {
  return (
    <button
      type="button"
      data-testid={`video-card-${video.id}`}
      className="video-card motion-product-card"
      onClick={() => onSelect(video)}
      onPointerMove={handleCardPointerMove}
      onPointerLeave={handleCardPointerLeave}
    >
      <div className="video-preview-shell">
        <video
          data-testid={`video-preview-${video.id}`}
          src={video.src}
          className="video-preview"
          muted
          loop
          autoPlay
          playsInline
          preload="metadata"
        />
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

export default function MediaSection() {
  const [activeImage, setActiveImage] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const featuredGallery = useMemo(() => GALLERY_ITEMS.filter((item) => item.src).slice(0, 20), []);
  const categories = ["师生合影", "学生团队", "教学现场", "竞赛成果", "活动出行", "项目展示"];
  const railItems = useMemo(() => [...APP_SHOWCASE_ITEMS, ...APP_SHOWCASE_ITEMS], []);

  return (
    <section id="media" className="media-section-shell">
      <div className="section-shell media-section-stack" data-testid="section-media">
        <div className="media-section-intro">
          <p className="section-kicker">作品与现场 / Portfolio</p>
          <h2 className="media-section-title">把真实应用、课堂现场和内容传播放进同一个艺术科技展厅</h2>
          <p className="media-section-description">
            这里不再只是文字介绍，而是用真实截图、现场影像和可点击入口证明：课程、应用、服务和内容表达可以形成一条完整的专业叙事线。
          </p>
        </div>

        <section className="media-stage-panel">
          <div className="media-stage-head">
            <div>
              <p className="section-kicker">Stage Feature</p>
              <h3 className="media-block-title">主舞台应用</h3>
            </div>
            <p>以 Python 冒险岛和 class 教学系统为双核心，把学习体验和教学服务中枢同时摆在前台。</p>
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
              <p className="section-kicker">Product Rail</p>
              <h3 className="media-block-title">应用作品集</h3>
            </div>
            <p>下方作品变成立体卡片自动滚动，访问者可以暂停、悬停、点击，像浏览产品发布会的应用矩阵。</p>
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
              <p className="section-kicker">Scene Archive</p>
              <h3 className="media-block-title">教学现场档案</h3>
            </div>
            <p>更多课堂、比赛、合影和项目现场用流动照片墙呈现，图片会有呼吸感，点击后以烟雾模糊层放大查看。</p>
          </div>

          <div className="archive-gallery" data-testid="gallery-ring">
            {featuredGallery.map((item, index) => (
              <button
                key={item.slug}
                type="button"
                data-testid={`gallery-card-${item.slug}`}
                className={`archive-card archive-card-${index + 1} depth-card-${(index % 6) + 1}`}
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
          <a
            href={DOUYIN_PROFILE.href}
            target="_blank"
            rel="noreferrer"
            className="douyin-profile-card"
            data-testid="douyin-home-link"
          >
            <p className="section-kicker">Douyin Profile</p>
            <h3>{DOUYIN_PROFILE.name}</h3>
            <p>{DOUYIN_PROFILE.subtitle}</p>
            <div>
              {DOUYIN_PROFILE.stats.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <strong className="product-open-link">
              打开抖音主页
              <ExternalArrow />
            </strong>
          </a>

          <div className="douyin-content-panel">
            <div className="media-stage-head">
              <div>
                <p className="section-kicker">Video Picks</p>
                <h3 className="media-block-title">抖音内容入口</h3>
              </div>
              <p>直接引用本地视频素材，先在站内播放预览，点击后放大观看，再从左侧进入抖音主页继续看完整内容流。</p>
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
