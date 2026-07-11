import { useEffect, useState } from "react";

interface TypewriterLoopProps {
  phrases: string[];
  typingMs?: number;
  holdMs?: number;
  deletingMs?: number;
  pauseMs?: number;
  className?: string;
  cursorClassName?: string;
}

export default function TypewriterLoop({
  phrases,
  typingMs = 90,
  holdMs = 1600,
  deletingMs = 45,
  pauseMs = 500,
  className = "",
  cursorClassName = "",
}: TypewriterLoopProps) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (phrases.length === 0) return;
    const current = phrases[idx % phrases.length];

    let delay = typingMs;
    if (deleting) {
      if (text.length === 0) {
        // 已删完,切到下一句
        setDeleting(false);
        setIdx((i) => i + 1);
        return;
      }
      delay = deletingMs;
    } else {
      if (text === current) {
        // 输入完成,停留一会后开始删除
        delay = holdMs;
        const t = window.setTimeout(() => setDeleting(true), holdMs);
        return () => window.clearTimeout(t);
      }
    }

    const t = window.setTimeout(() => {
      setText((cur) =>
        deleting ? cur.slice(0, -1) : current.slice(0, cur.length + 1)
      );
    }, delay);
    return () => window.clearTimeout(t);
  }, [text, deleting, idx, phrases, typingMs, holdMs, deletingMs, pauseMs]);

  return (
    <span className={className}>
      <span>{text}</span>
      <span
        className={`ml-1 inline-block h-[0.85em] w-[2px] translate-y-[2px] animate-pulse bg-current ${cursorClassName}`}
        aria-hidden="true"
      />
    </span>
  );
}
