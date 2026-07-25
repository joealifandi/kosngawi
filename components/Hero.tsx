'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ArrowRight, Home } from 'lucide-react';
import { heroSlides } from '@/lib/data';

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const container = useRef<HTMLElement>(null);

  useEffect(() => {
    const loadGSAP = async () => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      gsap.to('.hero-parallax', {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    };
    loadGSAP();
  }, []);

  const slide = heroSlides[current];

  return (
    <section ref={container} id="hero" className="relative min-h-screen w-full overflow-hidden flex items-center pt-24 pb-16 bg-[#04150d]">
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0 z-0 hero-parallax"
        >
          <Image src={slide.image} alt={slide.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#04150d] via-black/50 to-black/40" />
        </motion.div>
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center z-10">
        <div className="lg:col-span-8 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              <motion.span className="text-emerald-500 font-bold tracking-[0.3em] uppercase text-sm mb-2 block">
                {slide.subtitle}
              </motion.span>
              <motion.h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-white leading-[0.9] tracking-tight mb-6">
                {slide.title.split(' ')[0]}<br />{slide.title.split(' ')[1]}
              </motion.h1>
              <motion.p className="text-lg text-white/80 max-w-lg mb-10 leading-relaxed font-light">
                {slide.description}
              </motion.p>
              <motion.div className="flex flex-wrap items-center gap-6">
                <button
                  onClick={() => document.getElementById('kamar')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group relative px-8 py-4 bg-emerald-600 text-white font-semibold uppercase tracking-wider overflow-hidden flex items-center gap-3 transition-transform hover:scale-105 hover:shadow-[0_0_30px_rgba(0,118,63,0.55)]"
                >
                  <span className="relative z-10">Lihat Kamar</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => document.getElementById('cabang')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex items-center gap-3 text-white uppercase tracking-wider text-sm font-semibold hover:text-emerald-400 transition-colors group"
                >
                  <span className="w-12 h-12 flex items-center justify-center border border-white/30 rounded-full group-hover:border-emerald-400 transition-colors relative">
                    <Home className="w-4 h-4" />
                  </span>
                  Cabang Kos
                </button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="hidden lg:flex lg:col-span-4 flex-col justify-center items-end h-full">
          <div className="flex flex-col gap-6 border-l border-white/20 pl-8">
            {heroSlides.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setCurrent(i)}
                className={`relative group flex items-center justify-end text-right transition-all duration-300 ${current === i ? 'opacity-100 scale-110' : 'opacity-40 hover:opacity-80'}`}
              >
                <span className={`text-4xl font-bold tracking-tighter ${current === i ? 'text-white' : 'text-transparent'}`} style={current !== i ? { WebkitTextStroke: '1px rgba(255,255,255,0.7)' } : {}}>
                  0{item.id}
                </span>
                {current === i && (
                  <motion.div layoutId="active-line" className="absolute -left-8 w-8 h-[2px] bg-emerald-500" />
                )}
                {current === i && (
                  <span className="absolute -left-36 text-xs uppercase tracking-widest text-white/60 font-medium">
                    {item.city}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
