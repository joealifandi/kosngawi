'use client';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {

  return (
    <section id="contact" className="py-28 bg-[#04150d]">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <p className="text-emerald-500 uppercase tracking-wider text-xs mb-2">Pengajuan Sewa / Kontak</p>
          <h2 className="text-4xl md:text-5xl font-extrabold">HUBUNGI KAMI</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8 text-white max-w-4xl mx-auto">
          <div className="bg-[#082016] p-8 border border-white/5 flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-full"><MapPin className="w-6 h-6" /></div>
              <div>
                <h4 className="font-bold text-lg mb-1">Lokasi Kos</h4>
                <p className="text-white/60 text-sm leading-relaxed">Jl. Parangtritis Km 5, Sewon<br/>Kab. Bantul, DIY 55188</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-full"><Phone className="w-6 h-6" /></div>
              <div>
                <h4 className="font-bold text-lg mb-1">WhatsApp / Telepon</h4>
                <p className="text-white/60 text-sm">0812-3456-7890</p>
              </div>
            </div>
          </div>
          <div className="bg-[#082016] p-8 border border-white/5 flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-full"><Mail className="w-6 h-6" /></div>
              <div>
                <h4 className="font-bold text-lg mb-1">Email</h4>
                <p className="text-white/60 text-sm">info@ngawikost.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-full"><Clock className="w-6 h-6" /></div>
              <div>
                <h4 className="font-bold text-lg mb-1">Jam Operasional</h4>
                <p className="text-white/60 text-sm leading-relaxed">Senin - Minggu<br/>08:00 - 20:00 WIB</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
