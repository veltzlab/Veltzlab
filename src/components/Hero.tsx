import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function Hero({ onVideoEnd }: { onVideoEnd?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoEnded, setIsVideoEnded] = useState(false);

  return (
    <section ref={containerRef} className="relative h-[100dvh] w-full overflow-hidden bg-[#050505] flex items-center justify-center">
        
        {/* Scroll-Linked Video Background */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <video
            ref={videoRef}
            src="/hero-video-test.mp4"
            muted
            playsInline
            autoPlay
            onTimeUpdate={(e) => {
              const vid = e.currentTarget;
              if (vid.duration && vid.currentTime >= vid.duration - 1) {
                vid.pause();
                vid.currentTime = Math.max(0, vid.duration - 1);
                setIsVideoEnded(true);
                if (onVideoEnd) onVideoEnd();
              }
            }}
            className="absolute inset-0 w-full h-full object-cover object-center md:object-[30%_15%] opacity-90"
          />
          <motion.img
            src="/hero-final-frame.png"
            alt="Eduardo"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVideoEnded ? 1 : 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full object-cover object-center md:object-[30%_15%]"
          />
          {/* Gradients for text legibility */}
          {/* Mobile: Bottom-to-Top Fade */}
          <div className="md:hidden absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-[#050505]/10 z-10" />
          
          {/* Desktop: Left-to-Right Fade */}
          <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/95 to-transparent w-2/3 z-10" />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 h-full gap-8">
          {/* Left Typography Block (Cascade Effect) */}
          <div className="relative h-full flex flex-col justify-center">
            <div className="absolute inset-y-0 flex flex-col justify-center w-full">
              
              {/* STEP 1: Headline always visible */}
              <div>
                <img
                  src="/logo.png"
                  alt="Veltz"
                  className="h-10 w-auto object-contain mb-6"
                  style={{ filter: 'brightness(0) invert(1)', opacity: 0.55 }}
                />
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1] text-white">
                  O Próximo <br />
                  Nível <span className="text-[#f35516]">Digital.</span> 
                </h1>
              </div>

              {/* STEP 2: Subheadline fades in after video */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVideoEnded ? 1 : 0, y: isVideoEnded ? 0 : 20 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
              >
                <p className="mt-8 text-base md:text-lg font-extralight text-zinc-400 max-w-[40ch] leading-relaxed">
                  Role para baixo e descubra minha atuação em desenvolvimento web focado em resultados reais.
                </p>
              </motion.div>

              {/* STEP 3: CTAs fade in after video */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVideoEnded ? 1 : 0, y: isVideoEnded ? 0 : 20 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
                style={{ pointerEvents: isVideoEnded ? 'auto' : 'none' }}
              >
                <div className="mt-10 flex flex-wrap gap-4">
                  <a href="#projects" className="px-8 py-4 bg-[#f35516] text-white font-semibold rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_-5px_#f35516]">
                    Ver Portfólio
                  </a>
                  <a href="#contact" className="px-8 py-4 bg-transparent text-white border border-white/20 font-semibold rounded-full hover:border-[#f35516]/50 hover:text-[#f35516] transition-colors">
                    Fale Comigo
                  </a>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
    </section>
  );
}
