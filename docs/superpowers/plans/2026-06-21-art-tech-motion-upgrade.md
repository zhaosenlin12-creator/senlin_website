# Art Tech Motion Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a cohesive dark art-tech motion upgrade for the Senlin personal site.

**Architecture:** Keep React + Vite and add focused runtime components for ambient motion, product screenshot cards, and smoky lightbox presentation. Use canvas for global real-time interaction, CSS keyframes for ambient loops, and Framer Motion for stateful entrances and overlays.

**Tech Stack:** React 19, Vite 8, Framer Motion, canvas 2D, CSS animations, Chrome headless screenshots, Vitest.

---

## File Structure

- Create `src/components/GlobalMotionField.jsx` for whole-page pointer glow and connected particles.
- Modify `src/App.jsx` to mount the global motion layer and cycle hero copy.
- Modify `src/components/LearningField.jsx` to strengthen hero pointer-linked particles.
- Modify `src/components/MediaSection.jsx` to use real screenshots, hover tilt variables, floating archive cards, and smoke particles.
- Modify `src/components/ImageLightbox.jsx` to use a dark smoky glass overlay.
- Modify `src/mediaData.js` to add screenshot paths and shorter product card copy.
- Modify `src/styles/content-universe.css` to unify backgrounds, add motion styles, and remove stark paper sections.
- Add `public/media/captures/*.png` screenshots from live app URLs.
- Update frontend tests only if new content contracts require it.

## Tasks

### Task 1: Capture Product Screenshots

- [ ] Create `public/media/captures/`.
- [ ] Capture desktop screenshots for the four app URLs.
- [ ] Save as `python-adventure.png`, `classroom-feedback.png`, `typing-fun.png`, and `ai-research.png`.
- [ ] If a page fails, save no broken image and use the abstract fallback.

### Task 2: Add Global Motion Layer

- [ ] Create `src/components/GlobalMotionField.jsx`.
- [ ] Render a fixed canvas with `data-testid="global-motion-field"`.
- [ ] Draw a dark background wash, pointer light, particles, and connection lines.
- [ ] Respect `prefers-reduced-motion`.
- [ ] Mount it once in `src/App.jsx`.

### Task 3: Upgrade Hero Motion

- [ ] Cycle hero subline from `TYPEWRITER_LINES`.
- [ ] Add active line indicators and kinetic text classes.
- [ ] Strengthen `LearningField.jsx` particle count and pointer linkage.
- [ ] Preserve `data-testid="btn-scroll"`.

### Task 4: Rebuild Product Cards Around Screenshots

- [ ] Add `screenshot` fields in `src/mediaData.js`.
- [ ] Use screenshot backgrounds in stage apps and showcase rail cards.
- [ ] Reduce visible card copy.
- [ ] Add hover tilt variables from pointer movement.
- [ ] Preserve all app card test ids and hrefs.

### Task 5: Upgrade Teaching Archive

- [ ] Add floating depth classes and CSS animation delays to archive cards.
- [ ] On hover, focus the active image and dim neighbors with CSS.
- [ ] Keep `data-testid="gallery-ring"` and `gallery-card-*`.
- [ ] Keep click-to-lightbox behavior.

### Task 6: Add Smoky Dark Lightbox

- [ ] Convert lightbox to dark glass styling.
- [ ] Add smoke particles and blur burst on open.
- [ ] Keep Escape close and button test id.

### Task 7: Unify Site Background And Verify

- [ ] Replace paper-white section backgrounds with dark graphite bands.
- [ ] Add scan lines, noise, and section glow consistently.
- [ ] Run `npm test`.
- [ ] Run `npm run build`.
- [ ] Capture desktop and mobile screenshots.
- [ ] Fix overlap, blank canvas, and mobile overflow issues.
- [ ] Commit and push.
