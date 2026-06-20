# Art Tech Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the Senlin personal site into a premium art-tech educator portfolio inspired by 14islands structure, Active Theory atmosphere, and a contained Bruno Simon-style interaction.

**Architecture:** Keep the existing React + Vite app, but replace the current corrupted visual/content layer with clean UTF-8 data and focused components. Use CSS-driven responsive layouts plus a lightweight canvas hero background, avoiding heavy 3D dependencies.

**Tech Stack:** React 19, Vite 8, Framer Motion, lucide-react, Testing Library, Vitest, local image assets.

---

## File Structure

- Modify `src/data.js`: replace corrupted text with clean UTF-8 content and add `LEARNING_NODES`.
- Modify `src/mediaData.js`: replace corrupted project/media text with clean UTF-8 project case data.
- Modify `src/galleryAssets.js`: replace corrupted gallery text with clean UTF-8 teaching-scene metadata.
- Modify `src/App.jsx`: rebuild page structure around hero, proof strip, person section, expertise, achievements, certifications, contact, and the new `LearningUniverse`.
- Modify `src/components/MediaSection.jsx`: convert card-heavy media section into premium case-study and teaching archive layout while preserving test ids and outbound links.
- Create `src/components/LearningField.jsx`: canvas background for the Active Theory-inspired hero atmosphere.
- Create `src/components/LearningUniverse.jsx`: contained Bruno-inspired interactive node explorer.
- Modify `src/styles/content-universe.css`: replace existing media-only CSS with the new full-site visual system.
- Modify `tests/frontend/app.test.jsx`: update assertions to clean Chinese copy and new sections.
- Modify `tests/frontend/gallery.test.jsx`: update assertions to clean gallery category text.
- Modify `tests/frontend/vite-config.test.js`: keep existing assertions.

## Tasks

### Task 1: Update Tests For The New Clean Content Contract

**Files:**
- Modify: `tests/frontend/app.test.jsx`
- Modify: `tests/frontend/gallery.test.jsx`

- [ ] **Step 1: Replace app content assertions**

Update `tests/frontend/app.test.jsx` so the first test expects clean content and the new learning universe:

```jsx
expect(screen.getByText("赵森林")).toBeInTheDocument();
expect(screen.getByText("副校长 / 合伙人 / 乐启享机器人")).toBeInTheDocument();
expect(screen.getByText("把编程教育做成可体验的未来现场")).toBeInTheDocument();
expect(screen.getByTestId("learning-universe")).toBeInTheDocument();
```

Keep `SECTION_IDS` as:

```jsx
const SECTION_IDS = [
  "hero",
  "marquee",
  "about",
  "media",
  "stats",
  "expertise",
  "achievements",
  "certifications",
  "learning-universe",
  "contact",
];
```

- [ ] **Step 2: Replace media assertions**

In `tests/frontend/app.test.jsx`, replace corrupted media text assertions with:

```jsx
expect(screen.getByText("主舞台应用")).toBeInTheDocument();
expect(screen.getByText("应用作品集")).toBeInTheDocument();
expect(screen.getByText("课堂反馈系统")).toBeInTheDocument();
expect(screen.getByText("抖音内容入口")).toBeInTheDocument();
expect(screen.getByText("教学现场档案")).toBeInTheDocument();
```

- [ ] **Step 3: Replace gallery lightbox assertion**

In `tests/frontend/gallery.test.jsx`, replace the corrupted category assertion with:

```jsx
expect(within(lightbox).getByText("教学现场")).toBeInTheDocument();
```

- [ ] **Step 4: Run tests and verify expected failure**

Run:

```bash
npm test -- tests/frontend/app.test.jsx tests/frontend/gallery.test.jsx
```

Expected: tests fail because production code still renders corrupted old text and lacks `learning-universe`.

### Task 2: Clean Data Modules

**Files:**
- Modify: `src/data.js`
- Modify: `src/mediaData.js`
- Modify: `src/galleryAssets.js`

- [ ] **Step 1: Replace `src/data.js`**

Use clean Chinese text for navigation, hero, stats, expertise, achievements, certifications, contact, and learning nodes. Preserve exported names used by components.

- [ ] **Step 2: Replace `src/mediaData.js`**

Use clean Chinese text for stage apps, app showcase items, featured videos, and Douyin profile. Preserve ids and hrefs:

```js
python-adventure -> https://game.codebn.cn/
classroom-feedback -> https://stu.codebn.cn/
typing-fun -> https://class.codebn.cn/
ai-research -> https://ai.codebn.cn/
```

- [ ] **Step 3: Replace `src/galleryAssets.js` text only**

Keep `import.meta.glob("../iamges/*.{jpg,jpeg,png}")`, filenames, slugs, and `GALLERY_ITEMS` shape. Replace titles, categories, and descriptions with clean Chinese text.

- [ ] **Step 4: Run tests**

Run:

```bash
npm test -- tests/frontend/app.test.jsx tests/frontend/gallery.test.jsx
```

Expected: tests still fail because components have not been rebuilt yet, but data import errors must not occur.

### Task 3: Add Hero Field And Learning Universe Components

**Files:**
- Create: `src/components/LearningField.jsx`
- Create: `src/components/LearningUniverse.jsx`

- [ ] **Step 1: Create `LearningField.jsx`**

Create a canvas component that draws low-contrast orbital nodes and connecting traces. It must:

- Render `<canvas className="learning-field-canvas" aria-hidden="true" />`.
- Use `requestAnimationFrame`.
- Respect `prefers-reduced-motion` by drawing one static frame.
- Clean up resize and animation listeners on unmount.

- [ ] **Step 2: Create `LearningUniverse.jsx`**

Create an interactive section with:

- `<section id="learning-universe" data-testid="learning-universe">`
- Nodes sourced from `LEARNING_NODES`.
- `useState` for active node.
- Buttons with `data-testid={`learning-node-${node.id}`}`.
- A panel showing active node title, subtitle, description, and chips.

- [ ] **Step 3: Run tests**

Run:

```bash
npm test -- tests/frontend/app.test.jsx tests/frontend/gallery.test.jsx
```

Expected: tests still fail until `App.jsx` renders the new component.

### Task 4: Rebuild App Layout

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Import new components**

Add:

```jsx
import LearningField from "./components/LearningField.jsx";
import LearningUniverse from "./components/LearningUniverse.jsx";
```

- [ ] **Step 2: Rebuild hero**

Use `LearningField` as the hero background, clean title text, status text, and proof indicators. Keep `data-testid="btn-scroll"` and scroll it to `marquee`.

- [ ] **Step 3: Rebuild about, stats, expertise, achievements, certifications, contact**

Preserve section ids and key test ids:

- `img-profile`
- `img-wrcc`
- `contact-wechat`
- `contact-douyin`
- `btn-close-qr`

- [ ] **Step 4: Insert LearningUniverse**

Place `<LearningUniverse />` between certifications and contact.

- [ ] **Step 5: Run tests**

Run:

```bash
npm test -- tests/frontend/app.test.jsx tests/frontend/gallery.test.jsx
```

Expected: most app tests now pass except media tests if `MediaSection` still contains old text.

### Task 5: Rebuild Media Section

**Files:**
- Modify: `src/components/MediaSection.jsx`

- [ ] **Step 1: Replace section introduction**

Use clean text:

```jsx
<p className="media-section-eyebrow">作品与现场 / Portfolio</p>
<h2 className="media-section-title">把课程、应用和真实成果放进同一个展厅</h2>
```

- [ ] **Step 2: Convert stage apps to case-study panels**

Preserve `data-testid={`app-card-${app.id}`}` and outbound link behavior.

- [ ] **Step 3: Convert showcase rail**

Preserve `data-testid="app-showcase-rail"` and legacy `app-card-typing-fun`.

- [ ] **Step 4: Convert gallery to teaching archive**

Preserve:

```jsx
data-testid="gallery-ring"
data-testid={`gallery-card-${item.slug}`}
```

The visual layout can become masonry/archive rather than a 3D ring, but the test id remains `gallery-ring`.

- [ ] **Step 5: Convert Douyin block**

Preserve:

```jsx
data-testid="douyin-home-link"
data-testid={`video-link-${video.id}`}
data-testid={`video-cover-${video.id}`}
```

- [ ] **Step 6: Run tests**

Run:

```bash
npm test
```

Expected: all frontend tests pass.

### Task 6: Replace Visual System CSS

**Files:**
- Modify: `src/styles/content-universe.css`

- [ ] **Step 1: Define full-site design tokens**

Add palette, typography, layout shell, hero, editorial light sections, case studies, archive, learning universe, contact, responsive rules.

- [ ] **Step 2: Remove obsolete ring gallery dependency**

Keep compatibility for `gallery-ring` but remove spinning 3D ring styling.

- [ ] **Step 3: Verify layout by build**

Run:

```bash
npm run build
```

Expected: Vite build completes successfully.

### Task 7: Browser Verification

**Files:**
- No source edits unless verification reveals visual defects.

- [ ] **Step 1: Start or reuse dev server**

Run:

```bash
npm run dev -- --host 127.0.0.1
```

If port 5173 is already running, reuse it.

- [ ] **Step 2: Capture desktop screenshot**

Use Chrome headless at `1440x1000` and save `.chrome-redesign-desktop.png`.

- [ ] **Step 3: Capture mobile screenshot**

Use Chrome headless at `390x844` and save `.chrome-redesign-mobile.png`.

- [ ] **Step 4: Inspect screenshots**

Confirm:

- page is not blank
- hero text is visible
- no obvious text overlap
- contact QR cards are reachable
- mobile layout stacks cleanly

### Task 8: Commit And Push

**Files:**
- All changed project files.

- [ ] **Step 1: Check git status**

Run:

```bash
git status --short
```

- [ ] **Step 2: Stage relevant files**

Run:

```bash
git add .gitignore docs/design-references docs/superpowers/plans src tests package.json package-lock.json index.html vite.config.js public iamges mirror_site.py
```

- [ ] **Step 3: Commit**

Run:

```bash
git commit -m "feat: redesign personal site with art-tech direction"
```

- [ ] **Step 4: Push**

Run:

```bash
git push -u origin main
```
