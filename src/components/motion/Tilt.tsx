import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { ReactNode } from "react";

type TiltProps = {
  children: ReactNode;
  className?: string;
  /** 最大倾角（度） */
  max?: number;
  scale?: number;
};

/** 3D 倾斜卡片：鼠标位置驱动 rotationX / rotationY，带弹簧回弹。 */
export default function Tilt({
  children,
  className = "",
  max = 7,
  scale = 1.015,
}: TiltProps) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 160, damping: 18 });
  const sy = useSpring(py, { stiffness: 160, damping: 18 });

  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);

  return (
    <motion.div
      className={`[transform-style:preserve-3d] ${className}`}
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
      whileHover={{ scale }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
    >
      {children}
    </motion.div>
  );
}

type SpotlightProps = {
  children: ReactNode;
  className?: string;
  color?: string;
};

/** 鼠标聚光卡片：一团跟着指针走的光晕。 */
export function Spotlight({
  children,
  className = "",
  color = "rgba(222,219,200,0.16)",
}: SpotlightProps) {
  return (
    <div className={`group/spot relative overflow-hidden ${className}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-40 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background: `radial-gradient(circle at center, ${color}, transparent 62%)`,
        }}
      />
      {children}
    </div>
  );
}

