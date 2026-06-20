import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

if (!HTMLElement.prototype.animate) {
  HTMLElement.prototype.animate = function animate() {
    return {
      cancel() {},
      finished: Promise.resolve(),
      onfinish: null,
      play() {},
    };
  };
}

if (!HTMLElement.prototype.scrollIntoView) {
  HTMLElement.prototype.scrollIntoView = vi.fn();
}

if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (callback) => setTimeout(() => callback(Date.now()), 16);
}

if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = (id) => clearTimeout(id);
}

if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
    dispatchEvent() {
      return false;
    },
  });
}

class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }

  observe(target) {
    this.callback([{ isIntersecting: true, target }]);
  }

  disconnect() {}

  unobserve() {}

  takeRecords() {
    return [];
  }
}

if (!window.IntersectionObserver) {
  window.IntersectionObserver = MockIntersectionObserver;
}

if (!globalThis.IntersectionObserver) {
  globalThis.IntersectionObserver = MockIntersectionObserver;
}

const canvasContextStub = {
  arc() {},
  beginPath() {},
  clearRect() {},
  fill() {},
  lineTo() {},
  moveTo() {},
  stroke() {},
  createRadialGradient() {
    return {
      addColorStop() {},
    };
  },
  fillStyle: "",
  lineWidth: 0,
  strokeStyle: "",
};

HTMLCanvasElement.prototype.getContext = function getContext() {
  return canvasContextStub;
};
