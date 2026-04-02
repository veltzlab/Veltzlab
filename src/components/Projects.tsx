import { motion } from 'framer-motion';
import { ArrowUpRight } from '@phosphor-icons/react';

const projects = [
  {
    title: 'Dr. Hugo Rocha',
    category: 'Landing Page',
    span: 'col-span-1 md:col-span-8 row-span-2',
    img: '/ecommerce-preview.png',
    delay: 0.1,
    autoPan: true,
  },
  {
    title: 'Fintech Dashboard',
    category: 'Product Design',
    span: 'col-span-1 md:col-span-4 row-span-1',
    img: 'https://picsum.photos/seed/port2/800/600',
    delay: 0.2,
    autoPan: false,
  },
  {
    title: 'Agência Criativa',
    category: 'Landing Page',
    span: 'col-span-1 md:col-span-4 row-span-1',
    img: 'https://picsum.photos/seed/port3/800/600',
    delay: 0.3,
    autoPan: false,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 md:py-40 px-4 max-w-[1400px] mx-auto w-full relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
        <div>
          <div className="rounded-full px-3 py-1 bg-[#f35516]/10 border border-[#f35516]/20 text-[10px] w-max text-[#f35516] uppercase tracking-[0.2em] font-medium mb-6">
            Trabalhos Selecionados
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
            Portfólio <span className="text-[#f35516]">Pro</span>
          </h2>
        </div>
        <p className="text-zinc-400 max-w-[40ch] leading-relaxed">
          Uma seleção de projetos de alta performance focada em conversão, estética premium e 
          micro-interações fluidas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px] md:auto-rows-[400px]">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            data-cursor="pointer"
            className={`${project.span} group relative cursor-none`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: project.delay, ease: [0.32, 0.72, 0, 1] }}
          >
            {/* Double-Bezel Architecture */}
            <div className="absolute inset-0 bg-white/[0.03] border border-white/10 p-2 rounded-[2rem] transition-all duration-500 group-hover:bg-white/[0.06]">
              <div className="relative w-full h-full rounded-[calc(2rem-0.5rem)] overflow-hidden bg-[#0a0a0a] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                
                <img 
                  src={project.img} 
                  alt={project.title} 
                  className={`opacity-70 ${
                    project.autoPan
                      ? 'absolute top-0 left-0 w-full h-auto'
                      : 'w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105'
                  }`}
                  style={project.autoPan ? {
                    animation: 'imagePan 20s linear infinite alternate',
                  } : {}}
                />
                
                <div className="absolute inset-x-0 bottom-0 p-8 flex justify-between items-end bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <div>
                    <p className="text-zinc-400 text-sm font-medium mb-2">{project.category}</p>
                    <h3 className="text-2xl md:text-3xl text-white font-semibold tracking-tight">
                      {project.title}
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:bg-white text-white group-hover:text-black">
                    <ArrowUpRight size={24} weight="bold" />
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
