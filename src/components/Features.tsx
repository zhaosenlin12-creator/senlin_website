import type { MouseEvent } from "react";
import { Check, ArrowRight } from "lucide-react";
import WordsPullUpMultiStyle from "./WordsPullUpMultiStyle";
import { TRACKS } from "../content";
import { accent } from "../lib/accent";

function FeatureCard({
  card,
}: {
  card: (typeof TRACKS)[number]["cards"][number];
}) {
  const c = accent(card.accent);
  let mx = 50;
  let my = 50;
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx = ((e.clientX - r.left) / r.width) * 100;
    my = ((e.clientY - r.top) / r.height) * 100;
  };

  return (
    <div
      onMouseMove={onMove}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-[#212121] transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)]"
    >
      <div
        className="pointer-events-none absolute h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-50"
        style={{
          background: c.glow,
          left: "calc(" + mx + "% - 6rem)",
          top: "calc(" + my + "% - 6rem)",
        }}
        aria-hidden
      />

      <div className="flex h-full flex-col">
        <div className="relative h-[210px] w-full shrink-0 overflow-hidden bg-[#1a1a1a] sm:h-[240px]">
          <img
            src={card.media}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-[#212121]" />
          <div className="absolute left-4 top-4 z-10 rounded-full border border-white/20 bg-black/55 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-white/85 backdrop-blur">
            {card.number} · CARD
          </div>
          {card.badge ? (
            <div className="absolute bottom-4 left-4 z-10 rounded-full px-2.5 py-1 text-[10px] tracking-[0.1em] backdrop-blur" style={{ color: c.text, background: "rgba(0,0,0,0.6)" }}>
              {card.badge}
            </div>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
          <div>
            <h3 className="text-base font-medium text-[#E1E0CC] sm:text-lg">
              <span className="mr-2" style={{ color: c.text }}>
                {card.number}
              </span>
              {card.title}
            </h3>
            <p className="mt-2 text-[11px] uppercase tracking-[0.15em] text-white/45">
              {card.summary}
            </p>
            {card.bullets.length > 0 && (
              <ul className="mt-4 space-y-2.5">
                {card.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <Check size={13} className="mt-0.5 shrink-0" style={{ color: c.text }} />
                    <span className="text-xs leading-[1.4] text-gray-400 sm:text-sm">
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {card.bullets.length > 0 && (
            <a
              href="#contact"
              className="group/link inline-flex items-center gap-2 text-xs font-medium text-[#E1E0CC] sm:text-sm"
            >
              <span>了解更多</span>
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover/link:translate-x-1"
                style={{ transform: "rotate(-45deg)" }}
              />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <section
      id="practice"
      className="relative bg-black px-4 py-24 md:py-32"
    >
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.15]" />

      <div className="relative mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-col items-center gap-5 text-center md:mb-20">
          <span className="inline-block text-[10px] uppercase tracking-[0.25em] text-primary/70 sm:text-[11px]">
            我在做的事
          </span>
          <WordsPullUpMultiStyle
            segments={[
              {
                text: "两条轨道，一个目标：让工具真的被用起来。",
                className: "text-primary",
              },
            ]}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl"
          />
        </div>

        <div className="space-y-14 md:space-y-20">
          {TRACKS.map((track) => (
            <div key={track.id}>
              <div className="mb-5 flex flex-wrap items-baseline gap-x-4 gap-y-2 border-b border-white/10 pb-4 sm:mb-7">
                <h3
                  className="text-lg font-medium tracking-tight text-[#E1E0CC] sm:text-xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {track.label}
                </h3>
                <span className="text-[11px] uppercase tracking-[0.18em] text-white/40">
                  {track.note}
                </span>
              </div>
              <div className={`grid grid-cols-1 items-stretch gap-3 sm:gap-4 ${track.grid}`}>
                {track.cards.map((card) => (
                  <FeatureCard key={card.id} card={card} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
