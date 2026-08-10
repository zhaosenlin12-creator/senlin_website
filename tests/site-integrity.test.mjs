import assert from "node:assert/strict";
import { access, stat } from "node:fs/promises";
import { after, before, test } from "node:test";
import path from "node:path";
import { chromium } from "playwright";
import { createServer } from "vite";

const EXPECTED_HERO_VIDEOS = [
  "/media/videos/hero-teaching.mp4",
  "/media/videos/hero-studio.mp4",
];

const EXPECTED_APP_LINKS = [
  "https://game.codebn.cn/",
  "https://class.codebn.cn/",
  "https://ai.codebn.cn/",
  "https://game.codebn.cn/code-research",
  "https://game.codebn.cn/typing/index.html?source=game-google&apiBase=%2Fapi%2Ftyping&returnUrl=https%3A%2F%2Fgame.codebn.cn%2F&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwicHdkdiI6IjFiMTFhMWI5ZjMxOWFjMTUiLCJleHAiOjE3ODY0MTAyMTd9.lJsU1He9TOtnEuYbVFj_vqhZPqeh_CzOw_ciygMfnxg&userId=1&username=senlin&level=93",
  "https://phet.colorado.edu/zh_CN/",
  "https://www.aibase.com/de/tool/12518",
  "https://www.gamestolearnenglish.com/",
  "https://camp.codebn.cn/",
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
      assert.equal(video.poster, "/media/photo-hero.jpg");
      assert.equal(video.webkitPlaysInline, "true");
      assert.equal(video.x5PlaysInline, "true");
      assert.equal(video.x5PlayerType, "h5-page");
    }
  } finally {
    await context.close();
  }
});

test("Hero keeps an image fallback beneath both videos", async () => {
  const { context, page } = await openMobilePage();
  try {
    const fallback = page.locator("[data-hero-fallback] img");
    assert.equal(await fallback.count(), 1);
    assert.equal(await fallback.getAttribute("src"), "/media/photo-hero.jpg");
  } finally {
    await context.close();
  }
});

test("Application cards use verified destinations", async () => {
  const { context, page } = await openMobilePage();
  try {
    const links = await page.locator("#apps a[target='_blank']").evaluateAll((anchors) =>
      anchors.map((anchor) => anchor.getAttribute("href"))
    );
    assert.deepEqual(links, EXPECTED_APP_LINKS);
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
  } finally {
    await context.close();
  }
});
