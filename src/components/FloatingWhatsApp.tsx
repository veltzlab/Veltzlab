import { motion } from 'framer-motion';
import { WhatsappLogo } from '@phosphor-icons/react';

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href="https://wa.me/5533936180573"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1, ease: [0.32, 0.72, 0, 1] }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-[9998] w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-40" />
      <WhatsappLogo size={28} weight="fill" className="relative text-white" />
    </motion.a>
  );
}
