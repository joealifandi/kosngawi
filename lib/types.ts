export type CabangKos = {
  id: number;
  name: string;
  slug: string;
  address: string;
  city: string;
  description: string;
  image: string;
  totalRooms: number;
  availableRooms: number;
  facilities: string[];
};

export type StatusKamar = 'tersedia' | 'penuh' | 'menunggu_konfirmasi' | 'maintenance' | 'di_booking';

export type Kamar = {
  id: number;
  cabangId: number;
  nomor: string;
  tipe: 'Standard' | 'Deluxe' | 'Premium';
  harga: number;
  status: StatusKamar;
  fasilitas: string[];
  ukuran: string;
  lantai: number;
  image: string;
  description: string;
};

export type Penghuni = {
  id: number;
  nama: string;
  email: string;
  phone: string;
  ktpNumber: string;
  avatar: string;
  ktpUrl?: string;
  emergencyName?: string;
  emergencyPhone?: string;
  emergencyRelation?: string;
};

export type Kontrak = {
  id: number;
  penghuniId: number;
  kamarId: number;
  cabangId: number;
  tanggalMulai: string;
  tanggalSelesai: string;
  hargaKesepakatan: number;
  uangJaminan: number;
  status: 'aktif' | 'selesai' | 'dibatalkan';
};

export type Tagihan = {
  id: number;
  kontrakId: number;
  penghuniId: number;
  kamarId: number;
  periode: string; // e.g., '15 Juli 2026 - 14 Agustus 2026'
  jumlah: number;
  jatuhTempo: string;
  status: 'lunas' | 'belum_bayar' | 'terlambat' | 'menunggu_konfirmasi';
  tanggalBayar?: string;
  metodeBayar?: 'qris' | 'transfer' | 'cash';
  buktiTransfer?: string;
};

export type PengajuanSewa = {
  id: number;
  nama: string;
  email: string;
  phone: string;
  ktpNumber: string;
  kamarId: number;
  cabangId: number;
  tanggalPengajuan: string;
  status: 'menunggu' | 'disetujui' | 'ditolak';
  pesan?: string;
  ktpUrl?: string;
  emergencyName?: string;
  emergencyPhone?: string;
  emergencyRelation?: string;
};

export type Testimonial = {
  id: number;
  name: string;
  kamar: string;
  cabang: string;
  review: string;
  avatar: string;
  rating: number;
};

export type GalleryImage = {
  id: number;
  src: string;
  alt: string;
  span?: 'tall' | 'wide' | 'normal';
};

export type Stat = {
  id: number;
  value: number;
  suffix: string;
  label: string;
};

export type Feature = {
  id: number;
  icon: string;
  title: string;
  description: string;
};

export type HeroSlide = {
  id: number;
  city: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
};

export type LaporanKerusakan = {
  id: number;
  penghuniId: number;
  kamarId: number;
  tanggalLapor: string;
  kategori: 'Listrik' | 'Air' | 'Furnitur' | 'Lainnya';
  deskripsi: string;
  foto?: string;
  status: 'menunggu' | 'proses' | 'selesai';
};

export type PengajuanCheckout = {
  id: number;
  kontrakId: number;
  tanggalRencanaKeluar: string;
  alasan: string;
  status: 'menunggu_persetujuan' | 'disetujui' | 'selesai';
  catatanOwner?: string;
};

export type PengajuanPindahKamar = {
  id: number;
  kontrakId: number;
  kamarTujuanId: number;
  tanggalPindah: string;
  alasan: string;
  status: 'menunggu_persetujuan' | 'disetujui' | 'selesai';
};
