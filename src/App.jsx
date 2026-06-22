import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

import LearningUniverse from "./components/LearningUniverse.jsx";
import MediaSection from "./components/MediaSection.jsx";

import {
  ACHIEVEMENT_ITEMS,
  CERTIFICATION_ITEMS,
  CONTACT_ITEMS,
  EXPERTISE_ITEMS,
  HERO_ICONS,
  HERO_LEFT_STATUS,
  HERO_RIGHT_STATUS,
  MARQUEE_ITEMS,
  SECTION_NAV_ITEMS,
  STAT_ITEMS,
} from "./data.js";

function SectionNav() {
  const scrollToSection = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav className="section-nav" aria-label="Page navigation">
      {SECTION_NAV_ITEMS.map(({ id, label }) => (
        <button key={id} type="button" className="section-nav-button" onClick={() => scrollToSection(id)} aria-label={label}>
          <span>{label}</span>
          <i />
        </button>
      ))}
    </nav>
  );
}

function QrModal({ src, label, onClose }) {
  const { X } = HERO_ICONS;

  useEffect(() => {
    const onKeyDown = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div className="qr-modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
        <motion.div className="qr-modal-card" initial={{ opacity: 0, scale: 0.94, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94, y: 16 }} onClick={(e) => e.stopPropagation()}>
          <button type="button" onClick={onClose} className="icon-button" aria-label="关闭">
            <X className="icon-small" />
          </button>
          <p className="section-kicker">{label}</p>
          <img src={src} alt={label} className="qr-modal-image" />
          <p className="muted-copy">长按或扫码查看</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function Header() {
  return (
    <header className="site-header">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="brand-mark">
        <span />
        <strong>赵森林</strong>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.08 }} className="header-role">
        副校长 / 合伙人 / 乐启教育
      </motion.div>
    </header>
  );
}

function HeroSection() {
  const { ChevronDown } = HERO_ICONS;
  const slides = [
    {
      type: "image",
      src: "/media/hero-background.png",
      eyebrow: "教育 / 代码 / 机器人",
      title: ["教育", "代码", "机器人"],
      statement: "把编程教育做成可被看见的作品现场。",
      subline: ["Python / C++ / Web / AI", "课堂 / 项目 / 竞赛 / 发布"],
    },
    {
      type: "video",
      src: "/media/hero.mp4",
      eyebrow: "作品发布 / 学习宇宙",
      title: ["作品发布", "学习宇宙", "成长现场"],
      statement: "让学习、展示和成长在同一块舞台上发生。",
      subline: ["现场展示 / 真实反馈 / 持续迭代", "课程 / 应用 / 活动 / 结果"],
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);
  const [activeCopy, setActiveCopy] = useState(0);
  const [titleHover, setTitleHover] = useState(false);
  const videoRefs = useRef([]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
      setActiveCopy((current) => (current + 1) % slides.length);
    }, 5400);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    const activeItem = slides[activeSlide];
    if (activeItem?.type !== "video") return;
    const video = videoRefs.current[activeSlide];
    if (!video) return;
    try {
      video.pause?.();
      video.currentTime = 0;
      const playPromise = video.play?.();
      if (playPromise?.catch) playPromise.catch(() => {});
    } catch {
      // Ignore browser autoplay restrictions.
    }
  }, [activeSlide, slides]);

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.setProperty("--hero-x", `${(x * 100).toFixed(2)}%`);
    event.currentTarget.style.setProperty("--hero-y", `${(y * 100).toFixed(2)}%`);
    event.currentTarget.style.setProperty("--hero-shift-x", `${(x * 16).toFixed(2)}px`);
    event.currentTarget.style.setProperty("--hero-shift-y", `${(y * 12).toFixed(2)}px`);
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-background" aria-hidden="true" data-testid="hero-background">
        {slides.map((item, index) =>
          item.type === "video" ? (
            <video
              key={item.src}
              ref={(node) => {
                videoRefs.current[index] = node;
              }}
              src={item.src}
              className={`hero-background-video hero-background-video-${index + 1} ${index === activeSlide ? "is-active" : ""}`}
              autoPlay
              muted
              loop
              playsInline
              preload={index === 0 ? "auto" : "metadata"}
            />
          ) : (
            <img
              key={item.src}
              src={item.src}
              alt=""
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              className={`hero-background-image hero-background-image-${index + 1} ${index === activeSlide ? "is-active" : ""}`}
            />
          )
        )}
      </div>

      <div className="hero-status hero-status-left">
        {HERO_LEFT_STATUS.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>
      <div className="hero-status hero-status-right">
        {HERO_RIGHT_STATUS.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="hero-content" onPointerMove={handlePointerMove}>
        <div className="hero-content-inner" onPointerEnter={() => setTitleHover(true)} onPointerLeave={() => setTitleHover(false)} onPointerMove={handlePointerMove}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              className="hero-copy-stack"
              initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -14, filter: "blur(10px)" }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <p className="hero-eyebrow">{slides[activeSlide].eyebrow}</p>
              <h1 data-testid="hero-type-lines" className={`hero-type-lines ${titleHover ? "is-hovered" : ""}`}>
                {slides[activeSlide].title.map((line, index) => (
                  <motion.span
                    key={line}
                    className={index === 1 ? "is-outline" : ""}
                    style={{ "--type-index": index }}
                    initial={{ opacity: 0, y: 18, rotateX: 8 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.48, delay: 0.06 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {line}
                  </motion.span>
                ))}
              </h1>
              <p className="hero-statement">{slides[activeSlide].statement}</p>
            </motion.div>
          </AnimatePresence>
          <div className="hero-dynamic-copy" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.p
                key={`${slides[activeCopy].subline.join("-")}-${activeCopy}`}
                className="hero-subline"
                initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
                transition={{ duration: 0.45 }}
              >
                {slides[activeCopy].subline.join(" / ")}
              </motion.p>
            </AnimatePresence>
            <div className="hero-line-dots" aria-hidden="true">
              {slides.map((_, index) => (
                <span key={index} className={index === activeSlide ? "is-active" : ""} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <button type="button" onClick={() => document.getElementById("marquee")?.scrollIntoView({ behavior: "smooth" })} className="scroll-cue">
        <span>scroll</span>
        <ChevronDown className="icon-small" />
      </button>
    </section>
  );
}

function MarqueeStrip() {
  const marqueeItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <section id="marquee" className="marquee-strip">
      <div className="marquee-track" aria-hidden="true">
        {marqueeItems.map((item, index) => (
          <span key={`${item.text}-${index}`} className={item.accent ? "is-accent" : ""}>
            {item.text}
          </span>
        ))}
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="editorial-section about-section">
      <div className="section-shell about-grid">
        <div className="portrait-frame">
          <img src="/photo-hero.jpg" alt="赵森林老师" loading="lazy" decoding="async" />
        </div>
        <div className="about-copy">
          <p className="section-kicker">人物 / Educator</p>
          <h2>
            六年深耕，
            <br />
            把每一行代码变成孩子看得见的作品。
          </h2>
          <p>赵森林老师长期围绕 Python、C++、Web 应用、AI 工具和机器人项目开展教学实践。</p>
          <p>他关注的不只是学生学会语法，而是能不能把知识转化成可展示、可讲述、可迭代的成果。</p>
          <blockquote>教育不是把答案交给学生，而是点亮他们愿意继续探索的状态。</blockquote>
        </div>
      </div>
    </section>
  );
}

function ContactSection({ onSelectQr }) {
  const { ZoomIn } = HERO_ICONS;
  return (
    <section id="contact" className="contact-section">
      <div className="section-shell contact-shell">
        <div className="contact-copy">
          <p className="section-kicker">合作 / Contact</p>
          <h2>一起把编程教育做得更立体</h2>
          <p>无论你是家长、学校、机构，还是希望进一步合作的伙伴，都可以通过微信或抖音继续了解课程、项目和现场成果。</p>
        </div>
        <div className="contact-grid">
          {CONTACT_ITEMS.map((item) => (
            <button key={item.testId} type="button" onClick={() => onSelectQr({ src: item.src, label: item.label })} className="contact-card" data-testid={item.testId}>
              <span className="section-kicker">{item.label}</span>
              <img src={item.src} alt={item.label} loading="lazy" decoding="async" />
              <strong>{item.sub}</strong>
              <span className="zoom-label">
                点击放大
                <ZoomIn className="icon-small" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function EvidenceSection() {
  const titleFrames = [
    ["成果", "被看见"],
    ["作品", "会发声"],
    ["成长", "能记录"],
  ];
  const [activeTitle, setActiveTitle] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveTitle((current) => (current + 1) % titleFrames.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, [titleFrames.length]);

  const handleSurfaceMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.setProperty("--evidence-tilt-x", `${(y * -6).toFixed(2)}deg`);
    event.currentTarget.style.setProperty("--evidence-tilt-y", `${(x * 8).toFixed(2)}deg`);
    event.currentTarget.style.setProperty("--evidence-glow-x", `${((x + 0.5) * 100).toFixed(2)}%`);
    event.currentTarget.style.setProperty("--evidence-glow-y", `${((y + 0.5) * 100).toFixed(2)}%`);
  };

  const resetSurfaceMove = (event) => {
    event.currentTarget.style.setProperty("--evidence-tilt-x", "0deg");
    event.currentTarget.style.setProperty("--evidence-tilt-y", "0deg");
  };

  return (
    <section id="evidence" className="evidence-section">
      <div className="section-shell evidence-shell">
        <div className="evidence-heading">
          <div className="evidence-copy">
            <p className="section-kicker">成果现场 / Evidence</p>
            <div className="evidence-title-marquee" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTitle}
                  className="evidence-title-frame"
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -18, filter: "blur(10px)" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {titleFrames[activeTitle].map((line, index) => (
                    <motion.h2
                      key={`${line}-${index}`}
                      className={index === 1 ? "is-outline" : ""}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.42, delay: index * 0.12 }}
                    >
                      {line}
                    </motion.h2>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
            <p className="evidence-brief">从学习到发布，再到被看见，孩子的成果会在真实场景里落地。</p>
          </div>
        </div>

        <div className="evidence-stage">
          <article className="evidence-spotlight evidence-surface" onPointerMove={handleSurfaceMove} onPointerLeave={resetSurfaceMove}>
            <div className="evidence-spotlight-media">
              <img src="/photo-wrcc.jpg" alt="赵森林老师带学生在成果发布现场展示作品" loading="lazy" decoding="async" />
              <div className="evidence-floating-stats">
                {STAT_ITEMS.map((item, index) => (
                  <article key={item.label} className={`evidence-floating-stat evidence-floating-stat-${index + 1}`} data-testid={`stat-card-${index}`}>
                    <strong>
                      {item.to}
                      {item.suffix}
                    </strong>
                    <span>{item.label}</span>
                  </article>
                ))}
              </div>
            </div>

            <div className="evidence-spotlight-copy">
              <p className="section-kicker">教学现场 / Spotlight</p>
              <h3>从课堂到舞台</h3>
              <p>作品能展示，过程能复盘，成长能被记录。</p>
              <div className="evidence-ribbon">
                <span>项目式课堂</span>
                <span>竞赛指导</span>
                <span>作品发布</span>
                <span>成长记录</span>
              </div>
            </div>
          </article>

          <aside className="evidence-side-notes">
            <div className="evidence-note evidence-note-outline evidence-surface" onPointerMove={handleSurfaceMove} onPointerLeave={resetSurfaceMove}>
              <p className="section-kicker">能力方向</p>
              <strong>Python / C++ / Web / AI / 机器人</strong>
            </div>

            <div className="evidence-note evidence-note-solid evidence-surface" onPointerMove={handleSurfaceMove} onPointerLeave={resetSurfaceMove}>
              <p className="section-kicker">成长路径</p>
              <div className="evidence-timeline">
                <div className="evidence-timeline-item">
                  <b>01</b>
                  <span>理解知识</span>
                </div>
                <div className="evidence-timeline-item">
                  <b>02</b>
                  <span>完成项目</span>
                </div>
                <div className="evidence-timeline-item">
                  <b>03</b>
                  <span>公开展示</span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="evidence-columns">
          <article id="achievements" className="evidence-story evidence-surface" onPointerMove={handleSurfaceMove} onPointerLeave={resetSurfaceMove}>
            <div className="evidence-story-head">
              <p className="section-kicker">成果板块</p>
              <h3>真实发生</h3>
            </div>
            <div className="evidence-story-grid">
              {ACHIEVEMENT_ITEMS.slice(0, 4).map((item, index) => (
                <article key={item.num} className="evidence-story-card" data-testid={`achievement-${index}`}>
                  <span>{item.num}</span>
                  <h4>{item.title}</h4>
                </article>
              ))}
            </div>
          </article>

          <article id="certifications" className="evidence-certifications evidence-surface" onPointerMove={handleSurfaceMove} onPointerLeave={resetSurfaceMove}>
            <div className="evidence-story-head">
              <p className="section-kicker">专业支持</p>
              <h3>专业可信</h3>
            </div>
            <div className="evidence-cert-stack">
              {CERTIFICATION_ITEMS.map((item, index) => (
                <div key={item} className="evidence-cert-chip" data-testid={`cert-${index}`}>
                  <HERO_ICONS.CircleCheck className="icon-small" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  const [selectedQr, setSelectedQr] = useState(null);

  return (
    <main className="site-page">
      <SectionNav />
      <Header />
      {selectedQr ? <QrModal src={selectedQr.src} label={selectedQr.label} onClose={() => setSelectedQr(null)} /> : null}
      <HeroSection />
      <MarqueeStrip />
      <AboutSection />
      <MediaSection />
      <EvidenceSection />
      <LearningUniverse />
      <ContactSection onSelectQr={setSelectedQr} />
      <footer className="site-footer">
        <span>© {new Date().getFullYear()} 赵森林 / 乐启教育 / 保留所有权利</span>
      </footer>
    </main>
  );
}

export default function App() {
  return (
    <div className="dark min-h-[100dvh] bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <HomePage />
    </div>
  );
}
