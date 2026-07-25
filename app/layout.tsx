import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'NGAWIKOST — Kos Premium & Manajemen Pembayaran',
  description: 'Website promosi kos premium dengan katalog kamar, pengajuan sewa, portal penghuni, dan dashboard pemilik kos.',
  metadataBase: new URL('https://example.com'),
  openGraph: {
    title: 'NGAWIKOST — Kos Premium & Manajemen Pembayaran',
    description: 'Katalog kamar kos, pengajuan sewa, portal penghuni, dan dashboard pemilik kos.',
    type: 'website'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="dark scroll-smooth">
      <body>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
