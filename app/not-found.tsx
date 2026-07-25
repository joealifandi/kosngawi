import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#04150d] text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-6xl font-extrabold text-emerald-500 mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-6">Halaman Tidak Ditemukan</h2>
      <p className="text-white/50 mb-8 max-w-md text-center">Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.</p>
      <Link href="/" className="bg-emerald-600 hover:bg-emerald-500 px-6 py-3 font-bold uppercase tracking-widest text-sm transition-colors">
        Kembali ke Beranda
      </Link>
    </div>
  );
}
