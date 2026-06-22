import { useEffect, useRef } from "react";

const NODE_COUNT = 58;

function createNodes(width, height) {
  const centerX = width / 2;
  const centerY = height / 2;

  return Array.from({ length: NODE_COUNT }, (_, index) => {
    const ring = 0.18 + (index % 5) * 0.09;
    const angle = (Math.PI * 2 * index) / NODE_COUNT;
    return {
      angle,
      orbit: Math.min(width, height) * ring,
      speed: 0.00009 + (index % 7) * 0.000022,
      size: 1 + (index % 5) * 0.36,
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
      const centerX = width / 2 + pointerX * 72;
      const centerY = height / 2 + pointerY * 44;

      context.clearRect(0, 0, width, height);

      const gradient = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, width * 0.62);
      gradient.addColorStop(0, "rgba(0, 216, 255, 0.2)");
      gradient.addColorStop(0.28, "rgba(215, 180, 106, 0.07)");
      gradient.addColorStop(0.58, "rgba(31, 94, 132, 0.055)");
      gradient.addColorStop(1, "rgba(5, 7, 10, 0)");
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);

      nodes.forEach((node, index) => {
        const phase = node.angle + time * node.speed;
        node.x = centerX + Math.cos(phase) * node.orbit * (1 + pointerX * 0.055);
        node.y = centerY + Math.sin(phase * 0.92) * node.orbit * (0.62 + pointerY * 0.045);

        if (index % 2 === 0) {
          const next = nodes[(index + 7) % nodes.length];
          context.beginPath();
          context.moveTo(node.x, node.y);
          context.lineTo(next.x, next.y);
          context.strokeStyle = "rgba(0, 216, 255, 0.095)";
          context.lineWidth = 1;
          context.stroke();
        }

        const pointerScreenX = width / 2 + pointerX * width;
        const pointerScreenY = height / 2 + pointerY * height;
        const distanceToPointer = Math.hypot(node.x - pointerScreenX, node.y - pointerScreenY);
        if (distanceToPointer < 240) {
          context.beginPath();
          context.moveTo(pointerScreenX, pointerScreenY);
          context.lineTo(node.x, node.y);
          context.strokeStyle = `rgba(0, 216, 255, ${0.22 * (1 - distanceToPointer / 240)})`;
          context.stroke();
        }

        context.beginPath();
        context.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        context.fillStyle = index % 5 === 0 ? "rgba(215, 180, 106, 0.72)" : "rgba(0, 216, 255, 0.64)";
        context.fill();
      });

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

    if (prefersReducedMotion) {
      draw(0);
    } else {
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
