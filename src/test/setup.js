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
  static instances = [];

  constructor(callback) {
    this.callback = callback;
    this.targets = new Set();
    MockIntersectionObserver.instances.push(this);
  }

  observe(target) {
    this.targets.add(target);
  }

  disconnect() {
    this.targets.clear();
  }

  unobserve(target) {
    this.targets.delete(target);
  }

  takeRecords() {
    return [];
  }

  trigger(isIntersecting = true) {
    const entries = Array.from(this.targets).map((target) => ({ isIntersecting, target }));
    this.callback(entries);
  }

  static triggerAll(isIntersecting = true) {
    for (const instance of MockIntersectionObserver.instances) {
      instance.trigger(isIntersecting);
    }
  }

  static reset() {
    MockIntersectionObserver.instances = [];
  }
}

if (!window.IntersectionObserver) {
  window.IntersectionObserver = MockIntersectionObserver;
}

if (!globalThis.IntersectionObserver) {
  globalThis.IntersectionObserver = MockIntersectionObserver;
}

globalThis.MockIntersectionObserver = MockIntersectionObserver;

afterEach(() => {
  MockIntersectionObserver.reset();
});

const canvasContextStub = {
  arc() {},
  beginPath() {},
  clearRect() {},
  ellipse() {},
  fill() {},
  fillRect() {},
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
