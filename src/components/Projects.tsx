import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { ArrowUpRight } from '@phosphor-icons/react';

const slides = [
  {
    num: '01', title: 'Luís Felipe Advocacia', category: 'Institucional',
    description: 'Site institucional para escritório de advocacia especializado em leilões judiciais, com foco em autoridade e captação de clientes.',
    img: '/project-luisf.png', url: 'https://www.luisf.com.br/', accent: '#caa452',
    tags: ['Direito', 'Institucional', 'SEO'],
  },
  {
    num: '02', title: 'Dra. Elisa Duarte', category: 'Institucional',
    description: 'Site institucional para clínica oftalmológica, com agendamento via WhatsApp e apresentação de tratamentos e convênios.',
    img: '/project-draelisaduarte.png', url: 'https://draelisaduarte.com.br/', accent: '#8b5cf6',
    tags: ['Saúde', 'Oftalmologia', 'Agendamento'],
  },
  {
    num: '03', title: 'Resort Místico', category: 'Institucional',
    description: 'Site institucional para resort no interior de Minas Gerais, com reservas diretas pelo WhatsApp e apresentação da experiência do hóspede.',
    img: '/project-resortmistico.png', url: 'https://resortmistico.com.br/', accent: '#eab308',
    tags: ['Hotelaria', 'Institucional', 'WhatsApp'],
  },
  {
    num: '04', title: 'Hugo Rocha Odontologia', category: 'Landing Page',
    description: 'Landing page para clínica odontológica especializada em implantes e prótese, com foco total em agendamento de avaliação.',
    img: '/project-hugorocha.png', url: 'https://hugorochaodontologia.com.br/', accent: '#f35516',
    tags: ['Odontologia', 'Landing Page', 'CRO'],
  },
  {
    num: '05', title: 'Facth Odontologia', category: 'Landing Page',
    description: 'Landing page para clínica odontológica em Araxá, com prova social, números de resultado e captação via WhatsApp.',
    img: '/project-facthodontologia.png', url: 'https://facthodontologia.com.br/', accent: '#0d9488',
    tags: ['Odontologia', 'Landing Page', 'Conversão'],
  },
  {
    num: '06', title: 'Dra. Raquel Canelhas', category: 'Landing Page',
    description: 'Landing page para oftalmologista especialista em cirurgia palpebral, com copy direta e forte apelo estético.',
    img: '/project-draraquelcanelhas.png', url: 'https://draraquelcanelhas.com.br/', accent: '#a855f7',
    tags: ['Oftalmologia', 'Landing Page', 'Estética'],
  },
];

const N        = slides.length;
const CARD_W   = 820;
const CARD_GAP = 40;
const STEP     = CARD_W + CARD_GAP;
const TOTAL_X  = STEP * (N - 1);

// ── Barra de progresso ────────────────────────────────────────────────────────
function SegBar({ i, progress }: { i: number; progress: MotionValue<number> }) {
  const scaleX = useTransform(progress, [i / N, (i + 1) / N], [0, 1]);
  return (
    <div className="h-[2px] flex-1 rounded-full bg-white/10 overflow-hidden">
      <motion.div className="h-full rounded-full bg-white/60" style={{ scaleX, transformOrigin: 'left' }} />
    </div>
  );
}

// ── Card reutilizável ─────────────────────────────────────────────────────────
function ProjectCard({ slide, style, className }: {
  slide: typeof slides[0];
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <article
      className={`relative rounded-2xl overflow-hidden border border-white/[0.07] group ${className ?? ''}`}
      style={{ background: '#0d0d0d', boxShadow: '0 24px 60px -12px rgba(0,0,0,0.8)', ...style }}
    >
      <img
        src={slide.img}
        alt={slide.title}
        className="absolute inset-0 w-full h-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

      {/* Tags */}
      <div className="absolute top-5 right-5 flex gap-1.5 flex-wrap justify-end">
        {slide.tags.map(tag => (
          <span
            key={tag}
            className="px-2.5 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-widest"
            style={{ color: slide.accent, background: `${slide.accent}18`, border: `1px solid ${slide.accent}40` }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between gap-3">
        <div>
          <p className="text-[9px] uppercase tracking-[0.25em] mb-1" style={{ color: slide.accent }}>
            {slide.category}
          </p>
          <h3 className="text-xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            {slide.title}
          </h3>
          <p className="text-zinc-400 mt-1.5 text-xs md:text-sm leading-relaxed max-w-[38ch]">
            {slide.description}
          </p>
        </div>
        <a
          href={slide.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          style={{ background: `${slide.accent}22`, border: `1px solid ${slide.accent}55` }}
        >
          <ArrowUpRight size={16} weight="bold" style={{ color: slide.accent }} />
        </a>
      </div>

      <div
        className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
        style={{ background: slide.accent }}
      />
    </article>
  );
}

// ── Desktop: scroll horizontal ────────────────────────────────────────────────
function DesktopProjects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], ['0px', `-${TOTAL_X}px`]);

  return (
    <section
      ref={sectionRef}
      style={{ height: `calc(100vh + ${TOTAL_X}px)` }}
      className="relative hidden md:block"
    >
      <div className="sticky top-0 h-[100dvh] overflow-hidden bg-[#030304] flex flex-col">

        {/* Header */}
        <div className="px-16 pt-28 pb-6 flex items-end justify-between max-w-[1400px] mx-auto w-full shrink-0">
          <div>
            <div className="rounded-full px-3 py-1 bg-[#f35516]/10 border border-[#f35516]/20 text-[10px] w-max text-[#f35516] uppercase tracking-[0.2em] font-medium mb-4">
              Trabalhos Selecionados
            </div>
            <h2 className="text-6xl font-bold tracking-tighter text-white leading-none">
              Portfólio <span className="text-[#f35516]">Pro</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-sm max-w-[26ch] leading-relaxed text-right">
            Role para baixo para<br />explorar cada projeto →
          </p>
        </div>

        {/* Track horizontal — primeiro card alinhado com o título */}
        <div className="relative flex-1 overflow-hidden flex items-center">
          <motion.div
            style={{
              x,
              // Mesma lógica do header: max-w-[1400px] mx-auto px-16
              // → recuo = max(64px, (100vw − 1400px) / 2 + 64px)
              paddingLeft: 'max(64px, calc((100vw - 1400px) / 2 + 64px))',
            }}
            className="flex gap-10 will-change-transform"
          >
            {slides.map((slide) => (
              <ProjectCard
                key={slide.num}
                slide={slide}
                className="flex-shrink-0"
                style={{ width: CARD_W, height: 500 }}
              />
            ))}
          </motion.div>
        </div>

        {/* Barras de progresso */}
        <div className="px-16 py-6 flex gap-4 max-w-[1400px] mx-auto w-full shrink-0">
          {slides.map((_, i) => <SegBar key={i} i={i} progress={scrollYProgress} />)}
        </div>
      </div>
    </section>
  );
}

// ── Mobile: cards empilhados verticalmente ────────────────────────────────────
function MobileProjects() {
  return (
    <section className="block md:hidden bg-[#030304] px-4 py-20">

      {/* Header */}
      <div className="mb-10">
        <div className="rounded-full px-3 py-1 bg-[#f35516]/10 border border-[#f35516]/20 text-[10px] w-max text-[#f35516] uppercase tracking-[0.2em] font-medium mb-4">
          Trabalhos Selecionados
        </div>
        <h2 className="text-4xl font-bold tracking-tighter text-white leading-none">
          Portfólio <span className="text-[#f35516]">Pro</span>
        </h2>
      </div>

      {/* Cards em stack vertical */}
      <div className="flex flex-col gap-5">
        {slides.map((slide, i) => (
          <motion.div
            key={slide.num}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <ProjectCard
              slide={slide}
              style={{ height: 260 }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ── Export ────────────────────────────────────────────────────────────────────
export default function Projects() {
  return (
    <div id="projects">
      <DesktopProjects />
      <MobileProjects />
    </div>
  );
}
