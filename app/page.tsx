import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import RoomCatalog from '@/components/RoomCatalog';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="bg-[#04150d] min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <RoomCatalog />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
}
