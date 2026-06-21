import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 118;

function createParticle(index, width, height) {
  const column = (index % 11) / 10;
  const row = Math.floor(index / 11) / 7;
  return {
    x: width * (0.08 + column * 0.84) + ((index * 37) % 41) - 20,
    y: height * (0.08 + row * 0.84) + ((index * 53) % 37) - 18,
    baseX: width * (0.08 + column * 0.84) + ((index * 37) % 41) - 20,
    baseY: height * (0.08 + row * 0.84) + ((index * 53) % 37) - 18,
    vx: (((index * 17) % 9) - 4) * 0.018,
    vy: (((index * 23) % 9) - 4) * 0.014,
    size: 0.75 + (index % 4) * 0.35,
    phase: index * 0.61,
  };
}

function buildParticles(width, height) {
  return Array.from({ length: PARTICLE_COUNT }, (_, index) => createParticle(index, width, height));
}

export default function GlobalMotionField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context || typeof context.setTransform !== "function") {
      return undefined;
    }

    let animationFrame = 0;
    let particles = [];
    const pointer = {
      x: window.innerWidth * 0.5,
      y: window.innerHeight * 0.45,
      tx: window.innerWidth * 0.5,
      ty: window.innerHeight * 0.45,
      active: false,
    };
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(window.innerWidth * pixelRatio));
      canvas.height = Math.max(1, Math.floor(window.innerHeight * pixelRatio));
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      particles = buildParticles(window.innerWidth, window.innerHeight);
    };

    const draw = (time = 0) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      pointer.x += (pointer.tx - pointer.x) * 0.09;
      pointer.y += (pointer.ty - pointer.y) * 0.09;

      context.clearRect(0, 0, width, height);

      const glow = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, Math.max(width, height) * 0.42);
      glow.addColorStop(0, pointer.active ? "rgba(0, 216, 255, 0.34)" : "rgba(0, 216, 255, 0.18)");
      glow.addColorStop(0.22, pointer.active ? "rgba(215, 180, 106, 0.14)" : "rgba(34, 90, 110, 0.1)");
      glow.addColorStop(0.48, "rgba(0, 72, 96, 0.08)");
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      const cursorCore = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 96);
      cursorCore.addColorStop(0, pointer.active ? "rgba(238, 252, 255, 0.84)" : "rgba(238, 252, 255, 0.42)");
      cursorCore.addColorStop(0.12, "rgba(0, 216, 255, 0.42)");
      cursorCore.addColorStop(1, "rgba(0, 216, 255, 0)");
      context.fillStyle = cursorCore;
      context.fillRect(pointer.x - 96, pointer.y - 96, 192, 192);

      particles.forEach((particle, index) => {
        const swayX = Math.cos(time * 0.00026 + particle.phase) * 16;
        const swayY = Math.sin(time * 0.00022 + particle.phase) * 12;
        particle.x = particle.baseX + swayX + particle.vx * time;
        particle.y = particle.baseY + swayY + particle.vy * time;

        if (particle.x < -40) particle.x = width + 40;
        if (particle.x > width + 40) particle.x = -40;
        if (particle.y < -40) particle.y = height + 40;
        if (particle.y > height + 40) particle.y = -40;

        const dx = particle.x - pointer.x;
        const dy = particle.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 260) {
          const alpha = (1 - distance / 260) * (pointer.active ? 0.62 : 0.34);
          context.beginPath();
          context.moveTo(pointer.x, pointer.y);
          context.lineTo(particle.x, particle.y);
          context.strokeStyle = `rgba(0, 216, 255, ${alpha})`;
          context.lineWidth = pointer.active ? 1.25 : 0.85;
          context.stroke();
        }

        const next = particles[(index + 9) % particles.length];
        const linkedDistance = Math.hypot(particle.x - next.x, particle.y - next.y);
        if (linkedDistance < 210) {
          context.beginPath();
          context.moveTo(particle.x, particle.y);
          context.lineTo(next.x, next.y);
          context.strokeStyle = `rgba(215, 180, 106, ${0.16 * (1 - linkedDistance / 210)})`;
          context.lineWidth = 0.75;
          context.stroke();
        }

        context.beginPath();
        context.arc(particle.x, particle.y, particle.size * 1.22, 0, Math.PI * 2);
        context.fillStyle = index % 8 === 0 ? "rgba(215, 180, 106, 0.72)" : "rgba(0, 216, 255, 0.68)";
        context.fill();
      });

      if (!prefersReducedMotion) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    const handlePointerMove = (event) => {
      pointer.tx = event.clientX;
      pointer.ty = event.clientY;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    resize();
    draw(0);

    if (!prefersReducedMotion) {
      animationFrame = window.requestAnimationFrame(draw);
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerleave", handlePointerLeave);
    }
    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="global-motion-field" data-testid="global-motion-field" aria-hidden="true" />;
}
