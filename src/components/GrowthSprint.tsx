import { motion } from 'framer-motion';

const phases = [
  ['01', 'Diagnosticar', 'Identificamos os gargalos.'],
  ['02', 'Arquitetar', 'Definimos a estrutura necessária.'],
  ['03', 'Implementar', 'Construímos os pontos prioritários.'],
  ['04', 'Automatizar', 'Eliminamos processos manuais quando fizer sentido.'],
  ['05', 'Medir', 'Criamos visibilidade sobre aquilo que importa.'],
];

const deliverables = ['Página ou fluxo de captação', 'Pipeline comercial', 'CRM', 'Automações prioritárias', 'Integrações', 'Acompanhamento de oportunidades', 'Dashboard de indicadores', 'Documentação e treinamento'];

export default function GrowthSprint() {
  return (
    <section className="relative overflow-hidden bg-[#100704] px-5 py-24 md:px-12 md:py-36">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_72%_24%,rgba(243,85,22,.28),transparent_23%),radial-gradient(circle_at_10%_82%,rgba(243,85,22,.12),transparent_28%)]" />
      <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[2.25rem] border border-[#f35516]/30 bg-[#0a0504]/80 p-6 shadow-[0_40px_120px_-45px_rgba(243,85,22,.45)] md:p-12">
        <div className="grid gap-14 lg:grid-cols-[.95fr_1.05fr] lg:gap-20">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: .65 }}>
            <span className="inline-flex rounded-full border border-[#f35516]/35 bg-[#f35516]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[.22em] text-[#f35516]">Produto Veltz</span>
            <h2 className="mt-5 text-5xl font-bold leading-[.9] tracking-tighter text-white md:text-7xl">VELTZ<br /><span className="text-[#f35516]">GROWTH</span><br />SPRINT</h2>
            <p className="mt-7 max-w-[34ch] text-lg leading-relaxed text-zinc-300">Uma implementação focada nos gargalos que estão limitando sua operação.</p>
            <p className="mt-5 max-w-[45ch] text-sm leading-relaxed text-zinc-500">O <strong className="font-semibold text-zinc-200">Veltz Growth Sprint</strong> é um projeto de curta duração para negócios que já possuem demanda, mas precisam organizar e conectar os pontos entre marketing, atendimento e vendas.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: .65, delay: .1 }}>
            <p className="text-xs font-semibold uppercase tracking-[.22em] text-zinc-500">O processo</p>
            <div className="mt-5 space-y-2">
              {phases.map(([number, title, description], index) => (
                <motion.div key={title} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: .15 + index * .08 }} className="group flex gap-4 rounded-2xl border border-white/[.08] bg-white/[.025] p-4 transition-colors hover:border-[#f35516]/40 hover:bg-[#f35516]/[.06]">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#f35516]/30 bg-[#f35516]/10 text-[10px] font-bold text-[#f35516]">{number}</span>
                  <div><h3 className="font-bold text-white">{title}</h3><p className="mt-1 text-sm leading-relaxed text-zinc-500">{description}</p></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-70px' }} transition={{ duration: .65 }} className="mt-14 border-t border-white/[.09] pt-10">
          <div className="text-center"><p className="text-xs font-semibold uppercase tracking-[.22em] text-zinc-500">Dependendo do diagnóstico, o Sprint pode envolver</p><div className="mx-auto mt-5 grid max-w-3xl gap-2 text-left sm:grid-cols-2">{deliverables.map(item => <div key={item} className="flex items-center gap-2.5 text-sm text-zinc-300"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f35516] text-[11px] font-black text-white">✓</span>{item}</div>)}</div><p className="mx-auto mt-6 w-fit rounded-full border border-[#f35516]/25 bg-[#f35516]/10 px-4 py-2 text-xs font-semibold text-[#f35516]">Prazo típico: até 14 dias úteis, conforme o escopo definido.</p></div>
          <a href="/diagnostico" className="mx-auto mt-8 flex w-fit rounded-full bg-[#f35516] px-7 py-4 text-sm font-bold text-white shadow-[0_0_30px_-8px_#f35516] transition-transform hover:scale-105">Quero descobrir o que minha operação precisa</a>
        </motion.div>
      </div>
    </section>
  );
}
