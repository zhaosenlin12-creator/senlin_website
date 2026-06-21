import { useMemo, useState } from "react";

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
  event.currentTarget.style.setProperty("--tilt-x", `${(-y * 8).toFixed(2)}deg`);
  event.currentTarget.style.setProperty("--tilt-y", `${(x * 10).toFixed(2)}deg`);
  event.currentTarget.style.setProperty("--glow-x", `${((x + 0.5) * 100).toFixed(2)}%`);
  event.currentTarget.style.setProperty("--glow-y", `${((y + 0.5) * 100).toFixed(2)}%`);
}

function handleCardPointerLeave(event) {
  event.currentTarget.style.setProperty("--tilt-x", "0deg");
  event.currentTarget.style.setProperty("--tilt-y", "0deg");
  event.currentTarget.style.setProperty("--glow-x", "50%");
  event.currentTarget.style.setProperty("--glow-y", "50%");
}

function StageAppCard({ app }) {
  return (
    <a
      href={app.href}
      target="_blank"
      rel="noreferrer"
      data-testid={`app-card-${app.id}`}
      className="case-panel motion-product-card"
      onPointerMove={handleCardPointerMove}
      onPointerLeave={handleCardPointerLeave}
    >
      <div className="product-card-bg" style={{ backgroundImage: `url(${app.screenshot})` }} />
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

function ShowcaseRailCard({ app }) {
  const legacyIds = new Set(["typing-fun"]);
  const testId = legacyIds.has(app.id) ? `app-card-${app.id}` : `app-showcase-card-${app.id}`;

  return (
    <a
      href={app.href}
      target="_blank"
      rel="noreferrer"
      data-testid={testId}
      className={`showcase-card motion-product-card showcase-card-${app.palette}`}
      onPointerMove={handleCardPointerMove}
      onPointerLeave={handleCardPointerLeave}
    >
      <div className="showcase-screenshot" style={{ backgroundImage: `url(${app.screenshot})` }} />
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
        <h4>{app.railName ?? app.name}</h4>
        <p>{app.summary}</p>
        <ExternalArrow />
      </div>
    </a>
  );
}

function VideoCover({ video }) {
  return (
    <div className="video-cover-shell" data-testid={`video-cover-${video.id}`}>
      <p>{video.cover.eyebrow}</p>
      <h4>{video.cover.headline}</h4>
      <span>{video.cover.subline}</span>
      <div>
        {video.cover.chips.map((item) => (
          <em key={item}>{item}</em>
        ))}
      </div>
    </div>
  );
}

function VideoCard({ video }) {
  return (
    <a href={video.href} target="_blank" rel="noreferrer" data-testid={`video-link-${video.id}`} className="video-card">
      <VideoCover video={video} />
      <div className="video-card-copy">
        <p className="section-kicker">{video.badge}</p>
        <h3>{video.title}</h3>
        <p>{video.summary}</p>
        <span>
          打开抖音观看
          <ExternalArrow />
        </span>
      </div>
    </a>
  );
}

export default function MediaSection() {
  const [activeImage, setActiveImage] = useState(null);
  const featuredGallery = useMemo(() => GALLERY_ITEMS.filter((item) => item.src).slice(0, 12), []);
  const categories = ["师生合影", "学生团队", "教学现场", "竞赛成果", "活动出行", "项目展示"];

  return (
    <section id="media" className="media-section-shell">
      <div className="section-shell media-section-stack" data-testid="section-media">
        <div className="media-section-intro">
          <p className="section-kicker">作品与现场 / Portfolio</p>
          <h2 className="media-section-title">把课程、应用和真实成果放进同一个展厅</h2>
          <p className="media-section-description">
            先看正在使用的应用，再看课堂与竞赛现场。这个区块负责把森林老师的技术能力、教学能力和成果证据放在同一条叙事线上。
          </p>
        </div>

        <section className="media-stage-panel">
          <div className="media-stage-head">
            <div>
              <p className="section-kicker">Stage Feature</p>
              <h3 className="media-block-title">主舞台应用</h3>
            </div>
            <p>
              以 Python 冒险岛和课堂反馈系统为双核心，把学习体验与教学服务闭环同时摆在前台。
            </p>
          </div>
          <div className="stage-app-grid">
            {STAGE_APPS.map((app) => (
              <StageAppCard key={app.id} app={app} />
            ))}
          </div>
        </section>

        <section className="media-showcase-panel">
          <div className="media-stage-head">
            <div>
              <p className="section-kicker">Product Rail</p>
              <h3 className="media-block-title">应用作品集</h3>
            </div>
            <p>
              把课程、AI、研究和教学服务拆成多个作品入口，让访问者像浏览产品发布会一样理解应用矩阵。
            </p>
          </div>
          <div className="showcase-rail" data-testid="app-showcase-rail">
            {APP_SHOWCASE_ITEMS.map((app) => (
              <ShowcaseRailCard key={app.id} app={app} />
            ))}
          </div>
        </section>

        <section className="gallery-stage-panel">
          <div className="media-stage-head">
            <div>
              <p className="section-kicker">Scene Archive</p>
              <h3 className="media-block-title">教学现场档案</h3>
            </div>
            <p>
              课堂辅导、团队合影、比赛成果和活动陪伴组成一面真实的教育现场档案墙。
            </p>
          </div>

          <div className="archive-gallery" data-testid="gallery-ring">
            {featuredGallery.map((item, index) => (
              <button
                key={item.slug}
                type="button"
                data-testid={`gallery-card-${item.slug}`}
                className={`archive-card archive-card-${(index % 4) + 1} depth-card-${(index % 6) + 1}`}
                style={{ "--float-delay": `${index * -0.7}s` }}
                onClick={() => setActiveImage(item)}
              >
                <img src={item.src} alt={item.title} />
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
          <div className="douyin-profile-card">
            <p className="section-kicker">Douyin Profile</p>
            <h3>{DOUYIN_PROFILE.name}</h3>
            <p>{DOUYIN_PROFILE.subtitle}</p>
            <div>
              {DOUYIN_PROFILE.stats.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <a href={DOUYIN_PROFILE.href} target="_blank" rel="noreferrer" data-testid="douyin-home-link">
              打开抖音主页
              <ExternalArrow />
            </a>
          </div>

          <div className="douyin-content-panel">
            <div className="media-stage-head">
              <div>
                <p className="section-kicker">Video Picks</p>
                <h3 className="media-block-title">抖音内容入口</h3>
              </div>
              <p>用两条精选内容作为入口，先看主题，再进入抖音主页继续深挖更多输出。</p>
            </div>
            <div className="douyin-video-grid">
              {FEATURED_VIDEOS.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        </section>
      </div>

      <ImageLightbox item={activeImage} onClose={() => setActiveImage(null)} />
    </section>
  );
}
