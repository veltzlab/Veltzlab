import { motion } from 'framer-motion';

const areas = [
  { number: '01', title: 'Captação', items: ['Landing pages', 'Formulários', 'Fluxos de entrada', 'Tracking de origem', 'Integrações com campanhas'] },
  { number: '02', title: 'Atendimento & Vendas', items: ['CRM', 'Pipeline comercial', 'Distribuição de leads', 'Follow-up', 'Alertas operacionais'] },
  { number: '03', title: 'Automação', items: ['Integrações entre ferramentas', 'Processos automáticos', 'Notificações', 'Recuperação de oportunidades', 'Rotinas operacionais'] },
  { number: '04', title: 'Dados & Visibilidade', items: ['Dashboards', 'Indicadores comerciais', 'Visão de funil', 'Origem das oportunidades', 'Acompanhamento da operação'] },
];

export default function Implementations() {
  return (
    <section className="relative overflow-hidden bg-[#070404] px-5 py-24 md:px-12 md:py-36">
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f35516]/[.055] blur-[180px]" />
      <div className="relative mx-auto max-w-[1200px]">
        <motion.header initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: .65 }} className="grid gap-8 border-b border-white/[.09] pb-12 md:grid-cols-[1.1fr_.9fr] md:items-end">
          <div><span className="inline-flex rounded-full border border-white/10 bg-white/[.04] px-3 py-1 text-[10px] font-semibold uppercase tracking-[.22em] text-zinc-400">O que a Veltz implementa</span><h2 className="mt-5 text-4xl font-bold leading-[.98] tracking-tighter text-white md:text-6xl">O que a Veltz <span className="text-[#f35516]">implementa.</span></h2></div>
          <p className="max-w-[42ch] text-base leading-relaxed text-zinc-400 md:justify-self-end md:text-right">Não entregamos soluções genéricas. Identificamos os gargalos da sua operação e implementamos o que realmente precisa ser conectado.</p>
        </motion.header>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {areas.map((area, index) => (
            <motion.article key={area.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: .55, delay: index * .07 }} className="group relative overflow-hidden rounded-[1.5rem] border border-white/[.09] bg-white/[.025] p-6 transition-all hover:border-[#f35516]/35 hover:bg-[#f35516]/[.045]">
              <span className="absolute right-5 top-3 text-6xl font-black tracking-tighter text-white/[.035]">{area.number}</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#f35516]/30 bg-[#f35516]/10 text-[10px] font-bold text-[#f35516]">{area.number}</span>
              <h3 className="mt-6 text-2xl font-bold tracking-tight text-white">{area.title}</h3>
              <ul className="mt-5 space-y-2.5 border-t border-white/[.08] pt-5">
                {area.items.map(item => <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-zinc-400"><span className="mt-[.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#f35516]" />{item}</li>)}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
