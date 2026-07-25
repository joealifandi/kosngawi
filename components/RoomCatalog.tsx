'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BedDouble, Bath, Wifi, Wind, ArrowRight } from 'lucide-react';
import { cabangKos, kamarKos } from '@/lib/data';
import { Kamar } from '@/lib/types';

const formatRupiah = (value: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);

const statusStyle = {
  tersedia: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  penuh: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  menunggu_konfirmasi: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  maintenance: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
  di_booking: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
};

const statusLabel = {
  tersedia: 'Tersedia',
  penuh: 'Penuh',
  menunggu_konfirmasi: 'Menunggu Konfirmasi',
  maintenance: 'Maintenance',
  di_booking: 'Di-Booking',
};

export default function RoomCatalog() {
  const [selectedCabang, setSelectedCabang] = useState(cabangKos[0].id);
  const [selectedRoom, setSelectedRoom] = useState<Kamar | null>(null);
  const rooms = kamarKos.filter((room) => room.cabangId === selectedCabang);
  const cabang = cabangKos.find((item) => item.id === selectedCabang)!;

  const handleSewa = (room: Kamar) => {
    if (room.status !== 'tersedia') return;
    window.location.href = `/login-tenant?kamar=${room.id}`;
  };

  return (
    <section id="kamar" className="py-28 bg-[#04150d]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <p className="text-emerald-500 text-xs uppercase tracking-[0.4em] mb-4">Katalog Kamar Kos</p>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">PILIH KAMAR</h2>
          <p className="text-white/55 max-w-2xl mx-auto mt-5">Pilih cabang kos, cek status kamar, lalu ajukan sewa. Aksi sewa akan diarahkan ke login/register penghuni.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12" id="cabang">
          {cabangKos.map((kos) => (
            <button key={kos.id} onClick={() => setSelectedCabang(kos.id)} className={`relative h-64 overflow-hidden text-left border transition-all ${selectedCabang === kos.id ? 'border-emerald-500 shadow-[0_0_30px_rgba(0,118,63,0.28)]' : 'border-white/10 hover:border-white/30'}`}>
              <Image src={kos.image} alt={kos.name} fill className="object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <p className="text-emerald-400 text-xs uppercase tracking-[0.3em] mb-2">{kos.city}</p>
                <h3 className="text-2xl font-bold mb-2">{kos.name}</h3>
                <p className="text-white/65 text-sm mb-3">{kos.address}</p>
                <span className="text-xs text-white/70">{kos.availableRooms}/{kos.totalRooms} kamar tersedia</span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <h3 className="text-2xl font-bold">{cabang.name}</h3>
            <p className="text-white/50 text-sm mt-1">{cabang.description}</p>
          </div>
          <div className="hidden md:flex gap-2 text-xs text-white/40 uppercase tracking-widest">
            {cabang.facilities.slice(0, 4).map((f) => <span key={f} className="border border-white/10 px-3 py-2">{f}</span>)}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {rooms.map((room, i) => (
            <motion.article
              key={room.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="group bg-[#082016] border border-white/5 overflow-hidden hover:border-emerald-500/30 transition-colors"
            >
              <div className="relative h-44 overflow-hidden cursor-pointer" onClick={() => setSelectedRoom(room)}>
                <Image src={room.image} alt={`Kamar ${room.nomor}`} fill loading="lazy" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <span className={`absolute top-3 left-3 text-[10px] uppercase tracking-wider px-3 py-1 border ${statusStyle[room.status]}`}>{statusLabel[room.status]}</span>
                <span className="absolute bottom-3 left-3 text-xl font-bold">Kamar {room.nomor}</span>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-white/50">{room.tipe}</span>
                  <span className="text-xs text-white/40">Lantai {room.lantai}</span>
                </div>
                <p className="text-lg font-bold mb-4">{formatRupiah(room.harga)}<span className="text-xs text-white/40 font-normal">/bulan</span></p>
                <div className="grid grid-cols-2 gap-2 text-white/45 text-xs mb-5">
                  <span className="flex items-center gap-1"><BedDouble className="w-3 h-3" /> {room.ukuran}</span>
                  <span className="flex items-center gap-1"><Bath className="w-3 h-3" /> KM Dalam</span>
                  <span className="flex items-center gap-1"><Wifi className="w-3 h-3" /> WiFi</span>
                  <span className="flex items-center gap-1"><Wind className="w-3 h-3" /> AC</span>
                </div>
                <button disabled={room.status !== 'tersedia'} onClick={() => handleSewa(room)} className="w-full py-3 text-xs font-semibold uppercase tracking-widest bg-emerald-600 hover:bg-emerald-700 disabled:bg-white/10 disabled:text-white/30 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2">
                  Sewa Kamar Ini <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedRoom && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-lg flex items-center justify-center p-6" onClick={() => setSelectedRoom(null)}>
            <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }} className="bg-[#082016] max-w-2xl w-full overflow-hidden border border-white/10" onClick={(e) => e.stopPropagation()}>
              <div className="relative h-72">
                <Image src={selectedRoom.image} alt={`Kamar ${selectedRoom.nomor}`} fill className="object-cover" />
                <button onClick={() => setSelectedRoom(null)} className="absolute top-4 right-4 bg-black/50 p-2"><X /></button>
              </div>
              <div className="p-8">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-3xl font-bold">Kamar {selectedRoom.nomor}</h3>
                    <p className="text-white/50">{selectedRoom.tipe} · Lantai {selectedRoom.lantai} · {selectedRoom.ukuran}</p>
                  </div>
                  <span className={`text-xs uppercase tracking-wider px-3 py-2 border ${statusStyle[selectedRoom.status]}`}>{statusLabel[selectedRoom.status]}</span>
                </div>
                <p className="text-white/65 mb-6">{selectedRoom.description}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedRoom.fasilitas.map((f) => <span key={f} className="text-xs border border-white/10 px-3 py-2 text-white/60">{f}</span>)}
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-2xl font-bold">{formatRupiah(selectedRoom.harga)}<span className="text-xs text-white/40 font-normal">/bulan</span></span>
                  <button disabled={selectedRoom.status !== 'tersedia'} onClick={() => handleSewa(selectedRoom)} className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-white/10 disabled:text-white/30 disabled:cursor-not-allowed text-sm font-semibold uppercase tracking-widest transition-colors">Ajukan Sewa</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
