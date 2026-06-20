import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import App from "../../src/App.jsx";

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

    expect(screen.getByText("赵森林")).toBeInTheDocument();
    expect(screen.getByText("副校长 / 合伙人 / 乐启享机器人")).toBeInTheDocument();
    expect(screen.getByText("把编程教育做成可体验的未来现场")).toBeInTheDocument();
    expect(screen.getByTestId("learning-universe")).toBeInTheDocument();

    for (const id of SECTION_IDS) {
      expect(document.getElementById(id)).toBeInTheDocument();
      expect(screen.getByTestId(`nav-dot-${id}`)).toBeInTheDocument();
    }

    expect(screen.getByTestId("btn-scroll")).toBeInTheDocument();
    expect(screen.getByTestId("img-profile")).toBeInTheDocument();
    expect(screen.getByTestId("img-wrcc")).toBeInTheDocument();
    expect(screen.getByTestId("contact-wechat")).toBeInTheDocument();
    expect(screen.getByTestId("contact-douyin")).toBeInTheDocument();
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

  test("renders featured Douyin cards and direct-open app links", () => {
    render(<App />);

    expect(screen.getByText("主舞台应用")).toBeInTheDocument();
    expect(screen.getByText("应用作品集")).toBeInTheDocument();
    expect(screen.getByText("课堂反馈系统")).toBeInTheDocument();
    expect(screen.getByText("抖音内容入口")).toBeInTheDocument();
    expect(screen.getByText("教学现场档案")).toBeInTheDocument();
    expect(screen.getByTestId("video-cover-knowledge-tool")).toBeInTheDocument();
    expect(screen.getByTestId("video-cover-free-english-resources")).toBeInTheDocument();

    const knowledgeVideoLink = screen.getByTestId("video-link-knowledge-tool");
    expect(knowledgeVideoLink).toHaveAttribute(
      "href",
      "https://v.douyin.com/t9L2hN3pYNA/",
    );
    expect(knowledgeVideoLink).toHaveAttribute("target", "_blank");
    expect(knowledgeVideoLink).toHaveAttribute("rel", "noreferrer");

    const englishVideoLink = screen.getByTestId("video-link-free-english-resources");
    expect(englishVideoLink).toHaveAttribute("href", "https://v.douyin.com/nYzhLyIvGDc/");
    expect(englishVideoLink).toHaveAttribute("target", "_blank");
    expect(englishVideoLink).toHaveAttribute("rel", "noreferrer");

    const douyinHomeLink = screen.getByTestId("douyin-home-link");
    expect(douyinHomeLink).toHaveAttribute(
      "href",
      "https://www.douyin.com/user/MS4wLjABAAAAxHHFo-1JZJ3GPL_HYbgUo6X7hN5jWrk5wJUYl42rgW0",
    );
    expect(douyinHomeLink).toHaveAttribute("target", "_blank");
    expect(douyinHomeLink).toHaveAttribute("rel", "noreferrer");

    const pythonAdventureCard = screen.getByTestId("app-card-python-adventure");
    expect(pythonAdventureCard).toHaveAttribute("href", "https://game.codebn.cn/");
    expect(pythonAdventureCard).toHaveAttribute("target", "_blank");
    expect(pythonAdventureCard).toHaveAttribute("rel", "noreferrer");

    const typingCard = screen.getByTestId("app-card-typing-fun");
    expect(typingCard).toHaveAttribute("href", "https://class.codebn.cn/");
    expect(typingCard).toHaveAttribute("target", "_blank");
    expect(typingCard).toHaveAttribute("rel", "noreferrer");

    const feedbackCard = screen.getByTestId("app-card-classroom-feedback");
    expect(feedbackCard).toHaveAttribute("href", "https://stu.codebn.cn/");
    expect(feedbackCard).toHaveAttribute("target", "_blank");
    expect(feedbackCard).toHaveAttribute("rel", "noreferrer");
  });

  test("renders the stage rail and expanded gallery block", () => {
    render(<App />);

    expect(screen.getByTestId("app-showcase-rail")).toBeInTheDocument();
    expect(screen.getByTestId("gallery-ring")).toBeInTheDocument();
    expect(screen.getByText("教学现场档案")).toBeInTheDocument();
  });
});
