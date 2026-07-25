'use client';
import { motion } from 'framer-motion';
import { MapPin, ShieldCheck, Wallet, ArrowRight } from 'lucide-react';
import { features } from '@/lib/data';

const iconMap: Record<string, React.ReactNode> = {
  MapPin: <MapPin className="w-10 h-10 text-emerald-500" />,
  ShieldCheck: <ShieldCheck className="w-10 h-10 text-emerald-500" />,
  Wallet: <Wallet className="w-10 h-10 text-emerald-500" />,
};

export default function Features() {
  return (
    <section id="fasilitas" className="py-24 bg-[#04150d] relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 -mt-32">
          {features.map((feature, i) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-[#082016]/95 p-8 lg:p-10 border border-white/10 hover:border-emerald-500/40 transition-all group relative overflow-hidden min-h-[280px] flex flex-col"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="mb-6">{iconMap[feature.icon]}</div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-white/60 mb-8 leading-relaxed">{feature.description}</p>
              <button onClick={() => document.getElementById('kamar')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center text-sm font-semibold tracking-wider uppercase text-white/80 group-hover:text-emerald-400 transition-colors">
                Lihat Kamar <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
