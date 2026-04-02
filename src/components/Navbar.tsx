import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { List, X } from '@phosphor-icons/react';
import { availability } from '../config/availability';

const statusColor: Record<string, string> = {
  available: '#22c55e',
  busy: '#f59e0b',
  unavailable: '#ef4444',
};

export default function Navbar({ isVideoEnded = true }: { isVideoEnded?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3, ease: [0.32, 0.72, 0, 1] }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1], staggerChildren: 0.08, delayChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    closed: { opacity: 0, y: 12 },
    open: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] } }
  };

  const dot = statusColor[availability.status] ?? '#22c55e';
  const navLinks = [
    { href: '#about', label: 'Sobre' },
    { href: '#projects', label: 'Projetos' },
    { href: '#testimonials', label: 'Clientes' },
    { href: '#playground', label: 'Playground' },
    { href: '#contact', label: 'Contato' },
  ];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: isVideoEnded ? 1 : 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center gap-6 px-5 py-2.5 rounded-full transition-all duration-700 w-full max-w-[95vw] md:max-w-max ${
          scrolled ? 'glass-panel shadow-2xl' : 'bg-transparent'
        }`}
      >
        <img
          src="/logo.png"
          alt="Veltz"
          className="h-4 w-auto object-contain transition-opacity duration-300"
          style={{ filter: 'brightness(0) invert(1)', opacity: 0.6 }}
        />

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-sm text-zinc-400 font-medium">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-white transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Availability Badge — desktop */}
        <motion.a
          href="#contact"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
          whileHover={{ scale: 1.04 }}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/8 bg-white/[0.04] backdrop-blur-sm cursor-pointer"
        >
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{
              backgroundColor: dot,
              boxShadow: `0 0 6px 2px ${dot}60`,
              animation: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
            }}
          />
          <span className="text-[10px] font-medium tracking-wide whitespace-nowrap" style={{ color: dot }}>
            {availability.label}
            {availability.status === 'busy' && availability.until ? ` até ${availability.until}` : ''}
          </span>
        </motion.a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white flex items-center justify-center p-2 rounded-full hover:bg-white/10 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <List size={20} />}
        </button>
      </motion.nav>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center gap-2"
          >
            {/* Availability badge — mobile */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 mb-6"
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: dot, boxShadow: `0 0 6px 2px ${dot}60` }}
              />
              <span className="text-[11px] font-medium" style={{ color: dot }}>
                {availability.label}
              </span>
            </motion.div>

            {navLinks.map(link => (
              <motion.a
                key={link.href}
                variants={itemVariants}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-4xl text-white font-semibold tracking-tight py-3 hover:text-[#f35516] transition-colors duration-300"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
