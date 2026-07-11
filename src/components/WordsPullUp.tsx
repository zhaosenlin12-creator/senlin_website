import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface WordsPullUpProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  showAsterisk?: boolean;
}

export default function WordsPullUp({
  text,
  className = "",
  wordClassName = "",
  delay = 0,
  showAsterisk = false,
}: WordsPullUpProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const words = text.split(" ");

  return (
    <div ref={ref} className={className}>
      {words.map((word, wi) => {
        const isLast = wi === words.length - 1;
        return (
          <span
            key={`${word}-${wi}`}
            className="relative inline-block overflow-hidden align-bottom mr-[0.18em]"
          >
            <motion.span
              initial={{ y: "100%" }}
              animate={inView ? { y: 0 } : { y: "100%" }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: delay + wi * 0.08,
              }}
              className={`inline-block ${wordClassName}`}
            >
              {word}
            </motion.span>
            {showAsterisk && isLast && (
              <motion.span
                aria-hidden="true"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                  delay: delay + wi * 0.08 + 0.25,
                }}
                className="absolute top-[0.65em] -right-[0.3em] text-[0.31em] leading-none text-primary"
              >
                *
              </motion.span>
            )}
          </span>
        );
      })}
    </div>
  );
}
