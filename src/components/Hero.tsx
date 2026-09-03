import ShinyText from './ShinyText.jsx';

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-[#030304]" aria-labelledby="hero-heading">
      <div aria-hidden="true" className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_18%_24%,rgba(243,85,22,.16),transparent_25%),radial-gradient(circle_at_82%_72%,rgba(243,85,22,.12),transparent_28%),linear-gradient(135deg,#050303_0%,#090504_48%,#020203_100%)]" />
      <svg aria-hidden="true" className="absolute inset-0 z-0 h-full w-full opacity-80" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="networkGlow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="4" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          <radialGradient id="nodeGlow"><stop stopColor="#ffb089" stopOpacity=".9" /><stop offset="1" stopColor="#f35516" stopOpacity="0" /></radialGradient>
        </defs>
        <g stroke="#f35516" strokeLinecap="round">
          <path className="network-line" d="M-70 640C160 530 198 678 386 520S650 280 826 405s186 235 408 102 205-30 290-196" strokeWidth="1" strokeOpacity=".42" strokeDasharray="7 14" />
          <path className="network-line-slow" d="M-35 220c185 78 245-75 425 28s178 239 365 165 234-318 406-200 129 118 350 29" strokeWidth="1" strokeOpacity=".28" strokeDasharray="4 16" />
          <path d="M38 764C238 648 342 760 514 665s218-264 413-148 269 137 480-49" strokeWidth=".75" strokeOpacity=".2" />
          <path d="M124 93c184 12 236 183 412 144s250-148 408-53 258 154 414 55" strokeWidth=".75" strokeOpacity=".18" />
        </g>
        <g filter="url(#networkGlow)">
          <circle className="network-node" cx="386" cy="520" fill="#ff7b43" style={{ animationDelay: '.2s' }} />
          <circle className="network-node" cx="826" cy="405" fill="#ff7b43" style={{ animationDelay: '1.1s' }} />
          <circle className="network-node" cx="1234" cy="507" fill="#ff7b43" style={{ animationDelay: '2.1s' }} />
          <circle className="network-node" cx="390" cy="248" fill="#ff7b43" style={{ animationDelay: '.8s' }} />
          <circle className="network-node" cx="944" cy="420" fill="#ff7b43" style={{ animationDelay: '1.7s' }} />
        </g>
        <g opacity=".55"><circle cx="386" cy="520" r="26" fill="url(#nodeGlow)" /><circle cx="826" cy="405" r="32" fill="url(#nodeGlow)" /><circle cx="1234" cy="507" r="24" fill="url(#nodeGlow)" /></g>
      </svg>
      <div aria-hidden="true" className="ambient-drift absolute -left-24 top-[17%] z-10 h-56 w-56 rounded-full border border-[#f35516]/20 bg-[#f35516]/[.04] blur-[1px]" />
      <div aria-hidden="true" className="ambient-drift-slow absolute -right-20 bottom-[12%] z-10 h-72 w-72 rounded-full border border-white/[.09]" />
      <div aria-hidden="true" className="pulse-ring absolute left-1/2 top-1/2 z-10 h-[min(76vw,680px)] w-[min(76vw,680px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f35516]/15" />
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,3,4,.18)_44%,#030304_100%)]" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-[15] h-28 bg-[#080405] shadow-[0_-1px_0_rgba(243,85,22,.16)] [clip-path:polygon(0_38%,42%_38%,52%_100%,100%_100%,100%_100%,0_100%)] md:h-44 md:[clip-path:polygon(0_32%,42%_32%,52%_100%,100%_100%,100%_100%,0_100%)]" />
      <div className="relative z-20 mx-auto flex w-full max-w-4xl flex-col items-center px-6 pt-20 text-center">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-3 py-1 text-[10px] font-medium uppercase tracking-[.2em] text-zinc-300 backdrop-blur-md"><span className="h-1.5 w-1.5 rounded-full bg-[#f35516] shadow-[0_0_10px_#f35516]" />Veltz Lab</span>
        <h1 id="hero-heading" className="max-w-4xl text-5xl font-bold leading-[1.02] tracking-tighter text-white sm:text-6xl lg:text-7xl"><ShinyText text="Seu negócio cresceu." speed={2.6} delay={0} color="#fffaf8" shineColor="#ffffff" spread={118} direction="left" yoyo={false} pauseOnHover={false} /><br /><ShinyText text="Sua estrutura acompanhou?" speed={2.6} delay={0} color="#fffaf8" shineColor="#ffffff" spread={118} direction="left" yoyo={false} pauseOnHover={false} /></h1>
        <p className="mt-7 max-w-5xl text-sm font-light leading-relaxed text-zinc-300 md:text-base"><span className="block md:whitespace-nowrap">Diagnosticamos gargalos e implementamos soluções para conectar</span><span className="block md:whitespace-nowrap"><strong className="font-semibold text-white">marketing, atendimento, vendas e dados</strong> em uma operação</span><span className="block md:whitespace-nowrap">mais organizada, automatizada e mensurável.</span></p>
        <div className="mt-9 flex flex-wrap justify-center gap-4"><a href="/diagnostico" className="rounded-full bg-[#f35516] px-8 py-4 font-semibold text-white shadow-[0_0_24px_-6px_#f35516] transition-transform hover:scale-105">Fazer diagnóstico gratuito</a><a href="#process" className="rounded-full border border-white/25 bg-black/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-colors hover:border-[#f35516] hover:text-[#f35516]">Conhecer o Growth Sprint</a></div>
        <a href="#about" className="group mt-14 flex flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[.24em] text-zinc-500 transition-colors hover:text-white"><span>Explore a operação</span><span className="flex h-8 w-5 items-start justify-center rounded-full border border-white/20 p-1"><span className="mt-0.5 block h-1.5 w-1.5 animate-pulse rounded-full bg-[#f35516]" /></span></a>
      </div>
    </section>
  );
}
