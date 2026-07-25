'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

export default function VideoShowcase() {
  const [open, setOpen] = useState(false);
  return (
    <section id="video" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?q=80&w=2000&auto=format&fit=crop" alt="Mount Fuji" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/55" />
      </div>
      <div className="relative z-10 text-center px-6">
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-7xl font-extrabold leading-tight tracking-tight max-w-4xl mx-auto mb-12">
          TRAVEL AND INSPIRE<br />YOUR LIFE
        </motion.h2>
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          onClick={() => setOpen(true)}
          className="w-24 h-24 rounded-full border-2 border-white/40 flex items-center justify-center mx-auto hover:border-emerald-500 hover:bg-emerald-500/20 transition-all duration-300 group"
        >
          <Play className="w-8 h-8 ml-1 text-white group-hover:scale-110 transition-transform" fill="currentColor" />
        </motion.button>
        <p className="text-white/50 uppercase tracking-[0.3em] text-sm mt-6">Play Video</p>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-6" onClick={() => setOpen(false)}>
            <button className="absolute top-6 right-6 text-white hover:text-emerald-400"><X className="w-8 h-8" /></button>
            <motion.div initial={{ scale: 0.85 }} animate={{ scale: 1 }} exit={{ scale: 0.85 }} className="w-full max-w-5xl aspect-video" onClick={(e) => e.stopPropagation()}>
              <iframe src="https://www.youtube.com/embed/reENhGMj-0o?autoplay=1" title="Travel Japan" allow="autoplay; encrypted-media" allowFullScreen className="w-full h-full" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
