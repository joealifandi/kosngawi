'use client';
import { useState, useEffect, Suspense } from 'react';
import { ArrowLeft, UserPlus, LogIn, Info } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';

function LoginForm() {
  const searchParams = useSearchParams();
  const kamarId = searchParams.get('kamar');
  
  const [mode, setMode] = useState<'login' | 'register'>(kamarId ? 'register' : 'login');

  useEffect(() => {
    if (kamarId) {
      setMode('register');
    }
  }, [kamarId]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(mode === 'login' ? 'Login berhasil' : 'Registrasi berhasil, pengajuan sewa Anda telah masuk ke pemilik kos.');
    window.location.href = '/tenant-portal';
  };

  return (
    <>
      <div className="flex gap-2 mb-8">
        <button onClick={() => setMode('login')} className={`flex-1 py-3 text-sm uppercase tracking-widest border ${mode === 'login' ? 'bg-emerald-600 border-emerald-600' : 'border-white/10 text-white/50'}`}>Login</button>
        <button onClick={() => setMode('register')} className={`flex-1 py-3 text-sm uppercase tracking-widest border ${mode === 'register' ? 'bg-emerald-600 border-emerald-600' : 'border-white/10 text-white/50'}`}>Register</button>
      </div>
      <h1 className="text-3xl font-extrabold mb-2">{mode === 'login' ? 'Portal Penghuni' : 'Daftar Penghuni'}</h1>
      <p className="text-white/50 text-sm mb-6">{mode === 'login' ? 'Masuk untuk cek tagihan, kontrak, dan pembayaran.' : 'Buat akun untuk mengajukan sewa kamar.'}</p>
      
      {mode === 'register' && kamarId && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 mb-6 flex items-start gap-3">
          <Info className="text-emerald-400 w-5 h-5 shrink-0 mt-0.5" />
          <p className="text-emerald-200 text-sm">Anda sedang mengajukan sewa untuk <strong>Kamar ID {kamarId}</strong>. Silakan lengkapi data diri Anda.</p>
        </div>
      )}

      <form onSubmit={submit} className="grid gap-4">
        {mode === 'register' && <input required placeholder="Nama Lengkap" className="bg-black/30 border border-white/10 p-4 outline-none focus:border-emerald-500" />}
        <input required type="email" placeholder="Email" className="bg-black/30 border border-white/10 p-4 outline-none focus:border-emerald-500" />
        <div>
          <input required type="password" placeholder="Password" className="w-full bg-black/30 border border-white/10 p-4 outline-none focus:border-emerald-500" />
          {mode === 'login' && (
            <div className="flex justify-end mt-2">
              <button type="button" onClick={() => alert('Silakan hubungi Pemilik Kos / Admin untuk melakukan reset kata sandi akun Anda.')} className="text-xs text-emerald-400 hover:underline">Lupa Kata Sandi?</button>
            </div>
          )}
        </div>
        {mode === 'register' && (
          <>
            <input required placeholder="No. HP" className="bg-black/30 border border-white/10 p-4 outline-none focus:border-emerald-500" />
            <input required placeholder="Nomor KTP / Identitas" className="bg-black/30 border border-white/10 p-4 outline-none focus:border-emerald-500" />
            <div className="bg-black/30 border border-white/10 p-4">
              <label className="block text-xs text-white/50 uppercase tracking-widest mb-2">Unggah Foto KTP / Selfie KTP</label>
              <input required type="file" accept="image/*" className="w-full text-sm text-white/70 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:font-bold file:uppercase file:tracking-widest file:bg-emerald-600 file:text-white hover:file:bg-emerald-500 transition-colors cursor-pointer outline-none" />
            </div>

            <div className="bg-emerald-950/30 border border-emerald-500/20 p-4 mt-2">
              <h3 className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-3">Kontak Darurat (Wajib)</h3>
              <div className="grid gap-3">
                <input required placeholder="Nama Kontak Darurat" className="w-full bg-black/30 border border-white/10 p-3 text-sm outline-none focus:border-emerald-500" />
                <input required placeholder="No. HP Darurat" className="w-full bg-black/30 border border-white/10 p-3 text-sm outline-none focus:border-emerald-500" />
                <select required className="w-full bg-black/30 border border-white/10 p-3 text-sm text-white/70 outline-none focus:border-emerald-500">
                  <option value="">Hubungan Keluarga...</option>
                  <option value="Orang Tua">Orang Tua</option>
                  <option value="Kakak/Adik">Kakak / Adik</option>
                  <option value="Suami/Istri">Suami / Istri</option>
                  <option value="Kerabat">Kerabat Lainnya</option>
                </select>
              </div>
            </div>

            <label className="flex items-start gap-3 mt-4 cursor-pointer group">
              <div className="relative flex items-center justify-center mt-0.5">
                <input required type="checkbox" className="sr-only peer" />
                <div className="w-5 h-5 bg-black/30 border border-white/20 peer-checked:bg-emerald-600 peer-checked:border-emerald-500 rounded-sm transition-colors flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-white scale-0 peer-checked:scale-100 transition-transform" style={{ clipPath: 'polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%)' }}></div>
                </div>
              </div>
              <p className="text-xs text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">
                Saya menyetujui <a href="#" className="text-emerald-400 hover:underline">Syarat & Ketentuan</a> serta <a href="#" className="text-emerald-400 hover:underline">Tata Tertib Kos</a> yang berlaku di NGAWIKOST.
              </p>
            </label>
          </>
        )}
        <button className="mt-4 bg-emerald-600 hover:bg-emerald-700 py-4 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
          {mode === 'login' ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
          {mode === 'login' ? 'Masuk' : 'Ajukan Sewa'}
        </button>
      </form>
    </>
  );
}

export default function LoginTenantPage() {
  return (
    <main className="min-h-screen bg-[#04150d] text-white flex items-center justify-center px-6 py-20">
      <a href="/" className="absolute top-6 left-6 flex items-center gap-2 text-white/60 hover:text-white"><ArrowLeft className="w-4 h-4" /> Home</a>
      <div className="w-full max-w-md bg-[#082016] border border-white/10 p-8">
        <div className="flex items-center justify-center mb-8">
          <Image src="/NGAWIKOST.png" alt="NGAWIKOST" width={220} height={60} className="h-16 w-auto" priority />
        </div>
        
        <Suspense fallback={<div className="text-center text-white/50">Memuat form...</div>}>
          <LoginForm />
        </Suspense>

        <a href="/login-admin" className="block text-center text-xs text-white/35 hover:text-emerald-400 mt-8 uppercase tracking-widest">Login Pemilik Kos</a>
      </div>
    </main>
  );
}
