import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { PillarResult } from "./scoring";

/* ------------------------------------------------------------------ */
/* Animated number counter                                             */
/* ------------------------------------------------------------------ */
export function CountUp({
  to,
  duration = 1.4,
  delay = 0.25,
}: {
  to: number;
  duration?: number;
  delay?: number;
}) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now() + delay * 1000;
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - start) / (duration * 1000)));
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setN(Math.round(eased * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration, delay]);
  return <>{n}</>;
}

/* ------------------------------------------------------------------ */
/* Circular score gauge                                                */
/* ------------------------------------------------------------------ */
export function Gauge({
  value,
  label,
  size = 220,
}: {
  value: number;
  label: string;
  size?: number;
}) {
  const r = 86;
  const cx = 100;
  const cy = 100;
  // 270Â° arc (from 135Â° to 405Â°)
  const circumference = 2 * Math.PI * r;
  const arcFraction = 0.75;
  const arcLength = circumference * arcFraction;
  const offset = arcLength * (1 - value / 100);

  return (
    <div
      className="relative"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${label}: ${value} de 100`}
    >
      <svg viewBox="0 0 200 200" className="h-full w-full rotate-[135deg]">
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF8A3D" />
            <stop offset="100%" stopColor="#FF6B00" />
          </linearGradient>
        </defs>
        {/* track */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${arcLength} ${circumference}`}
        />
        {/* value */}
        <motion.circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="url(#gaugeGrad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${arcLength} ${circumference}`}
          initial={{ strokeDashoffset: arcLength }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          style={{ filter: "drop-shadow(0 0 10px rgba(255,107,0,0.5))" }}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="font-display text-5xl font-bold leading-none text-white"
        >
          <CountUp to={value} />
        </motion.span>
        <span className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">
          / 100
        </span>
        <span className="mt-2 max-w-[8rem] text-center text-[11px] leading-tight text-muted/80">
          {label}
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Radar chart                                                         */
/* ------------------------------------------------------------------ */
export function RadarChart({ pillars }: { pillars: PillarResult[] }) {
  const size = 260;
  const c = size / 2;
  const maxR = size / 2 - 46;
  const n = pillars.length;

  const point = (i: number, ratio: number) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return [c + Math.cos(angle) * maxR * ratio, c + Math.sin(angle) * maxR * ratio];
  };

  const polygon = pillars
    .map((p, i) => point(i, Math.max(p.score, 4) / 100).join(","))
    .join(" ");

  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full">
      {/* rings */}
      {rings.map((r) => (
        <polygon
          key={r}
          points={pillars.map((_, i) => point(i, r).join(",")).join(" ")}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="1"
        />
      ))}
      {/* axes */}
      {pillars.map((_, i) => {
        const [x, y] = point(i, 1);
        return (
          <line
            key={i}
            x1={c}
            y1={c}
            x2={x}
            y2={y}
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="1"
          />
        );
      })}
      {/* value area */}
      <motion.polygon
        points={polygon}
        fill="rgba(255,107,0,0.18)"
        stroke="#FF6B00"
        strokeWidth="2"
        strokeLinejoin="round"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        style={{ transformOrigin: "center", filter: "drop-shadow(0 0 6px rgba(255,107,0,0.4))" }}
      />
      {/* vertices */}
      {pillars.map((p, i) => {
        const [x, y] = point(i, Math.max(p.score, 4) / 100);
        return (
          <motion.circle
            key={p.pillar.id}
            cx={x}
            cy={y}
            r="3.5"
            fill="#FF6B00"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 + i * 0.06 }}
          />
        );
      })}
      {/* labels */}
      {pillars.map((p, i) => {
        const [x, y] = point(i, 1.24);
        return (
          <text
            key={p.pillar.id}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-zinc-400"
            style={{ fontSize: 10, fontWeight: 500 }}
          >
            {p.pillar.short}
          </text>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Horizontal score bar                                                */
/* ------------------------------------------------------------------ */
export function ScoreBar({
  result,
  index = 0,
}: {
  result: PillarResult;
  index?: number;
}) {
  const Icon = result.pillar.icon;
  const tone =
    result.band === "low"
      ? "text-brand"
      : result.band === "mid"
        ? "text-amber-400"
        : "text-emerald-400";

  return (
    <div className="flex items-center gap-3">
      <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-white/5 text-muted">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="mb-1.5 flex items-baseline justify-between gap-3">
          <span className="truncate text-sm font-medium text-white">
            {result.pillar.short}
          </span>
          <span className={`font-display text-sm font-semibold ${tone}`}>
            {result.score}
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/8">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-brand-soft to-brand"
            initial={{ width: 0 }}
            animate={{ width: `${result.score}%` }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.3 + index * 0.08,
            }}
          />
        </div>
      </div>
    </div>
  );
}
