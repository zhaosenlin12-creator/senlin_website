import { motion } from "framer-motion";
import type { ReactNode } from "react";

type MarqueeProps = {
  children: ReactNode;
  /** 一个完整循环的秒数，越大越慢 */
  duration?: number;
  reverse?: boolean;
  className?: string;
};

/**
 * 无限横向跑马灯。内容渲染两份，动画位移 -50%，
 * 于是接缝永远对得上；hover 时整条带子减速。
 */
export default function Marquee({
  children,
  duration = 38,
  reverse = false,
  className = "",
}: MarqueeProps) {
  return (
    <div className={`group/marquee relative overflow-hidden ${className}`}>
      <motion.div
        className="flex w-max"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        <div className="flex shrink-0 items-center gap-3 pr-3">{children}</div>
        <div className="flex shrink-0 items-center gap-3 pr-3" aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  );
}

