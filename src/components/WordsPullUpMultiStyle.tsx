import { motion } from "framer-motion";

export interface MultiSegment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: MultiSegment[];
  className?: string;
  delay?: number;
}

export default function WordsPullUpMultiStyle({
  segments,
  className = "",
  delay = 0,
}: WordsPullUpMultiStyleProps) {
  const flat: { word: string; className?: string; idx: number }[] = [];
  segments.forEach((seg) => {
    seg.text.split(" ").forEach((word) => {
      flat.push({
        word,
        className: seg.className,
        idx: flat.length,
      });
    });
  });

  return (
    <div className={`inline-flex flex-wrap justify-center ${className}`}>
      {flat.map((item, i) => (
        <span
          key={i}
          className="relative inline-block overflow-hidden align-bottom mr-[0.18em]"
        >
          <motion.span
            initial={{ y: "0%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * 0.08,
            }}
            className={`inline-block ${item.className ?? ""}`}
          >
            {item.word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}
