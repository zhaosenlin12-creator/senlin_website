# Senlin Orbital Theatre Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the dense media section with image-led moving application rails and a fully interactive teaching-gallery orbit while preserving the existing personal-site brand.

**Architecture:** Keep application and gallery content data-driven. Split the media section into focused `AppRail`, `OrbitGallery`, and `VideoStrip` components; use CSS for continuous rail motion and React state/pointer events for gallery selection and history-aware lightbox behavior.

**Tech Stack:** React 19, Framer Motion, CSS, Vitest, Testing Library, ImageGen-produced WebP assets

---

### Task 1: Generate And Register Application Artwork

**Files:**
- Create: `public/media/apps/*.webp`
- Modify: `src/mediaData.js`
- Test: `tests/frontend/app.test.jsx`

- [ ] **Step 1: Write the failing artwork contract test**

Add a test that renders the media section and asserts every unique app card has a non-empty `/media/apps/` image source and a real `https://` link:

```jsx
test("renders image-led app cards with safe external links", () => {
  render(<App />);
  const cards = screen.getAllByTestId(/^app-card-/);
  expect(cards).toHaveLength(8);

  for (const card of cards) {
    expect(card).toHaveAttribute("target", "_blank");
    expect(card).toHaveAttribute("rel", "noopener noreferrer");
    expect(card.querySelector("img")?.getAttribute("src")).toMatch(/^\/media\/apps\/.+\.webp$/);
  }
});
```

- [ ] **Step 2: Run the focused test and confirm RED**

Run: `npm test -- tests/frontend/app.test.jsx -t "renders image-led app cards with safe external links"`  
Expected: FAIL because the current cards use generated CSS posters and repeated stage/showcase entries.

- [ ] **Step 3: Generate eight coordinated assets**

Use one ImageGen call per application with the shared art direction from the design spec. Copy selected outputs into `public/media/apps/` as WebP files with the exact names defined in the specification.

- [ ] **Step 4: Consolidate application data**

Replace duplicated `STAGE_APPS` and `APP_SHOWCASE_ITEMS` with one `APP_ITEMS` array. Each entry must contain:

```js
{
  id: "python-adventure",
  name: "Python 冒险岛",
  category: "游戏化编程",
  href: "https://game.codebn.cn/",
  image: "/media/apps/python-adventure.webp",
  accent: "cyan",
}
```

- [ ] **Step 5: Run the focused test and confirm GREEN**

Run: `npm test -- tests/frontend/app.test.jsx -t "renders image-led app cards with safe external links"`  
Expected: PASS with exactly eight unique cards.

### Task 2: Build The Kinetic Application Rails

**Files:**
- Create: `src/components/AppRail.jsx`
- Modify: `src/components/MediaSection.jsx`
- Modify: `src/styles/content-universe.css`
- Test: `tests/frontend/app.test.jsx`

- [ ] **Step 1: Write the failing rail behavior test**

```jsx
test("pauses an application rail during hover and focus", () => {
  render(<App />);
  const rail = screen.getByTestId("app-rail-primary");
  fireEvent.mouseEnter(rail);
  expect(rail).toHaveAttribute("data-paused", "true");
  fireEvent.mouseLeave(rail);
  expect(rail).toHaveAttribute("data-paused", "false");
});
```

- [ ] **Step 2: Run the focused test and confirm RED**

Run: `npm test -- tests/frontend/app.test.jsx -t "pauses an application rail during hover and focus"`  
Expected: FAIL because `app-rail-primary` does not exist.

- [ ] **Step 3: Implement `AppRail`**

Create a component with local `paused` state, duplicated decorative items marked `aria-hidden="true"` and `tabIndex={-1}`, and the original eight links as the only keyboard-focusable cards. Render image, category, name, and one `进入体验` action.

- [ ] **Step 4: Replace stage and poster panels**

In `MediaSection.jsx`, replace `StageAppCard`, `ShowcaseRailCard`, and poster helpers with two `AppRail` instances. Use the same eight apps split into balanced rows without duplicating interactive links.

- [ ] **Step 5: Implement rail motion and mobile fallback**

CSS must use one continuous transform animation per rail, pause through `[data-paused="true"]`, support opposite directions, use `scroll-snap-type: x mandatory` below 960px, and disable motion under `prefers-reduced-motion: reduce`.

- [ ] **Step 6: Run the focused test and confirm GREEN**

Run: `npm test -- tests/frontend/app.test.jsx -t "pauses an application rail during hover and focus"`  
Expected: PASS.

### Task 3: Build The Interactive Orbit Gallery

**Files:**
- Create: `src/components/OrbitGallery.jsx`
- Modify: `src/components/ImageLightbox.jsx`
- Modify: `src/components/MediaSection.jsx`
- Modify: `src/styles/content-universe.css`
- Test: `tests/frontend/gallery.test.jsx`

- [ ] **Step 1: Write failing navigation and history tests**

```jsx
test("moves the orbit with controls and closes the lightbox on popstate", async () => {
  render(<App />);
  const active = screen.getByTestId("gallery-active-title");
  const before = active.textContent;
  fireEvent.click(screen.getByTestId("gallery-next"));
  expect(active.textContent).not.toBe(before);

  fireEvent.click(screen.getByTestId("gallery-open-active"));
  expect(screen.getByTestId("image-lightbox")).toBeInTheDocument();
  fireEvent.popState(window);
  await waitFor(() => expect(screen.queryByTestId("image-lightbox")).not.toBeInTheDocument());
});
```

- [ ] **Step 2: Run the gallery test and confirm RED**

Run: `npm test -- tests/frontend/gallery.test.jsx -t "moves the orbit with controls"`  
Expected: FAIL because orbit controls do not exist.

- [ ] **Step 3: Implement `OrbitGallery`**

Use an `activeIndex`, wraparound `move(delta)` helper, interval-based auto-advance, pause state, pointer start/end coordinates, arrow-key handling, and deterministic distance-based transforms. Render previous/next controls and an active-card button with stable test IDs.

- [ ] **Step 4: Make the lightbox history-aware**

When opening, call `history.pushState({ galleryLightbox: true }, "")`. Listen for `popstate` to close. The close button should call `history.back()` only when the current entry was created by the gallery; Escape and overlay click use the same close path.

- [ ] **Step 5: Add desktop orbit and mobile snap styles**

Desktop uses a 3D elliptical orbit with the active card largest and nearest. Below 960px, render a horizontal snap strip with touch scrolling and no pointer-drag interception.

- [ ] **Step 6: Run gallery tests and confirm GREEN**

Run: `npm test -- tests/frontend/gallery.test.jsx`  
Expected: PASS for opening, Escape, controls, and popstate.

### Task 4: Reduce Copy And Rebalance The Page

**Files:**
- Modify: `src/components/MediaSection.jsx`
- Modify: `src/App.jsx`
- Modify: `src/styles/content-universe.css`
- Test: `tests/frontend/app.test.jsx`

- [ ] **Step 1: Write the concise-copy regression**

```jsx
test("uses the concise media narrative", () => {
  render(<App />);
  expect(screen.getByRole("heading", { name: "作品现场" })).toBeInTheDocument();
  expect(screen.queryByText("主舞台应用")).not.toBeInTheDocument();
  expect(screen.queryByText("应用海报滑轨")).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test and confirm RED**

Run: `npm test -- tests/frontend/app.test.jsx -t "uses the concise media narrative"`  
Expected: FAIL while old headings remain.

- [ ] **Step 3: Replace copy and tighten About**

Use `作品现场` as the media heading, one sentence `把课堂方法做成可以直接体验的作品。`, `真实课堂` for the gallery, and `继续了解` for the two-video strip. Reduce About body to one concise paragraph plus three evidence chips.

- [ ] **Step 4: Rebalance spacing and surfaces**

Remove full bordered wrappers around every media subsection. Use asymmetrical widths, larger section gaps, and a single active accent rather than repeated glow borders.

- [ ] **Step 5: Run the focused test and confirm GREEN**

Run: `npm test -- tests/frontend/app.test.jsx -t "uses the concise media narrative"`  
Expected: PASS.

### Task 5: Complete Responsive, Accessibility, And Visual QA

**Files:**
- Modify: `src/styles/content-universe.css`
- Modify: `tests/frontend/app.test.jsx`
- Create: `design-qa.md`

- [ ] **Step 1: Add accessibility assertions**

Assert gallery buttons expose `aria-label`, application images expose meaningful `alt`, and decorative rail duplicates are not focusable.

- [ ] **Step 2: Run the complete automated suite**

Run: `npm test`  
Expected: all frontend tests pass.

- [ ] **Step 3: Run the production build**

Run: `npm run build`  
Expected: Vite exits with code 0 and writes `dist/`.

- [ ] **Step 4: Capture required browser states**

Capture the implementation at 1440×1024, 1024×768, and 390×844. Exercise rail hover pause, gallery next/previous, pointer drag, lightbox open/close, browser Back, and one external link opening in a new tab.

- [ ] **Step 5: Run blocking design QA**

Compare the selected reference and implementation at the same desktop viewport. Record visual mismatches in `design-qa.md`, fix all P0/P1/P2 issues, and repeat until the report ends with `final result: passed`.

## Self-Review

- Spec coverage: assets, concise copy, animated rails, hover/focus pause, real external links, interactive gallery, history-aware return, responsive behavior, reduced motion, tests, build, and visual QA are each covered by an implementation task.
- Placeholder scan: no deferred URLs, empty assets, `TODO`, or `TBD` remain.
- Type consistency: all application records use `id`, `name`, `category`, `href`, `image`, and `accent`; all gallery controls use the stable test IDs named above.

