import { motion } from 'framer-motion';

const stages = ['Aquisição', 'Captação', 'Atendimento', 'Follow-up', 'Venda', 'Dados'];

export default function Diagnosis() {
  return (
    <section id="diagnosis" className="relative overflow-hidden bg-[#070404] px-5 py-24 md:px-12 md:py-36">
      <div aria-hidden="true" className="absolute right-[-12rem] top-16 h-[28rem] w-[28rem] rounded-full bg-[#f35516]/[0.07] blur-[140px]" />
      <div className="relative mx-auto max-w-[1200px]">
        <div className="grid items-start gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: .65 }}>
            <span className="inline-flex rounded-full border border-white/10 bg-white/[.04] px-3 py-1 text-[10px] font-semibold uppercase tracking-[.22em] text-zinc-400">Diagnóstico de operação</span>
            <h2 className="mt-5 text-4xl font-bold leading-[.98] tracking-tighter text-white md:text-6xl">Antes de gerar mais, descubra onde você está <span className="text-[#f35516]">perdendo.</span></h2>
            <p className="mt-7 max-w-[42ch] text-base leading-relaxed text-zinc-400 md:text-lg">Nós não começamos indicando uma ferramenta. Primeiro entendemos como sua operação funciona hoje.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: .65, delay: .1 }} className="rounded-[2rem] border border-white/[.09] bg-white/[.025] p-5 shadow-[0_30px_80px_-40px_rgba(0,0,0,.9)] md:p-8">
            <p className="text-xs font-medium uppercase tracking-[.2em] text-zinc-500">Mapeamento da jornada</p>
            <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {stages.map((stage, index) => (
                <motion.div key={stage} initial={{ opacity: 0, scale: .96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: .15 + index * .07 }} className="group flex items-center gap-3 rounded-xl border border-white/[.08] bg-black/20 p-3.5 transition-colors hover:border-[#f35516]/40 hover:bg-[#f35516]/[.07]">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#f35516]/30 bg-[#f35516]/10 text-[10px] font-bold text-[#f35516]">0{index + 1}</span>
                  <span className="text-sm font-medium text-zinc-200">{stage}</span>
                </motion.div>
              ))}
            </div>
            <div className="my-6 flex items-center gap-3 px-1 text-xs uppercase tracking-[.18em] text-[#f35516]"><span className="h-px flex-1 bg-[#f35516]/30" />Visão ponta a ponta<span className="h-px flex-1 bg-[#f35516]/30" /></div>
            <p className="text-base leading-relaxed text-zinc-300">Depois identificamos os gargalos, priorizamos o que realmente precisa mudar e implementamos a estrutura necessária.</p>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: .65 }} className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-white/[.1] bg-white/[.1] md:grid-cols-2">
          <div className="bg-[#0b0706] px-7 py-9 md:px-10 md:py-12"><p className="text-xs font-medium uppercase tracking-[.22em] text-zinc-500">A tecnologia</p><p className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl">não é o produto.</p></div>
          <div className="bg-[#f35516] px-7 py-9 md:px-10 md:py-12"><p className="text-xs font-semibold uppercase tracking-[.22em] text-black/60">A tecnologia</p><p className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl">é o meio para melhorar a operação.</p></div>
        </motion.div>
      </div>
    </section>
  );
}
