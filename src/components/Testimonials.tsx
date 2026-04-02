import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowLeft, ArrowRight } from '@phosphor-icons/react';

const EASE = [0.32, 0.72, 0, 1] as const;

const testimonials = [
  {
    id: 1,
    photo: 'https://i.pravatar.cc/150?img=11',
    name: 'Rodrigo Almeida',
    role: 'CEO',
    company: 'NovaTech Soluções',
    stars: 5,
    text: 'Eduardo transformou completamente a presença digital da nossa empresa. A landing page que ele construiu aumentou nossa conversão em 340% no primeiro mês. Engenharia de altíssimo nível com atenção obsessiva aos detalhes.',
  },
  {
    id: 2,
    photo: 'https://i.pravatar.cc/150?img=5',
    name: 'Camila Ferreira',
    role: 'Head de Produto',
    company: 'Fintech Orbit',
    stars: 5,
    text: 'Trabalhamos juntos no redesign completo do nosso dashboard. Eduardo entregou um resultado que superou todas as expectativas — performance, acessibilidade e design impecáveis. É raro encontrar alguém que une código e estética tão bem.',
  },
  {
    id: 3,
    photo: 'https://i.pravatar.cc/150?img=47',
    name: 'Bruno Tavares',
    role: 'Founder',
    company: 'Launchpad Studio',
    stars: 5,
    text: 'Contratei o Eduardo para construir o MVP do nosso produto em tempo recorde. Entregou em 3 semanas o que estimávamos para 2 meses. Código limpo, documentado e escalável. Parceiro de confiança para qualquer projeto crítico.',
  },
  {
    id: 4,
    photo: 'https://i.pravatar.cc/150?img=9',
    name: 'Isabela Monteiro',
    role: 'Diretora de Marketing',
    company: 'Grupo Estilo',
    stars: 5,
    text: 'O portfolio que o Eduardo criou para nossa equipe criativa virou referência no setor. Vários parceiros perguntaram quem fez. A combinação de animações cinematográficas com performance técnica é algo que você não encontra facilmente.',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const count = testimonials.length;

  const go = (idx: number, dir: 1 | -1) => {
    setDirection(dir);
    setCurrent((idx + count) % count);
  };

  const next = () => go(current + 1, 1);
  const prev = () => go(current - 1, -1);

  // Autoplay
  useEffect(() => {
    timerRef.current = setInterval(next, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [current]);

  const resetTimer = (fn: () => void) => {
    if (timerRef.current) clearInterval(timerRef.current);
    fn();
  };

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60, transition: { duration: 0.4, ease: EASE } }),
  };

  const t = testimonials[current];

  return (
    <section id="testimonials" className="relative w-full bg-[#050505] py-32 md:py-40 overflow-hidden">

      {/* Subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-[0.22em] font-medium text-zinc-400 mb-5"
            >
              <Star size={10} weight="fill" className="text-[#f35516]" />
              Prova social
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.06, ease: EASE }}
              className="text-4xl md:text-6xl font-bold tracking-tighter text-white leading-[1]"
            >
              O que dizem<br />
              os <span className="text-[#f35516]">clientes.</span>
            </motion.h2>
          </div>

          {/* Nav arrows */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="flex items-center gap-3"
          >
            <button
              onClick={() => resetTimer(prev)}
              aria-label="Anterior"
              className="group w-12 h-12 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/20 transition-all duration-300 active:scale-95"
            >
              <ArrowLeft size={18} weight="light" className="group-hover:-translate-x-0.5 transition-transform duration-300" />
            </button>
            <button
              onClick={() => resetTimer(next)}
              aria-label="Próximo"
              className="group w-12 h-12 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/20 transition-all duration-300 active:scale-95"
            >
              <ArrowRight size={18} weight="light" className="group-hover:translate-x-0.5 transition-transform duration-300" />
            </button>
          </motion.div>
        </div>

        {/* Main card carousel */}
        <div className="relative overflow-hidden" style={{ minHeight: '320px' }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={t.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              {/* Double-bezel card */}
              <div className="rounded-[2rem] border border-white/8 bg-white/[0.03] p-1.5">
                <div className="rounded-[calc(2rem-0.375rem)] bg-[#0a0a0a] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] p-8 md:p-12">

                  <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">

                    {/* Photo + info */}
                    <div className="flex-shrink-0 flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-3">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/10 p-[2px] overflow-hidden flex-shrink-0">
                        <img
                          src={t.photo}
                          alt={t.name}
                          className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-700"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-white text-sm">{t.name}</p>
                        <p className="text-xs text-zinc-500 mt-0.5">{t.role}</p>
                        <p className="text-xs text-[#f35516] font-medium mt-0.5">{t.company}</p>
                        {/* Stars */}
                        <div className="flex gap-0.5 mt-2">
                          {Array.from({ length: t.stars }).map((_, i) => (
                            <Star key={i} size={12} weight="fill" className="text-[#f35516]" />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Quote */}
                    <div className="flex-1">
                      <span
                        className="block text-6xl md:text-7xl leading-none text-[#f35516] opacity-30 font-serif mb-2 select-none"
                        aria-hidden
                      >"</span>
                      <p className="text-base md:text-xl text-zinc-300 leading-relaxed font-light">
                        {t.text}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => resetTimer(() => go(i, i > current ? 1 : -1))}
              aria-label={`Depoimento ${i + 1}`}
              className="transition-all duration-500"
            >
              <span
                className="block rounded-full transition-all duration-500"
                style={{
                  width: i === current ? '24px' : '6px',
                  height: '6px',
                  backgroundColor: i === current ? '#f35516' : 'rgba(255,255,255,0.2)',
                }}
              />
            </button>
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px mt-16 rounded-2xl overflow-hidden border border-white/8"
        >
          {[
            { value: '40+', label: 'Projetos entregues' },
            { value: '100%', label: 'Clientes satisfeitos' },
            { value: '3×', label: 'Retorno médio p/ clientes' },
            { value: '< 48h', label: 'Resposta garantida' },
          ].map(stat => (
            <div key={stat.label} className="bg-white/[0.025] px-6 py-5 flex flex-col gap-1">
              <span className="text-2xl font-bold text-white tracking-tight">{stat.value}</span>
              <span className="text-[11px] text-zinc-500">{stat.label}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
