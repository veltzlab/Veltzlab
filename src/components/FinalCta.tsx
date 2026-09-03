import { motion } from 'framer-motion';

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-[#030304] px-5 py-24 text-center md:px-12 md:py-36">
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[520px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f35516]/[.13] blur-[130px]" />
      <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: .65 }} className="relative mx-auto max-w-4xl">
        <span className="inline-flex rounded-full border border-[#f35516]/30 bg-[#f35516]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[.22em] text-[#f35516]">Diagnóstico gratuito</span>
        <h2 className="mt-6 text-4xl font-bold leading-[.95] tracking-tighter text-white md:text-6xl lg:text-7xl">Seu negócio cresceu.<br /><span className="text-[#f35516]">Agora faça sua estrutura acompanhar.</span></h2>
        <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">Descubra onde marketing, atendimento, vendas e dados podem estar desconectados e quais pontos merecem atenção primeiro.</p>
        <a href="#/diagnostico" className="mt-9 inline-flex rounded-full bg-[#f35516] px-8 py-4 text-sm font-bold text-white shadow-[0_0_32px_-8px_#f35516] transition-transform hover:scale-105">Fazer diagnóstico gratuito</a>
      </motion.div>
    </section>
  );
}
