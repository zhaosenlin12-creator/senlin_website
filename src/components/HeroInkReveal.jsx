import { useEffect, useRef } from "react";

const BRUSH_RADIUS = 120;
const AUTO_REVEAL_MS = 3600;

export default function HeroInkReveal() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context || typeof context.setTransform !== "function") {
      return undefined;
    }

    let frame = 0;
    let startTime = performance.now();
    let pointer = null;

    const paintBase = (width, height, progress) => {
      const gradient = context.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, `rgba(2, 4, 7, ${0.92 * (1 - progress)})`);
      gradient.addColorStop(0.42, `rgba(1, 20, 25, ${0.84 * (1 - progress)})`);
      gradient.addColorStop(1, `rgba(5, 7, 10, ${0.9 * (1 - progress)})`);
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);

      context.globalCompositeOperation = "destination-out";
      const autoRadius = Math.max(width, height) * (0.08 + progress * 0.88);
      const reveal = context.createRadialGradient(width * 0.5, height * 0.46, 0, width * 0.5, height * 0.46, autoRadius);
      reveal.addColorStop(0, "rgba(0,0,0,0.95)");
      reveal.addColorStop(0.5, "rgba(0,0,0,0.72)");
      reveal.addColorStop(1, "rgba(0,0,0,0)");
      context.fillStyle = reveal;
      context.fillRect(0, 0, width, height);

      if (pointer) {
        const brush = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, BRUSH_RADIUS);
        brush.addColorStop(0, "rgba(0,0,0,1)");
        brush.addColorStop(0.6, "rgba(0,0,0,0.72)");
        brush.addColorStop(1, "rgba(0,0,0,0)");
        context.fillStyle = brush;
        context.fillRect(pointer.x - BRUSH_RADIUS, pointer.y - BRUSH_RADIUS, BRUSH_RADIUS * 2, BRUSH_RADIUS * 2);
      }

      context.globalCompositeOperation = "source-over";
      context.strokeStyle = `rgba(0, 216, 255, ${0.28 * (1 - progress)})`;
      context.lineWidth = 1;
      for (let index = 0; index < 4; index += 1) {
        const radius = autoRadius * (0.58 + index * 0.16);
        context.beginPath();
        context.ellipse(width * 0.5, height * 0.46, radius, radius * 0.38, -0.08, 0, Math.PI * 2);
        context.stroke();
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * pixelRatio));
      canvas.height = Math.max(1, Math.floor(rect.height * pixelRatio));
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const draw = (time) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const progress = Math.min(1, (time - startTime) / AUTO_REVEAL_MS);

      context.clearRect(0, 0, width, height);
      paintBase(width, height, progress);

      if (progress < 1) {
        frame = window.requestAnimationFrame(draw);
      } else {
        canvas.classList.add("is-complete");
      }
    };

    const handlePointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const handlePointerEnter = () => {
      startTime = Math.min(startTime, performance.now() - 900);
    };

    resize();
    frame = window.requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerenter", handlePointerEnter);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerenter", handlePointerEnter);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-ink-reveal" aria-hidden="true" />;
}
