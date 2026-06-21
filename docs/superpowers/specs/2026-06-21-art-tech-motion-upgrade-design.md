# Art Tech Motion Upgrade Design

## Goal

Upgrade the personal site from a mostly static portfolio into a cohesive dark art-tech experience with real-time pointer light, connected particles, animated type, richer product screenshots, floating teaching archive images, and smoky blur expansion for image viewing.

## Visual Direction

The whole site should feel like one midnight exhibition space. Remove large paper-white sections and replace them with graphite panels, subtle cyan signal light, warm-gold proof accents, scan lines, thin grids, glass blur, and low-contrast noise. The page can still have contrast, but it should not alternate between stark white and black.

## Motion System

Use browser-native runtime motion instead of heavy video embeds for the main experience:

- A fixed global canvas layer renders particles, pointer glow, connecting lines, and slow grid motion.
- The hero canvas keeps orbital energy but responds more strongly to pointer movement.
- Hero microcopy cycles through teaching, AI, robotics, and product language.
- Cards use hover tilt, background image scale, glow, and low-friction transitions.
- Gallery images drift at different amplitudes and pause/focus on hover.
- The lightbox opens with a smoky blur burst and dark glass panel.

Remotion and HyperFrames are not part of the runtime path for this iteration because the requested interactions depend on live pointer, scroll, hover, and click state. They remain useful for a future generated promo loop or social video. MiniMax image generation can be tested through `MINIMAX_API_KEY`, but no API key is stored in this repository.

## Content And Assets

Use real screenshots from:

- `https://game.codebn.cn/`
- `https://stu.codebn.cn/`
- `https://class.codebn.cn/`
- `https://ai.codebn.cn/`

Store screenshots in `public/media/captures/` and use them as product-card backgrounds. If a target page is unavailable, keep the current abstract poster treatment as a fallback.

## Interaction Requirements

- Product cards must be clickable links.
- Gallery cards must remain clickable and open the existing lightbox test id.
- Existing test ids must be preserved.
- Motion must respect `prefers-reduced-motion`.
- Mobile must avoid horizontal body overflow, even when rails scroll horizontally.

## Verification

Run:

- `npm test`
- `npm run build`
- desktop screenshot at 1440x1000
- mobile screenshot at 390x844

Visually confirm no blank page, no white-black section clash, product screenshots render, gallery drift/focus is present, and the dark smoky lightbox opens.
