import CountUp from "./motion/CountUp";
import { KPI } from "../content";

type KpiStripProps = {
  className?: string;
  /** 宽栏用四列，窄侧栏用两列 */
  columns?: "four" | "two";
};

/** KPI 数字带：进入视口后数字滚动到位。 */
export default function KpiStrip({
  className = "",
  columns = "four",
}: KpiStripProps) {
  const grid =
    columns === "four"
      ? "grid-cols-2 sm:grid-cols-4"
      : "grid-cols-2 lg:grid-cols-2";
  return (
    <div className={`grid ${grid} gap-3 sm:gap-5 ${className}`}>
      {KPI.map((k) => (
        <div
          key={k.label}
          className="flex flex-col gap-1 border-l border-white/15 pl-3 sm:pl-4"
        >
          <span
            className="text-xl font-medium tracking-tight text-[#E1E0CC] sm:text-2xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <CountUp value={k.value} />
            <span className="text-mint">{k.suffix}</span>
          </span>
          <span className="whitespace-nowrap text-[10px] uppercase tracking-[0.18em] text-white/45 sm:text-[11px]">
            {k.label}
          </span>
        </div>
      ))}
    </div>
  );
}

