'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryImages } from '@/lib/data';
import { X, ZoomIn } from 'lucide-react';

export default function Gallery() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <section id="gallery" className="py-28 bg-[#04150d]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <p className="text-emerald-500 text-xs uppercase tracking-[0.4em] mb-4">Suasana Kos Kami</p>
          <h2 className="text-4xl md:text-6xl font-extrabold">GALLERY</h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[220px]">
          {galleryImages.map((img) => (
            <motion.div key={img.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`relative overflow-hidden group cursor-pointer ${img.span === 'tall' ? 'row-span-2' : img.span === 'wide' ? 'col-span-2' : ''}`} onClick={() => setActive(img.src)}>
              <Image src={img.src} alt={img.alt} fill loading="lazy" className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors" />
              <ZoomIn className="absolute inset-0 m-auto w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {active && (
          <motion.div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-6" onClick={() => setActive(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button className="absolute top-4 right-4 text-white"><X /></button>
            <Image src={active} alt="gallery" width={1200} height={800} className="max-h-[85vh] w-auto object-contain" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
