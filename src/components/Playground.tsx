import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sliders } from '@phosphor-icons/react';

const EASE = [0.32, 0.72, 0, 1] as const;

interface SliderDef {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  default: number;
  unit: string;
  cssVar: string;
}

const sliders: SliderDef[] = [
  { id: 'radius',    label: 'border-radius',  min: 0,   max: 100, step: 1,   default: 50,  unit: '%',  cssVar: '--br' },
  { id: 'scale',     label: 'scale',          min: 0.5, max: 1.5, step: 0.01, default: 1,  unit: '×',  cssVar: '--sc' },
  { id: 'glow',      label: 'glow intensity', min: 0,   max: 80,  step: 1,   default: 30,  unit: 'px', cssVar: '--gl' },
  { id: 'rotate',    label: 'rotate',         min: -180,max: 180, step: 1,   default: 0,   unit: '°',  cssVar: '--ro' },
  { id: 'hue',       label: 'hue-shift',      min: 0,   max: 360, step: 1,   default: 0,   unit: '°',  cssVar: '--hu' },
  { id: 'speed',     label: 'anim speed',     min: 0.2, max: 4,   step: 0.1, default: 1.5, unit: 's',  cssVar: '--sp' },
];

type ValMap = Record<string, number>;

const defaultVals: ValMap = Object.fromEntries(sliders.map(s => [s.id, s.default]));

export default function Playground() {
  const [vals, setVals] = useState<ValMap>(defaultVals);
  const [isPlaying, setIsPlaying] = useState(true);
  const blobRef = useRef<HTMLDivElement>(null);

  // Primary hue based on brand #f35516 ≈ hsl(21°, 90%, 52%)
  const baseHue = 21;
  const hue = (baseHue + vals.hue) % 360;

  const blobStyle: React.CSSProperties = {
    borderRadius: `${vals.radius}%`,
    transform: `scale(${vals.scale}) rotate(${vals.rotate}deg)`,
    background: `radial-gradient(ellipse at 40% 40%, hsl(${hue},90%,62%), hsl(${(hue + 40) % 360},80%,45%))`,
    boxShadow: vals.glow > 0
      ? `0 0 ${vals.glow}px ${vals.glow / 2}px hsl(${hue},90%,52%,0.6), inset 0 0 ${vals.glow / 2}px hsl(${hue},80%,70%,0.3)`
      : 'none',
    animation: isPlaying ? `morphBlob ${vals.speed}s ease-in-out infinite alternate` : 'none',
    willChange: 'transform, border-radius',
    width: '200px',
    height: '200px',
    transition: 'background 0.4s ease, box-shadow 0.4s ease',
  };

  // Build live CSS snippet
  const cssSnippet = `.blob {
  border-radius: ${vals.radius}%;
  transform: scale(${vals.scale}) rotate(${vals.rotate}deg);
  background: radial-gradient(
    ellipse at 40% 40%,
    hsl(${hue}, 90%, 62%),
    hsl(${(hue + 40) % 360}, 80%, 45%)
  );
  box-shadow: 0 0 ${vals.glow}px hsl(${hue},90%,52%,0.6);
  animation: morph ${vals.speed}s ease-in-out infinite alternate;
}`;

  const reset = () => setVals(defaultVals);

  return (
    <section id="playground" className="relative w-full bg-[#050505] py-32 md:py-40 overflow-hidden">

      {/* Ambient glow background */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] opacity-[0.07] blur-[100px]"
        style={{ background: `radial-gradient(ellipse, hsl(${(21 + vals.hue) % 360},90%,52%) 0%, transparent 70%)` }}
      />

      {/* Keyframes injected */}
      <style>{`
        @keyframes morphBlob {
          0%   { border-radius: ${vals.radius}% ${100 - vals.radius}% ${vals.radius * 0.8}% ${100 - vals.radius * 0.8}%; }
          50%  { border-radius: ${100 - vals.radius * 0.7}% ${vals.radius * 0.7}% ${100 - vals.radius}% ${vals.radius}%; }
          100% { border-radius: ${vals.radius * 0.9}% ${100 - vals.radius * 0.9}% ${vals.radius}% ${100 - vals.radius}%; }
        }
      `}</style>

      <div className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-[0.22em] font-medium text-zinc-400 mb-5"
          >
            <Sliders size={10} weight="light" />
            Playground interativo
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.06, ease: EASE }}
            className="text-4xl md:text-6xl font-bold tracking-tighter text-white leading-[1]"
          >
            CSS Motion<br />
            <span className="text-[#f35516]">ao vivo.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.12, ease: EASE }}
            className="mt-4 text-zinc-500 text-sm max-w-[48ch]"
          >
            Arraste os sliders e veja o CSS gerado em tempo real. Isso é o que entrego em cada projeto.
          </motion.p>
        </div>

        {/* Main grid */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.18, ease: EASE }}
          className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5"
        >

          {/* LEFT — Preview */}
          <div className="rounded-[2rem] border border-white/8 bg-white/[0.03] p-1.5">
            <div className="rounded-[calc(2rem-0.375rem)] bg-[#080808] shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)] flex items-center justify-center relative overflow-hidden"
              style={{ minHeight: '380px' }}
            >
              {/* Grid dots */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
                  backgroundSize: '30px 30px',
                }}
              />

              <div ref={blobRef} style={blobStyle} />

              {/* Controls overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <button
                  onClick={() => setIsPlaying(p => !p)}
                  className="text-[10px] uppercase tracking-[0.18em] font-medium px-3 py-1.5 rounded-full border border-white/10 bg-black/40 text-zinc-400 hover:text-white transition-colors"
                >
                  {isPlaying ? '⏸ Pausar' : '▶ Animar'}
                </button>
                <button
                  onClick={reset}
                  className="text-[10px] uppercase tracking-[0.18em] font-medium px-3 py-1.5 rounded-full border border-white/10 bg-black/40 text-zinc-400 hover:text-white transition-colors"
                >
                  ↺ Reset
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT — Sliders + Code */}
          <div className="flex flex-col gap-4">

            {/* Sliders */}
            <div className="rounded-[2rem] border border-white/8 bg-white/[0.03] p-1.5">
              <div className="rounded-[calc(2rem-0.375rem)] bg-[#0a0a0a] shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)] p-6 flex flex-col gap-5">
                <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-zinc-500 mb-1">Controles</p>
                {sliders.map(s => (
                  <div key={s.id} className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <label htmlFor={s.id} className="text-[11px] font-mono text-zinc-400">
                        {s.label}
                      </label>
                      <span className="text-[11px] font-mono text-[#f35516]">
                        {typeof vals[s.id] === 'number' && s.step < 1
                          ? vals[s.id].toFixed(2)
                          : vals[s.id]}
                        {s.unit}
                      </span>
                    </div>
                    <input
                      id={s.id}
                      type="range"
                      min={s.min}
                      max={s.max}
                      step={s.step}
                      value={vals[s.id]}
                      onChange={e => setVals(v => ({ ...v, [s.id]: parseFloat(e.target.value) }))}
                      className="w-full h-1 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, hsl(${(21 + vals.hue) % 360},90%,52%) 0%, hsl(${(21 + vals.hue) % 360},90%,52%) ${((vals[s.id] - s.min) / (s.max - s.min)) * 100}%, rgba(255,255,255,0.1) ${((vals[s.id] - s.min) / (s.max - s.min)) * 100}%, rgba(255,255,255,0.1) 100%)`,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Live CSS code */}
            <div className="rounded-[2rem] border border-white/8 bg-white/[0.03] p-1.5 flex-1">
              <div className="rounded-[calc(2rem-0.375rem)] bg-[#060606] shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)] p-5 h-full">
                <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-zinc-500 mb-3">CSS gerado</p>
                <pre className="text-[11px] font-mono text-zinc-400 leading-relaxed overflow-x-auto select-all whitespace-pre-wrap">
                  {cssSnippet.split('\n').map((line, i) => {
                    // Highlight property names and values
                    const colored = line
                      .replace(/(border-radius|transform|background|box-shadow|animation)/, '<span style="color:#f35516">$1</span>')
                      .replace(/(hsl|radial-gradient|scale|rotate|ellipse|ease-in-out|infinite|alternate)/, '<span style="color:#60a5fa">$1</span>');
                    return (
                      <span
                        key={i}
                        dangerouslySetInnerHTML={{ __html: colored + '\n' }}
                      />
                    );
                  })}
                </pre>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
