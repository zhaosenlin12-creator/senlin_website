import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import { after, before, test } from "node:test";
import path from "node:path";
import { chromium } from "playwright";
import { createServer } from "vite";

const EXPECTED_HERO_VIDEOS = [
  "/media/videos/hero-teaching.mp4",
  "/media/videos/hero-studio.mp4",
];

const EXPECTED_APP_LINKS = [
  "https://github.com/zhaosenlin12-creator/yxz-3d",
  "https://github.com/zhaosenlin12-creator/gaokao_design",
  "https://github.com/zhaosenlin12-creator/animal-world-cup",
  "https://github.com/zhaosenlin12-creator/vibe-know--skill",
  "https://github.com/zhaosenlin12-creator/create-photo-shop",
  "https://github.com/zhaosenlin12-creator/51CodeTodo",
  "https://game.codebn.cn/",
  "https://class.codebn.cn/",
  "https://ai.codebn.cn/",
  "https://game.codebn.cn/code-research",
  "https://camp.codebn.cn/",
  "https://game.codebn.cn/typing/index.html",
  "https://www.gamestolearnenglish.com/",
  "https://phet.colorado.edu/zh_CN/",
  "https://github.com/zhaosenlin12-creator",
];

const EXPECTED_APP_MEDIA = [
  "/media/apps/yixiaozhi.jpg",
  "/media/apps/gaokao-simulator.jpg",
  "/media/apps/animal-cup.jpg",
  "/media/apps/vibe-know.jpg",
  "/media/apps/create-photo-shop.jpg",
  "/media/apps/51codetodo.jpg",
];

const EXPECTED_DOUYIN_CHANNELS = [
  "https://www.douyin.com/user/MS4wLjABAAAAxHHFo-1JZJ3GPL_HYbgUo6X7hN5jWrk5wJUYl42rgW0",
  "https://www.douyin.com/user/MS4wLjABAAAAQg5TgrTfWN0FphobcDhritBsLl8V3SS5H3ckUfdrXrI",
];

const WECHAT_USER_AGENT =
  "Mozilla/5.0 (Linux; Android 14; Pixel 8 Build/UQ1A.240205.004; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/122.0.0.0 Mobile Safari/537.36 MicroMessenger/8.0.49.2600 WeChat/arm64";

let browser;
let server;
let baseUrl;

before(async () => {
  server = await createServer({
    logLevel: "silent",
    server: { host: "127.0.0.1", port: 0 },
  });
  await server.listen();
  const address = server.httpServer.address();
  assert(address && typeof address !== "string");
  baseUrl = `http://127.0.0.1:${address.port}`;
  browser = await chromium.launch({ headless: true });
});

after(async () => {
  await browser?.close();
  await server?.close();
});

async function openMobilePage() {
  const context = await browser.newContext({
    userAgent: WECHAT_USER_AGENT,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.addInitScript(() => {
    window.IntersectionObserver = class {
      disconnect() {}
      observe() {}
      unobserve() {}
    };
  });
  await page.route("https://d8j0ntlcm91z4.cloudfront.net/**", (route) =>
    route.abort("blockedbyclient")
  );
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
  await page.locator("#apps").waitFor();
  return { context, page };
}

test("Hero videos are bundled local assets", async () => {
  const { context, page } = await openMobilePage();
  try {
    const sources = await page.locator("section video").evaluateAll((videos) =>
      videos.slice(0, 2).map((video) => video.getAttribute("src"))
    );
    assert.deepEqual(sources, EXPECTED_HERO_VIDEOS);

    for (const source of EXPECTED_HERO_VIDEOS) {
      const file = path.join(process.cwd(), "public", source);
      await access(file);
      assert((await stat(file)).size > 1_000_000, `${source} is unexpectedly small`);
    }
  } finally {
    await context.close();
  }
});

test("Hero videos expose WeChat inline autoplay attributes", async () => {
  const { context, page } = await openMobilePage();
  try {
    const videos = await page.locator("section video").evaluateAll((elements) =>
      elements.slice(0, 2).map((video) => ({
        autoPlay: video.autoplay,
        muted: video.muted,
        playsInline: video.playsInline,
        poster: video.getAttribute("poster"),
        webkitPlaysInline: video.getAttribute("webkit-playsinline"),
        x5PlaysInline: video.getAttribute("x5-playsinline"),
        x5PlayerType: video.getAttribute("x5-video-player-type"),
      }))
    );

    for (const video of videos) {
      assert.equal(video.autoPlay, true);
      assert.equal(video.muted, true);
      assert.equal(video.playsInline, true);
      assert.equal(video.poster, null);
      assert.equal(video.webkitPlaysInline, "true");
      assert.equal(video.x5PlaysInline, "true");
      assert.equal(video.x5PlayerType, "h5-page");
    }
  } finally {
    await context.close();
  }
});

test("Hero fallback is a gradient instead of a static portrait", async () => {
  const { context, page } = await openMobilePage();
  try {
    const fallback = page.locator("[data-hero-fallback]");
    assert.equal(await fallback.count(), 1);
    assert.equal(await page.locator("[data-hero-fallback] img").count(), 0);
    const background = await fallback.evaluate((el) => el.style.background || "");
    assert.ok(background.includes("gradient"), "fallback should paint a gradient");
    assert.ok(!background.includes("photo-hero"), "fallback must not use the portrait image");
    assert.equal(await page.locator('img[src*="photo-hero"]').count(), 0);
  } finally {
    await context.close();
  }
});

test("Application cards link to the published projects", async () => {
  const { context, page } = await openMobilePage();
  try {
    const links = await page.locator("#apps a[target='_blank']").evaluateAll((anchors) =>
      [...new Set(anchors.map((anchor) => anchor.getAttribute("href")))]
    );
    for (const expected of EXPECTED_APP_LINKS) {
      assert.ok(links.includes(expected), `missing app link ${expected}`);
    }
  } finally {
    await context.close();
  }
});

test("Every application card media exists locally", async () => {
  const { context, page } = await openMobilePage();
  try {
    const media = await page.locator("#apps a[target='_blank'] img, #apps a[target='_blank'] video").evaluateAll((elements) =>
      elements.map((el) => ({
        tag: el.tagName.toLowerCase(),
        src: el.getAttribute("src") || el.getAttribute("poster"),
      }))
    );
    assert.ok(media.length > 0, "expected at least one app media node");
    for (const item of media) {
      assert.ok(item.src && item.src.startsWith("/media/"), `unexpected media ${item.src}`);
      const file = path.join(process.cwd(), "public", item.src);
      await access(file);
      assert((await stat(file)).size > 4_000, `${item.src} is unexpectedly small`);
    }
    const used = media.map((item) => item.src);
    for (const expected of EXPECTED_APP_MEDIA) {
      assert.ok(used.includes(expected), `missing app media ${expected}`);
    }
  } finally {
    await context.close();
  }
});

test("Both Douyin channels are present with local QR codes", async () => {
  const { context, page } = await openMobilePage();
  try {
    const links = await page.locator("#video a[target='_blank']").evaluateAll((anchors) =>
      anchors.map((anchor) => anchor.getAttribute("href"))
    );
    for (const expected of EXPECTED_DOUYIN_CHANNELS) {
      assert.ok(links.includes(expected), `missing douyin channel ${expected}`);
    }
    const qrs = await page.locator('#video img[src^="/media/qr/"]').evaluateAll((images) =>
      images.map((image) => image.getAttribute("src"))
    );
    assert.deepEqual(qrs.sort(), [
      "/media/qr/ai4k-official-mark.png",
      "/media/qr/douyin-code.jpg",
    ]);
    for (const src of qrs) {
      const file = path.join(process.cwd(), "public", src);
      await access(file);
      assert((await stat(file)).size > 4_000, `${src} is unexpectedly small`);
    }
  } finally {
    await context.close();
  }
});

test("Douyin works list links to real videos", async () => {
  const { context, page } = await openMobilePage();
  try {
    const works = await page.locator('#video a[href^="https://www.douyin.com/video/"]').evaluateAll((anchors) =>
      anchors.map((anchor) => anchor.getAttribute("href"))
    );
    assert.ok(works.length >= 4, "expected several douyin works");
    for (const href of works) {
      assert.match(href, /^https:\/\/www\.douyin\.com\/video\/\d+$/);
    }
  } finally {
    await context.close();
  }
});

test("Douyin works ship local cover images", async () => {
  const { context, page } = await openMobilePage();
  try {
    const covers = await page
      .locator('#video img[src^="/media/douyin/"]')
      .evaluateAll((images) => images.map((image) => image.getAttribute("src")));
    assert.ok(covers.length >= 12, `expected 12 douyin covers, got ${covers.length}`);
    assert.equal(new Set(covers).size, covers.length, "cover paths should be unique");
    for (const src of covers) {
      assert.match(src, /^\/media\/douyin\/\d+\.jpg$/);
      const file = path.join(process.cwd(), "public", src);
      await access(file);
      assert((await stat(file)).size > 8_000, `${src} is unexpectedly small`);
    }
  } finally {
    await context.close();
  }
});

test("Every media path referenced by content.ts exists on disk", async () => {
  const source = await readFile(
    path.join(process.cwd(), "src", "content.ts"),
    "utf8"
  );
  const refs = new Set(
    [...source.matchAll(/["'`]\/media\/[^"'`\s]+["'`]/g)].map((m) => m[0].slice(1, -1))
  );
  assert.ok(refs.size > 30, `expected many media references, got ${refs.size}`);

  const missing = [];
  for (const ref of refs) {
    const file = path.join(process.cwd(), "public", ref);
    try {
      await access(file);
    } catch {
      missing.push(ref);
    }
  }
  assert.deepEqual(missing, [], `missing media files: ${missing.join(", ")}`);
});

test("Course cards expose a gallery and open a zoomable lightbox", async () => {
  const { context, page } = await openMobilePage();
  try {
    const cards = page.locator("#courses article");
    assert.ok((await cards.count()) >= 6, "expected six course cards");

    const openers = page.locator('#courses button[aria-label*="完整介绍"]');
    const count = await openers.count();
    assert.equal(count, 6, `expected six course openers, got ${count}`);

    const overlay = page.locator("div.fixed.z-\\[100\\]");
    for (let i = 0; i < count; i++) {
      await openers.nth(i).click();
      await overlay.waitFor({ state: "visible" });

      // 每门课至少两张图，弹窗里才有轮播指示点
      const dots = await overlay.locator('button[aria-label^="第 "]').count();
      assert.ok(dots >= 2, `course ${i} gallery needs 2+ images, got ${dots}`);

      if (i === 0) {
        // 点大图进入全屏预览
        await overlay.locator("img.cursor-zoom-in").first().click();
        await page.locator("div.fixed.z-\\[140\\]").waitFor({ state: "visible" });
        await page.keyboard.press("Escape");
        await page.locator("div.fixed.z-\\[140\\]").waitFor({ state: "hidden" });
      }

      await overlay.getByRole("button", { name: "关闭" }).click();
      await overlay.waitFor({ state: "hidden" });
    }
  } finally {
    await context.close();
  }
});

