import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { vi } from "vitest";

import App from "../../src/App.jsx";
import { GALLERY_ITEMS } from "../../src/galleryAssets.js";
import { APP_SHOWCASE_ITEMS, FEATURED_VIDEOS, STAGE_APPS } from "../../src/mediaData.js";

describe("personal site rebuild", () => {
  test("renders the core shell and hero", () => {
    render(<App />);

    expect(screen.getByTestId("hero-background")).toBeInTheDocument();
    expect(screen.getByTestId("hero-type-lines")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "scroll" })).toBeInTheDocument();
    expect(screen.getByText("作品与现场 / Portfolio")).toBeInTheDocument();
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

    expect(screen.getByTestId("douyin-home-link")).toBeInTheDocument();
    expect(STAGE_APPS).toHaveLength(2);

    fireEvent.click(screen.getByTestId("gallery-card-classroom-guidance"));
    expect(await screen.findByTestId("image-lightbox")).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });
    await waitFor(() => {
      expect(screen.queryByTestId("image-lightbox")).not.toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("video-card-personal-site"));
    const videoLightbox = await screen.findByTestId("video-lightbox");
    expect(within(videoLightbox).getByTestId("video-lightbox-player")).toHaveAttribute("src", FEATURED_VIDEOS[0].src);
  });

  test("renders the learning universe and evidence sections", () => {
    render(<App />);

    expect(screen.getByTestId("learning-universe")).toBeInTheDocument();
    expect(screen.getByTestId("learning-proof-image")).toHaveAttribute("src", "/media/learning-scenes/python-path.png");
    expect(screen.getByText("成果现场 / Evidence")).toBeInTheDocument();
    expect(screen.getAllByTestId(/^gallery-card-/)).toHaveLength(GALLERY_ITEMS.filter((item) => item.src).length);
    expect(screen.getByText("核心项目入口")).toBeInTheDocument();
    expect(screen.getByText("个人项目集合")).toBeInTheDocument();
    expect(APP_SHOWCASE_ITEMS).toHaveLength(7);
  });
});
