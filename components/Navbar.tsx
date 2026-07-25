'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Kamar', href: '#kamar' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Kontak', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/70 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between gap-6">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="flex items-center shrink-0">
            <Image src="/NGAWIKOST.png" alt="NGAWIKOST" width={260} height={72} className="h-[72px] w-auto object-contain drop-shadow-[0_0_18px_rgba(0,118,63,0.55)]" priority />
          </motion.div>

          <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="hidden md:flex items-center gap-6 lg:gap-8 flex-1 justify-center">
            {navLinks.map((link) => (
              <button key={link.label} onClick={() => scrollTo(link.href)} className="text-sm text-white/70 hover:text-white tracking-widest uppercase transition-colors duration-300 relative group">
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-emerald-500 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </motion.nav>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="flex items-center gap-4">
            <a href="/login-tenant" className="hidden md:inline-block text-sm text-white/70 hover:text-white tracking-wider uppercase transition-colors border border-white/20 px-4 py-2 hover:border-emerald-500 hover:bg-emerald-500/10">
              Login
            </a>
            <button onClick={() => setMenuOpen(true)} className="md:hidden text-white/70 hover:text-white transition-colors"><Menu className="w-6 h-6" /></button>
          </motion.div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.4 }} className="fixed inset-0 z-[100] bg-[#04150d] flex flex-col items-center justify-center">
            <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6 text-white/70 hover:text-white"><X className="w-8 h-8" /></button>
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.button key={link.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} onClick={() => scrollTo(link.href)} className="text-3xl font-bold uppercase tracking-widest text-white/80 hover:text-white transition-colors">
                  {link.label}
                </motion.button>
              ))}
              <a href="/login-tenant" className="mt-4 text-lg uppercase tracking-widest text-emerald-400 hover:text-emerald-300">Login Penghuni</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
