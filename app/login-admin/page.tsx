'use client';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function LoginAdminPage() {
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Login admin berhasil');
    window.location.href = '/owner-dashboard';
  };

  return (
    <main className="min-h-screen bg-[#04150d] text-white flex items-center justify-center px-6 py-20">
      <a href="/" className="absolute top-6 left-6 flex items-center gap-2 text-white/60 hover:text-white">
        <ArrowLeft className="w-4 h-4" /> Home
      </a>
      <div className="w-full max-w-md bg-[#082016] border border-white/10 p-8">
        <div className="flex items-center gap-2 mb-8">
          <ShieldCheck className="w-6 h-6 text-emerald-500" />
          <span className="text-xl font-bold tracking-[0.15em]">ADMIN PANEL</span>
        </div>
        <h1 className="text-3xl font-extrabold mb-2">Login Pemilik Kos</h1>
        <p className="text-white/50 text-sm mb-8">Akses dashboard untuk approval pengajuan, monitoring kamar, dan pembukuan.</p>
        <form onSubmit={submit} className="grid gap-4">
          <input required type="email" placeholder="Email Admin" className="bg-black/30 border border-white/10 p-4 outline-none focus:border-emerald-500" />
          <input required type="password" placeholder="Password" className="bg-black/30 border border-white/10 p-4 outline-none focus:border-emerald-500" />
          <button className="mt-4 bg-emerald-600 hover:bg-emerald-700 py-4 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
            <ShieldCheck className="w-5 h-5" /> Masuk Dashboard
          </button>
        </form>
      </div>
    </main>
  );
}
