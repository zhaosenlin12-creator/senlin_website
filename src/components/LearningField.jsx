import { useEffect, useRef } from "react";

const NODE_COUNT = 38;

function createNodes(width, height) {
  const centerX = width / 2;
  const centerY = height / 2;

  return Array.from({ length: NODE_COUNT }, (_, index) => {
    const ring = 0.18 + (index % 5) * 0.09;
    const angle = (Math.PI * 2 * index) / NODE_COUNT;
    return {
      angle,
      orbit: Math.min(width, height) * ring,
      speed: 0.00008 + (index % 7) * 0.000018,
      size: 1.2 + (index % 4) * 0.35,
      x: centerX + Math.cos(angle) * Math.min(width, height) * ring,
      y: centerY + Math.sin(angle) * Math.min(width, height) * ring,
    };
  });
}

export default function LearningField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context || typeof context.setTransform !== "function") {
      return undefined;
    }

    let animationFrame = 0;
    let nodes = [];
    let pointerX = 0;
    let pointerY = 0;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * pixelRatio));
      canvas.height = Math.max(1, Math.floor(rect.height * pixelRatio));
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      nodes = createNodes(rect.width, rect.height);
    };

    const draw = (time = 0) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const centerX = width / 2 + pointerX * 18;
      const centerY = height / 2 + pointerY * 12;

      context.clearRect(0, 0, width, height);
      context.fillStyle = "#05070a";
      context.fillRect(0, 0, width, height);

      const gradient = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, width * 0.62);
      gradient.addColorStop(0, "rgba(0, 216, 255, 0.12)");
      gradient.addColorStop(0.46, "rgba(31, 94, 132, 0.045)");
      gradient.addColorStop(1, "rgba(5, 7, 10, 0)");
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);

      nodes.forEach((node, index) => {
        const phase = node.angle + time * node.speed;
        node.x = centerX + Math.cos(phase) * node.orbit * (1 + pointerX * 0.025);
        node.y = centerY + Math.sin(phase * 0.92) * node.orbit * 0.62;

        if (index % 3 === 0) {
          const next = nodes[(index + 7) % nodes.length];
          context.beginPath();
          context.moveTo(node.x, node.y);
          context.lineTo(next.x, next.y);
          context.strokeStyle = "rgba(0, 216, 255, 0.07)";
          context.lineWidth = 1;
          context.stroke();
        }

        context.beginPath();
        context.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        context.fillStyle = index % 5 === 0 ? "rgba(215, 180, 106, 0.62)" : "rgba(0, 216, 255, 0.58)";
        context.fill();
      });

      context.strokeStyle = "rgba(243, 241, 236, 0.08)";
      context.lineWidth = 1;
      for (let i = 0; i < 4; i += 1) {
        context.beginPath();
        context.ellipse(centerX, centerY, width * (0.18 + i * 0.09), height * (0.08 + i * 0.045), 0, 0, Math.PI * 2);
        context.stroke();
      }

      if (!prefersReducedMotion) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    const handlePointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointerX = (event.clientX - rect.left) / rect.width - 0.5;
      pointerY = (event.clientY - rect.top) / rect.height - 0.5;
    };

    resize();
    draw(0);

    if (!prefersReducedMotion) {
      animationFrame = window.requestAnimationFrame(draw);
      window.addEventListener("pointermove", handlePointerMove);
    }
    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="learning-field-canvas" aria-hidden="true" />;
}
