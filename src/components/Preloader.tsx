import { AnimatePresence, motion } from 'framer-motion';

export default function Preloader({ loading }: { loading: boolean }) {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          data-testid="preloader"
          className="fixed inset-0 z-[10000] bg-[#030304] flex flex-col items-center justify-center gap-6"
        >
          <motion.img
            src="/logo.png"
            alt="Veltz"
            initial={{ opacity: 0.4, scale: 0.96 }}
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.96, 1, 0.96] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="h-8 w-auto object-contain"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
          <div className="w-40 h-[2px] rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full w-1/3 rounded-full bg-[#f35516]"
              animate={{ x: ['-100%', '220%'] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
