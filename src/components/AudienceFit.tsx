import { motion } from 'framer-motion';

const rightFit = [
  'Você já recebe contatos, leads ou oportunidades.',
  'Seu atendimento acontece principalmente através de WhatsApp, formulários ou canais digitais.',
  'Existem processos que dependem excessivamente de tarefas manuais.',
  'Marketing e vendas não estão totalmente conectados.',
  'Sua empresa possui ferramentas que não conversam entre si.',
  'Você tem dificuldade para acompanhar o caminho entre lead e venda.',
  'O negócio cresceu e a estrutura começou a ficar confusa.',
];

const notYet = [
  'Você ainda não possui uma oferta validada.',
  'Seu negócio praticamente não gera demanda.',
  'Você procura apenas gestão de redes sociais.',
  'Você quer somente uma ferramenta isolada sem analisar o restante da operação.',
  'Você busca uma solução pronta sem participação da equipe durante o diagnóstico.',
];

function Checklist({ items, tone }: { items: string[]; tone: 'yes' | 'no' }) {
  const positive = tone === 'yes';
  return <ul className="mt-8 space-y-3">{items.map((item, index) => <motion.li key={item} initial={{ opacity: 0, x: positive ? -14 : 14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * .055 }} className="flex items-start gap-3 text-sm leading-relaxed text-zinc-300"><span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-black ${positive ? 'bg-[#f35516] text-white' : 'border border-white/20 bg-white/[.04] text-zinc-500'}`}>{positive ? '✓' : '–'}</span>{item}</motion.li>)}</ul>;
}

export default function AudienceFit() {
  return (
    <section className="relative overflow-hidden bg-[#080404] px-5 py-24 md:px-12 md:py-36">
      <div aria-hidden="true" className="absolute left-1/2 top-0 h-96 w-[48rem] -translate-x-1/2 rounded-full bg-[#f35516]/[.07] blur-[160px]" />
      <div className="relative mx-auto max-w-[1200px]">
        <motion.header initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: .65 }} className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-white/10 bg-white/[.04] px-3 py-1 text-[10px] font-semibold uppercase tracking-[.22em] text-zinc-400">Para quem é</span>
          <h2 className="mt-5 text-4xl font-bold leading-[.98] tracking-tighter text-white md:text-6xl">O Growth Sprint faz sentido <span className="text-[#f35516]">se…</span></h2>
        </motion.header>
        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          <motion.article initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: .65 }} className="rounded-[2rem] border border-[#f35516]/30 bg-[#f35516]/[.055] p-7 md:p-9"><span className="text-xs font-bold uppercase tracking-[.22em] text-[#f35516]">É para você se</span><Checklist items={rightFit} tone="yes" /></motion.article>
          <motion.article initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: .65, delay: .1 }} className="rounded-[2rem] border border-white/[.09] bg-white/[.025] p-7 md:p-9"><span className="text-xs font-bold uppercase tracking-[.22em] text-zinc-500">Para quem não é</span><h3 className="mt-3 text-2xl font-bold tracking-tight text-white">Provavelmente não é o primeiro passo se:</h3><Checklist items={notYet} tone="no" /></motion.article>
        </div>
      </div>
    </section>
  );
}
