# Senlin Content Universe Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the mirrored personal site with a new media hub, direct app links, a rotatable teaching-scene photo gallery, and clean Chinese copy while keeping the project maintainable.

**Architecture:** Keep the existing React + Framer Motion single-page site, but replace the corrupted content layer with clean data modules and extract the new “内容宇宙” feature into focused components. Use `import.meta.glob()` to turn `iamges/` into build-safe local gallery assets, and add one dedicated stylesheet for the media hub because this project ships a mirrored static `site.css`, not a live Tailwind compilation pipeline.

**Tech Stack:** React 19, Vite 8, Framer Motion, Testing Library, Vitest, existing mirrored `public/assets/site.css`

---

## File Structure

**Modify**
- `D:\kaifa\senlin_website\src\App.jsx`
  - Replace corrupted Chinese copy, insert the new `media` section, and compose the new components into the existing page shell.
- `D:\kaifa\senlin_website\src\data.js`
  - Normalize all existing static copy and section metadata, including the new `media` nav dot.
- `D:\kaifa\senlin_website\src\main.jsx`
  - Import the new local stylesheet so the ring gallery and lightbox styles ship with the app.
- `D:\kaifa\senlin_website\tests\frontend\app.test.jsx`
  - Update expectations to clean Chinese copy and add regression tests for videos, apps, and gallery lightbox behavior.

**Create**
- `D:\kaifa\senlin_website\src\mediaData.js`
  - Own the new Douyin video cards and app matrix entries, including direct external URLs.
- `D:\kaifa\senlin_website\src\galleryAssets.js`
  - Resolve curated files from `D:\kaifa\senlin_website\iamges` into build-safe URLs and attach human-readable labels/categories.
- `D:\kaifa\senlin_website\src\components\ImageLightbox.jsx`
  - Shared full-screen image preview modal with escape-close and backdrop-close behavior.
- `D:\kaifa\senlin_website\src\components\MediaSection.jsx`
  - Render the “精选视频 / 应用矩阵 / 教学现场环形相册” section and coordinate lightbox state.
- `D:\kaifa\senlin_website\src\styles\content-universe.css`
  - Provide custom media layout, 3D ring, hover pause, glow edges, and mobile fallback styles.

**Test**
- `D:\kaifa\senlin_website\tests\frontend\app.test.jsx`
- Existing regression still covered by `D:\kaifa\senlin_website\tests\frontend\vite-config.test.js`

**Git note**
- `D:\kaifa` is the current Git root and it is an uninitialized umbrella workspace containing unrelated directories.
- Treat the commit steps below as deferred until `D:\kaifa\senlin_website` is isolated into its own repo or worktree.

---

### Task 1: Clean Copy And Restore The Page Shell

**Files:**
- Modify: `D:\kaifa\senlin_website\tests\frontend\app.test.jsx`
- Modify: `D:\kaifa\senlin_website\src\data.js`
- Modify: `D:\kaifa\senlin_website\src\App.jsx`

- [ ] **Step 1: Write the failing shell regression test**

Replace `D:\kaifa\senlin_website\tests\frontend\app.test.jsx` with:

```jsx
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import App from "../../src/App.jsx";

const SECTION_IDS = [
  "hero",
  "marquee",
  "about",
  "media",
  "stats",
  "expertise",
  "achievements",
  "certifications",
  "contact",
];

describe("personal site rebuild", () => {
  test("renders the rebuilt sections and navigation shell", () => {
    render(<App />);

    expect(screen.getByText("赵森林")).toBeInTheDocument();
    expect(
      screen.getByText("副校长 / 合伙人 / 乐启享机器人"),
    ).toBeInTheDocument();

    for (const id of SECTION_IDS) {
      expect(document.getElementById(id)).toBeInTheDocument();
      expect(screen.getByTestId(`nav-dot-${id}`)).toBeInTheDocument();
    }

    expect(screen.getByTestId("btn-scroll")).toBeInTheDocument();
    expect(screen.getByTestId("img-profile")).toBeInTheDocument();
    expect(screen.getByTestId("img-wrcc")).toBeInTheDocument();
    expect(screen.getByTestId("contact-wechat")).toBeInTheDocument();
    expect(screen.getByTestId("contact-douyin")).toBeInTheDocument();
  });

  test("uses smooth scrolling for the hero CTA and section dots", () => {
    render(<App />);

    const marquee = document.getElementById("marquee");
    const contact = document.getElementById("contact");
    const marqueeSpy = vi.spyOn(marquee, "scrollIntoView");
    const contactSpy = vi.spyOn(contact, "scrollIntoView");

    fireEvent.click(screen.getByTestId("btn-scroll"));
    fireEvent.click(screen.getByTestId("nav-dot-contact"));

    expect(marqueeSpy).toHaveBeenCalledWith({ behavior: "smooth" });
    expect(contactSpy).toHaveBeenCalledWith({ behavior: "smooth" });
  });

  test("opens and closes the QR modal", async () => {
    render(<App />);

    fireEvent.click(screen.getByTestId("contact-wechat"));

    expect(screen.getByTestId("btn-close-qr")).toBeInTheDocument();
    expect(screen.getByText("长按或扫描二维码")).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });

    await waitFor(() => {
      expect(screen.queryByTestId("btn-close-qr")).not.toBeInTheDocument();
    });
  });
});
```

- [ ] **Step 2: Run the updated shell test to verify it fails**

Run:

```bash
npm test -- tests/frontend/app.test.jsx -t "renders the rebuilt sections and navigation shell"
```

Expected:

```text
FAIL
Unable to find an element with the text: 赵森林
```

- [ ] **Step 3: Replace the corrupted shell copy and add the `media` section to the nav**

Update `D:\kaifa\senlin_website\src\data.js` so the corrupted shell constants become clean Chinese and the nav includes `media`:

```js
export const SECTION_NAV_ITEMS = [
  { id: "hero", label: "首页" },
  { id: "marquee", label: "身份" },
  { id: "about", label: "关于" },
  { id: "media", label: "内容宇宙" },
  { id: "stats", label: "数据" },
  { id: "expertise", label: "专业" },
  { id: "achievements", label: "荣誉" },
  { id: "certifications", label: "认证" },
  { id: "contact", label: "联系" },
];

export const TYPEWRITER_LINES = [
  "编程教育 / 全栈开发 / 竞赛指导",
  "NOI 指导教师 / 1000+ 学员获奖",
  "乐启享机器人 / 副校长 / 合伙人",
  "Python / C++ / Web / AI 教学实践",
];

export const MARQUEE_ITEMS = [
  { text: "NOI 指导教师", accent: true },
  { text: "1000+ 学员获奖", accent: false },
  { text: "乐启享机器人", accent: false },
  { text: "副校长 / 合伙人", accent: true },
  { text: "全栈开发", accent: false },
  { text: "WRCC 2025 指导成果", accent: true },
  { text: "六年编程教育深耕", accent: false },
  { text: "Python / C++ / Web", accent: false },
];

export const STAT_ITEMS = [
  { label: "辅导学生获奖", to: 1000, suffix: "+" },
  { label: "编程教育深耕", to: 6, suffix: "+" },
  { label: "全国赛事荣誉", to: "多项", suffix: "" },
];

export const EXPERTISE_ITEMS = [
  {
    title: "Python / C++ 教学",
    icon: CodeXml,
    desc: "从图形化启蒙到 Python、C++ 进阶训练，覆盖兴趣入门与竞赛能力培养。",
  },
  {
    title: "全栈应用开发",
    icon: Layers,
    desc: "把 Web、系统和 AI 工具开发经验转成孩子看得见、摸得着的教学成果。",
  },
  {
    title: "竞赛指导",
    icon: Award,
    desc: "长期参与 NOI、CSP-J/S 等方向指导，持续带出有成绩、有过程的学生作品。",
  },
  {
    title: "课程设计",
    icon: BookOpen,
    desc: "擅长把复杂知识拆成适龄课程，让课堂既有方法也有现场体验感。",
  },
];

export const ACHIEVEMENT_ITEMS = [
  {
    num: "01",
    title: "NOI 与信息学竞赛指导经验",
    desc: "长期深耕算法、数据结构与竞赛路线，让学生从兴趣学习走向更高阶训练。",
  },
  {
    num: "02",
    title: "全国赛事与机器人项目成果",
    desc: "围绕编程、机器人与综合实践项目，持续产出真实可展示的团队成绩。",
  },
  {
    num: "03",
    title: "课程研发与教学落地能力",
    desc: "不仅能教，还能把课程、工具和互动体验落成一个完整教学场景。",
  },
];

export const CERTIFICATION_ITEMS = [
  "NCT 青少年编程教师职业技能认证",
  "全国青少年编程能力等级考试评审相关经验",
  "NOI 系列竞赛指导实践",
  "全栈开发与教学场景融合实践",
];

export const CONTACT_ITEMS = [
  {
    label: "微信 / WeChat",
    src: "/qr-wechat.jpg",
    sub: "扫码添加森林老师",
    testId: "contact-wechat",
  },
  {
    label: "抖音 / Douyin",
    src: "/qr-douyin.jpg",
    sub: "@愈见森林 / 79212093120",
    testId: "contact-douyin",
  },
];

export const HERO_LEFT_STATUS = [
  "SYS // EDUCATOR_PROFILE_v3.0",
  "STATUS // ONLINE",
  "FOCUS // EDU / AI / COMPETITION",
];

export const HERO_RIGHT_STATUS = [
  "NOI // PRACTICE",
  "STUDENTS // 1000+",
  "WRCC // 2025",
];
```

Update the affected shell strings in `D:\kaifa\senlin_website\src\App.jsx`:

```jsx
<span className="font-serif font-bold text-lg tracking-wider text-white">赵森林</span>

<motion.div
  initial={{ opacity: 0, x: 16 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.7, delay: 0.15 }}
  className="font-mono text-[11px] tracking-[0.18em] text-primary/80 uppercase hidden sm:block"
>
  副校长 / 合伙人 / 乐启享机器人
</motion.div>
```

Also replace the user-facing about/achievement/contact/footer copy in `D:\kaifa\senlin_website\src\App.jsx` with clean text:

```jsx
alt="赵森林老师"

<p>
  赵森林老师，深耕编程教育六年，长期围绕 Python、C++、Web 应用和项目化教学展开实践。
  在课堂里，他关注孩子的学习兴趣、表达能力和动手能力；在项目里，他更强调把知识做成真正能展示的成果。
</p>
<p>
  作为一线教学者与项目带队老师，他持续把课程研发、应用设计、竞赛训练和真实教学现场结合在一起，
  让学生不只“学会”，更能“做出东西”“讲清过程”“拿到结果”。
</p>

<p className="text-lg md:text-xl font-serif text-white/85 italic leading-snug">
  "教育不只是把答案交给学生，
  <br />
  更重要的是点亮他们愿意继续探索的状态。"
</p>

{["6年+ 教学实践", "1000+ 学员成果", "课堂 / 项目 / 竞赛联动"].map((item) => (
```

```jsx
<p className="font-mono text-primary text-[10px] tracking-[0.3em] uppercase mb-2">
  WRCC 2025 / 宜昌
</p>
<h3 className="text-2xl md:text-4xl font-serif font-bold text-white leading-tight">
  世界机器人大赛现场成果
  <br />
  从训练到领奖的完整链路
</h3>
<p className="text-muted-foreground mt-2 text-sm">
  比赛组织、学生带队、项目调试与成果展示同步落地
</p>
```

```jsx
<motion.h2
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="text-5xl md:text-[5rem] font-serif font-bold leading-tight mb-6"
>
  一起把
  <br />
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-secondary">
    编程教育做得更立体
  </span>
</motion.h2>
<motion.p
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ delay: 0.2 }}
  className="text-muted-foreground max-w-lg mx-auto mb-16 leading-relaxed"
>
  无论你是家长、学校、机构，还是希望进一步合作的伙伴，都可以通过微信或抖音继续了解我正在做的内容与项目。
</motion.p>
```

```jsx
<p className="font-mono text-[10px] text-muted-foreground/35 tracking-[0.3em] uppercase">
  © {new Date().getFullYear()} 赵森林 / 乐启享机器人 / 保留所有权利
</p>
```

Insert the new empty anchor section directly after `about` so the navigation test can pass before the full media content exists:

```jsx
<section id="media" className="py-24 px-8 md:px-16 max-w-[1400px] mx-auto">
  <div className="glass-card p-10" data-testid="section-media">
    <p className="font-mono text-primary/70 tracking-[0.25em] text-xs uppercase mb-3">
      内容宇宙 / Media
    </p>
    <h2 className="text-4xl md:text-5xl font-serif font-bold">精选内容与应用现场</h2>
  </div>
</section>
```

Also restore the QR helper text:

```jsx
<p className="text-xs text-gray-400 tracking-wider">长按或扫描二维码</p>
```

- [ ] **Step 4: Run the shell regression test again**

Run:

```bash
npm test -- tests/frontend/app.test.jsx -t "renders the rebuilt sections and navigation shell"
```

Expected:

```text
PASS
```

- [ ] **Step 5: Commit this shell restoration checkpoint**

Do not run this yet in the current `D:\kaifa` umbrella workspace. When the project is isolated, use:

```bash
git add src/App.jsx src/data.js tests/frontend/app.test.jsx
git commit -m "fix: restore shell copy and media nav anchor"
```

---

### Task 2: Add Video Cards And Direct App Matrix Links

**Files:**
- Modify: `D:\kaifa\senlin_website\tests\frontend\app.test.jsx`
- Create: `D:\kaifa\senlin_website\src\mediaData.js`
- Create: `D:\kaifa\senlin_website\src\components\MediaSection.jsx`
- Modify: `D:\kaifa\senlin_website\src\App.jsx`

- [ ] **Step 1: Add the failing media-link regression test**

Append these tests to `D:\kaifa\senlin_website\tests\frontend\app.test.jsx`:

```jsx
test("renders featured Douyin cards and direct-open app links", () => {
  render(<App />);

  const douyinLink = screen.getByTestId("video-link-knowledge-tool");
  expect(douyinLink).toHaveAttribute("href", "https://v.douyin.com/t9L2hN3pYNA/");
  expect(douyinLink).toHaveAttribute("target", "_blank");
  expect(douyinLink).toHaveAttribute("rel", "noreferrer");

  const pythonAdventure = screen.getByTestId("app-card-python-adventure");
  expect(pythonAdventure).toHaveAttribute("href", "https://game.codebn.cn/");
  expect(pythonAdventure).toHaveAttribute("target", "_blank");
  expect(screen.getByText("精选视频")).toBeInTheDocument();
  expect(screen.getByText("应用矩阵")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the media-link test to verify it fails**

Run:

```bash
npm test -- tests/frontend/app.test.jsx -t "renders featured Douyin cards and direct-open app links"
```

Expected:

```text
FAIL
Unable to find an element by: [data-testid="video-link-knowledge-tool"]
```

- [ ] **Step 3: Create the data module for videos and apps**

Create `D:\kaifa\senlin_website\src\mediaData.js`:

```js
export const VIDEO_ITEMS = [
  {
    slug: "knowledge-tool",
    title: "交互式知识理解工具用起来",
    summary: "用一个顺手的交互式工具，把抽象知识讲得更直观。",
    tags: ["AI学习", "知识工具", "互动理解"],
    href: "https://v.douyin.com/t9L2hN3pYNA/",
  },
  {
    slug: "english-resource",
    title: "免费英语资源赶紧用起来",
    summary: "适合英语启蒙和资源整理的一条实用型内容推荐。",
    tags: ["英语启蒙", "免费资源", "学习网站"],
    href: "https://v.douyin.com/nYzhLyIvGDc/",
  },
];

export const APP_ITEMS = [
  {
    slug: "python-adventure",
    title: "Python冒险岛",
    category: "游戏化编程",
    summary: "在像素世界里闯关学 Python，是应用矩阵里的主入口。",
    href: "https://game.codebn.cn/",
    featured: true,
  },
  {
    slug: "typing-lab",
    title: "享打字",
    category: "基础能力训练",
    summary: "把键盘输入训练成有反馈、可展示的成长体验。",
    href: "https://class.codebn.cn/",
  },
  {
    slug: "ai-research",
    title: "AI Research",
    category: "AI探索",
    summary: "作为扩展研究入口，展示 AI 检索与研究式学习方向。",
    href: "https://ai.codebn.cn/",
  },
  {
    slug: "code-research",
    title: "Code Research",
    category: "代码探索",
    summary: "展示代码理解、拆解和研究能力的延展入口。",
    href: "https://class.codebn.cn/",
  },
  {
    slug: "interactive-classroom",
    title: "AI互动课堂",
    category: "课堂生成",
    summary: "围绕评论区主题生成课堂，是最适合展示互动感的软件项目。",
    href: "https://ai.codebn.cn/",
  },
  {
    slug: "model-training",
    title: "模型训练",
    category: "AIbase / Teachable Machine",
    summary: "从训练体验切入，让孩子理解模型、样本和结果反馈。",
    href: "https://class.codebn.cn/",
  },
  {
    slug: "simulation-lab",
    title: "仿真模拟",
    category: "PhET 中文站",
    summary: "把抽象科学概念变成可操作的仿真体验。",
    href: "https://class.codebn.cn/",
  },
];
```

- [ ] **Step 4: Create the media section component and mount it**

Create `D:\kaifa\senlin_website\src\components\MediaSection.jsx`:

```jsx
import { motion } from "framer-motion";

import { APP_ITEMS, VIDEO_ITEMS } from "../mediaData.js";

export default function MediaSection() {
  const featuredApp = APP_ITEMS.find((item) => item.featured);
  const gridApps = APP_ITEMS.filter((item) => !item.featured);

  return (
    <section id="media" className="py-28 md:py-36 px-8 md:px-16 max-w-[1400px] mx-auto content-universe">
      <div className="mb-14">
        <p className="font-mono text-primary/70 tracking-[0.25em] text-xs uppercase mb-3">
          内容宇宙 / Media
        </p>
        <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
          内容输出、应用作品与教学现场
        </h2>
      </div>

      <div className="content-universe-stack">
        <div className="media-block">
          <div className="mb-6">
            <p className="font-mono text-primary/60 tracking-[0.2em] text-xs uppercase mb-2">
              Video Picks
            </p>
            <h3 className="text-3xl md:text-4xl font-serif font-bold">精选视频</h3>
          </div>
          <div className="media-video-grid">
            {VIDEO_ITEMS.map((item) => (
              <article key={item.slug} className="glass-card media-panel group">
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-[11px] font-mono tracking-wider text-primary border border-primary/25">
                      {tag}
                    </span>
                  ))}
                </div>
                <h4 className="text-2xl font-serif font-bold mb-3">{item.title}</h4>
                <p className="text-muted-foreground leading-relaxed mb-6">{item.summary}</p>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  data-testid={`video-link-${item.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-3 border border-primary/35 text-primary hover:bg-primary/10 transition-colors"
                >
                  打开抖音观看
                </a>
              </article>
            ))}
          </div>
        </div>

        <div className="media-block">
          <div className="mb-6">
            <p className="font-mono text-primary/60 tracking-[0.2em] text-xs uppercase mb-2">
              App Matrix
            </p>
            <h3 className="text-3xl md:text-4xl font-serif font-bold">应用矩阵</h3>
          </div>

          <div className="media-app-layout">
            <a
              href={featuredApp.href}
              target="_blank"
              rel="noreferrer"
              data-testid={`app-card-${featuredApp.slug}`}
              className="glass-card media-panel media-panel-featured hover:-translate-y-1 transition-transform"
            >
              <div>
                <p className="font-mono text-primary/70 text-xs tracking-[0.25em] uppercase mb-3">
                  Featured App
                </p>
                <h4 className="text-4xl font-serif font-bold mb-4">{featuredApp.title}</h4>
                <p className="text-primary/80 mb-2">{featuredApp.category}</p>
                <p className="text-muted-foreground leading-relaxed">{featuredApp.summary}</p>
              </div>
              <span className="font-mono text-sm tracking-[0.2em] text-primary uppercase">立即体验</span>
            </a>

            <div className="media-app-grid">
              {gridApps.map((item) => (
                <a
                  key={item.slug}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  data-testid={`app-card-${item.slug}`}
                  className="glass-card media-panel media-panel-compact hover:-translate-y-1 transition-transform"
                >
                  <p className="font-mono text-primary/65 text-[11px] tracking-[0.2em] uppercase mb-3">
                    {item.category}
                  </p>
                  <h4 className="text-xl font-serif font-bold mb-3">{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.summary}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

Mount it in `D:\kaifa\senlin_website\src\App.jsx`:

```jsx
import MediaSection from "./components/MediaSection.jsx";
```

Replace the temporary `media` placeholder section with:

```jsx
<MediaSection />
```

- [ ] **Step 5: Run the media-link test again**

Run:

```bash
npm test -- tests/frontend/app.test.jsx -t "renders featured Douyin cards and direct-open app links"
```

Expected:

```text
PASS
```

Then defer the commit until repo isolation:

```bash
git add src/mediaData.js src/components/MediaSection.jsx src/App.jsx tests/frontend/app.test.jsx
git commit -m "feat: add video cards and direct app matrix links"
```

---

### Task 3: Build The Curated Gallery, Hover Pause, And Image Lightbox

**Files:**
- Modify: `D:\kaifa\senlin_website\tests\frontend\app.test.jsx`
- Create: `D:\kaifa\senlin_website\src\galleryAssets.js`
- Create: `D:\kaifa\senlin_website\src\components\ImageLightbox.jsx`
- Modify: `D:\kaifa\senlin_website\src\components\MediaSection.jsx`

- [ ] **Step 1: Add the failing gallery lightbox regression**

Append this test to `D:\kaifa\senlin_website\tests\frontend\app.test.jsx`:

```jsx
test("opens and closes the teaching-scene image lightbox", async () => {
  render(<App />);

  fireEvent.click(screen.getByTestId("gallery-card-classroom-guidance"));

  expect(screen.getByTestId("image-lightbox")).toBeInTheDocument();
  expect(screen.getByText("教学现场")).toBeInTheDocument();

  fireEvent.keyDown(window, { key: "Escape" });

  await waitFor(() => {
    expect(screen.queryByTestId("image-lightbox")).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the gallery regression to verify it fails**

Run:

```bash
npm test -- tests/frontend/app.test.jsx -t "opens and closes the teaching-scene image lightbox"
```

Expected:

```text
FAIL
Unable to find an element by: [data-testid="gallery-card-classroom-guidance"]
```

- [ ] **Step 3: Register curated gallery assets from `iamges/`**

Create `D:\kaifa\senlin_website\src\galleryAssets.js`:

```js
const modules = import.meta.glob("../iamges/*.{jpg,jpeg,png}", {
  eager: true,
  import: "default",
});

const assetMap = Object.fromEntries(
  Object.entries(modules).map(([key, value]) => [key.split("/").pop(), value]),
);

const curatedItems = [
  {
    slug: "classroom-guidance",
    filename: "4e7cde1d67137f31dbbaceea09b3ba97.jpg",
    title: "课堂辅导时刻",
    category: "教学现场",
    caption: "围着电脑带学生把问题讲透、做透。",
  },
  {
    slug: "teacher-student-portrait",
    filename: "03e58ed3352bb2c5b6c34475e3ef5c05.jpg",
    title: "师生同框",
    category: "师生合照",
    caption: "课堂里的陪伴感，来自真实的一对一指导。",
  },
  {
    slug: "student-window-team",
    filename: "7274f1e1f018e70e0e0b5f17d360949e.jpg",
    title: "学生团队合照",
    category: "学生团队",
    caption: "不同年龄段的孩子在同一个空间里一起成长。",
  },
  {
    slug: "wrcc-yichang-podium",
    filename: "57b76a27feb1167ff4387a3bcb517eae.jpg",
    title: "WRCC 宜昌领奖台",
    category: "比赛成果",
    caption: "站上赛场之后，成果会自己说话。",
  },
  {
    slug: "wrcc-beijing-team",
    filename: "6e43b26aa8d461efbe6bfd108898c4bf.jpg",
    title: "北京锦标赛团队照",
    category: "比赛成果",
    caption: "从日常训练到正式赛事，孩子们的状态更完整。",
  },
  {
    slug: "great-wall-outing",
    filename: "7b0629ffd37a15672eabce6da7b6563c.jpg",
    title: "长城活动日",
    category: "活动出行",
    caption: "学习之外，也有一起走出去的成长记忆。",
  },
  {
    slug: "classroom-group-fun",
    filename: "7ea7aec2c2fc24cdff315baf30e19994.jpg",
    title: "作品展示后合影",
    category: "学生团队",
    caption: "孩子有作品，团队就会有氛围。",
  },
  {
    slug: "python-adventure-stage",
    filename: "821a0144bad69f633441e1e7f00b0e20.jpg",
    title: "Python 冒险岛现场分享",
    category: "教学现场",
    caption: "把应用讲给更多人听，是教学延展的一部分。",
  },
  {
    slug: "teacher-student-medal",
    filename: "85fa5f3cea36d06b89a2802a08dd6d3a.jpg",
    title: "获奖后合影",
    category: "师生合照",
    caption: "成绩出来的那一刻，老师和学生都很清楚值不值。",
  },
  {
    slug: "competition-floor",
    filename: "bf42704d89c36b8f7175792f2c6406df.jpg",
    title: "比赛调试现场",
    category: "比赛成果",
    caption: "真正的比赛，不是只有领奖台，还有场内调试和临场协作。",
  },
  {
    slug: "certificate-group",
    filename: "c96b1c78e290ab5926348141528de895.jpg",
    title: "证书合照",
    category: "比赛成果",
    caption: "拿到证书时，孩子会更相信自己能继续走下去。",
  },
  {
    slug: "certificate-celebration",
    filename: "ca5c3b9bbe952a3346d5352649d7c360.jpg",
    title: "成果展示时刻",
    category: "学生团队",
    caption: "把努力抬起来给人看，本身就是成长的一部分。",
  },
];

export const GALLERY_ITEMS = curatedItems.map((item) => ({
  ...item,
  src: assetMap[item.filename],
}));
```

- [ ] **Step 4: Create the lightbox component and connect the gallery into `MediaSection.jsx`**

Create `D:\kaifa\senlin_website\src\components\ImageLightbox.jsx`:

```jsx
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

export default function ImageLightbox({ item, onClose }) {
  useEffect(() => {
    if (!item) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [item, onClose]);

  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        data-testid="image-lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[240] bg-black/85 backdrop-blur-md flex items-center justify-center p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 18 }}
          transition={{ type: "spring", stiffness: 240, damping: 24 }}
          className="max-w-5xl w-full bg-background border border-white/10 p-4 md:p-6"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <p className="font-mono text-xs tracking-[0.25em] text-primary/70 uppercase">{item.category}</p>
              <h4 className="text-2xl font-serif font-bold">{item.title}</h4>
            </div>
            <button
              type="button"
              onClick={onClose}
              data-testid="btn-close-image"
              className="px-3 py-2 border border-white/10 text-sm hover:border-primary/40 hover:text-primary transition-colors"
            >
              关闭
            </button>
          </div>
          <img src={item.src} alt={item.title} className="w-full max-h-[72vh] object-contain" />
          <p className="text-sm text-muted-foreground mt-4">{item.caption}</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
```

Update `D:\kaifa\senlin_website\src\components\MediaSection.jsx`:

```jsx
import { motion } from "framer-motion";
import { useState } from "react";

import ImageLightbox from "./ImageLightbox.jsx";
import { GALLERY_ITEMS } from "../galleryAssets.js";
import { APP_ITEMS, VIDEO_ITEMS } from "../mediaData.js";
```

Add the gallery state near the top of the component:

```jsx
const [selectedImage, setSelectedImage] = useState(null);
```

Append the gallery block before the closing `</section>`:

```jsx
        <div className="media-block">
          <div className="mb-6">
            <p className="font-mono text-primary/60 tracking-[0.2em] text-xs uppercase mb-2">
              Scene Gallery
    </p>
    <h3 className="text-3xl md:text-4xl font-serif font-bold">教学现场环形相册</h3>
  </div>

  <div className="ring-gallery-shell" data-testid="gallery-ring">
    <div className="ring-gallery-track">
      {GALLERY_ITEMS.map((item, index) => (
        <button
          key={item.slug}
          type="button"
          data-testid={`gallery-card-${item.slug}`}
          className="ring-gallery-card"
          style={{ "--ring-index": index, "--ring-total": GALLERY_ITEMS.length }}
          onClick={() => setSelectedImage(item)}
        >
          <img src={item.src} alt={item.title} className="ring-gallery-image" />
          <span className="ring-gallery-meta">
            <strong>{item.title}</strong>
            <small>{item.category}</small>
          </span>
        </button>
      ))}
    </div>
  </div>

          <div className="media-category-grid">
            {["师生合照", "学生团队", "教学现场", "比赛成果", "活动出行"].map((label) => (
              <div key={label} className="media-category-chip">
                {label}
              </div>
            ))}
  </div>
</div>

<ImageLightbox item={selectedImage} onClose={() => setSelectedImage(null)} />
```

- [ ] **Step 5: Run the gallery test again**

Run:

```bash
npm test -- tests/frontend/app.test.jsx -t "opens and closes the teaching-scene image lightbox"
```

Expected:

```text
PASS
```

Then defer the commit until repo isolation:

```bash
git add src/galleryAssets.js src/components/ImageLightbox.jsx src/components/MediaSection.jsx tests/frontend/app.test.jsx
git commit -m "feat: add teaching-scene gallery and image lightbox"
```

---

### Task 4: Add The Custom Stylesheet, Mobile Fallback, And Final Verification

**Files:**
- Create: `D:\kaifa\senlin_website\src\styles\content-universe.css`
- Modify: `D:\kaifa\senlin_website\src\main.jsx`
- Run: `D:\kaifa\senlin_website\tests\frontend\app.test.jsx`
- Run: `D:\kaifa\senlin_website\tests\frontend\vite-config.test.js`

- [ ] **Step 1: Make `main.jsx` import the new stylesheet before it exists**

Update `D:\kaifa\senlin_website\src\main.jsx` to:

```jsx
import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import "./styles/content-universe.css";

createRoot(document.getElementById("root")).render(<App />);
```

- [ ] **Step 2: Run the build to verify the missing stylesheet fails loudly**

Run:

```bash
npm run build
```

Expected:

```text
FAIL
Could not resolve "./styles/content-universe.css" from "src/main.jsx"
```

- [ ] **Step 3: Create the custom stylesheet and import it in `main.jsx`**

Create `D:\kaifa\senlin_website\src\styles\content-universe.css`:

```css
.content-universe-stack {
  display: grid;
  gap: 72px;
}

.media-block {
  display: grid;
  gap: 24px;
}

.media-video-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.media-app-layout {
  display: grid;
  grid-template-columns: minmax(280px, 1.1fr) minmax(0, 1.9fr);
  gap: 20px;
}

.media-app-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.media-panel {
  padding: 32px;
}

.media-panel-featured {
  min-height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.media-panel-compact {
  padding: 24px;
}

.media-category-grid {
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 12px;
}

.media-category-chip {
  padding: 12px 16px;
  border: 1px solid rgba(0, 212, 255, 0.15);
  background: rgba(0, 212, 255, 0.05);
  font-family: var(--app-font-mono);
  font-size: 12px;
  letter-spacing: 0.18em;
  color: rgba(0, 212, 255, 0.78);
  text-transform: uppercase;
  text-align: center;
}

.ring-gallery-shell {
  position: relative;
  min-height: 520px;
  perspective: 1600px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background:
    radial-gradient(circle at 50% 20%, rgba(0, 212, 255, 0.14), transparent 40%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.015));
}

.ring-gallery-shell::after {
  content: "";
  position: absolute;
  inset: auto 10% 10%;
  height: 80px;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(0, 212, 255, 0.22), rgba(0, 212, 255, 0));
  filter: blur(30px);
  pointer-events: none;
}

.ring-gallery-track {
  position: relative;
  width: 100%;
  height: 520px;
  transform-style: preserve-3d;
  animation: ringGallerySpin 28s linear infinite;
}

.ring-gallery-shell:hover .ring-gallery-track {
  animation-play-state: paused;
}

.ring-gallery-card {
  --ring-angle: calc(360deg / var(--ring-total) * var(--ring-index));
  position: absolute;
  top: 50%;
  left: 50%;
  width: 190px;
  height: 260px;
  transform-style: preserve-3d;
  transform:
    translate(-50%, -50%)
    rotateY(var(--ring-angle))
    translateZ(360px);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(9, 15, 29, 0.86);
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.28);
  transition:
    transform 220ms ease,
    border-color 220ms ease,
    box-shadow 220ms ease;
}

.ring-gallery-card:hover {
  border-color: rgba(0, 212, 255, 0.55);
  box-shadow: 0 20px 70px rgba(0, 212, 255, 0.18);
  transform:
    translate(-50%, -50%)
    rotateY(var(--ring-angle))
    translateZ(390px)
    translateY(-10px);
}

.ring-gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ring-gallery-meta {
  position: absolute;
  inset: auto 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px 12px;
  color: #fff;
  background: linear-gradient(to top, rgba(5, 8, 16, 0.92), rgba(5, 8, 16, 0));
  text-align: left;
}

.ring-gallery-meta strong {
  font-size: 14px;
  line-height: 1.35;
}

.ring-gallery-meta small {
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(0, 212, 255, 0.82);
}

@keyframes ringGallerySpin {
  from {
    transform: rotateX(-6deg) rotateY(0deg);
  }

  to {
    transform: rotateX(-6deg) rotateY(360deg);
  }
}

@media (max-width: 900px) {
  .media-video-grid,
  .media-app-layout,
  .media-app-grid,
  .media-category-grid {
    grid-template-columns: 1fr;
  }

  .ring-gallery-shell {
    min-height: auto;
    perspective: none;
    padding: 16px;
  }

  .ring-gallery-track {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 72%;
    gap: 16px;
    height: auto;
    overflow-x: auto;
    padding-bottom: 8px;
    animation: none;
    transform: none;
  }

  .ring-gallery-card,
  .ring-gallery-card:hover {
    position: relative;
    top: auto;
    left: auto;
    width: 100%;
    height: 240px;
    transform: none;
  }
}
```

- [ ] **Step 4: Run the full frontend regression and production build**

Run:

```bash
npm test -- tests/frontend/app.test.jsx
npm test -- tests/frontend/vite-config.test.js
npm run build
```

Expected:

```text
All app tests PASS
Vite config regression PASS
vite build completes successfully
```

- [ ] **Step 5: Commit the finished feature checkpoint**

Defer until the repo is isolated:

```bash
git add src/main.jsx src/styles/content-universe.css src/App.jsx src/data.js src/mediaData.js src/galleryAssets.js src/components/ImageLightbox.jsx src/components/MediaSection.jsx tests/frontend/app.test.jsx
git commit -m "feat: add content universe media hub and gallery"
```

---

## Self-Review

**Spec coverage**
- Clean Chinese copy across shell and existing sections: Task 1
- New `media` section and nav entry: Task 1
- Douyin featured cards: Task 2
- Direct-open app matrix: Task 2
- Curated ring gallery and lightbox: Task 3
- Mobile fallback and custom styling: Task 4
- Verification through tests and build: Task 4

**Placeholder scan**
- No `TODO`, `TBD`, or empty URL steps remain.
- The app URLs that lack exact deep-link certainty are explicitly routed to stable site roots and kept in a dedicated data module for easy replacement.

**Type consistency**
- Gallery card test IDs use the same `gallery-card-${slug}` pattern defined by `GALLERY_ITEMS`.
- Video/app link test IDs match the `slug` fields in `mediaData.js`.
- The lightbox state key is `selectedImage` in both the component plan and the test expectations.
