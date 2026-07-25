'use client';

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, ShieldCheck, FileText, Wrench, Clock } from 'lucide-react';
import { penghuni, kontrak, kamarKos, cabangKos, tagihan, laporanKerusakan } from '@/lib/data';

const formatRupiah = (value: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);

export default function TenantProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const tenantId = parseInt(resolvedParams.id, 10);
  const tnt = penghuni.find(p => p.id === tenantId);

  if (!tnt) {
    return (
      <div className="min-h-screen bg-[#04150d] text-white flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Penghuni tidak ditemukan</h1>
        <Link href="/owner-dashboard" className="text-emerald-400 hover:underline">Kembali ke Dasbor</Link>
      </div>
    );
  }

  const userContracts = kontrak.filter(k => k.penghuniId === tenantId);
  const userBills = tagihan.filter(t => t.penghuniId === tenantId);
  const userTickets = laporanKerusakan.filter(l => l.penghuniId === tenantId);

  return (
    <main className="min-h-screen bg-[#04150d] text-white px-4 md:px-6 py-6 md:py-10">
      <div className="max-w-4xl mx-auto">
        <Link href="/owner-dashboard" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Dasbor
        </Link>
        
        {/* Header Profile */}
        <div className="p-8 border border-white/10 bg-[#082016] flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left mb-8">
          <img src={tnt.avatar} alt={tnt.nama} className="w-32 h-32 rounded-full object-cover border-4 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.3)]" />
          <div className="flex-1">
            <div className="flex items-start justify-between flex-col md:flex-row gap-4 mb-4">
              <div>
                <h2 className="text-4xl font-extrabold mb-2">{tnt.nama}</h2>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-white/60">
                  <span className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-emerald-400" /> {tnt.email}</span>
                  <span className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-emerald-400" /> {tnt.phone}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="bg-emerald-500/10 text-emerald-400 px-4 py-2 border border-emerald-500/20 text-xs font-bold uppercase tracking-widest text-center">
                  Penghuni Terdaftar
                </span>
                <button onClick={() => alert('Kata sandi penyewa berhasil direset. Sandi sementara telah dikirim via Email/WhatsApp.')} className="bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 px-4 py-2 border border-yellow-500/20 text-xs font-bold uppercase tracking-widest text-center transition-colors">
                  Reset Sandi Akses
                </button>
                <button onClick={() => alert('Kontrak diputus paksa. Kamar dikosongkan dan penghuni masuk daftar hitam.')} className="bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 py-2 border border-red-500/20 text-xs font-bold uppercase tracking-widest text-center transition-colors">
                  Putus Kontrak / Blacklist
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Identitas KTP */}
          <section className="bg-black/40 border border-white/10 p-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-500 mb-6 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Data Identitas (KTP)
            </h3>
            <p className="text-sm text-white/80 font-mono bg-black/60 p-4 border border-white/10 mb-4 text-center tracking-widest">
              {tnt.ktpNumber}
            </p>
            <div className="aspect-[1.6] bg-black/80 border border-white/10 relative overflow-hidden group mt-2 mb-6">
              {tnt.ktpUrl ? (
                <img src={tnt.ktpUrl} alt="Foto KTP" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity cursor-pointer" />
              ) : (
                <div className="flex h-full items-center justify-center text-white/30 text-xs">Belum ada foto KTP</div>
              )}
            </div>

            <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-500 mb-4 flex items-center gap-2 border-t border-white/10 pt-6">
              <Phone className="w-4 h-4" /> Kontak Darurat (Wali)
            </h3>
            <div className="bg-black/60 p-4 border border-white/10 text-sm">
              <div className="flex justify-between mb-2 pb-2 border-b border-white/5"><span className="text-white/50">Nama Wali</span><span className="font-bold">{tnt.emergencyName || '-'}</span></div>
              <div className="flex justify-between mb-2 pb-2 border-b border-white/5"><span className="text-white/50">Hubungan</span><span>{tnt.emergencyRelation || '-'}</span></div>
              <div className="flex justify-between"><span className="text-white/50">No. HP</span><span className="text-emerald-400 font-mono">{tnt.emergencyPhone || '-'}</span></div>
            </div>
          </section>

          {/* Riwayat Kontrak */}
          <section className="bg-black/40 border border-white/10 p-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-500 mb-6 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Riwayat Kontrak
            </h3>
            {userContracts.length === 0 ? (
              <p className="text-white/40 text-sm">Belum ada kontrak tercatat.</p>
            ) : (
              <div className="space-y-4">
                {userContracts.map(ktr => {
                  const room = kamarKos.find(k => k.id === ktr.kamarId);
                  return (
                    <div key={ktr.id} className={`p-4 border text-sm ${ktr.status === 'aktif' ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-black/60 border-white/5'}`}>
                      <div className="flex justify-between mb-3 border-b border-white/10 pb-2">
                        <span className="font-bold text-white/80">Kamar {room?.nomor}</span>
                        <span className={`font-bold uppercase text-[10px] tracking-widest px-2 py-1 ${ktr.status === 'aktif' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-white/40'}`}>
                          {ktr.status}
                        </span>
                      </div>
                      <div className="flex justify-between mb-1"><span className="text-white/50">Mulai</span><span>{ktr.tanggalMulai}</span></div>
                      <div className="flex justify-between mb-1"><span className="text-white/50">Selesai</span><span>{ktr.tanggalSelesai}</span></div>
                      <div className="flex justify-between mt-3 pt-3 border-t border-white/5"><span className="text-white/50">Harga / Bln</span><span className="font-bold">{formatRupiah(ktr.hargaKesepakatan)}</span></div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>

        {/* Tabel Tagihan & Kerusakan */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="bg-black/40 border border-white/10 p-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-500 mb-6 flex items-center gap-2">
              <Clock className="w-4 h-4" /> Riwayat Tagihan
            </h3>
            <div className="space-y-3">
              {userBills.map(t => (
                <div key={t.id} className="flex justify-between items-center bg-black/60 p-3 border border-white/5">
                  <div>
                    <p className="text-sm text-white/80">{t.periode}</p>
                    <p className="text-xs text-white/40">Jatuh Tempo: {t.jatuhTempo}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{formatRupiah(t.jumlah)}</p>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${t.status === 'lunas' ? 'text-emerald-400' : t.status === 'menunggu_konfirmasi' ? 'text-blue-400' : 'text-yellow-400'}`}>
                      {t.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-black/40 border border-white/10 p-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-500 mb-6 flex items-center gap-2">
              <Wrench className="w-4 h-4" /> Laporan Kerusakan
            </h3>
            <div className="space-y-3">
              {userTickets.length === 0 ? <p className="text-white/40 text-sm">Tidak ada tiket kerusakan.</p> : userTickets.map(l => (
                <div key={l.id} className="bg-black/60 p-3 border border-white/5">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-bold">{l.kategori}</span>
                    <span className="text-[10px] text-white/50">{l.tanggalLapor}</span>
                  </div>
                  <p className="text-xs text-white/60">{l.deskripsi}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

      </div>
    </main>
  );
}
