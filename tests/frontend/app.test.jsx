import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { vi } from "vitest";

import App from "../../src/App.jsx";
import { GALLERY_ITEMS } from "../../src/galleryAssets.js";
import { APP_SHOWCASE_ITEMS, FEATURED_VIDEOS, STAGE_APPS } from "../../src/mediaData.js";

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

describe("personal site rebuild", () => {
  test("renders the rebuilt sections and navigation shell", () => {
    render(<App />);

    expect(screen.getByTestId("hero-background")).toBeInTheDocument();
    expect(screen.getByTestId("learning-universe")).toBeInTheDocument();
    expect(screen.getByTestId("hero-type-lines")).toBeInTheDocument();
    expect(screen.getByTestId("btn-scroll")).toBeInTheDocument();

    for (const id of SECTION_IDS) {
      expect(document.getElementById(id)).toBeInTheDocument();
      expect(screen.getByTestId(`nav-dot-${id}`)).toBeInTheDocument();
    }
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

  test("renders clean close labels and play copy in media overlays", async () => {
    render(<App />);

    expect(screen.getAllByText("播放").length).toBeGreaterThan(0);

    fireEvent.click(screen.getByTestId("gallery-card-classroom-guidance"));

    const imageLightbox = await screen.findByTestId("image-lightbox");
    expect(within(imageLightbox).getByText("×")).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });

    await waitFor(() => {
      expect(screen.queryByTestId("image-lightbox")).not.toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("video-card-personal-site"));

    const videoLightbox = await screen.findByTestId("video-lightbox");
    expect(within(videoLightbox).getByText("×")).toBeInTheDocument();
  });

  test("shows the hero background media shell", () => {
    render(<App />);

    const heroBackground = screen.getByTestId("hero-background");
    expect(heroBackground.querySelector("video")).toHaveAttribute("src", "/video/hero.mp4");
    expect(heroBackground.querySelector("img")).toHaveAttribute("src", "/media/hero-background.png");
  });

  test("uses local Chinese app screenshots and precise app links", () => {
    render(<App />);

    expect(STAGE_APPS).toHaveLength(2);
    expect(STAGE_APPS.map((app) => app.name)).toEqual(["Python 冒险岛", "class 教学系统"]);

    const pythonAdventureCard = screen.getByTestId("app-card-python-adventure");
    expect(pythonAdventureCard).toHaveAttribute("href", "https://game.codebn.cn/");
    expect(pythonAdventureCard).toHaveStyle({
      "--app-screenshot": `url(${STAGE_APPS[0].screenshot})`,
    });

    const classSystemCard = screen.getByTestId("app-card-class-system");
    expect(classSystemCard).toHaveAttribute("href", "https://class.codebn.cn/");
    expect(classSystemCard).toHaveStyle({
      "--app-screenshot": `url(${STAGE_APPS[1].screenshot})`,
    });

    const showcaseRail = screen.getByTestId("app-showcase-rail");
    expect(showcaseRail.querySelector(".showcase-rail-track")).toBeInTheDocument();

    const showcasedNames = APP_SHOWCASE_ITEMS.map((app) => app.name);
    expect(showcasedNames).toEqual([
      "AI 互动课堂",
      "Code Research",
      "仿真模拟实验室",
      "乐启享宠物",
      "乐启享打字",
      "乐启享管理系统",
      "模型训练",
    ]);

    expect(screen.getByTestId("app-showcase-card-ai-classroom")).toHaveAttribute("href", "https://ai.codebn.cn/");
    expect(screen.getByTestId("app-showcase-card-code-research")).toHaveAttribute(
      "href",
      "https://game.codebn.cn/code-research",
    );
    expect(screen.getByTestId("app-showcase-card-simulation-lab")).toHaveAttribute(
      "href",
      "https://phet.colorado.edu/",
    );
    expect(screen.getByTestId("app-showcase-card-typing-fun")).toHaveAttribute(
      "href",
      expect.stringContaining("https://game.codebn.cn/typing/index.html"),
    );
    expect(screen.getByTestId("app-showcase-card-management-system")).toHaveAttribute("href", "https://stu.codebn.cn/");
    expect(screen.getByTestId("app-showcase-card-model-training")).toHaveAttribute(
      "href",
      "https://www.aibase.com/de/tool/12518",
    );
  });

  test("renders local Douyin videos and opens a video lightbox", async () => {
    render(<App />);

    expect(screen.getByText("抖音内容入口")).toBeInTheDocument();
    expect(FEATURED_VIDEOS.map((video) => video.filename)).toEqual(["个人建站.mp4", "交互知识.mp4", "涂色英语.mp4"]);

    const douyinHomeLink = screen.getByTestId("douyin-home-link");
    expect(within(douyinHomeLink).getByTestId("douyin-profile-visual")).toBeInTheDocument();
    expect(douyinHomeLink).toHaveAttribute(
      "href",
      "https://www.douyin.com/user/MS4wLjABAAAAxHHFo-1JZJ3GPL_HYbgUo6X7hN5jWrk5wJUYl42rgW0",
    );
    expect(douyinHomeLink).toHaveAttribute("target", "_blank");
    expect(douyinHomeLink).toHaveAttribute("rel", "noreferrer");

    for (const video of FEATURED_VIDEOS) {
      const card = screen.getByTestId(`video-card-${video.id}`);
      expect(within(card).getByTestId(`video-preview-${video.id}`)).toHaveAttribute("src", video.src);
    }

    fireEvent.click(screen.getByTestId("video-card-personal-site"));

    const lightbox = await screen.findByTestId("video-lightbox");
    expect(within(lightbox).getByTestId("video-lightbox-player")).toHaveAttribute("src", FEATURED_VIDEOS[0].src);

    fireEvent.keyDown(window, { key: "Escape" });

    await waitFor(() => {
      expect(screen.queryByTestId("video-lightbox")).not.toBeInTheDocument();
    });
  });

  test("renders the stage rail and expanded gallery block", () => {
    render(<App />);

    expect(screen.getByTestId("app-showcase-rail")).toBeInTheDocument();
    expect(screen.getByTestId("gallery-ring")).toBeInTheDocument();
    expect(screen.getAllByTestId(/^gallery-card-/)).toHaveLength(GALLERY_ITEMS.filter((item) => item.src).length);
    expect(screen.getByTestId("gallery-card-classroom-guidance")).toHaveClass("is-loaded");
  });

  test("adds proof visuals to learning universe and shared interactive surfaces", () => {
    render(<App />);

    expect(screen.getByTestId("learning-proof-visual")).toBeInTheDocument();
    expect(screen.getByTestId("learning-proof-image")).toBeInTheDocument();
    expect(screen.getByTestId("learning-proof-image")).toHaveAttribute("src", "/media/learning-scenes/python-path.png");

    expect(screen.getByTestId("stats")).toHaveClass("interactive-surface");
    expect(screen.getByTestId("expertise-0")).toHaveClass("interactive-surface");
    expect(screen.getByTestId("achievement-0")).toHaveClass("interactive-surface");
    expect(screen.getByTestId("contact-wechat")).toHaveClass("interactive-surface");
  });
});
