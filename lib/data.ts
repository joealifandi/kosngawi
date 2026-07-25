import { CabangKos, Feature, GalleryImage, HeroSlide, Kamar, PengajuanSewa, Penghuni, Stat, Tagihan, Testimonial, Kontrak, LaporanKerusakan, PengajuanCheckout } from './types';

export const cabangKos: CabangKos[] = [
  {
    id: 1,
    name: 'Kos Harmoni Bantul',
    slug: 'kos-harmoni-bantul',
    address: 'Jl. Parangtritis Km 5, Sewon, Bantul, DIY',
    city: 'Bantul',
    description: 'Kos premium yang asri dan tenang di kawasan Bantul. Dekat dengan kampus ISI dan kawasan wisata budaya.',
    image: '/3737-Bisnis_Kost.jpg',
    totalRooms: 10,
    availableRooms: 6,
    facilities: ['AC', 'WiFi', 'Kamar Mandi Dalam', 'Parkir Motor', 'CCTV', 'Dapur Bersama'],
  },
  {
    id: 2,
    name: 'Kos Lestari Sleman',
    slug: 'kos-lestari-sleman',
    address: 'Jl. Kaliurang Km 9, Ngaglik, Sleman, DIY',
    city: 'Sleman',
    description: 'Kos nyaman untuk mahasiswa dan pekerja, berlokasi di Sleman dengan akses mudah ke UGM dan pusat kuliner.',
    image: '/3737-Bisnis_Kost.jpg',
    totalRooms: 10,
    availableRooms: 7,
    facilities: ['WiFi', 'Kamar Mandi Dalam', 'Laundry Area', 'Parkir Motor', 'CCTV', 'Ruang Tamu'],
  },
];

export const heroSlides: HeroSlide[] = cabangKos.map((kos, index) => ({
  id: index + 1,
  city: kos.city,
  title: index === 0 ? 'NGAWI KOST' : 'KOST NYAMAN',
  subtitle: kos.name,
  description: kos.description,
  image: kos.image,
}));

export const features: Feature[] = [
  {
    id: 1,
    icon: 'MapPin',
    title: 'Lokasi Strategis',
    description: 'Dekat kampus, kantor, pusat kuliner, transportasi umum, dan fasilitas publik utama.',
  },
  {
    id: 2,
    icon: 'ShieldCheck',
    title: 'Aman & Terpantau',
    description: 'Area kos dilengkapi CCTV, akses penghuni terdata, dan lingkungan nyaman untuk tinggal jangka panjang.',
  },
  {
    id: 3,
    icon: 'Wallet',
    title: 'Pembayaran Mudah',
    description: 'Tagihan bulanan, deposit, deadline pembayaran, dan riwayat lunas tercatat otomatis di portal penghuni.',
  },
];

const roomImages = [
  '/3737-Bisnis_Kost.jpg',
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=900&auto=format&fit=crop',
];

export const kamarKos: Kamar[] = [
  ...Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    cabangId: 1,
    nomor: `${101 + i}`,
    tipe: i > 7 ? 'Premium' : i > 4 ? 'Deluxe' : 'Standard',
    harga: i > 7 ? 2200000 : i > 4 ? 1800000 : 1500000,
    status: i === 1 ? 'penuh' : i === 2 ? 'menunggu_konfirmasi' : i === 8 ? 'maintenance' : 'tersedia',
    fasilitas: ['AC', 'WiFi', 'Kamar Mandi Dalam', 'Lemari', 'Meja Belajar'],
    ukuran: i > 7 ? '4x4 m' : '3x4 m',
    lantai: i < 5 ? 1 : 2,
    image: roomImages[i % roomImages.length],
    description: `Kamar ${101 + i} ${i > 7 ? 'Premium' : i > 4 ? 'Deluxe' : 'Standard'} di Kos Harmoni Jakarta dengan fasilitas lengkap dan suasana nyaman.`,
  } as Kamar)),
  ...Array.from({ length: 10 }, (_, i) => ({
    id: i + 11,
    cabangId: 2,
    nomor: `${201 + i}`,
    tipe: i > 7 ? 'Premium' : i > 4 ? 'Deluxe' : 'Standard',
    harga: i > 7 ? 1900000 : i > 4 ? 1600000 : 1300000,
    status: i === 0 ? 'penuh' : i === 6 ? 'menunggu_konfirmasi' : 'tersedia',
    fasilitas: ['WiFi', 'Kamar Mandi Dalam', 'Kasur', 'Lemari', 'Ventilasi Baik'],
    ukuran: i > 7 ? '4x4 m' : '3x3 m',
    lantai: i < 5 ? 1 : 2,
    image: roomImages[(i + 1) % roomImages.length],
    description: `Kamar ${201 + i} ${i > 7 ? 'Premium' : i > 4 ? 'Deluxe' : 'Standard'} di Kos Lestari Depok, cocok untuk mahasiswa dan pekerja.`,
  } as Kamar)),
];

export const pengajuanSewa: PengajuanSewa[] = [
  {
    id: 1,
    nama: 'Rizky Pratama',
    email: 'rizky@email.com',
    phone: '081234567890',
    ktpNumber: '3276010101010001',
    ktpUrl: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?q=80&w=400&auto=format&fit=crop',
    emergencyName: 'Bapak Budi',
    emergencyPhone: '085211112222',
    emergencyRelation: 'Orang Tua',
    kamarId: 3,
    cabangId: 1,
    tanggalPengajuan: '2026-07-17',
    status: 'menunggu',
    pesan: 'Saya ingin sewa mulai awal bulan depan.',
  },
];

export const penghuni: Penghuni[] = [
  {
    id: 1,
    nama: 'Alya Putri',
    email: 'alya@email.com',
    phone: '081298765432',
    ktpNumber: '3276020202020002',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    ktpUrl: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?q=80&w=400&auto=format&fit=crop',
    emergencyName: 'Ibu Ratna',
    emergencyPhone: '081233334444',
    emergencyRelation: 'Orang Tua',
  },
];

export const kontrak: Kontrak[] = [
  {
    id: 1,
    penghuniId: 1,
    kamarId: 2, // Kamar 102 di Harmoni Jakarta (ID 2 is i=1 which is kamar 102 status penuh)
    cabangId: 1,
    tanggalMulai: '2025-07-15',
    tanggalSelesai: '2027-07-15',
    hargaKesepakatan: 1450000, // Harga sewa lama
    uangJaminan: 1000000,
    status: 'aktif',
  }
];

export const tagihan: Tagihan[] = [
  {
    id: 1,
    kontrakId: 1,
    penghuniId: 1,
    kamarId: 2,
    periode: '15 Juni 2026 - 14 Juli 2026',
    jumlah: 1450000,
    jatuhTempo: '2026-07-15',
    status: 'lunas',
    tanggalBayar: '2026-07-10',
    metodeBayar: 'qris',
    buktiTransfer: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 2,
    kontrakId: 1,
    penghuniId: 1,
    kamarId: 2,
    periode: '15 Juli 2026 - 14 Agustus 2026',
    jumlah: 1450000,
    jatuhTempo: '2026-08-15',
    status: 'belum_bayar',
  },
];

export const laporanKerusakan: LaporanKerusakan[] = [
  {
    id: 1,
    penghuniId: 1,
    kamarId: 2,
    tanggalLapor: '2026-07-20',
    kategori: 'Listrik',
    deskripsi: 'AC di kamar tiba-tiba tidak dingin dan meneteskan air dari semalam.',
    foto: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=400&auto=format&fit=crop',
    status: 'proses'
  }
];

export const pengajuanCheckout: PengajuanCheckout[] = [];

export const galleryImages: GalleryImage[] = [
  { id: 1, src: '/3737-Bisnis_Kost.jpg', alt: 'Area kos', span: 'wide' },
  { id: 2, src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=800&auto=format&fit=crop', alt: 'Kamar kos', span: 'normal' },
  { id: 3, src: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800&auto=format&fit=crop', alt: 'Interior kamar', span: 'tall' },
  { id: 4, src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop', alt: 'Ruang tinggal', span: 'normal' },
  { id: 5, src: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop', alt: 'Fasilitas umum', span: 'normal' },
  { id: 6, src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop', alt: 'Kamar mandi', span: 'wide' },
  { id: 7, src: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?q=80&w=800&auto=format&fit=crop', alt: 'Dapur bersama', span: 'normal' },
  { id: 8, src: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?q=80&w=800&auto=format&fit=crop', alt: 'Koridor kos', span: 'normal' },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Alya Putri',
    kamar: 'Kamar 102',
    cabang: 'Kos Harmoni Jakarta',
    review: 'Kosnya nyaman, bersih, internet stabil, dan pembayaran bulanan jadi mudah karena ada portal penghuni.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    rating: 5,
  },
  {
    id: 2,
    name: 'Dimas Saputra',
    kamar: 'Kamar 205',
    cabang: 'Kos Lestari Depok',
    review: 'Lokasi dekat kampus dan stasiun. Owner responsif, fasilitas lengkap, cocok untuk tinggal lama.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    rating: 5,
  },
  {
    id: 3,
    name: 'Nadia Rahma',
    kamar: 'Kamar 109',
    cabang: 'Kos Harmoni Jakarta',
    review: 'Sistem tagihan jelas, status pembayaran terlihat, tidak perlu bolak-balik konfirmasi manual.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
    rating: 5,
  },
];

export const stats: Stat[] = [
  { id: 1, value: 20, suffix: '', label: 'Total Kamar' },
  { id: 2, value: 13, suffix: '', label: 'Kamar Tersedia' },
  { id: 3, value: 2, suffix: '', label: 'Cabang Kos' },
  { id: 4, value: 98, suffix: '%', label: 'Kepuasan Penghuni' },
];
