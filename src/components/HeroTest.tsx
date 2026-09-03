import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

const systemChain = ['Website', 'Landing Page', 'CRM', 'WhatsApp', 'IA', 'Automação', 'Analytics', 'Resultados'];

const bgThumbs = [
  { src: '/ecommerce-preview.png', top: '8%', left: '6%', size: 180, depth: 6, delay: 0 },
  { src: '/03.png', top: '62%', left: '10%', size: 140, depth: 10, delay: 0.4 },
  { src: '/05.png', top: '15%', left: '82%', size: 160, depth: 8, delay: 0.2 },
  { src: '/ecommerce-preview.png', top: '70%', left: '80%', size: 150, depth: 5, delay: 0.6 },
];

function useParallax(mx: ReturnType<typeof useMotionValue<number>>, my: ReturnType<typeof useMotionValue<number>>, depth: number) {
  const x = useTransform(mx, [-0.5, 0.5], [-depth, depth]);
  const y = useTransform(my, [-0.5, 0.5], [-depth, depth]);
  return { x, y };
}

export default function HeroTest() {
  const containerRef = useRef<HTMLElement>(null);
  const [systemOn, setSystemOn] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 60, damping: 20, mass: 0.6 });
  const my = useSpring(rawY, { stiffness: 60, damping: 20, mass: 0.6 });

  const glowLayer = useParallax(mx, my, 14);
  const bgLayer = useParallax(mx, my, 6);
  const monitorLayer = useParallax(mx, my, 26);
  const macbookLayer = useParallax(mx, my, 18);
  const phoneLayer = useParallax(mx, my, 34);

  const monitorRotateX = useTransform(my, [-0.5, 0.5], [6, -6]);
  const monitorRotateY = useTransform(mx, [-0.5, 0.5], [-8, 8]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-[100dvh] w-full overflow-hidden bg-[#030304] flex items-center"
    >
      {/* Ambient studio glow */}
      <motion.div style={glowLayer} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[55%] w-[600px] h-[600px] bg-[#3b82f6]/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-15%] left-[10%] w-[500px] h-[500px] bg-[#f35516]/10 blur-[130px] rounded-full" />
      </motion.div>

      {/* Blurred floating project thumbnails — the "background" ecosystem */}
      <motion.div style={bgLayer} className="absolute inset-0 pointer-events-none">
        {bgThumbs.map((t, i) => (
          <motion.img
            key={i}
            src={t.src}
            alt=""
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 8 + i, repeat: Infinity, ease: 'easeInOut', delay: t.delay }}
            style={{ top: t.top, left: t.left, width: t.size, height: t.size * 0.65 }}
            className="absolute object-cover rounded-xl opacity-[0.12] blur-[2px] grayscale"
          />
        ))}
      </motion.div>

      {/* Floating dust particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-[3px] h-[3px] rounded-full bg-white/30"
            style={{ top: `${(i * 37) % 100}%`, left: `${(i * 53) % 100}%` }}
            animate={{ opacity: [0.1, 0.5, 0.1], y: [0, -20, 0] }}
            transition={{ duration: 6 + (i % 5), repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-[1500px] mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] text-[10px] text-zinc-400 uppercase tracking-[0.2em] font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f35516] animate-pulse" />
            Estúdio Veltz
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.02] text-white">
            Não construo sites.<br />
            Construo <span className="text-[#f35516]">sistemas inteligentes.</span>
          </h1>
          <p className="mt-8 text-base md:text-lg font-extralight text-zinc-400 max-w-[46ch] leading-relaxed">
            Design, automação e IA conectados em uma única experiência digital — do primeiro
            clique ao resultado no seu negócio.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#projects" className="px-8 py-4 bg-[#f35516] text-white font-semibold rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_-5px_#f35516]">
              Ver Portfólio
            </a>
            <a href="#contact" className="px-8 py-4 bg-transparent text-white border border-white/20 font-semibold rounded-full hover:border-[#f35516]/50 hover:text-[#f35516] transition-colors">
              Fale Comigo
            </a>
          </div>
          <p className="mt-8 text-zinc-600 text-xs">
            Passe o mouse sobre o monitor →
          </p>
        </motion.div>

        {/* Right: the "desk" */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          className="relative h-[420px] md:h-[520px] hidden sm:block"
          style={{ perspective: 1200 }}
        >
          {/* Monitor */}
          <motion.div
            style={{
              ...monitorLayer,
              rotateX: monitorRotateX,
              rotateY: monitorRotateY,
              transformStyle: 'preserve-3d',
            }}
            onHoverStart={() => setSystemOn(true)}
            onHoverEnd={() => setSystemOn(false)}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="absolute top-[6%] left-[6%] right-[6%] h-[62%] rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)] overflow-hidden cursor-pointer"
          >
            {/* browser bar */}
            <div className="h-8 flex items-center gap-1.5 px-3 border-b border-white/5 bg-white/[0.02]">
              <span className="w-2 h-2 rounded-full bg-red-400/60" />
              <span className="w-2 h-2 rounded-full bg-yellow-400/60" />
              <span className="w-2 h-2 rounded-full bg-green-400/60" />
            </div>

            <div className="relative h-[calc(100%-2rem)] overflow-hidden">
              {/* Fake landing page content — auto "scrolls" */}
              <motion.div
                animate={{ y: systemOn ? -40 : [0, -30, 0] }}
                transition={systemOn ? { duration: 0.4 } : { duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="p-6 flex flex-col gap-3"
                style={{ opacity: systemOn ? 0 : 1 }}
              >
                <div className="h-3 w-2/3 rounded-full bg-white/20" />
                <div className="h-3 w-1/2 rounded-full bg-white/10" />
                <div className="h-2 w-full rounded-full bg-white/[0.06] mt-3" />
                <div className="h-2 w-5/6 rounded-full bg-white/[0.06]" />
                <motion.div
                  animate={{ boxShadow: ['0 0 0px rgba(243,85,22,0)', '0 0 24px rgba(243,85,22,0.6)', '0 0 0px rgba(243,85,22,0)'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="mt-4 w-28 h-8 rounded-full bg-[#f35516]/80"
                />
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="h-14 rounded-lg bg-white/[0.05] border border-white/[0.06]" />
                  ))}
                </div>
              </motion.div>

              {/* System architecture reveal on hover */}
              <motion.div
                initial={false}
                animate={{ opacity: systemOn ? 1 : 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="absolute inset-0 flex flex-wrap items-center justify-center content-center gap-x-1.5 gap-y-2 px-4 bg-[#0a0a0a]/95"
              >
                {systemChain.map((step, i) => (
                  <div key={step} className="flex items-center gap-1.5">
                    <motion.span
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: systemOn ? 1 : 0, y: systemOn ? 0 : 6 }}
                      transition={{ duration: 0.4, delay: systemOn ? i * 0.1 : 0, ease: EASE }}
                      className="whitespace-nowrap text-[9px] md:text-[10px] font-medium text-white px-2 py-0.5 rounded-full border border-[#f35516]/40 bg-[#f35516]/10"
                    >
                      {step}
                    </motion.span>
                    {i < systemChain.length - 1 && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: systemOn ? 1 : 0 }}
                        transition={{ duration: 0.3, delay: systemOn ? i * 0.1 + 0.15 : 0, ease: EASE }}
                        className="text-[#f35516]/60 text-[10px]"
                      >
                        →
                      </motion.span>
                    )}
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* MacBook — mini node workflow */}
          <motion.div
            style={macbookLayer}
            className="absolute bottom-[6%] left-[0%] w-[42%] h-[26%] rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl p-3 -rotate-2"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
              <span className="text-[9px] text-zinc-500 uppercase tracking-wider">Automação ativa</span>
            </div>
            <svg viewBox="0 0 100 40" className="w-full h-[70%]">
              <motion.circle cx="10" cy="20" r="4" fill="#f35516"
                animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.6, repeat: Infinity }} />
              <motion.line x1="14" y1="20" x2="46" y2="10" stroke="#f35516" strokeWidth="0.6"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, repeat: Infinity, repeatType: 'reverse' }} />
              <motion.line x1="14" y1="20" x2="46" y2="30" stroke="#f35516" strokeWidth="0.6"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, repeat: Infinity, repeatType: 'reverse', delay: 0.2 }} />
              <circle cx="50" cy="10" r="4" fill="#a1a1aa" />
              <circle cx="50" cy="30" r="4" fill="#a1a1aa" />
              <motion.line x1="54" y1="10" x2="86" y2="20" stroke="#a1a1aa" strokeWidth="0.5" opacity={0.5} />
              <motion.line x1="54" y1="30" x2="86" y2="20" stroke="#a1a1aa" strokeWidth="0.5" opacity={0.5} />
              <motion.circle cx="90" cy="20" r="4" fill="#3b82f6"
                animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.6, repeat: Infinity, delay: 0.4 }} />
            </svg>
          </motion.div>

          {/* Phone — WhatsApp-style typing */}
          <motion.div
            style={phoneLayer}
            className="absolute bottom-[2%] right-[4%] w-[70px] h-[130px] md:w-[86px] md:h-[160px] rounded-2xl border border-white/15 bg-[#0d0d0d] backdrop-blur-xl shadow-2xl rotate-3 p-2 flex flex-col gap-1.5"
          >
            <div className="w-8 h-1 rounded-full bg-white/20 mx-auto mb-1" />
            <div className="self-start max-w-[80%] rounded-lg rounded-bl-none bg-white/[0.08] text-[6px] text-zinc-300 px-1.5 py-1">
              Oi! Vi seu produto 👀
            </div>
            <div className="self-end max-w-[80%] rounded-lg rounded-br-none bg-[#f35516]/80 text-[6px] text-white px-1.5 py-1">
              Posso te ajudar agora mesmo!
            </div>
            <div className="self-start flex gap-0.5 items-center bg-white/[0.08] rounded-full px-1.5 py-1 w-fit">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-[3px] h-[3px] rounded-full bg-zinc-400"
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>
          </motion.div>

          {/* Keyboard hint */}
          <motion.div
            style={macbookLayer}
            className="absolute bottom-[-2%] left-[8%] w-[36%] h-[6%] rounded-md border border-white/10 bg-white/[0.03]"
          >
            <motion.div
              className="w-full h-full rounded-md"
              animate={{ boxShadow: ['inset 0 0 6px rgba(243,85,22,0.15)', 'inset 0 0 14px rgba(243,85,22,0.4)', 'inset 0 0 6px rgba(243,85,22,0.15)'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>

          {/* Coffee steam */}
          <div className="absolute bottom-[10%] left-[46%] w-6 h-16 pointer-events-none">
            {[0, 1].map((i) => (
              <motion.span
                key={i}
                className="absolute bottom-0 left-1/2 w-2 h-8 rounded-full bg-white/10 blur-[6px]"
                style={{ marginLeft: i === 0 ? -6 : 2 }}
                animate={{ y: [0, -28], opacity: [0.4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeOut', delay: i * 1.2 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
