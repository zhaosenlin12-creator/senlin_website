import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface AnimatedLetterProps {
  text: string;
  className?: string;
}

export default function AnimatedLetter({ text, className = "" }: AnimatedLetterProps) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const words = text.split(" ");
  const chars: string[] = [];
  words.forEach((w, wi) => {
    w.split("").forEach((c) => chars.push(c));
    if (wi < words.length - 1) chars.push(" ");
  });
  const total = chars.length;

  return (
    <p ref={ref} className={className} style={{ color: "#DEDBC8" }}>
      {chars.map((ch, i) => {
        const charProgress = i / Math.max(total - 1, 1);
        const opacity = useTransform(
          scrollYProgress,
          [Math.max(charProgress - 0.1, 0), Math.min(charProgress + 0.05, 1)],
          [0.2, 1]
        );
        if (ch === " ") {
          return <span key={i}>&nbsp;</span>;
        }
        return <motion.span key={i} style={{ opacity }}>{ch}</motion.span>;
      })}
    </p>
  );
}
