import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

import GlobalMotionField from "./components/GlobalMotionField.jsx";
import LearningField from "./components/LearningField.jsx";
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
  TYPEWRITER_LINES,
} from "./data.js";

function SectionNav() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="section-nav" aria-label="Page navigation">
      {SECTION_NAV_ITEMS.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          className="section-nav-button"
          onClick={() => scrollToSection(id)}
          data-testid={`nav-dot-${id}`}
          aria-label={label}
        >
          <span>{label}</span>
          <i />
        </button>
      ))}
    </nav>
  );
}

function QrModal({ src, label, onClose }) {
  const { X: CloseIcon } = HERO_ICONS;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="qr-modal-backdrop"
        onClick={onClose}
      >
        <motion.div
          key="modal-card"
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          onClick={(event) => event.stopPropagation()}
          className="qr-modal-card"
        >
          <button type="button" onClick={onClose} data-testid="btn-close-qr" className="icon-button">
            <CloseIcon className="icon-small" />
          </button>
          <p className="section-kicker">{label}</p>
          <img src={src} alt={label} className="qr-modal-image" />
          <p className="muted-copy">长按或扫描二维码</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function Header() {
  return (
    <header className="site-header">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="brand-mark"
      >
        <span />
        <strong>赵森林</strong>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.08 }}
        className="header-role"
      >
        副校长 / 合伙人 / 乐启享机器人
      </motion.div>
    </header>
  );
}

function HeroSection() {
  const { ChevronDown } = HERO_ICONS;
  const [activeLine, setActiveLine] = useState(0);

  useEffect(() => {
    if (TYPEWRITER_LINES.length <= 1) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveLine((current) => (current + 1) % TYPEWRITER_LINES.length);
    }, 2800);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="hero-section">
      <LearningField />
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

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="hero-content"
      >
        <p className="hero-eyebrow">森林老师 / ZHAO SELIN</p>
        <h1>
          教育
          <span>代码</span>
          机器人
        </h1>
        <p className="hero-statement">把编程教育做成可体验的未来现场</p>
        <div className="hero-dynamic-copy" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.p
              key={TYPEWRITER_LINES[activeLine]}
              className="hero-subline"
              initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
              transition={{ duration: 0.45 }}
            >
              {TYPEWRITER_LINES[activeLine]}
            </motion.p>
          </AnimatePresence>
          <div className="hero-line-dots" aria-hidden="true">
            {TYPEWRITER_LINES.map((line, index) => (
              <span key={line} className={index === activeLine ? "is-active" : ""} />
            ))}
          </div>
        </div>
      </motion.div>

      <button
        type="button"
        onClick={() => document.getElementById("marquee")?.scrollIntoView({ behavior: "smooth" })}
        className="scroll-cue"
        data-testid="btn-scroll"
      >
        <span>scroll</span>
        <ChevronDown className="icon-small" />
      </button>
    </section>
  );
}

function MarqueeStrip() {
  return (
    <section id="marquee" className="marquee-strip">
      {MARQUEE_ITEMS.map((item) => (
        <span key={item.text} className={item.accent ? "is-accent" : ""}>
          {item.text}
        </span>
      ))}
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="editorial-section about-section">
      <div className="section-shell about-grid">
        <div className="portrait-frame">
          <img src="/photo-hero.jpg" alt="赵森林老师" data-testid="img-profile" />
        </div>
        <div className="about-copy">
          <p className="section-kicker">人物 / Educator</p>
          <h2>
            六年深耕，
            <br />
            把每一行代码变成孩子看得见的作品。
          </h2>
          <p>
            赵森林老师长期围绕 Python、C++、Web 应用、AI 工具和机器人项目展开教学实践。
            他关注的不只是学生学会语法，而是能不能把知识转化成可展示、可讲述、可迭代的成果。
          </p>
          <p>
            作为一线教学者与项目带队老师，他把课程研发、应用设计、竞赛训练和真实课堂现场放在同一个系统里，
            让学生经历从理解、实现、调试到表达的完整路径。
          </p>
          <blockquote>教育不是把答案交给学生，而是点亮他们愿意继续探索的状态。</blockquote>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section id="stats" className="stats-section">
      <div className="section-shell stats-grid">
        {STAT_ITEMS.map((item, index) => (
          <div key={item.label} className="stat-card" data-testid={`stat-card-${index}`}>
            <strong>
              {item.to}
              {item.suffix}
            </strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ExpertiseSection() {
  return (
    <section id="expertise" className="editorial-section dark-section">
      <div className="section-shell">
        <div className="section-heading">
          <p className="section-kicker">能力地图 / Expertise</p>
          <h2>技术、课程与现场教学的融合能力</h2>
        </div>
        <div className="expertise-grid">
          {EXPERTISE_ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="expertise-card" data-testid={`expertise-${index}`}>
                <Icon className="icon-medium" />
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AchievementsSection() {
  const { Trophy } = HERO_ICONS;

  return (
    <section id="achievements" className="editorial-section achievements-section">
      <div className="section-shell">
        <div className="section-heading">
          <p className="section-kicker">成果现场 / Achievements</p>
          <h2>让训练结果在真实舞台落地</h2>
        </div>

        <div className="wrcc-feature">
          <img src="/photo-wrcc.jpg" alt="WRCC 2025 比赛现场" data-testid="img-wrcc" />
          <div>
            <p className="section-kicker">WRCC 2025 / 宜昌</p>
            <h3>从训练到领奖的完整链路</h3>
            <p>
              比赛组织、学生带队、项目调试与成果展示同步落地，让孩子在真实场景里看见自己的能力。
            </p>
            <Trophy className="icon-medium" />
          </div>
        </div>

        <div className="achievement-grid">
          {ACHIEVEMENT_ITEMS.map((item, index) => (
            <article key={item.num} className="achievement-card" data-testid={`achievement-${index}`}>
              <span>{item.num}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CertificationsSection() {
  const { CircleCheck } = HERO_ICONS;

  return (
    <section id="certifications" className="cert-section">
      <div className="section-shell cert-shell">
        <p className="section-kicker">认证资质 / Certifications</p>
        {CERTIFICATION_ITEMS.map((item, index) => (
          <div key={item} className="cert-row" data-testid={`cert-${index}`}>
            <CircleCheck className="icon-small" />
            <span>{item}</span>
          </div>
        ))}
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
          <p>
            无论你是家长、学校、机构，还是希望进一步合作的伙伴，都可以通过微信或抖音继续了解课程、项目和现场成果。
          </p>
        </div>
        <div className="contact-grid">
          {CONTACT_ITEMS.map((item) => (
            <button
              key={item.testId}
              type="button"
              onClick={() => onSelectQr({ src: item.src, label: item.label })}
              className="contact-card"
              data-testid={item.testId}
            >
              <span className="section-kicker">{item.label}</span>
              <img src={item.src} alt={item.label} />
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

function HomePage() {
  const [selectedQr, setSelectedQr] = useState(null);

  return (
    <main className="site-page">
      <GlobalMotionField />
      <SectionNav />
      <Header />
      {selectedQr ? <QrModal src={selectedQr.src} label={selectedQr.label} onClose={() => setSelectedQr(null)} /> : null}
      <HeroSection />
      <MarqueeStrip />
      <AboutSection />
      <MediaSection />
      <StatsSection />
      <ExpertiseSection />
      <AchievementsSection />
      <CertificationsSection />
      <LearningUniverse />
      <ContactSection onSelectQr={setSelectedQr} />
      <footer className="site-footer">
        <span>© {new Date().getFullYear()} 赵森林 / 乐启享机器人 / 保留所有权利</span>
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
