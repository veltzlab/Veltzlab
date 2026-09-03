import { motion } from 'framer-motion';

const steps = [
  { number: '01', title: 'Diagnóstico', description: 'Entendemos como marketing, atendimento e vendas funcionam atualmente e identificamos os principais pontos de atenção.' },
  { number: '02', title: 'Arquitetura', description: 'Desenhamos como processos, ferramentas, pessoas e dados deveriam se conectar.', note: 'Antes de automatizar, organizamos.' },
  { number: '03', title: 'Implementação', description: 'Construímos os elementos prioritários da nova estrutura.', detail: 'Páginas, CRM, pipelines, integrações, automações, dashboards ou sistemas personalizados.' },
  { number: '04', title: 'Otimização', description: 'Testamos a operação, entregamos visibilidade e identificamos os próximos pontos de melhoria.' },
];

export default function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-[#0a0504] px-5 py-24 md:px-12 md:py-36">
      <div aria-hidden="true" className="absolute left-0 top-0 h-80 w-full bg-[radial-gradient(ellipse_at_50%_0%,rgba(243,85,22,.13),transparent_70%)]" />
      <div className="relative mx-auto max-w-[1200px]">
        <motion.header initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: .65 }} className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-[#f35516]/30 bg-[#f35516]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[.22em] text-[#f35516]">Como funciona</span>
          <h2 className="mt-5 text-4xl font-bold leading-[.98] tracking-tighter text-white md:text-6xl">Da clareza à <span className="text-[#f35516]">operação que acompanha o seu crescimento.</span></h2>
        </motion.header>

        <div className="relative mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-gradient-to-r from-[#f35516]/20 via-[#f35516]/80 to-[#f35516]/20 lg:block" />
          {steps.map((step, index) => (
            <motion.article key={step.number} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: .6, delay: index * .1 }} className="relative flex min-h-[350px] flex-col rounded-[1.6rem] border border-white/[.09] bg-[#110907] p-6 transition-colors hover:border-[#f35516]/40 md:p-7">
              <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-[#f35516]/40 bg-[#f35516] text-sm font-bold text-white shadow-[0_0_28px_-10px_#f35516]">{step.number}</span>
              <h3 className="mt-8 text-2xl font-bold tracking-tight text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{step.description}</p>
              {step.note && <p className="mt-5 border-l-2 border-[#f35516] pl-3 text-sm font-semibold leading-relaxed text-white">{step.note}</p>}
              {step.detail && <p className="mt-5 text-xs leading-relaxed text-zinc-500">{step.detail}</p>}
              {index === 0 && <a href="/diagnostico" className="mt-auto inline-flex w-fit rounded-full bg-white px-4 py-2.5 text-xs font-bold text-black transition-transform hover:scale-105">Fazer diagnóstico gratuito</a>}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
