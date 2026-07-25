'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, CheckCircle2, Clock, DoorOpen, Home, Wallet, X, Eye, Wrench, LogOut, Plus, Settings, User, Building, Phone, Mail, ShieldCheck, Camera, Bell, FileText, UserPlus, Edit2, Calculator, FilePlus, Users } from 'lucide-react';
import { cabangKos, kamarKos, pengajuanSewa, tagihan, laporanKerusakan, pengajuanCheckout, kontrak, penghuni } from '@/lib/data';

const formatRupiah = (value: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);

const statusColor = {
  tersedia: 'bg-emerald-500/20 text-emerald-300',
  penuh: 'bg-blue-500/20 text-blue-300',
  menunggu_konfirmasi: 'bg-yellow-500/20 text-yellow-300',
  maintenance: 'bg-slate-500/20 text-slate-300',
  di_booking: 'bg-orange-500/20 text-orange-300',
};

export default function OwnerDashboardPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'settings'>('dashboard');
  
  // Dashboard states
  const [selectedPengajuan, setSelectedPengajuan] = useState<any>(null);
  const [viewProofUrl, setViewProofUrl] = useState<string | null>(null);
  const [viewMaintenance, setViewMaintenance] = useState<any>(null);
  
  // New UI Features states
  const [showAddRoomModal, setShowAddRoomModal] = useState<number | null>(null); // holds cabangId
  const [showAddBranchModal, setShowAddBranchModal] = useState(false);
  const [showBuatKontrakModal, setShowBuatKontrakModal] = useState<any>(null);
  const [showCheckoutDeductionModal, setShowCheckoutDeductionModal] = useState<any>(null);
  const [showEditRoomModal, setShowEditRoomModal] = useState<any>(null);
  const [showBuatTagihanModal, setShowBuatTagihanModal] = useState<boolean>(false);

  const income = tagihan.filter((t) => t.status === 'lunas').reduce((sum, t) => sum + t.jumlah, 0);
  const tersedia = kamarKos.filter((k) => k.status === 'tersedia').length;
  const penuh = kamarKos.filter((k) => k.status === 'penuh').length;

  const handleSimulasiSubmit = (e: React.FormEvent, msg: string, setter: (val: any) => void) => {
    e.preventDefault();
    alert(msg);
    setter(null);
  };

  return (
    <main className="min-h-screen bg-[#04150d] text-white px-4 md:px-6 py-6 md:py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-emerald-500 uppercase tracking-[0.3em] text-xs mb-2">Owner Dashboard</p>
            <h1 className="text-3xl md:text-5xl font-extrabold">Manajemen Kos</h1>
          </div>
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <button onClick={() => setActiveTab('dashboard')} className={`px-5 py-3 text-sm font-bold uppercase tracking-widest transition-colors flex-shrink-0 ${activeTab === 'dashboard' ? 'bg-emerald-600 text-white' : 'border border-white/10 text-white/50 hover:bg-white/5'}`}>
              Dasbor Utama
            </button>
            <button onClick={() => setActiveTab('settings')} className={`px-5 py-3 text-sm font-bold uppercase tracking-widest transition-colors flex-shrink-0 flex items-center gap-2 ${activeTab === 'settings' ? 'bg-emerald-600 text-white' : 'border border-white/10 text-white/50 hover:bg-white/5'}`}>
              <Settings className="w-4 h-4" /> Pengaturan
            </button>
            <a href="/" className="border border-white/10 px-5 py-3 text-sm uppercase tracking-widest hover:border-emerald-500 transition-colors flex-shrink-0 flex items-center">
              <LogOut className="w-4 h-4 mr-2" /> Keluar
            </a>
          </div>
        </div>

        {activeTab === 'dashboard' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-10">
              <div className="bg-[#082016] border border-white/10 p-4 md:p-6"><Home className="text-emerald-500 mb-3 md:mb-4 w-6 h-6 md:w-8 md:h-8" /><p className="text-2xl md:text-3xl font-bold">2</p><p className="text-white/50 text-xs md:text-sm">Cabang Kos</p></div>
              <div className="bg-[#082016] border border-white/10 p-4 md:p-6"><DoorOpen className="text-emerald-400 mb-3 md:mb-4 w-6 h-6 md:w-8 md:h-8" /><p className="text-2xl md:text-3xl font-bold">{tersedia}</p><p className="text-white/50 text-xs md:text-sm">Kamar Tersedia</p></div>
              <div className="bg-[#082016] border border-white/10 p-4 md:p-6"><CheckCircle2 className="text-blue-400 mb-3 md:mb-4 w-6 h-6 md:w-8 md:h-8" /><p className="text-2xl md:text-3xl font-bold">{penuh}</p><p className="text-white/50 text-xs md:text-sm">Kamar Terisi</p></div>
              <div className="bg-[#082016] border border-white/10 p-4 md:p-6"><Wallet className="text-yellow-400 mb-3 md:mb-4 w-6 h-6 md:w-8 md:h-8" /><p className="text-xl md:text-2xl font-bold">{formatRupiah(income)}</p><p className="text-white/50 text-xs md:text-sm">Pemasukan</p></div>
            </div>

            {/* Cabang & Kamar Management */}
            <section className="mb-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3"><Building className="text-emerald-400" /><h2 className="text-xl md:text-2xl font-bold">Cabang & Kamar</h2></div>
                <button onClick={() => setShowAddBranchModal(true)} className="bg-emerald-600 hover:bg-emerald-500 text-xs md:text-sm font-bold uppercase tracking-widest px-4 py-2 flex items-center gap-2 transition-colors">
                  <Plus className="w-4 h-4" /> Cabang Baru
                </button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {cabangKos.map((kos) => (
                  <div key={kos.id} className="bg-[#082016] border border-white/10 p-4 md:p-6 relative">
                    <div className="absolute top-4 right-4"><span className="text-xs text-white/40 uppercase tracking-widest">{kos.city}</span></div>
                    <h2 className="text-xl md:text-2xl font-bold mb-2 pr-12">{kos.name}</h2>
                    <p className="text-white/45 text-sm mb-6 line-clamp-2">{kos.address}</p>
                    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 md:gap-3 mb-6">
                      {kamarKos.filter((k) => k.cabangId === kos.id).map((room) => (
                        <button onClick={() => setShowEditRoomModal(room)} key={room.id} className={`group relative aspect-square flex flex-col items-center justify-center text-xs font-bold ${statusColor[room.status]} border ${statusColor[room.status].replace('bg-', 'border-').replace('/20', '/30')} hover:brightness-125 transition-all`}>
                          <span>{room.nomor}</span>
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"><Edit2 className="w-4 h-4 text-white" /></div>
                        </button>
                      ))}
                    </div>
                    <button onClick={() => setShowAddRoomModal(kos.id)} className="w-full bg-white/5 hover:bg-white/10 border border-white/10 py-3 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors">
                      <Plus className="w-4 h-4" /> Tambah Kamar
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Pengajuan Sewa (Calon Penyewa Baru) */}
            <section className="mb-10 bg-emerald-950/20 border border-emerald-500/20 p-4 md:p-6">
              <div className="flex items-center gap-3 mb-6"><UserPlus className="text-emerald-400" /><h2 className="text-xl font-bold">Calon Penyewa Baru</h2></div>
              {pengajuanSewa.length === 0 ? (
                <p className="text-white/40 text-sm">Belum ada pengajuan sewa baru.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pengajuanSewa.map(p => {
                    const room = kamarKos.find(k => k.id === p.kamarId);
                    const kos = cabangKos.find(c => c.id === p.cabangId);
                    return (
                      <div key={p.id} className="bg-black/30 p-4 border border-white/5 text-sm">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-bold text-lg">{p.nama}</h3>
                            <p className="text-xs text-white/50">{p.phone} · {p.email}</p>
                          </div>
                          <span className="text-yellow-300 text-[10px] font-bold uppercase tracking-widest bg-yellow-500/20 px-2 py-1 rounded">{p.status}</span>
                        </div>
                        <div className="my-3 py-3 border-y border-white/5">
                          <p className="text-white/80 font-bold">Mengajukan Sewa:</p>
                          <p className="text-white/60">Kamar {room?.nomor} - {kos?.name}</p>
                          <p className="text-white/60 mt-1 italic">"{p.pesan}"</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => setShowBuatKontrakModal(p)} className="flex-1 bg-emerald-600 hover:bg-emerald-500 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors">Setujui & Buat Kontrak</button>
                          <button onClick={() => alert('Pengajuan ditolak.')} className="bg-red-900/40 text-red-400 border border-red-500/20 hover:bg-red-900/60 px-4 py-2.5 text-xs font-bold uppercase transition-colors">Tolak</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Direktori Penghuni Kos */}
            <section className="mb-10 bg-[#082016] border border-white/10 p-4 md:p-6">
              <div className="flex items-center gap-3 mb-6"><Users className="text-emerald-400" /><h2 className="text-xl font-bold">Direktori Penghuni Aktif</h2></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {penghuni.map(p => {
                  const ktr = kontrak.find(k => k.penghuniId === p.id && k.status === 'aktif');
                  if (!ktr) return null;
                  const room = kamarKos.find(k => k.id === ktr.kamarId);
                  const kos = cabangKos.find(c => c.id === ktr.cabangId);
                  return (
                    <div key={p.id} className="bg-black/30 border border-white/5 p-4 flex flex-col items-center text-center group hover:border-emerald-500/50 transition-colors">
                      <img src={p.avatar} alt={p.nama} className="w-16 h-16 rounded-full object-cover border border-emerald-500/30 mb-3" />
                      <h3 className="font-bold text-sm mb-1 line-clamp-1">{p.nama}</h3>
                      <p className="text-xs text-white/50 mb-4 line-clamp-1">Kamar {room?.nomor} - {kos?.city}</p>
                      <Link href={`/owner-dashboard/penghuni/${p.id}`} className="w-full bg-white/5 hover:bg-emerald-600 border border-white/10 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors">
                        Lihat Detail
                      </Link>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Laporan Kerusakan & Check-out Pending */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-10">
              <section className="bg-red-950/20 border border-red-500/20 p-4 md:p-6">
                <div className="flex items-center gap-3 mb-6"><LogOut className="text-red-400" /><h2 className="text-xl font-bold">Pengajuan Check-out</h2></div>
                {pengajuanCheckout.length === 0 ? (
                  <p className="text-white/40 text-sm">Tidak ada pengajuan check-out.</p>
                ) : (
                  <div className="space-y-4">
                    {pengajuanCheckout.map(c => {
                      const ktr = kontrak.find(k => k.id === c.kontrakId);
                      const tnt = penghuni.find(p => p.id === ktr?.penghuniId);
                      const room = kamarKos.find(k => k.id === ktr?.kamarId);
                      return (
                        <div key={c.id} className="bg-black/30 p-4 border border-white/5 text-sm">
                          <div className="flex justify-between items-start mb-2">
                            <Link href={`/owner-dashboard/penghuni/${tnt?.id}`} className="font-bold hover:text-emerald-400 underline decoration-white/20 underline-offset-4">{tnt?.nama} (Kamar {room?.nomor})</Link>
                            <span className="text-yellow-300 text-[10px] font-bold uppercase tracking-widest bg-yellow-500/20 px-2 py-1 rounded">{c.status.replace('_', ' ')}</span>
                          </div>
                          <p className="text-white/60 mb-1">Tgl Keluar: {c.tanggalRencanaKeluar}</p>
                          <p className="text-white/60 mb-3">Alasan: {c.alasan}</p>
                          <button onClick={() => setShowCheckoutDeductionModal(c)} className="w-full bg-emerald-600 hover:bg-emerald-500 py-3 text-xs font-bold uppercase tracking-widest transition-colors">Setujui & Kembalikan Deposit</button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>

              <section className="bg-blue-950/20 border border-blue-500/20 p-4 md:p-6">
                <div className="flex items-center gap-3 mb-6"><Wrench className="text-blue-400" /><h2 className="text-xl font-bold">Tiket Kerusakan</h2></div>
                {laporanKerusakan.length === 0 ? (
                  <p className="text-white/40 text-sm">Semua aman, tidak ada kerusakan.</p>
                ) : (
                  <div className="space-y-4">
                    {laporanKerusakan.map(l => {
                      const tnt = penghuni.find(p => p.id === l.penghuniId);
                      const room = kamarKos.find(k => k.id === l.kamarId);
                      return (
                        <div key={l.id} className="bg-black/30 p-4 border border-white/5 text-sm">
                          <div className="flex justify-between items-start mb-2">
                            <Link href={`/owner-dashboard/penghuni/${tnt?.id}`} className="font-bold hover:text-emerald-400 underline decoration-white/20 underline-offset-4">{tnt?.nama} (Kamar {room?.nomor})</Link>
                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${l.status === 'proses' ? 'bg-blue-500/20 text-blue-300' : 'bg-yellow-500/20 text-yellow-300'}`}>{l.status}</span>
                          </div>
                          <p className="text-white/60 mb-3">{l.kategori}: {l.deskripsi}</p>
                          <div className="flex gap-2">
                            <button onClick={() => setViewMaintenance(l)} className="flex-1 bg-white/10 hover:bg-white/20 py-2.5 text-xs font-bold uppercase transition-colors">Foto Bukti</button>
                            <button className="flex-1 bg-blue-600 hover:bg-blue-500 py-2.5 text-xs font-bold uppercase transition-colors">Tandai Selesai</button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            </div>

            <section className="bg-[#082016] border border-white/10 p-4 md:p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3"><Clock className="text-emerald-400" /><h2 className="text-xl md:text-2xl font-bold">Pembukuan & Tagihan</h2></div>
                <button onClick={() => setShowBuatTagihanModal(true)} className="bg-emerald-600 hover:bg-emerald-500 text-xs font-bold uppercase tracking-widest px-4 py-2 flex items-center gap-2 transition-colors">
                  <FilePlus className="w-4 h-4" /> Tagihan Manual
                </button>
              </div>
              <div className="overflow-x-auto pb-4">
                <table className="w-full text-sm min-w-[700px]">
                  <thead className="text-white/40 uppercase tracking-widest text-[10px] border-b border-white/10 bg-black/20">
                    <tr>
                      <th className="text-left py-4 px-4 font-semibold">Periode Sewa</th>
                      <th className="text-left py-4 px-4 font-semibold">Penyewa / Kamar</th>
                      <th className="text-left py-4 px-4 font-semibold">Jumlah</th>
                      <th className="text-left py-4 px-4 font-semibold">Jatuh Tempo</th>
                      <th className="text-left py-4 px-4 font-semibold">Status</th>
                      <th className="text-center py-4 px-4 font-semibold">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tagihan.map((t) => {
                      const room = kamarKos.find((k) => k.id === t.kamarId);
                      const tnt = penghuni.find(p => p.id === t.penghuniId);
                      return (
                        <tr key={t.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-4 px-4 text-white/90">{t.periode}</td>
                          <td className="px-4 py-2">
                            <Link href={`/owner-dashboard/penghuni/${tnt?.id}`} className="font-bold hover:text-emerald-400 block text-left">
                              {tnt?.nama}
                            </Link>
                            <span className="text-xs text-white/50">Kamar {room?.nomor}</span>
                          </td>
                          <td className="px-4 font-medium text-emerald-100">{formatRupiah(t.jumlah)}</td>
                          <td className="px-4 text-white/60">{t.jatuhTempo}</td>
                          <td className="px-4">
                            <span className={`inline-block px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                              t.status === 'lunas' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                              t.status === 'menunggu_konfirmasi' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                              'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                            }`}>
                              {t.status.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="px-4 text-center">
                            {t.status === 'lunas' || t.status === 'menunggu_konfirmasi' ? (
                              <button 
                                onClick={() => setViewProofUrl(t.buktiTransfer || 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?q=80&w=400&auto=format&fit=crop')} 
                                className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 bg-emerald-400/10 px-3 py-2 rounded text-xs font-bold transition-colors"
                              >
                                <Eye className="w-3 h-3" /> Cek Bukti
                              </button>
                            ) : (
                              <span className="text-white/20 text-xs font-medium">Menunggu</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}

        {/* Tab Settings (Fitur 4) */}
        {activeTab === 'settings' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3"><User className="text-emerald-400" /> Profil Pemilik & Keamanan</h2>
            
            <div className="bg-[#082016] border border-white/10 p-6 mb-6">
              <h3 className="text-lg font-bold mb-4">Informasi Dasar</h3>
              <form onSubmit={e => handleSimulasiSubmit(e, 'Profil berhasil diperbarui.', () => {})} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><label className="block text-xs text-white/50 uppercase tracking-widest mb-1">Nama Lengkap</label><input type="text" defaultValue="Admin NGAWIKOST" className="w-full bg-black/40 border border-white/10 p-3 text-sm focus:border-emerald-500 outline-none" /></div>
                  <div><label className="block text-xs text-white/50 uppercase tracking-widest mb-1">Email</label><input type="email" defaultValue="admin@ngawikost.com" className="w-full bg-black/40 border border-white/10 p-3 text-sm focus:border-emerald-500 outline-none" /></div>
                </div>
                <div><label className="block text-xs text-white/50 uppercase tracking-widest mb-1">No. HP / WhatsApp (Untuk Notifikasi)</label><input type="text" defaultValue="081234567890" className="w-full bg-black/40 border border-white/10 p-3 text-sm focus:border-emerald-500 outline-none" /></div>
                <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 px-6 py-3 text-xs font-bold uppercase tracking-widest mt-2">Simpan Profil</button>
              </form>
            </div>

            <div className="bg-[#082016] border border-white/10 p-6 mb-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Bell className="w-5 h-5 text-emerald-400" /> Preferensi Notifikasi</h3>
              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-1">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-10 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                  </div>
                  <div>
                    <p className="font-bold group-hover:text-emerald-400 transition-colors">Notifikasi WhatsApp Otomatis</p>
                    <p className="text-xs text-white/50 mt-1">Kirim pesan WhatsApp ke penyewa saat tagihan mendekati jatuh tempo (H-3) atau saat tagihan menunggak.</p>
                  </div>
                </label>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-1">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-10 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                  </div>
                  <div>
                    <p className="font-bold group-hover:text-emerald-400 transition-colors">Alert Laporan Kerusakan</p>
                    <p className="text-xs text-white/50 mt-1">Beritahu saya via Email ketika ada penghuni yang membuat tiket kerusakan baru.</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODALS SECTION */}

      {/* Fitur 1: Modal Tambah Kamar */}
      {showAddRoomModal !== null && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#082016] border border-white/10 max-w-lg w-full p-6 relative shadow-2xl">
            <button onClick={() => setShowAddRoomModal(null)} className="absolute top-4 right-4 text-white/50 hover:text-white"><X /></button>
            <h2 className="text-xl font-bold mb-6">Tambah Kamar Baru</h2>
            <form onSubmit={e => handleSimulasiSubmit(e, 'Kamar baru berhasil ditambahkan.', setShowAddRoomModal)} className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-white/60 mb-1">Nomor Kamar</label><input required placeholder="Cth: 105" className="w-full bg-black/50 border border-white/10 p-3 outline-none focus:border-emerald-500" /></div>
                <div><label className="block text-white/60 mb-1">Lantai</label><input required type="number" min="1" placeholder="Cth: 1" className="w-full bg-black/50 border border-white/10 p-3 outline-none focus:border-emerald-500" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 mb-1">Tipe Kamar</label>
                  <select className="w-full bg-black/50 border border-white/10 p-3 outline-none focus:border-emerald-500 text-white">
                    <option value="Standard">Standard</option>
                    <option value="Deluxe">Deluxe</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div>
                <div><label className="block text-white/60 mb-1">Harga (Rp) / Bulan</label><input required type="number" placeholder="Cth: 1500000" className="w-full bg-black/50 border border-white/10 p-3 outline-none focus:border-emerald-500" /></div>
              </div>
              <div>
                <label className="block text-white/60 mb-2">Fasilitas Termasuk</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {['AC', 'WiFi', 'Kamar Mandi Dalam', 'Kamar Mandi Luar', 'Kasur Springbed', 'Lemari', 'Jendela Luar'].map(f => (
                    <label key={f} className="flex items-center gap-2 cursor-pointer text-white/80"><input type="checkbox" className="accent-emerald-500" /> {f}</label>
                  ))}
                </div>
              </div>
              <div className="pt-2">
                <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 py-3 font-bold uppercase tracking-widest transition-colors">Simpan Kamar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Fitur 1: Modal Tambah Cabang */}
      {showAddBranchModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#082016] border border-white/10 max-w-lg w-full p-6 relative shadow-2xl">
            <button onClick={() => setShowAddBranchModal(false)} className="absolute top-4 right-4 text-white/50 hover:text-white"><X /></button>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Building className="text-emerald-400" /> Tambah Cabang Kos</h2>
            <form onSubmit={e => handleSimulasiSubmit(e, 'Cabang baru berhasil dibuat.', setShowAddBranchModal)} className="space-y-4 text-sm">
              <div><label className="block text-white/60 mb-1">Nama Cabang</label><input required placeholder="Cth: Kos Harmoni Depok 2" className="w-full bg-black/50 border border-white/10 p-3 outline-none focus:border-emerald-500" /></div>
              <div><label className="block text-white/60 mb-1">Kota</label><input required placeholder="Cth: Depok" className="w-full bg-black/50 border border-white/10 p-3 outline-none focus:border-emerald-500" /></div>
              <div><label className="block text-white/60 mb-1">Alamat Lengkap</label><textarea required rows={3} placeholder="Alamat detail..." className="w-full bg-black/50 border border-white/10 p-3 outline-none focus:border-emerald-500 resize-none"></textarea></div>
              <div>
                <label className="block text-white/60 mb-2">Unggah Foto Utama Cabang</label>
                <div className="border border-dashed border-white/20 p-6 text-center cursor-pointer hover:border-emerald-500/50 hover:bg-white/5 transition-colors">
                  <Camera className="w-6 h-6 mx-auto text-white/40 mb-2" />
                  <p className="text-xs text-white/50">Klik untuk upload foto</p>
                </div>
              </div>
              <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 py-3 font-bold uppercase tracking-widest transition-colors mt-2">Buat Cabang</button>
            </form>
          </div>
        </div>
      )}


      {/* Fitur 3: Modal Buat Kontrak */}
      {showBuatKontrakModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#082016] border border-white/10 p-6 max-w-md w-full relative shadow-2xl">
            <button onClick={() => setShowBuatKontrakModal(null)} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"><X /></button>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><FileText className="w-5 h-5 text-emerald-400" /> Buat Kontrak Sewa</h2>
            <div className="mb-6 p-4 bg-black/30 border border-white/5">
              <p className="text-xs text-white/50 mb-1">Calon Penghuni</p>
              <p className="font-bold mb-3">{showBuatKontrakModal.nama}</p>
              <p className="text-xs text-white/50 mb-1">Kamar Disewa</p>
              <p className="font-bold">Kamar {kamarKos.find(k => k.id === showBuatKontrakModal.kamarId)?.nomor} ({formatRupiah(kamarKos.find(k => k.id === showBuatKontrakModal.kamarId)?.harga || 0)}/bln)</p>
            </div>
            <form onSubmit={e => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const tipe = form.tipe_persetujuan.value;
                if (tipe === 'booking') {
                   handleSimulasiSubmit(e, 'Kamar kini berstatus Booking. Tagihan DP berhasil dibuat.', setShowBuatKontrakModal);
                } else {
                   handleSimulasiSubmit(e, 'Kontrak berhasil dibuat! Calon penghuni kini resmi menjadi penyewa aktif dan tagihan pertama telah terbit.', setShowBuatKontrakModal);
                }
            }} className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-1">Tanggal Mulai Masuk</label>
                <input required type="date" className="w-full bg-black/50 border border-white/10 p-3 text-white outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1">Uang Jaminan / DP Booking</label>
                <input required type="number" defaultValue="1000000" className="w-full bg-black/50 border border-white/10 p-3 text-white outline-none focus:border-emerald-500" />
                <p className="text-[10px] text-white/40 mt-1">Uang ini akan ditahan dan dikembalikan saat check-out, atau menjadi DP booking.</p>
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Tipe Persetujuan</label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center gap-2 bg-black/50 border border-white/10 p-3 cursor-pointer hover:border-emerald-500 transition-colors">
                    <input type="radio" name="tipe_persetujuan" value="booking" className="accent-emerald-500" />
                    <span className="text-sm font-bold text-orange-400">Terima sbg Booking (DP)</span>
                  </label>
                  <label className="flex items-center gap-2 bg-black/50 border border-white/10 p-3 cursor-pointer hover:border-emerald-500 transition-colors">
                    <input type="radio" name="tipe_persetujuan" value="aktif" defaultChecked className="accent-emerald-500" />
                    <span className="text-sm font-bold text-emerald-400">Terima Penuh (Aktif)</span>
                  </label>
                </div>
              </div>
              <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 py-3 font-bold uppercase tracking-widest text-sm transition-colors mt-4">Proses Persetujuan</button>
            </form>
          </div>
        </div>
      )}

      {/* Modal Lihat Bukti Transfer & Validasi Penyewa ... (Tetap ada) */}
      {viewProofUrl && (
        <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center p-4 z-50">
          <div className="relative max-w-lg w-full bg-[#082016] border border-white/10 p-2">
            <div className="flex justify-between items-center p-4 border-b border-white/10 mb-4">
              <h3 className="font-bold">Validasi Bukti Transfer</h3>
              <button onClick={() => setViewProofUrl(null)} className="text-white/50 hover:text-white"><X /></button>
            </div>
            <div className="p-4 flex justify-center mb-4">
              <img src={viewProofUrl} alt="Bukti Transfer" className="max-h-[60vh] object-contain rounded" />
            </div>
            <div className="p-4 flex gap-3 border-t border-white/10">
              <button onClick={() => setViewProofUrl(null)} className="flex-1 bg-emerald-600 py-3 text-sm font-bold uppercase tracking-wider hover:bg-emerald-500 transition-colors">Verifikasi & Lunas</button>
            </div>
          </div>
        </div>
      )}

      {/* Alur 2: Modal Potongan Deposit Check-out */}
      {showCheckoutDeductionModal && (() => {
        const ktr = kontrak.find(k => k.id === showCheckoutDeductionModal.kontrakId);
        return (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-[#082016] border border-white/10 p-6 max-w-md w-full relative shadow-2xl">
              <button onClick={() => setShowCheckoutDeductionModal(null)} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"><X /></button>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Calculator className="w-5 h-5 text-emerald-400" /> Rincian Pengembalian Deposit</h2>
              <div className="mb-6 p-4 bg-black/30 border border-white/5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Total Deposit Awal</span>
                  <span className="font-bold">{formatRupiah(ktr?.uangJaminan || 0)}</span>
                </div>
              </div>
              <form onSubmit={e => handleSimulasiSubmit(e, 'Check-out berhasil disetujui. Deposit (setelah potongan) akan dikembalikan ke penyewa.', setShowCheckoutDeductionModal)} className="space-y-4">
                <div>
                  <label className="block text-sm text-white/60 mb-1">Potongan Kerusakan (Opsional)</label>
                  <input type="number" placeholder="Cth: 200000" className="w-full bg-black/50 border border-white/10 p-3 text-white outline-none focus:border-red-500 focus:text-red-400" />
                  <p className="text-[10px] text-red-400/80 mt-1">Kosongkan jika tidak ada kerusakan / denda keterlambatan.</p>
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-1">Catatan Potongan</label>
                  <input type="text" placeholder="Cth: Ganti kaca pecah" className="w-full bg-black/50 border border-white/10 p-3 text-white outline-none focus:border-emerald-500" />
                </div>
                <div className="pt-4 border-t border-white/10">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-white/80 font-bold">Total Dikembalikan:</span>
                    <span className="text-2xl font-extrabold text-emerald-400">{formatRupiah(ktr?.uangJaminan || 0)}</span>
                  </div>
                  <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 py-3 font-bold uppercase tracking-widest text-sm transition-colors">Finalisasi Check-out</button>
                </div>
              </form>
            </div>
          </div>
        );
      })()}

      {/* Alur 3: Modal Edit Kamar */}
      {showEditRoomModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#082016] border border-white/10 max-w-lg w-full p-6 relative shadow-2xl">
            <button onClick={() => setShowEditRoomModal(null)} className="absolute top-4 right-4 text-white/50 hover:text-white"><X /></button>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Edit2 className="w-5 h-5 text-emerald-400" /> Edit Kamar {showEditRoomModal.nomor}</h2>
            <form onSubmit={e => handleSimulasiSubmit(e, 'Perubahan data kamar berhasil disimpan.', setShowEditRoomModal)} className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 mb-1">Status Kamar</label>
                  <select defaultValue={showEditRoomModal.status} className="w-full bg-black/50 border border-white/10 p-3 outline-none focus:border-emerald-500 text-white">
                    <option value="tersedia">Tersedia</option>
                    <option value="penuh">Penuh (Terisi)</option>
                    <option value="maintenance">Maintenance (Perbaikan)</option>
                  </select>
                </div>
                <div><label className="block text-white/60 mb-1">Harga (Rp) / Bulan</label><input required type="number" defaultValue={showEditRoomModal.harga} className="w-full bg-black/50 border border-white/10 p-3 outline-none focus:border-emerald-500" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 mb-1">Tipe Kamar</label>
                  <select defaultValue={showEditRoomModal.tipe} className="w-full bg-black/50 border border-white/10 p-3 outline-none focus:border-emerald-500 text-white">
                    <option value="Standard">Standard</option>
                    <option value="Deluxe">Deluxe</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div>
                <div><label className="block text-white/60 mb-1">Lantai</label><input required type="number" min="1" defaultValue={showEditRoomModal.lantai} className="w-full bg-black/50 border border-white/10 p-3 outline-none focus:border-emerald-500" /></div>
              </div>
              <div className="pt-2">
                <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 py-3 font-bold uppercase tracking-widest transition-colors">Simpan Perubahan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Alur 4: Modal Buat Tagihan Manual */}
      {showBuatTagihanModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#082016] border border-white/10 p-6 max-w-md w-full relative shadow-2xl">
            <button onClick={() => setShowBuatTagihanModal(false)} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"><X /></button>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><FilePlus className="w-5 h-5 text-emerald-400" /> Terbitkan Tagihan Baru</h2>
            <form onSubmit={e => handleSimulasiSubmit(e, 'Tagihan baru berhasil diterbitkan. Notifikasi WhatsApp telah dikirim ke penyewa.', () => setShowBuatTagihanModal(false))} className="space-y-4 text-sm">
              <div>
                <label className="block text-white/60 mb-1">Pilih Penghuni</label>
                <select className="w-full bg-black/50 border border-white/10 p-3 text-white outline-none focus:border-emerald-500">
                  {penghuni.map(p => <option key={p.id} value={p.id}>{p.nama}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-white/60 mb-1">Periode Tagihan</label>
                <input required type="text" placeholder="Cth: 15 Agustus - 14 September 2026" className="w-full bg-black/50 border border-white/10 p-3 text-white outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-white/60 mb-1">Jumlah Tagihan (Rp)</label>
                <input required type="number" defaultValue="1500000" className="w-full bg-black/50 border border-white/10 p-3 text-white outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-white/60 mb-1">Jatuh Tempo</label>
                <input required type="date" className="w-full bg-black/50 border border-white/10 p-3 text-white outline-none focus:border-emerald-500" />
              </div>
              <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 py-3 font-bold uppercase tracking-widest transition-colors mt-2">Terbitkan & Kirim Notif</button>
            </form>
          </div>
        </div>
      )}
      
    </main>
  );
}

