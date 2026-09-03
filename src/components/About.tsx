import { motion } from 'framer-motion';
import { ArrowDown, ChartLineDown, Check, Warning } from '@phosphor-icons/react';

const earlyTools = ['Um WhatsApp', 'Uma planilha', 'Um site', 'Algumas campanhas', 'Uma pessoa atendendo'];
const growthChanges = ['Novos canais aparecem', 'Mais pessoas entram na operação', 'Novas ferramentas são contratadas'];
const bottlenecks = [
  'Leads entram, mas ninguém acompanha direito.',
  'Marketing e vendas enxergam números diferentes.',
  'Follow-ups dependem da memória da equipe.',
  'Informações ficam espalhadas entre ferramentas.',
  'Processos repetitivos continuam sendo feitos manualmente.',
  'A gestão não enxerga onde as oportunidades são perdidas.',
];

const reveal = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#080405] px-5 py-24 md:px-12 md:py-36">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,104,0,.16),transparent_68%)]" />
      <div aria-hidden="true" className="absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#f35516]/[0.06] blur-[140px]" />
      <div className="relative mx-auto max-w-[1200px]">
        <motion.header initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={reveal} transition={{ duration: .65 }} className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-[#f35516]/30 bg-[#f35516]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[.22em] text-[#f35516]">O problema</span>
          <h2 className="mt-5 text-4xl font-bold leading-[.98] tracking-tighter text-white md:text-6xl">Mais ferramentas não resolvem uma <span className="text-[#f35516]">operação desconectada.</span></h2>
        </motion.header>

        <div className="mt-16 grid gap-7 lg:grid-cols-[1fr_72px_1fr] lg:items-stretch">
          <motion.article initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={reveal} transition={{ duration: .65, delay: .08 }} className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 md:p-9">
            <p className="text-xs font-medium uppercase tracking-[.2em] text-zinc-500">No início</p>
            <h3 className="mt-3 text-3xl font-bold tracking-tight text-white">Seu negócio começa pequeno.</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">O improviso funciona quando a operação ainda é simples.</p>
            <div className="mt-8 space-y-3">
              {earlyTools.map((tool, index) => (
                <motion.div key={tool} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: .12 + index * .06 }} className="flex items-center gap-3 rounded-xl border border-white/[.07] bg-black/20 px-4 py-3 text-sm text-zinc-300"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/[.08]"><Check size={12} weight="bold" className="text-zinc-300" /></span>{tool}</motion.div>
              ))}
            </div>
          </motion.article>

          <div className="flex items-center justify-center py-2 lg:flex-col">
            <span className="hidden h-full w-px bg-gradient-to-b from-transparent via-[#f35516]/70 to-transparent lg:block" />
            <ArrowDown size={26} weight="bold" className="my-3 rotate-[-90deg] text-[#f35516] lg:rotate-0" />
            <span className="hidden h-full w-px bg-gradient-to-b from-transparent via-[#f35516]/70 to-transparent lg:block" />
          </div>

          <motion.article initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={reveal} transition={{ duration: .65, delay: .16 }} className="rounded-[2rem] border border-[#f35516]/25 bg-[#f35516]/[0.055] p-7 md:p-9">
            <p className="text-xs font-medium uppercase tracking-[.2em] text-[#f35516]">Quando a demanda cresce</p>
            <h3 className="mt-3 text-3xl font-bold tracking-tight text-white">A complexidade cresce junto.</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">E aquilo que funcionava no improviso começa a gerar gargalos.</p>
            <div className="mt-8 space-y-3">
              {growthChanges.map((change, index) => (
                <motion.div key={change} initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: .2 + index * .09 }} className="rounded-xl border border-[#f35516]/20 bg-black/20 px-4 py-4 text-sm font-medium text-zinc-200">{change}</motion.div>
              ))}
              <div className="flex items-center gap-3 rounded-xl border border-[#f35516]/30 bg-[#f35516]/10 px-4 py-4 text-sm font-semibold text-white"><Warning size={20} weight="fill" className="text-[#f35516]" />A operação começa a perder ritmo.</div>
            </div>
          </motion.article>
        </div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={reveal} transition={{ duration: .7 }} className="mt-7 rounded-[2rem] border border-white/[.08] bg-black/30 p-7 md:p-9">
          <div className="flex flex-col gap-3 border-b border-white/[.08] pb-7 md:flex-row md:items-end md:justify-between">
            <div><p className="text-xs font-medium uppercase tracking-[.2em] text-zinc-500">Os sintomas</p><h3 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">Os gargalos deixam sinais em toda a operação.</h3></div>
            <ChartLineDown size={34} weight="duotone" className="text-[#f35516]" />
          </div>
          <div className="mt-7 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {bottlenecks.map((item, index) => (
              <motion.div key={item} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }} className="rounded-xl border border-white/[.07] bg-white/[.025] p-4 text-sm leading-relaxed text-zinc-400"><span className="mb-3 block h-1 w-7 rounded-full bg-[#f35516]" />{item}</motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: .98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: .7 }} className="relative mx-auto mt-10 max-w-5xl overflow-hidden rounded-[2rem] border border-white/[.09] bg-[#100706] p-7 md:p-10">
          <div aria-hidden="true" className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#f35516]/[.16] blur-[90px]" />
          <div className="relative grid gap-9 lg:grid-cols-[.95fr_1.05fr] lg:items-center lg:gap-14">
            <div className="text-left">
              <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.22em] text-[#f35516]"><span className="h-1.5 w-1.5 rounded-full bg-[#f35516]" />O ponto cego</span>
              <p className="mt-4 text-lg font-medium leading-relaxed text-zinc-400">O marketing pode até estar funcionando.</p>
              <h3 className="mt-3 text-3xl font-bold leading-[1.03] tracking-tighter text-white md:text-4xl">A oportunidade entra, mas a operação não consegue <span className="text-[#f35516]">levá-la até a venda.</span></h3>
            </div>
            <div className="relative grid gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
              <div className="rounded-2xl border border-white/[.1] bg-white/[.035] p-4"><span className="text-[10px] font-bold uppercase tracking-[.18em] text-zinc-500">01 · Aquisição</span><p className="mt-3 text-sm font-bold text-white">Oportunidade gerada</p><p className="mt-1 text-xs leading-relaxed text-zinc-500">O interesse chega por campanhas, site ou indicação.</p></div>
              <ArrowDown size={20} className="mx-auto text-[#f35516] sm:rotate-[-90deg]" />
              <div className="rounded-2xl border border-[#f35516]/35 bg-[#f35516]/[.08] p-4"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f35516] text-white"><Warning size={14} weight="fill" /></span><p className="mt-3 text-sm font-bold text-white">A operação falha</p><p className="mt-1 text-xs leading-relaxed text-zinc-400">Sem processo, contexto e acompanhamento.</p></div>
              <ArrowDown size={20} className="mx-auto text-[#f35516]/55 sm:rotate-[-90deg]" />
              <div className="rounded-2xl border border-white/[.07] bg-black/20 p-4"><span className="text-[10px] font-bold uppercase tracking-[.18em] text-zinc-600">03 · Venda</span><p className="mt-3 text-sm font-bold text-zinc-300">Oportunidade perdida</p><p className="mt-1 text-xs leading-relaxed text-zinc-600">O lead esfria antes da conversão.</p></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
