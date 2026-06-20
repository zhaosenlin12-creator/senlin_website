# Senlin Website Redesign Direction

## Recommendation

Use 14islands as the structural foundation, Active Theory as the atmospheric layer, and Bruno Simon as a small interactive signature.

Recommended ratio:

- 60% 14islands: premium layout, typography, navigation, case-study structure.
- 30% Active Theory: dark immersive hero, living technology field, sparse system UI.
- 10% Bruno Simon: one memorable interactive learning-universe module.

## Core Positioning

The site should stop feeling like a dark tech template and start feeling like a curated digital exhibition for an educator who turns programming, AI, robotics, and competitions into visible learning outcomes.

Working concept:

`赵森林的编程教育宇宙`

Alternative hero lines:

- `把编程教育做成可体验的未来现场`
- `教育、代码与机器人的创造现场`
- `让孩子在真实项目里理解技术`

## Visual System

Palette:

- Near-black stage: `#05070a`
- Soft off-white content plane: `#f3f1ec`
- Ink text: `#111111`
- Signal cyan: `#00d8ff`
- Warm achievement accent: `#d7b46a`
- Muted steel: `#74808a`

Typography:

- Use one confident display face or system fallback for oversized Chinese/English hero text.
- Reduce monospaced text to labels and system details only.
- Avoid excessive letter spacing on Chinese text.

Motion:

- Hero canvas: slow orbital field, node traces, pointer-reactive depth.
- Section transitions: opacity + y movement, not constant sliding cards.
- Project cards: subtle image reveal and metadata slide, not glowing borders everywhere.

## Page Structure

1. Hero: immersive identity statement with a living learning-field background.
2. Proof strip: 6 years, 1000+ outcomes, NOI/C++/Python/Web/AI, robotics competitions.
3. Person section: cinematic portrait plus concise trust-building narrative.
4. Project cases: Python Adventure, Classroom Feedback, AI Research, Typing/Class tools.
5. Teaching scenes: exhibition-style photo wall grouped by classroom, students, competitions, activities.
6. Interactive learning universe: optional Bruno-inspired orbit explorer.
7. Collaboration/contact: cleaner QR/contact area with a stronger invitation.

## What To Change From Current Site

- Replace the current neon-heavy dark template feel with a high-contrast editorial system.
- Replace repeated glass cards with stronger case-study layouts.
- Reduce corrupted/overdecorated HUD language.
- Turn photos into premium evidence instead of a spinning gallery novelty.
- Keep the site fast and readable; immersive effects should support, not block, content.

## Implementation Boundaries

- Do not copy code, assets, typography files, or text from reference sites.
- Use local assets already in the Senlin project.
- If adding canvas/3D, keep it lightweight and provide mobile fallbacks.
- Preserve the existing React/Vite stack and current project links.
