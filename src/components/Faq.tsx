import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Minus, Plus } from '@phosphor-icons/react';

const questions: Array<{ question: string; paragraphs: string[] }> = [
  { question: 'A Veltz é uma agência de marketing?', paragraphs: ['Não.', 'Podemos atuar em pontos relacionados ao marketing, mas nosso trabalho está na estrutura que conecta aquisição, atendimento, vendas, automação e dados.'] },
  { question: 'Vocês fazem sites e landing pages?', paragraphs: ['Sim, quando uma página faz parte da solução identificada.', 'Não tratamos o site como um produto isolado. Primeiro entendemos o papel dele dentro da operação.'] },
  { question: 'Vocês trabalham com empresas de quais segmentos?', paragraphs: ['A Veltz atende principalmente negócios de serviços que já possuem algum nível de demanda e precisam organizar sua estrutura digital e comercial.'] },
  { question: 'Preciso trocar as ferramentas que já utilizo?', paragraphs: ['Não necessariamente.', 'Sempre avaliamos primeiro o que pode ser aproveitado, integrado ou melhorado antes de recomendar novas ferramentas.'] },
  { question: 'A Veltz desenvolve sistemas personalizados?', paragraphs: ['Sim, quando existe um problema que justifica uma solução específica e ferramentas existentes não resolvem adequadamente a necessidade.'] },
  { question: 'O diagnóstico gratuito já entrega a solução completa?', paragraphs: ['Não.', 'Ele oferece uma primeira leitura da operação e ajuda a identificar possíveis pontos de atenção.', 'Uma análise mais profunda é necessária para determinar causas, prioridades e implementações.'] },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden bg-[#070506] px-5 py-24 md:px-12 md:py-36">
      <div aria-hidden="true" className="absolute left-1/2 top-0 h-[360px] w-[760px] -translate-x-1/2 bg-[#f35516]/[.08] blur-[120px]" />
      <div className="relative mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="inline-flex rounded-full border border-[#f35516]/30 bg-[#f35516]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[.22em] text-[#f35516]">Perguntas frequentes</span>
          <h2 className="mt-5 text-4xl font-bold leading-[.95] tracking-tighter text-white md:text-6xl">O que você precisa <span className="text-[#f35516]">saber.</span></h2>
          <p className="mt-6 max-w-[34ch] text-base leading-relaxed text-zinc-400">Entenda como a Veltz atua antes de olhar para uma nova ferramenta ou solução.</p>
        </div>
        <div className="divide-y divide-white/[.09] border-y border-white/[.09]">
          {questions.map(({ question, paragraphs }, index) => {
            const isOpen = open === index;
            const contentId = `faq-answer-${index}`;
            return (
              <article key={question} className="py-1">
                <button type="button" onClick={() => setOpen(isOpen ? null : index)} aria-expanded={isOpen} aria-controls={contentId} className="group flex w-full items-center justify-between gap-6 py-6 text-left">
                  <span className={`text-lg font-bold tracking-tight transition-colors md:text-xl ${isOpen ? 'text-white' : 'text-zinc-300 group-hover:text-white'}`}>{question}</span>
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors ${isOpen ? 'border-[#f35516]/50 bg-[#f35516] text-white' : 'border-white/10 bg-white/[.03] text-zinc-400 group-hover:border-[#f35516]/35 group-hover:text-[#f35516]'}`}>{isOpen ? <Minus size={16} weight="bold" /> : <Plus size={16} weight="bold" />}</span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && <motion.div id={contentId} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .28, ease: [0.32, 0.72, 0, 1] }} className="overflow-hidden"><div className="max-w-[65ch] space-y-3 pb-7 pr-12 text-sm leading-relaxed text-zinc-400">{paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></motion.div>}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
