import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  EnvelopeSimple,
  LinkedinLogo,
  GithubLogo,
  InstagramLogo,
  ArrowUpRight,
  WhatsappLogo,
  MapPin,
} from '@phosphor-icons/react';

const EASE = [0.32, 0.72, 0, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.85, delay, ease: EASE },
});

const channels = [
  {
    icon: EnvelopeSimple,
    label: 'E-mail',
    value: 'oi@eduardocoelho.dev',
    href: 'mailto:oi@eduardocoelho.dev',
    hint: 'Respondo em até 24h',
  },
  {
    icon: WhatsappLogo,
    label: 'WhatsApp',
    value: '+55 (11) 99999-9999',
    href: 'https://wa.me/5511999999999',
    hint: 'Para projetos urgentes',
  },
  {
    icon: LinkedinLogo,
    label: 'LinkedIn',
    value: '/in/eduardocoelho',
    href: 'https://linkedin.com/in/eduardocoelho',
    hint: 'Networking & oportunidades',
  },
];

const socials = [
  { icon: GithubLogo, label: 'GitHub', href: 'https://github.com/eduardocoelho' },
  { icon: LinkedinLogo, label: 'LinkedIn', href: 'https://linkedin.com/in/eduardocoelho' },
  { icon: InstagramLogo, label: 'Instagram', href: 'https://instagram.com/eduardocoelho' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    await new Promise(r => setTimeout(r, 1400));
    setStatus('sent');
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-[#050505] pt-32 pb-0 overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-[900px] h-[500px] opacity-[0.12] blur-[120px]"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, #f35516 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12">

        {/* ── Eyebrow */}
        <motion.div {...fadeUp(0)} className="flex items-center gap-3 mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-[0.22em] font-medium text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f35516] animate-pulse" />
            Disponível para projetos
          </span>
        </motion.div>

        {/* ── Headline */}
        <motion.h2
          {...fadeUp(0.08)}
          className="text-5xl md:text-8xl font-bold tracking-tighter text-white leading-[0.95] mb-6"
        >
          Vamos construir<br />
          <span className="text-[#f35516]">algo incrível</span>
          <span className="text-white"> juntos.</span>
        </motion.h2>

        <motion.p
          {...fadeUp(0.16)}
          className="text-base md:text-lg text-zinc-400 max-w-[52ch] mb-16 leading-relaxed"
        >
          Seja uma landing page de alta conversão, um produto SaaS ou uma identidade digital completa
          — entrego engenharia de ponta com foco absoluto em resultado.
        </motion.p>

        {/* ── Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6">

          {/* LEFT — form */}
          <motion.div
            {...fadeUp(0.22)}
            className="rounded-[2rem] border border-white/8 bg-white/[0.03] p-1.5"
          >
            <div className="rounded-[calc(2rem-0.375rem)] bg-[#0a0a0a] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] p-8 md:p-10 h-full">

              {status === 'sent' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="flex flex-col items-center justify-center h-full min-h-[340px] text-center gap-5"
                >
                  <div className="w-16 h-16 rounded-full bg-[#f35516]/10 border border-[#f35516]/20 flex items-center justify-center text-[#f35516] text-2xl">
                    ✓
                  </div>
                  <p className="text-2xl font-semibold text-white tracking-tight">Mensagem enviada!</p>
                  <p className="text-zinc-400 text-sm max-w-[30ch]">
                    Obrigado pelo contato. Retorno em breve.
                  </p>
                  <button
                    onClick={() => { setStatus('idle'); setForm({ name: '', email: '', message: '' }); }}
                    className="mt-2 text-xs text-zinc-600 hover:text-zinc-400 transition-colors underline underline-offset-4"
                  >
                    Enviar outra mensagem
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 h-full">
                  <p className="text-sm font-medium text-zinc-300 tracking-wide mb-1">Envie uma mensagem</p>

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="text-[11px] uppercase tracking-[0.18em] text-zinc-500 font-medium">Nome</label>
                      <div className="rounded-xl border border-white/8 bg-white/[0.04] p-[1px]">
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Seu nome"
                          className="w-full rounded-[11px] bg-[#0d0d0d] px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:ring-1 focus:ring-[#f35516]/40 transition-all duration-300"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-[11px] uppercase tracking-[0.18em] text-zinc-500 font-medium">E-mail</label>
                      <div className="rounded-xl border border-white/8 bg-white/[0.04] p-[1px]">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="seu@email.com"
                          className="w-full rounded-[11px] bg-[#0d0d0d] px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:ring-1 focus:ring-[#f35516]/40 transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5 flex-1">
                    <label htmlFor="message" className="text-[11px] uppercase tracking-[0.18em] text-zinc-500 font-medium">Mensagem</label>
                    <div className="rounded-xl border border-white/8 bg-white/[0.04] p-[1px] flex-1">
                      <textarea
                        id="message"
                        name="message"
                        required
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Conte-me sobre o seu projeto..."
                        rows={6}
                        className="w-full rounded-[11px] bg-[#0d0d0d] px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none resize-none focus:ring-1 focus:ring-[#f35516]/40 transition-all duration-300 h-full min-h-[140px]"
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    whileHover={{ scale: 0.985 }}
                    whileTap={{ scale: 0.97 }}
                    className="group relative mt-2 w-full flex items-center justify-center gap-3 bg-white text-black font-semibold py-4 rounded-full transition-all duration-500 disabled:opacity-60 disabled:cursor-wait overflow-hidden text-sm"
                  >
                    <span className="relative z-10">
                      {status === 'sending' ? 'Enviando…' : 'Enviar mensagem'}
                    </span>
                    <span className="relative z-10 w-7 h-7 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-px transition-transform duration-300">
                      <ArrowUpRight size={14} weight="bold" />
                    </span>
                    {/* Shimmer */}
                    <span className="absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]" />
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* RIGHT — channels + location */}
          <div className="flex flex-col gap-4">

            {/* Channel cards */}
            {channels.map((ch, i) => (
              <motion.a
                key={ch.label}
                href={ch.href}
                target="_blank"
                rel="noopener noreferrer"
                {...fadeUp(0.28 + i * 0.08)}
                whileHover={{ scale: 0.985, x: 2 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="group rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-px"
              >
                <div className="rounded-[calc(1.5rem-1px)] bg-[#0a0a0a] shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)] px-6 py-5 flex items-center gap-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-full bg-white/5 border border-white/8 flex items-center justify-center text-[#f35516] group-hover:bg-[#f35516]/10 group-hover:border-[#f35516]/20 transition-all duration-500">
                    <ch.icon size={20} weight="light" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.18em] font-medium text-zinc-500 mb-0.5">{ch.label}</p>
                    <p className="text-sm font-medium text-white truncate">{ch.value}</p>
                    <p className="text-[11px] text-zinc-600 mt-0.5">{ch.hint}</p>
                  </div>
                  <ArrowUpRight
                    size={16}
                    weight="light"
                    className="text-zinc-600 group-hover:text-[#f35516] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0"
                  />
                </div>
              </motion.a>
            ))}

            {/* Location card */}
            <motion.div
              {...fadeUp(0.52)}
              className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-px"
            >
              <div className="rounded-[calc(1.5rem-1px)] bg-[#0a0a0a] shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)] px-6 py-5 flex items-center gap-4">
                <div className="flex-shrink-0 w-11 h-11 rounded-full bg-white/5 border border-white/8 flex items-center justify-center text-zinc-400">
                  <MapPin size={20} weight="light" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] font-medium text-zinc-500 mb-0.5">Localização</p>
                  <p className="text-sm font-medium text-white">São Paulo, Brasil</p>
                  <p className="text-[11px] text-zinc-600 mt-0.5">Disponível remotamente</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* ── Footer */}
        <motion.footer
          {...fadeUp(0.6)}
          className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 pb-10"
        >
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} Eduardo Coelho. Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-3">
            {socials.map(s => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                whileHover={{ scale: 1.1, y: -1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="w-9 h-9 rounded-full border border-white/8 bg-white/[0.04] flex items-center justify-center text-zinc-500 hover:text-white hover:border-white/20 transition-colors duration-300"
              >
                <s.icon size={16} weight="light" />
              </motion.a>
            ))}
          </div>

          <p className="text-xs text-zinc-700">
            Feito com <span className="text-[#f35516]">♥</span> em React + TypeScript
          </p>
        </motion.footer>

      </div>
    </section>
  );
}
