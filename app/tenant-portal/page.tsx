'use client';

import { useState } from 'react';
import { AlertTriangle, ArrowLeft, CheckCircle2, CreditCard, FileText, Home, QrCode, Upload, Eye, X, Building2, Wrench, LogOut, Settings, User, Bell, Printer, Download } from 'lucide-react';
import { cabangKos, kamarKos, penghuni, tagihan, kontrak, laporanKerusakan, pengajuanCheckout } from '@/lib/data';
import { Tagihan, LaporanKerusakan, PengajuanCheckout } from '@/lib/types';

const formatRupiah = (value: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);

export default function TenantPortalPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'settings'>('dashboard');

  const tenant = penghuni[0];
  const activeContract = kontrak.find((k) => k.penghuniId === tenant.id && k.status === 'aktif');
  const room = activeContract ? kamarKos.find((k) => k.id === activeContract.kamarId) : null;
  const kos = activeContract ? cabangKos.find((c) => c.id === activeContract.cabangId) : null;
  
  const [billsState, setBillsState] = useState<Tagihan[]>(activeContract ? tagihan.filter((t) => t.kontrakId === activeContract.id) : []);
  const [maintenanceTickets, setMaintenanceTickets] = useState<LaporanKerusakan[]>(laporanKerusakan.filter(l => l.penghuniId === tenant.id));
  const [checkoutRequests, setCheckoutRequests] = useState<PengajuanCheckout[]>(activeContract ? pengajuanCheckout.filter(c => c.kontrakId === activeContract.id) : []);

  const [viewProofUrl, setViewProofUrl] = useState<string | null>(null);
  
  // Modals state
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [mtKategori, setMtKategori] = useState<'Listrik' | 'Air' | 'Furnitur' | 'Lainnya'>('Listrik');
  const [mtDeskripsi, setMtDeskripsi] = useState('');
  const [coTanggal, setCoTanggal] = useState('');
  const [coAlasan, setCoAlasan] = useState('');
  const [showReceiptModal, setShowReceiptModal] = useState<Tagihan | null>(null);

  const activeBill = billsState.find((t) => t.status === 'belum_bayar');

  const handleUploadClick = (billId: number) => {
    alert('Bukti transfer berhasil diunggah! Menunggu konfirmasi admin.');
    setBillsState(prev => prev.map(b => 
      b.id === billId ? { ...b, status: 'menunggu_konfirmasi', buktiTransfer: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?q=80&w=400&auto=format&fit=crop' } : b
    ));
  };

  const handleSubmitMaintenance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!room || !activeContract) return;
    const newTicket: LaporanKerusakan = {
      id: Date.now(),
      penghuniId: tenant.id,
      kamarId: room.id,
      tanggalLapor: new Date().toISOString().split('T')[0],
      kategori: mtKategori,
      deskripsi: mtDeskripsi,
      foto: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=400&auto=format&fit=crop', // mock upload
      status: 'menunggu'
    };
    setMaintenanceTickets([newTicket, ...maintenanceTickets]);
    setShowMaintenanceModal(false);
    setMtDeskripsi('');
    alert('Laporan kerusakan berhasil dikirim dengan lampiran foto.');
  };

  const handleSubmitCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeContract) return;
    const newCheckout: PengajuanCheckout = {
      id: Date.now(),
      kontrakId: activeContract!.id,
      tanggalRencanaKeluar: coTanggal,
      alasan: coAlasan,
      status: 'menunggu_persetujuan'
    };
    setCheckoutRequests([newCheckout, ...checkoutRequests]);
    setShowCheckoutModal(false);
    alert('Pengajuan pindah/check-out berhasil dikirim. Menunggu persetujuan admin untuk proses uang jaminan (deposit).');
  };

  const handleSimulasiSubmit = (e: React.FormEvent, msg: string) => {
    e.preventDefault();
    alert(msg);
  };

  return (
    <main className="min-h-screen bg-[#04150d] text-white px-4 md:px-6 py-6 md:py-10 relative">
      <div className="max-w-6xl mx-auto">
        <a href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors"><ArrowLeft className="w-4 h-4" /> Kembali Home</a>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-emerald-500 uppercase tracking-[0.3em] text-xs mb-2">Tenant Portal</p>
            <h1 className="text-3xl md:text-5xl font-extrabold">Halo, {tenant.nama}</h1>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <button onClick={() => setActiveTab('dashboard')} className={`px-5 py-3 text-sm font-bold uppercase tracking-widest transition-colors flex-shrink-0 ${activeTab === 'dashboard' ? 'bg-emerald-600 text-white' : 'border border-white/10 text-white/50 hover:bg-white/5'}`}>
              Dasbor
            </button>
            <button onClick={() => setActiveTab('settings')} className={`px-5 py-3 text-sm font-bold uppercase tracking-widest transition-colors flex-shrink-0 flex items-center gap-2 ${activeTab === 'settings' ? 'bg-emerald-600 text-white' : 'border border-white/10 text-white/50 hover:bg-white/5'}`}>
              <Settings className="w-4 h-4" /> Pengaturan
            </button>
            <a href="/login-tenant" className="border border-white/10 px-5 py-3 text-sm uppercase tracking-widest hover:border-emerald-500 transition-colors flex-shrink-0 flex items-center">
              <LogOut className="w-4 h-4 mr-2" /> Keluar
            </a>
          </div>
        </div>

        {activeTab === 'dashboard' && !activeContract && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-[#082016] border border-white/10 p-12 text-center mt-10">
            <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
              <FileText className="w-10 h-10 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Menunggu Persetujuan Pemilik Kos</h2>
            <p className="text-white/50 max-w-md mx-auto leading-relaxed">
              Pengajuan sewa Anda saat ini sedang dalam proses peninjauan oleh manajemen NGAWIKOST. 
              Silakan cek kembali halaman ini secara berkala, atau tunggu konfirmasi dari kami.
            </p>
          </div>
        )}

        {activeTab === 'dashboard' && activeContract && room && kos && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Quick Actions (Mobile optimized) */}
            <div className="flex flex-wrap gap-2 md:gap-3 mb-8">
              <button onClick={() => setShowMaintenanceModal(true)} className="flex-1 md:flex-none bg-slate-800 hover:bg-slate-700 border border-white/10 px-4 py-3 flex items-center justify-center gap-2 text-xs md:text-sm font-bold transition-colors">
                <Wrench className="w-4 h-4" /> Lapor Kerusakan
              </button>
              <button onClick={() => setShowCheckoutModal(true)} className="flex-1 md:flex-none bg-red-900/40 text-red-400 hover:bg-red-900/60 border border-red-500/20 px-4 py-3 flex items-center justify-center gap-2 text-xs md:text-sm font-bold transition-colors">
                <LogOut className="w-4 h-4" /> Pengajuan Keluar
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
              <div className="bg-[#082016] border border-white/10 p-5 md:p-6"><Home className="text-emerald-500 mb-4 w-6 h-6 md:w-8 md:h-8" /><p className="text-white/45 text-xs md:text-sm">Cabang</p><h2 className="text-xl md:text-2xl font-bold">{kos.name}</h2><p className="text-white/45 text-xs mt-1 md:mt-2 line-clamp-1">{kos.address}</p></div>
              <div className="bg-[#082016] border border-white/10 p-5 md:p-6"><FileText className="text-blue-400 mb-4 w-6 h-6 md:w-8 md:h-8" /><p className="text-white/45 text-xs md:text-sm">Kamar Aktif</p><h2 className="text-xl md:text-2xl font-bold">Kamar {room.nomor}</h2><p className="text-white/45 text-xs mt-1 md:mt-2">{room.tipe} · {room.ukuran}</p></div>
              <div className="bg-[#082016] border border-white/10 p-5 md:p-6">
                <CheckCircle2 className="text-emerald-400 mb-4 w-6 h-6 md:w-8 md:h-8" />
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white/45 text-xs md:text-sm">Status Kontrak</p>
                    <h2 className="text-xl md:text-2xl font-bold capitalize text-emerald-400">{activeContract.status}</h2>
                  </div>
                  <div className="text-right">
                    <p className="text-white/45 text-xs md:text-sm">Deposit</p>
                    <p className="font-bold text-sm md:text-base">{formatRupiah(activeContract.uangJaminan)}</p>
                  </div>
                </div>
                <p className="text-white/45 text-[10px] md:text-xs mt-2 truncate">Periode: {activeContract.tanggalMulai} s/d {activeContract.tanggalSelesai}</p>
              </div>
            </div>

            {checkoutRequests.length > 0 && (
              <div className="bg-yellow-500/10 border border-yellow-500/30 p-5 md:p-6 mb-8 md:mb-10">
                <h3 className="text-yellow-400 font-bold mb-3 text-sm md:text-base">Status Pengajuan Keluar (Check-out)</h3>
                <div className="space-y-2">
                  {checkoutRequests.map(c => (
                    <div key={c.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-black/30 p-3 md:p-4 text-xs md:text-sm gap-2">
                      <span className="text-white/80">Rencana Keluar: <strong>{c.tanggalRencanaKeluar}</strong></span>
                      <span className="uppercase tracking-widest text-[10px] md:text-xs font-bold px-2 py-1 bg-yellow-500/20 text-yellow-300 w-fit">{c.status.replace('_', ' ')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <section className="bg-emerald-950/30 border border-emerald-500/20 p-5 md:p-6 mb-8 md:mb-10 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="text-emerald-400 w-5 h-5 md:w-6 md:h-6" />
                <h2 className="text-lg md:text-xl font-bold">Informasi Pembayaran Resmi</h2>
              </div>
              <p className="text-white/70 text-xs md:text-sm mb-4">Silakan transfer tagihan bulanan Anda ke salah satu rekening berikut atau scan QRIS:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-black/30 p-4 border border-white/5 flex flex-col justify-center rounded">
                  <p className="text-emerald-400 font-bold mb-1 text-sm md:text-base">BCA - 1234567890</p>
                  <p className="text-white/60 text-xs md:text-sm">a/n PT Ngawi Properti Manajemen</p>
                </div>
                <div className="bg-black/30 p-4 border border-white/5 flex flex-col justify-center rounded">
                  <p className="text-blue-400 font-bold mb-1 text-sm md:text-base">MANDIRI - 0987654321</p>
                  <p className="text-white/60 text-xs md:text-sm">a/n Bpk. Pemilik Kos</p>
                </div>
              </div>
            </section>

            {activeBill && (
              <section className="bg-[#082016] border border-yellow-500/20 p-5 md:p-8 mb-8 md:mb-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-yellow-500/20 text-yellow-300 px-4 py-1 text-[10px] font-bold tracking-widest uppercase">Segera Dibayar</div>
                <div className="flex items-center gap-3 mb-6"><CreditCard className="text-emerald-500 w-5 h-5 md:w-6 md:h-6" /><h2 className="text-xl md:text-2xl font-bold">Tagihan Aktif</h2></div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <p className="text-white/45 text-xs md:text-sm mb-1">Periode Sewa</p>
                    <h3 className="text-lg md:text-2xl font-bold mb-4 text-white/90">{activeBill.periode}</h3>
                    <p className="text-white/45 text-xs md:text-sm mb-1">Total Bayar (Sesuai Kontrak)</p>
                    <p className="text-3xl md:text-4xl font-extrabold text-emerald-400 mb-6">{formatRupiah(activeBill.jumlah)}</p>
                    <div className="flex items-center gap-2 mb-6 text-yellow-300 bg-yellow-500/10 p-3 rounded">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <p className="text-xs md:text-sm">Jatuh tempo: {activeBill.jatuhTempo}</p>
                    </div>
                    
                    <button onClick={() => handleUploadClick(activeBill.id)} className="flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-700 px-6 py-4 text-sm font-bold uppercase tracking-widest transition-colors">
                      <Upload className="w-5 h-5" /> Unggah Bukti
                    </button>
                    <p className="text-[10px] md:text-xs text-white/40 mt-3 text-center">Format: JPG, PNG, PDF (Maks. 5MB)</p>
                  </div>
                  <div className="bg-white p-6 md:p-8 text-black flex flex-col items-center justify-center rounded-lg">
                    <QrCode className="w-24 h-24 md:w-32 md:h-32 mb-4" />
                    <p className="font-bold text-sm md:text-base">QRIS NGAWIKOST</p>
                    <p className="text-xs md:text-sm text-black/60 text-center mt-2 max-w-[200px]">Scan kode ini dengan aplikasi M-Banking atau e-Wallet Anda.</p>
                  </div>
                </div>
              </section>
            )}

            <section className="bg-[#082016] border border-white/10 p-5 md:p-6">
              <h2 className="text-xl md:text-2xl font-bold mb-6">Riwayat Tagihan & Laporan</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-base md:text-lg font-bold mb-4 text-emerald-400">Tagihan</h3>
                  <div className="overflow-x-auto pb-4">
                    <table className="w-full text-sm min-w-[500px]">
                      <thead className="text-white/40 uppercase tracking-widest text-[10px] border-b border-white/10 bg-black/20">
                        <tr>
                          <th className="text-left py-3 px-3">Periode</th>
                          <th className="text-left py-3 px-3">Jatuh Tempo</th>
                          <th className="text-left py-3 px-3">Status</th>
                          <th className="text-center py-3 px-3">Bukti</th>
                        </tr>
                      </thead>
                      <tbody>
                        {billsState.map((bill) => (
                          <tr key={bill.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="py-3 px-3 font-medium text-white/90">{bill.periode}</td>
                            <td className="px-3 text-xs text-white/60">{bill.jatuhTempo}</td>
                            <td className="px-3">
                              <span className={`inline-block px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                                bill.status === 'lunas' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                bill.status === 'menunggu_konfirmasi' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                              }`}>
                                {bill.status.replace('_', ' ')}
                              </span>
                            </td>
                            <td className="px-3 text-center">
                              {bill.status === 'lunas' ? (
                                <button 
                                  onClick={() => setShowReceiptModal(bill)} 
                                  className="text-blue-400 hover:text-blue-300 p-2 flex items-center justify-center w-full"
                                  title="Unduh Kwitansi"
                                >
                                  <Download className="w-4 h-4" />
                                </button>
                              ) : bill.status === 'menunggu_konfirmasi' && bill.buktiTransfer ? (
                                <button 
                                  onClick={() => setViewProofUrl(bill.buktiTransfer!)} 
                                  className="text-emerald-400 hover:text-emerald-300 p-2 flex items-center justify-center w-full"
                                  title="Lihat Bukti Transfer"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                              ) : (
                                <span className="text-white/30 text-xs">-</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-base md:text-lg font-bold mb-4 text-blue-400">Riwayat Komplain Kerusakan</h3>
                  <div className="space-y-3">
                    {maintenanceTickets.length === 0 ? (
                      <p className="text-white/40 text-sm">Belum ada laporan kerusakan yang Anda buat.</p>
                    ) : maintenanceTickets.map(t => (
                      <div key={t.id} className="bg-black/25 border border-white/5 p-4 text-sm">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-bold text-white/80">{t.kategori}</span>
                          <span className={`px-2 py-1 text-[10px] uppercase font-bold tracking-widest rounded ${
                            t.status === 'selesai' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/20' :
                            t.status === 'proses' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/20' :
                            'bg-yellow-500/20 text-yellow-300 border border-yellow-500/20'
                          }`}>{t.status}</span>
                        </div>
                        <p className="text-white/60 line-clamp-2 text-xs md:text-sm">{t.deskripsi}</p>
                        <p className="text-[10px] text-white/40 mt-3">Dilaporkan: {t.tanggalLapor}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Tab Settings (Fitur 4) */}
        {activeTab === 'settings' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3"><User className="text-emerald-400" /> Pengaturan Akun Penghuni</h2>
            
            <div className="bg-[#082016] border border-white/10 p-6 mb-6">
              <div className="flex items-center gap-4 mb-6">
                <img src={tenant.avatar} alt={tenant.nama} className="w-20 h-20 rounded-full object-cover border-2 border-emerald-500" />
                <button className="bg-black/50 border border-white/20 hover:border-emerald-500 px-4 py-2 text-xs font-bold uppercase transition-colors">Ganti Foto</button>
              </div>
              <form onSubmit={e => handleSimulasiSubmit(e, 'Data profil berhasil diperbarui.')} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><label className="block text-xs text-white/50 uppercase tracking-widest mb-1">Nama Lengkap</label><input type="text" defaultValue={tenant.nama} className="w-full bg-black/40 border border-white/10 p-3 text-sm focus:border-emerald-500 outline-none" /></div>
                  <div><label className="block text-xs text-white/50 uppercase tracking-widest mb-1">Email</label><input type="email" defaultValue={tenant.email} className="w-full bg-black/40 border border-white/10 p-3 text-sm focus:border-emerald-500 outline-none" /></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><label className="block text-xs text-white/50 uppercase tracking-widest mb-1">No. HP / WhatsApp</label><input type="text" defaultValue={tenant.phone} className="w-full bg-black/40 border border-white/10 p-3 text-sm focus:border-emerald-500 outline-none" /></div>
                  <div><label className="block text-xs text-white/50 uppercase tracking-widest mb-1">Nomor KTP</label><input type="text" defaultValue={tenant.ktpNumber} className="w-full bg-black/40 border border-white/10 p-3 text-sm focus:border-emerald-500 outline-none" /></div>
                </div>

                <div className="pt-4 border-t border-white/10 mt-4">
                  <label className="block text-xs text-white/50 uppercase tracking-widest mb-3">Dokumen KTP</label>
                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    <div className="w-full md:w-48 aspect-[1.6] bg-black/60 border border-white/10 relative overflow-hidden">
                      {tenant.ktpUrl ? (
                        <img src={tenant.ktpUrl} alt="Foto KTP" className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex h-full items-center justify-center text-white/30 text-xs text-center p-2">Belum ada foto KTP</div>
                      )}
                    </div>
                    <div className="flex-1 w-full">
                      <input type="file" accept="image/*" className="w-full text-sm text-white/70 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:font-bold file:uppercase file:tracking-widest file:bg-emerald-600 file:text-white hover:file:bg-emerald-500 transition-colors cursor-pointer outline-none bg-black/30 border border-white/10 p-2" />
                      <p className="text-[10px] text-white/40 mt-2">Format: JPG, PNG. Maksimal 5MB.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4"><button type="submit" className="bg-emerald-600 hover:bg-emerald-500 px-6 py-3 text-xs font-bold uppercase tracking-widest w-full sm:w-auto">Simpan Profil</button></div>
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
                    <p className="font-bold group-hover:text-emerald-400 transition-colors text-sm md:text-base">Pengingat Tagihan (WhatsApp)</p>
                    <p className="text-[10px] md:text-xs text-white/50 mt-1">Terima pengingat tagihan bulanan pada H-3 sebelum jatuh tempo.</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODALS */}
      {viewProofUrl && (
        <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center p-4 z-50">
          <div className="relative max-w-lg w-full bg-[#082016] border border-white/10 p-2 shadow-2xl">
            <div className="flex justify-between items-center p-4 border-b border-white/10 mb-4">
              <h3 className="font-bold">Bukti Transfer</h3>
              <button onClick={() => setViewProofUrl(null)} className="text-white/50 hover:text-white"><X /></button>
            </div>
            <div className="p-4 flex justify-center">
              <img src={viewProofUrl} alt="Bukti Transfer" className="max-h-[60vh] object-contain rounded" />
            </div>
          </div>
        </div>
      )}

      {showMaintenanceModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#082016] border border-white/10 p-6 max-w-lg w-full relative shadow-2xl">
            <button onClick={() => setShowMaintenanceModal(false)} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"><X /></button>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Wrench className="w-5 h-5 text-emerald-400" /> Form Lapor Kerusakan</h2>
            <form onSubmit={handleSubmitMaintenance} className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-1">Kategori</label>
                <select value={mtKategori} onChange={e => setMtKategori(e.target.value as any)} className="w-full bg-black/50 border border-white/10 p-3 text-white outline-none focus:border-emerald-500">
                  <option value="Listrik">Listrik / AC / Lampu</option>
                  <option value="Air">Air / Kamar Mandi</option>
                  <option value="Furnitur">Furnitur / Kasur / Lemari</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1">Deskripsi Kerusakan</label>
                <textarea required value={mtDeskripsi} onChange={e => setMtDeskripsi(e.target.value)} rows={4} placeholder="Jelaskan detail kerusakan..." className="w-full bg-black/50 border border-white/10 p-3 text-white outline-none focus:border-emerald-500 resize-none"></textarea>
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1">Unggah Foto Bukti (Opsional)</label>
                <div className="border-2 border-dashed border-white/20 p-4 text-center cursor-pointer hover:border-emerald-500/50 hover:bg-white/5 transition-colors">
                  <Upload className="w-6 h-6 mx-auto text-white/40 mb-2" />
                  <p className="text-xs text-white/50">Klik untuk upload foto dari HP/Laptop</p>
                </div>
              </div>
              <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 py-3 font-bold uppercase tracking-widest text-sm transition-colors mt-4">Kirim Laporan</button>
            </form>
          </div>
        </div>
      )}

      {showCheckoutModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#082016] border border-white/10 p-6 max-w-lg w-full relative shadow-2xl">
            <button onClick={() => setShowCheckoutModal(false)} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"><X /></button>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><LogOut className="w-5 h-5 text-red-400" /> Form Pengajuan Check-out</h2>
            <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 mb-4 text-sm text-yellow-300 leading-relaxed rounded">
              <strong>Info:</strong> Pengajuan wajib dilakukan minimal H-14 sebelum tanggal keluar. Uang jaminan {formatRupiah(activeContract?.uangJaminan || 0)} akan dikembalikan setelah pengecekan kamar oleh admin.
            </div>
            <form onSubmit={handleSubmitCheckout} className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-1">Rencana Tanggal Keluar</label>
                <input required type="date" value={coTanggal} onChange={e => setCoTanggal(e.target.value)} className="w-full bg-black/50 border border-white/10 p-3 text-white outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1">Alasan Pindah</label>
                <textarea required value={coAlasan} onChange={e => setCoAlasan(e.target.value)} rows={3} placeholder="Contoh: Lulus kuliah, Pindah kerja..." className="w-full bg-black/50 border border-white/10 p-3 text-white outline-none focus:border-emerald-500 resize-none"></textarea>
              </div>
              <button type="submit" className="w-full bg-red-900/60 hover:bg-red-900/80 text-red-100 py-3 font-bold uppercase tracking-widest text-sm transition-colors mt-4">Kirim Pengajuan</button>
            </form>
          </div>
        </div>
      )}

      {/* Fitur 4: Modal Kwitansi Digital */}
      {showReceiptModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="max-w-xl w-full relative">
            <button onClick={() => setShowReceiptModal(null)} className="absolute -top-10 right-0 text-white/50 hover:text-white transition-colors"><X className="w-8 h-8" /></button>
            
            <div className="bg-white text-black p-8 shadow-2xl relative overflow-hidden" id="kwitansi-print-area">
              <div className="absolute top-8 right-8 w-24 h-24 border-4 border-red-500/20 rounded-full flex items-center justify-center rotate-12">
                <span className="text-red-500/30 font-bold text-xl uppercase tracking-widest">LUNAS</span>
              </div>
              
              <div className="flex justify-between items-start mb-8 border-b-2 border-black/10 pb-6">
                <div>
                  <h2 className="text-3xl font-extrabold text-emerald-700 tracking-tighter">NGAWIKOST</h2>
                  <p className="text-sm text-black/60 font-medium">Manajemen Properti & Kos</p>
                </div>
                <div className="text-right">
                  <h1 className="text-2xl font-bold uppercase tracking-widest text-black/20">Kwitansi</h1>
                  <p className="text-xs text-black/50 font-mono mt-1">INV-{showReceiptModal.id}-{new Date().getFullYear()}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-8 text-sm">
                <div>
                  <p className="text-black/50 mb-1 text-xs uppercase tracking-widest">Diterima Dari:</p>
                  <p className="font-bold text-base">{tenant.nama}</p>
                  <p className="text-black/70">Kamar {room?.nomor || '-'} - {kos?.name || '-'}</p>
                </div>
                <div className="text-right">
                  <p className="text-black/50 mb-1 text-xs uppercase tracking-widest">Tanggal Pembayaran:</p>
                  <p className="font-bold">{showReceiptModal.tanggalBayar || '-'}</p>
                  <p className="text-black/70 mt-2">Metode: <span className="uppercase">{showReceiptModal.metodeBayar || 'Transfer'}</span></p>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-4 mb-8">
                <p className="text-black/50 text-xs uppercase tracking-widest mb-2">Untuk Pembayaran:</p>
                <p className="font-bold text-lg leading-tight">Sewa Kamar Kos Periode</p>
                <p className="text-emerald-700 font-bold">{showReceiptModal.periode}</p>
              </div>

              <div className="flex justify-between items-end border-t-2 border-black/10 pt-6">
                <div className="text-center">
                  <p className="text-black/40 text-xs mb-8">Admin / Pemilik Kos</p>
                  <p className="font-bold text-sm underline decoration-black/20 underline-offset-4">NGAWIKOST Management</p>
                </div>
                <div className="text-right">
                  <p className="text-black/50 text-xs uppercase tracking-widest mb-1">Total Dibayar</p>
                  <p className="text-3xl font-extrabold text-emerald-700">{formatRupiah(showReceiptModal.jumlah)}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-4">
              <button onClick={() => alert('Kwitansi sedang diunduh dalam format PDF...')} className="flex-1 bg-emerald-600 hover:bg-emerald-500 py-4 font-bold uppercase tracking-widest text-sm transition-colors flex items-center justify-center gap-2">
                <Download className="w-5 h-5" /> Simpan PDF
              </button>
              <button onClick={() => alert('Membuka jendela Print dialog...')} className="bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-4 font-bold uppercase tracking-widest text-sm transition-colors flex items-center justify-center gap-2">
                <Printer className="w-5 h-5" /> Cetak
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
