'use client';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { testimonials } from '@/lib/data';

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    intervalRef.current = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 4500);
  };

  useEffect(() => {
    start();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const go = (dir: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);
    start();
  };

  const t = testimonials[index];

  return (
    <section id="testimonials" className="py-28 bg-[#0a131e]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-emerald-500 text-xs uppercase tracking-[0.4em] mb-4">Kata Penghuni</p>
          <h2 className="text-4xl md:text-6xl font-extrabold">TESTIMONI</h2>
        </motion.div>
        <div className="relative max-w-3xl mx-auto text-center">
          <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex flex-col items-center">
            <div className="relative w-20 h-20 rounded-full overflow-hidden mb-6 ring-4 ring-emerald-500/30">
              <Image src={t.avatar} alt={t.name} fill className="object-cover" loading="lazy" />
            </div>
            <div className="flex gap-1 mb-6">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-xl text-white/80 italic leading-relaxed mb-8">&ldquo;{t.review}&rdquo;</p>
            <h4 className="text-lg font-bold">{t.name}</h4>
            <p className="text-white/50 text-sm">{t.kamar} &mdash; {t.cabang}</p>
          </motion.div>
          <div className="flex items-center justify-center gap-6 mt-12">
            <button onClick={() => go(-1)} className="w-12 h-12 border border-white/20 flex items-center justify-center hover:border-emerald-500 hover:bg-emerald-500/10 transition-colors"><ChevronLeft className="w-5 h-5" /></button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => { if (intervalRef.current) clearInterval(intervalRef.current); setIndex(i); start(); }} className={`w-2 h-2 rounded-full transition-all ${i === index ? 'bg-emerald-500 w-6' : 'bg-white/30'}`} />
              ))}
            </div>
            <button onClick={() => go(1)} className="w-12 h-12 border border-white/20 flex items-center justify-center hover:border-emerald-500 hover:bg-emerald-500/10 transition-colors"><ChevronRight className="w-5 h-5" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
