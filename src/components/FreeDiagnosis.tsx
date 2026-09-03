import { motion } from 'framer-motion';

const areas = [
  ['01', 'Marketing', 'Como as oportunidades são geradas.'],
  ['02', 'Captação', 'Como essas oportunidades entram na operação.'],
  ['03', 'Atendimento', 'O que acontece depois do primeiro contato.'],
  ['04', 'Vendas', 'Como os leads são acompanhados até a conversão.'],
  ['05', 'Dados', 'Quanto da operação você realmente consegue enxergar.'],
];

export default function FreeDiagnosis() {
  return (
    <section id="free-diagnosis" className="relative overflow-hidden bg-[#f35516] px-5 py-24 md:px-12 md:py-36">
      <div aria-hidden="true" className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(0,0,0,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.18)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div aria-hidden="true" className="scan-line absolute inset-y-0 w-1/4 -skew-x-12 bg-white/[.06]" />
      <div className="relative mx-auto max-w-[1200px] rounded-[2rem] bg-[#0b0504] p-7 shadow-[0_35px_100px_-30px_rgba(0,0,0,.65)] md:p-12">
        <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: .65 }}>
            <span className="inline-flex rounded-full border border-[#f35516]/35 bg-[#f35516]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[.22em] text-[#f35516]">Diagnóstico gratuito</span>
            <h2 className="mt-5 text-4xl font-bold leading-[.95] tracking-tighter text-white md:text-6xl">Onde sua operação está <span className="text-[#f35516]">travando?</span></h2>
            <p className="mt-6 max-w-[42ch] text-base leading-relaxed text-zinc-400">Responda algumas perguntas sobre sua estrutura atual e receba uma primeira análise dos pontos que podem estar limitando seu crescimento.</p>
            <p className="mt-7 text-sm font-semibold text-zinc-300">Leva poucos minutos.</p>
            <a href="/diagnostico" className="mt-5 inline-flex rounded-full bg-[#f35516] px-7 py-4 text-sm font-bold text-white shadow-[0_0_28px_-8px_#f35516] transition-transform hover:scale-105">Começar diagnóstico gratuito</a>
            <p className="mt-4 max-w-[45ch] text-xs leading-relaxed text-zinc-500">O diagnóstico inicial é baseado nas informações fornecidas e não substitui uma análise aprofundada da operação.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 22 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: .65, delay: .1 }}>
            <p className="text-xs font-semibold uppercase tracking-[.22em] text-zinc-500">Vamos observar áreas como</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {areas.map(([number, title, description], index) => <motion.div key={title} initial={{ opacity: 0, scale: .97 }} whileInView={{ opacity: 1, scale: 1 }} whileHover={{ y: -4 }} viewport={{ once: true }} transition={{ delay: .16 + index * .07 }} className={`rounded-2xl border border-white/[.09] bg-white/[.025] p-4 transition-colors hover:border-[#f35516]/45 hover:bg-[#f35516]/[.06] ${index === 4 ? 'sm:col-span-2' : ''}`}><span className="text-[10px] font-bold tracking-[.2em] text-[#f35516]">{number}</span><h3 className="mt-2 text-lg font-bold text-white">{title}</h3><p className="mt-1 text-sm leading-relaxed text-zinc-500">{description}</p></motion.div>)}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
