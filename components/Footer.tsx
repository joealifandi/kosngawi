'use client';
import Image from 'next/image';
import { Instagram, Facebook, Youtube, Twitter } from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Kamar', href: '#kamar' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Kontak', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="bg-[#020d08] border-t border-white/5 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Image src="/NGAWIKOST.png" alt="NGAWIKOST" width={300} height={82} className="h-20 w-auto object-contain drop-shadow-[0_0_18px_rgba(0,118,63,0.5)]" />
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-8">
              Kos premium, nyaman, aman, dengan sistem manajemen modern. Dua cabang siap melayani Anda.
            </p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] mb-6 text-white/50">Menu</h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <button onClick={() => document.querySelector(l.href)?.scrollIntoView({ behavior: 'smooth' })} className="text-sm text-white/60 hover:text-white transition-colors">{l.label}</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] mb-6 text-white/50">Sosial Media</h4>
            <div className="flex flex-col gap-4">
              {[
                { Icon: Instagram, label: 'Instagram', url: '#' },
                { Icon: Facebook, label: 'Facebook', url: '#' },
                { Icon: Youtube, label: 'Youtube', url: '#' },
                { Icon: Twitter, label: 'Twitter', url: '#' },
              ].map(({ Icon, label, url }) => (
                <a key={label} href={url} className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors group">
                  <Icon className="w-4 h-4 group-hover:text-emerald-400 transition-colors" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-white/30 text-xs">
          <p>&copy; {new Date().getFullYear()} NGAWIKOST. Semua hak dilindungi.</p>
          <p>Sistem Manajemen Kos Premium</p>
        </div>
      </div>
    </footer>
  );
}
