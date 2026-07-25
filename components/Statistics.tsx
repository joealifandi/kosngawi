'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { stats } from '@/lib/data';

function Counter({ end }: { end: number }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const duration = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setValue(Math.floor(end * p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end]);
  return <>{value}</>;
}

export default function Statistics() {
  return (
    <section className="py-24 bg-[#0a131e] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        {stats.map((item, i) => (
          <motion.div key={item.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
            <div className="text-4xl md:text-6xl font-extrabold text-white mb-2"><Counter end={item.value} />{item.suffix}</div>
            <p className="text-white/50 uppercase tracking-widest text-sm">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
