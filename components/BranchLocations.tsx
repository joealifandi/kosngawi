'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { cabangKos } from '@/lib/data';

export default function BranchLocations() {
  return (
    <section className="py-28 bg-[#04150d]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <p className="text-emerald-500 text-xs uppercase tracking-[0.4em] mb-4">2 Lokasi Strategis</p>
          <h2 className="text-4xl md:text-6xl font-extrabold">CABANG KOS</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cabangKos.map((kos, i) => (
            <motion.div key={kos.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }} className="group relative h-[480px] overflow-hidden cursor-pointer">
              <Image src={kos.image} alt={kos.name} fill loading="lazy" className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04150d] via-black/50 to-transparent" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs mb-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">{kos.city}</span>
                <h3 className="text-3xl font-bold mb-2">{kos.name}</h3>
                <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  {kos.address}
                </div>
                <div className="h-0 group-hover:h-32 overflow-hidden transition-all duration-300 opacity-0 group-hover:opacity-100">
                  <p className="text-white/70 text-sm mb-3">{kos.description}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {kos.facilities.map((f) => <span key={f} className="text-xs border border-white/15 px-2 py-1 text-white/50">{f}</span>)}
                  </div>
                  <button onClick={() => document.getElementById('kamar')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center text-xs uppercase tracking-widest font-semibold hover:text-emerald-400 transition-colors">
                    Lihat Kamar <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
