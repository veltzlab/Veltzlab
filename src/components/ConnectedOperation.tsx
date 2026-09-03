import { motion } from 'framer-motion';

const pillars = [
  ['Marketing', 'saiba o que acontece com os leads.'],
  ['Atendimento', 'saiba quem precisa de atenção.'],
  ['Vendas', 'saiba quem precisa de follow-up.'],
  ['Gestão', 'consiga enxergar o processo.'],
];

export default function ConnectedOperation() {
  return (
    <section className="relative overflow-hidden bg-[#0a0706] px-5 py-24 md:px-12 md:py-36">
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f35516]/[.07] blur-[120px]" />
      <div aria-hidden="true" className="ambient-drift absolute -left-24 top-1/3 h-64 w-64 rounded-full border border-[#f35516]/15" />
      <div aria-hidden="true" className="ambient-drift-slow absolute -right-20 bottom-12 h-52 w-52 rounded-full border border-white/[.07]" />
      <div className="relative mx-auto max-w-[1200px]">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-[#f35516]/30 bg-[#f35516]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[.22em] text-[#f35516]">Uma operação conectada</span>
          <h2 className="mt-5 text-4xl font-bold leading-[.95] tracking-tighter text-white md:text-6xl">O objetivo não é adicionar <span className="text-[#f35516]">mais tecnologia.</span></h2>
          <p className="mt-6 text-base leading-relaxed text-zinc-400">É construir uma operação em que cada área enxerga o que precisa para agir no momento certo.</p>
        </div>

        <div className="relative mx-auto mt-14 max-w-5xl">
          <div aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-[33px] hidden h-px bg-gradient-to-r from-transparent via-[#f35516]/60 to-transparent md:block" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map(([title, text], index) => (
              <motion.article key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -6 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: .45, delay: index * .08 }} className="relative rounded-2xl border border-white/[.09] bg-white/[.025] p-5 text-center backdrop-blur-sm transition-colors hover:border-[#f35516]/45 hover:bg-[#f35516]/[.045]">
                <span className="relative z-10 mx-auto flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[#f35516]/60 bg-[#150805] text-[10px] font-bold text-[#f35516]">0{index + 1}</span>
                <h3 className="mt-5 text-lg font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">{text}</p>
              </motion.article>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, scale: .97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: .5, delay: .25 }} className="mx-auto mt-5 max-w-xl rounded-2xl border border-[#f35516]/25 bg-[#f35516]/[.07] px-6 py-5 text-center">
            <span className="text-xs font-bold uppercase tracking-[.18em] text-[#f35516]">Tecnologia</span>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">trabalha nos bastidores para conectar tudo isso.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
