import { motion } from 'framer-motion';

export default function PositioningStatement() {
  return (
    <section className="relative overflow-hidden bg-[#f35516] px-5 py-24 text-center md:px-12 md:py-32">
      <div aria-hidden="true" className="absolute inset-0 opacity-20 [background-image:radial-gradient(rgba(0,0,0,.5)_1px,transparent_1px)] [background-size:18px_18px]" />
      <div aria-hidden="true" className="ambient-drift absolute -left-12 top-10 h-64 w-64 rounded-full border border-[#260900]/30" />
      <div aria-hidden="true" className="ambient-drift-slow absolute -right-16 bottom-0 h-72 w-72 rounded-full border border-white/25" />
      <div aria-hidden="true" className="scan-line absolute inset-y-0 w-1/4 -skew-x-12 bg-white/[.07]" />
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: .6 }} className="relative mx-auto max-w-5xl">
        <span className="text-[10px] font-bold uppercase tracking-[.24em] text-[#270c03]">A visão da Veltz</span>
        <p className="mt-6 text-4xl font-bold leading-[.98] tracking-tighter text-[#210a03] md:text-6xl lg:text-7xl">
          Negócios não precisam de mais ferramentas.<br />
          <span className="text-white">Precisam fazer processos, pessoas e tecnologia trabalharem juntos.</span>
        </p>
      </motion.div>
    </section>
  );
}
