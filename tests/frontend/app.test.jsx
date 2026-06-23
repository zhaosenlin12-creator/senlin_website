import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { vi } from "vitest";

import App from "../../src/App.jsx";
import { GALLERY_ITEMS } from "../../src/galleryAssets.js";
import { APP_SHOWCASE_ITEMS, FEATURED_VIDEOS, STAGE_APPS } from "../../src/mediaData.js";
const personalSitePoster = "/media/video-posters/personal-site.webp";

describe("personal site rebuild", () => {
  test("renders the core shell and hero", () => {
    render(<App />);

    const heroBackground = screen.getByTestId("hero-background");

    expect(heroBackground).toBeInTheDocument();
    expect(screen.getByTestId("hero-type-lines")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "scroll" })).toBeInTheDocument();
    expect(screen.getAllByRole("heading").length).toBeGreaterThan(1);
    expect(within(heroBackground).getByTestId("hero-background-image")).toHaveAttribute("src", "/media/hero-background.webp");
    expect(screen.getByAltText("赵森林老师")).toHaveAttribute("src", "/photo-hero.webp");
    expect(within(heroBackground).queryByTestId("hero-background-video")).not.toBeInTheDocument();
  });

  test("uses smooth scrolling for the hero CTA", () => {
    render(<App />);

    const marquee = document.getElementById("marquee");
    const marqueeSpy = vi.spyOn(marquee, "scrollIntoView");

    fireEvent.click(screen.getByRole("button", { name: "scroll" }));

    expect(marqueeSpy).toHaveBeenCalledWith({ behavior: "smooth" });
  });

  test("opens and closes the QR modal", async () => {
    render(<App />);

    fireEvent.click(screen.getByTestId("contact-wechat"));

    expect(screen.getByRole("button", { name: "关闭" })).toBeInTheDocument();
    expect(screen.getByText("长按或扫码查看")).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });

    await waitFor(() => {
      expect(screen.queryByRole("button", { name: "关闭" })).not.toBeInTheDocument();
    });
  });

  test("renders media cards and opens a video lightbox", async () => {
    render(<App />);
    act(() => {
      globalThis.MockIntersectionObserver.triggerAll(true);
    });

    expect(await screen.findByTestId("douyin-home-link")).toBeInTheDocument();
    act(() => {
      globalThis.MockIntersectionObserver.triggerAll(true);
    });
    expect(STAGE_APPS).toHaveLength(2);
    expect(FEATURED_VIDEOS[0].previewSrc).toBeDefined();
    expect(FEATURED_VIDEOS[0].previewSrc).not.toBe(FEATURED_VIDEOS[0].src);
    expect(await screen.findByTestId("video-preview-personal-site")).toHaveClass("video-preview-live");
    expect(await screen.findByTestId("douyin-profile-video")).toBeInTheDocument();
    expect(screen.getByTestId("douyin-profile-poster")).toHaveAttribute("src", personalSitePoster);
    expect(screen.getByTestId("video-poster-personal-site")).toHaveAttribute("src", personalSitePoster);
    expect(screen.getByTestId("video-preview-personal-site")).toHaveAttribute("src", FEATURED_VIDEOS[0].previewSrc);
    expect(screen.getByTestId("douyin-profile-video")).toHaveAttribute("src", FEATURED_VIDEOS[0].previewSrc);

    fireEvent.click(screen.getByTestId("gallery-card-classroom-guidance"));
    expect(await screen.findByTestId("image-lightbox")).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });
    await waitFor(() => {
      expect(screen.queryByTestId("image-lightbox")).not.toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("video-card-personal-site"));
    const videoLightbox = await screen.findByTestId("video-lightbox");
    expect(within(videoLightbox).getByTestId("video-lightbox-player")).toHaveAttribute("src", FEATURED_VIDEOS[0].src);
    expect(within(videoLightbox).getByTestId("video-lightbox-player")).toHaveAttribute("poster", personalSitePoster);
  });

  test("renders the learning universe and evidence sections", async () => {
    render(<App />);

    act(() => {
      globalThis.MockIntersectionObserver.triggerAll(true);
    });

    expect(await screen.findByTestId("learning-universe")).toBeInTheDocument();
    expect(screen.getByTestId("learning-proof-image")).toHaveAttribute("src", "/media/learning-scenes/python-path.webp");
    expect(screen.getByText("成果现场 / Evidence")).toBeInTheDocument();
    expect(screen.getAllByTestId(/^gallery-card-/)).toHaveLength(GALLERY_ITEMS.filter((item) => item.src).length);
    expect(screen.getByText("核心项目入口")).toBeInTheDocument();
    expect(screen.getByText("个人项目集合")).toBeInTheDocument();
    expect(APP_SHOWCASE_ITEMS).toHaveLength(7);
  });
});
