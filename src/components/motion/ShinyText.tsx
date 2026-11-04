import { motion } from "framer-motion";
import type { ReactNode } from "react";

type ShinyTextProps = {
  children: ReactNode;
  className?: string;
  /** 高光色 */
  from?: string;
  to?: string;
};

/** 流光文字：一道亮带缓缓扫过。 */
export default function ShinyText({
  children,
  className = "",
  from = "#E1E0CC",
  to = "#5ED29C",
}: ShinyTextProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      {/* 底层实色文字兜底：浏览器不支持 background-clip:text 时至少还能看见字 */}
      <span className="relative z-0">{children}</span>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
        animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
        transition={{ duration: 5, ease: "linear", repeat: Infinity }}
        style={{
          backgroundImage: `linear-gradient(100deg, transparent 30%, ${to} 45%, ${from} 52%, ${to} 60%, transparent 75%)`,
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}

